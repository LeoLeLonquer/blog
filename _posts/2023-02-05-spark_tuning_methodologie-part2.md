---
title: "Comment optimiser Spark 2 ? Chapitre 2 : automatisation" 
layout: post
tags: dev spark tuning 
category: dev
---

Dans ce deuxième article, nous allons construire un tuyau qui s'adapte automatiquement au flux de données en entrée.
<!--more-->

### Ajuster automatiquement

Le pipeline peut avoir des tailles de données variables.  
Le mieux est de produire un modèle qui nous permet de calculer pour chaque volumétrie, les ressources à allouer.  

Pour procéder, nous sélectionnons des volumétries, nous optimisons le pipeline indépendemment pour chacun d'entre eux.
Les paramètres optimisés sauvegardés dans un tableau vont nous permettre de chercher une règle générale que l'on peut appeler heuristique.

#### Méthode pour trouver l'heuristique :

1.  Sélectionner avec précaution des scénarios d'exécution (volumétries, contextes, heures de lancement). Exemple :
    -   2Go, journée lambda entre 4 et 5h
    -   5Go, journée lambda entre 7h et 8h
    -   10Go, journée lambda entre 21h et 22h
    -   3Go : 1er jour du mois entre 3h et 4h
    -   10Go : 1er jour du mois entre 16h et 17h
    -   24Go : 1er jour du mois entre 23h et minuit
2.  Pour chacune de ces configurations
    1.  Effectuer une optimisation des ressources comme décrit ci-dessus (principalement `num-executors, executor-cores, executor-memory, spark.shuffle.partitions`)
        -   `num-executors` et `executor-cores` peuvent être notés sous la forme d'une seule configuration `(num-executors, executor-cores)`
    2.  Noter dans un tableau les résultats des métriques Total Uptime, Task Time, max Shuffle Spill Disk.
        -   Noter notamment la configuration optimale pour chacune des configurations.
3.  Pour chaque paramètre Spark à ajuster, afficher les valeurs de la configuration optimale en fonction de la volumétrie.
    -   Ex : pour num-executors (avec num-executors=5) , faire un graphe avec les configurations optimales obtenues suivantes (en abscisse : volumétrie, en ordonnée : num-executors) 
      
| Volumétrie (Go) | num-executors |
| --------------- | ------------- |
| 2               | 10            |
| 5               | 15            |
| 10              | 20            |
| 20              | 40            |

4.  Observer le lien de corrélation, les plafonds et les plateaux. Au mieux faire une régression.
5.  En déduire pour chacun des paramètres :
    -   une formule en fonction de la volumétrie ou d'autres paramètres pour le cas général
    -   une borne inférieure (si besoin)
    -   une borne supérieure (recommandée)
    -   une expression finale au format : `max(borne inférieure, min(borne supérieure, formule))`
        -   Ex : `maxExecutors = max(10, min(100, Volumétrie/(128Mo * 5))`

6. Mettre en place un mécanisme qui détecte la volumétrie en entrée et calcule les paramètres Spark adaptés.

Vous avez maintenant un outil super fit !

## Conclusion

L'idée à retenir dans cet article est que son application soit **smart**.

Normalement si vous avez suivi les deux articles, vous devriez avoir des gains de productivité intéressants !  

## Ressources

- [Data Mechanics Delight - better Spark UI](https://www.datamechanics.co/blog-post/building-a-better-spark-ui-data-mechanics-delight)
- [Dr. Elephant](https://www.databricks.com/fr/session/dr-elephant-for-monitoring-and-tuning-apache-spark-jobs-on-hadoop) : un ancien outil d'optimisation automatique
