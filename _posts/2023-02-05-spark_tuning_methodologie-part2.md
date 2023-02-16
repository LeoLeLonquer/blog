---
title: "Comment optimiser Spark 2 ? Chapitre 2 : automatiser l'automatisation" 
layout: post
tags: dev spark tuning 
category: dev
---

Dans ce deuxième article, nous allons construire un tuyau qui s'adapte automatiquement au flux de données en entrée.
<!--more-->

### The Problem

Dans un traitement batch, le pipeline peut avoir des tailles de données variables. Nous pourrions simplement utiliser l'allocation dynamique Spark.  
Cependant celle-ci peut être un peu overkill. Les niveaux de parallélisme possibles étant différents entre chaque jobs, notre application Spark peut rapidement
s'allouer un grand nombre d'exécuteurs pour les utiliser pour une ou deux tâches de courte durée et être inactifs le reste du temps.

### The Solution 

Du point de vue de l'utilisation des ressources, je préfère une allocation statique bien configurée. 4 exécuteurs à 4 cores utilisés à 100%, sur lesquels l'on a broadcasté ou caché des tables, maximise l'utilisation des ressources.  
Du point de vue du temps de traitement, une allocation dynamique est certainement notre meilleur outil ... jusqu'à un certain point ! Une application faisant du yoyo en 1 exécuteur et 30 exécuteurs à 4 cores est symptomatique d'une application mal configurée et consomme inutilement de la ressource.

Il s'agit donc de trouver une configuration dynamique qui au démarrage calcule les paramètres optimaux du job Spark en fonction de la volumétrie en entrée.  
Cette configuration dynamique peut prendre en charge la sélection des paramètres de l'allocation dynamique. 

### Ajuster automatiquement

Pour procéder, nous allons :

1. sélectionner des volumétries
2. pour chacune d'entre elle :
   1. optimiser le pipeline indépendamment
   2. sauvegarder les paramètres optimisés dans un tableau global

Nous pourrons ensuite rechercher une règle générale à partir de ce tableau.  
Les principaux paramètres à optimiser sont les suivants :

- `num-executors` ou `maxExecutors`
- `executor-cores`
- `executor-memory`
- `spark.shuffle.partitions`


### A la recherche de la formule 🧪

#### Préparation de notre tableau de travail

Préparer un tableau pour contenir :
- la volumétrie en entrée
- les valeurs de la configuration optimale
- les métriques de traitement moyennes associées

| Volumétrie entrée | (`num-executors`,  `executor-cores`) | `executor-memory` | `spark.shuffle.partitions` | Total Uptime | Task Time | max Shuffle Spill Disk |
| ----------------- | ------------------------------------ | ----------------- | -------------------------- | ------------ | --------- | ---------------------- |
|                   |                                      |                   |                            |              |           |                        |


#### Sélection des volumétries

Dans un premier temps, nous choississons le contexte d'exécution le plus courant et nous y sélectionnons un intervalle de volumétrie.

Exemple pour une journée lambda :

- 2Go (entre 4 et 5h)
- 5Go (entre 7h et 8h)
- 10Go (entre 21h et 22h)
- 20 go (entre 12h et 13h)

Cependant, en fonction du contexte, dans une même table, les données en entrée peuvent avoir des morphologies très différentes.
Par exemple, certains champs voient la distribution de leurs valeurs modifiée en fonction de la date d'exécution.

Il faut donc bien connaître ses données en entrée et savoir que le comportement de notre pipeline peut être très différent en fonction de la morphologie des données en entrée.

Il faudra donc
- au mieux : avoir pour chaque contexte une formule spécifique
- au moins : vérifier que les configurations optimales du cas général n'impacte pas outre mesure l'application dans un autre contexte.

#### Optimisation unitaire

Pour chacune des volumétries ci-dessus :
1.  Effectuer une optimisation des ressources comme décrit dans [Comment optimiser Spark 2 ? Chapitre 1](spark_tuning_methodologie-part1) 
2.  Noter dans notre tableau les valeurs de la configuration optimale ainsi que les métriques Total Uptime, Task Time.

#### Analyse des résultats

En reprenant notre tableau, pour chacun des paramètres Spark recueilli, analyser l'évolution du paramètre en fonction de la volumétrie en entrée (observer le lien de corrélation, les plafonds et les plateaux ...). Au mieux faire une régression.

Exemple de tableau pour (`num-executors`,  `executor-cores`)
      
| Volumétrie (Go) | (`num-executors`,  `executor-cores`) |
| --------------- | ------------------------------------ |
| 2               | (10, 5)                              |
| 5               | (15, 5)                              |
| 10              | (20, 5)                              |
| 20              | (40, 5)                              |


#### Production des formules

En déduire des formules pour chacun des paramètres, qui peuvent être de plusieurs types :
- le paramètre est fixé à une constante (ex : `executor-cores = 5` )
- le paramètre suit une formule en fonction de la volumétrie (ex : `num-executors = Volumétrie*2`) 
- le paramètre suit une formule en fonction d'autres paramètres (ex : `spark.shuffle.partitions ~ num-executors` )

Dans le cas d'une formule, nous pouvons fixer
- une borne inférieure (si besoin)
- une borne supérieure (recommandée)

Cela nous permet d'obtenir une expression du type : `max(borne inférieure, min(borne supérieure, formule))`
- Ex : `num-executors = max(10, min(100, Volumétrie/(128Mo * 5))`

#### Mise en application des formules

Enfin, il faudra mettre en place un mécanisme qui détecte la volumétrie en entrée et calcule les paramètres Spark adaptés.
C'est à vous de jouer !

## Conclusion

L'idée à retenir dans cet article est de faire en sorte que son application soit **smart**.  
Vous noterez que si le traitement change en lui-même, les formules seront caduques.
Cependant une fois que vous aurez l'habitude d'optimiser des pipelines, vous aurez une petite référence de formules à appliquer dans différents cas d'usage qui vaudra son pesant d'or !

## Ressources

- [Facebook Tuning](https://www.slideshare.net/databricks/tuning-apache-spark-for-largescale-workloads-gaoxiang-liu-and-sital-kedia)
- [Data Mechanics Delight - better Spark UI](https://www.datamechanics.co/blog-post/building-a-better-spark-ui-data-mechanics-delight)
- [Dr. Elephant](https://www.databricks.com/fr/session/dr-elephant-for-monitoring-and-tuning-apache-spark-jobs-on-hadoop) : un ancien outil d'optimisation automatique