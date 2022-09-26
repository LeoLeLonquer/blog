---
title: "Spark (2.x): Méthodologie d'optimisation des jobs" 
layout: post
tags: dev spark tuning 
category: dev
---
## Métrique temps CPU
Dans le contexte d'un cluster, la métrique générale qui permet d'identifier les charge des jobs est le temps CPU cumulé. 
Un cluster à 100 machines possédant chacune 4 coeurs peut être associée à une machine de 400 coeurs. 
Sur 1 journée, les 400 coeurs peuvent donc produire  24 \* 400 = 9600 heures de traitement.
Ces 9600 heures de traitement sont notre ressources à partager entre nos utilisateurs et nos traitements.

Les fournisseurs de PaaS comme GCP et AWS prennent comme mesure de facturation le temps de traitement CPU. 

<!--more-->
## Méthode pour un traitement d'enrichissement
On suppose que l'on n'utilise que les DataFrame ici.

### Récupérer du contexte
- Faire un schéma du traitement global (utiliser par exemple : arthursonzogni.com/Diagon/#GraphDAG)
- Récupérer la taille des données d'entrée:
	- données lues
	- données utiles (données après filtrage)
	- données de jointure
- Faire une liste des temps de traitement actuel (sur le pas le plus important de préférence)
	- Récupérer les métriques Uptime (page Jobs) et TaskTime (page Executors)
	- Si une application a plusieurs Jobs, récupérer les temps de traitement de chacun des jobs

### Optimisation code et configuration
#### Liste ordonnée des optimisations
1. Supprimer les transformations de type wide (qui produisent du shuffle) autant que possible (.repartition, jointures inutiles)
	- [Shuffle operations](https://spark.apache.org/docs/latest/rdd-programming-guide.html#shuffle-operations)
2. Supprimer les actions qui produisent des jobs autant de possible (ex: .count() pouvant être réunies)
	- [List of actions](https://spark.apache.org/docs/latest/rdd-programming-guide.html#actions)
3. Identifier les tables lues deux fois (par exemple les tables de traitement sur lesquels on fait un .count()) et ajouter un .cache()
4. Résoudre les jointures de données asymétriques : voir la section ci-dessous
5. Identifier les tables qui peuvent être broadcastées pour la jointure (tables <250Mo)
	- note : les tables < 10Mo sont broadcastées par défaut grâce à l'option `spark.sql.autoBroadcastJoinThreshold`
6. Ajouter la sérialisation Kryo si elle n'est pas activée
7. Ajouter les valeurs recommandées suivantes dans le workflow.xml ou spark2Job.sh :  

```xml
--conf spark.shuffle.file.buffer=1M 
--conf spark.file.tranferTo=false
--conf spark.shuffle.unsafe.file.output.buffer=1M  
--conf spark.io.compression.lz4.block.Size=512k  
--conf spark.shuffle.registration.timeout=120000

<!--  Seulement lorsque la mémoire de l'exécuteur ou du driver est inférieure à 32Go  -->  
--conf spark.executor.extraJavaOptions="-XX:+UseCompressedOops"  
--conf spark.driver.extraJavaOptions="-XX:+UseCompressedOops"
```

#### Résoudre les jointures de données asymétriques :
##### Identification
1. A partir du Spark HS, sélectionner une application du contexte qui a tourné en production. 
2. Pour le job principal, **pour chacun de ses stages**, vériifier dans le tableau "Summary Metrics" que "Duration median" et "Duration 75th Percentile" sont proches de "Duration Max".
	- Si la différence est importante (>x1,5), c'est que certainement une jointure avec des données asymétriques (skewed data) a eu lieu. 
	- On peut retrouver la tâche qui a eu le plus de travail dans le tableau des tâches
3. Retrouver à partir de la page SQL à quelles tables correspondent les jointures de données asymétriques
4. Si besoin, identifer les valeurs des champs de jointure qui sont les plus fréquentes 
	- Ex de requête d'identification : 
```sql
`SELECT `lac`, COUNT(`lac`) as occurence FROM noria GROUP BY `lac` ORDER BY occurence DESC LIMIT 10;`
```
		
##### Résolution 
Se référer au tableau des données d'entrée.
- Si la table est petite (<250Mo) : utiliser un broadcast join
- Si la table est importante (>250Mo), utiliser au choix : 
	- un salted join : [Handling Data Skew](https://itnext.io/handling-data-skew-in-apache-spark-9f56343e58e8) 
	- une jointure en deux étapes, en séparant la table :
		1. BroadcasHashJoin sur les valeurs fréquentes de la table
		2. Join classique sur les autres valeurs

### Optimisation des ressources
#### Activer l'allocation dynamique
Activer l'allocation dynamique avec les valeurs suivantes   
- num-executor=1 (se baser sur le nombre de partitions du pas le plus faible de la journée divisé par executor-cores)
- executor-cores=5
- spark.dynamicAllocation.executorIdleTimeout=120s  
- spark.dynamicAllocation.cachedExecutorIdleTimeout=180s
- spark.dynamicAllocation.executorAllocationRatio=0.5
- spark.dynamicAllocation.schedulerBacklogTimeout=1s : valeur à ajuster 
- spark.dynamicAllocation.minExecutors=0
- spark.dynamicAllocation.maxExecutors : assigner une valeur importante au début, sera configuré plus tard
	
#### Evaluer _spark.shuffle.partitions_ 
A partir de la charge utile, on peut estimer le nombre de partitions nécessaires.  
**Exemple :** 
Si la charge utile (en entrée) est de 14,3Go et que l'on souhaite avoir des partitions de taille spécifiques :

| partition_size | spark.shuffle.partitions |
| -------------- | ------------------------ |
| 100mo          | 143                      |
| 150mo          | 95                       |
| 200mo          | 71                         |


Trouver une première valeur de spark.shuffle.partitions intéressante
- Choisir une première valeur faible, faire un test noter le Total Uptime, durées des jobs, Task Time
- Augmenter la valeur précédente (x1,5 ou +25 ou +50...) jusqu'à ce que les performances ne soient plus améliorées
- Choisir la première valeur qui atteint le palier
- Exemple de table de résultat :

<div class="overflow-x-auto" markdown="1">

| spark.shuffle.partitions | Total Uptime | Duration orc | Duration count | Task Time |
| ------------------------ | ------------ | ------------ | -------------- | --------- |
| 5                        | 1.3min       | 23s          | 5s             | 6.9min    |
| 10                       | 1.6min       | 32s          | 7s             | 7.2min    |
| 20                       | 1.2min       | 36s          | 6s             | 7.0min    |

</div>

#### Ajuster _spark.dynamicAllocation.maxExecutors_ et _executor-cores_
Pour ajuster _spark.dynamicAllocation.maxExecutors_ et _executor-cores_
- Utiliser la nouvelle valeur de _spark.shuffle.partitions_
- Assigner à spark.dynamicAllocation.maxExecutors une valeur faible, faire un test en collectant Total Uptime, durées des jobs, Task Time
- Augmenter la valeur petit à petit jusqu'à attendre un palier de temps de traitement
- Choisir la première valeur atteignant le palier
- Exemple de table de résultat :

<div class="overflow-x-auto" markdown="1">

| Total cores | num-executor | executor-cores | Total Uptime | Duration orc | Duration count | Task Time | Locality Level <br/>(Any; Node local; Rack Local) |
| ----------- | ------------ | -------------- | ------------ | ------------ | -------------- | --------- | -------------------------------------------- |
| 5           | 1            | 6              | 1.4min       | 6s           | 46s            | 3.0min    | 86;2;9                                       |
| 6           | 2            | 3              | 1.4min       | 5s           | 44s            | 2.8min    | 85;1;11                                      |
| 9           | 3            | 3              | 1.2min       | 5s           | 35s            | 3.6min    | 74;0;23                                      |
| 24          | 8            | 3              | 1.4min       | 5s           | 24s            | 4min      | 28;2;67                                      |

</div>

#### Ajuster la mémoire allouée
 Pour ajuster la mémoire allouée
- Faire un premier test avec toutes les nouvelles configurations ajoutées
- Dans le Spark HS, **en regardant chacun des stages**, noter la valeur max de "Shuffle Spill (Disk)" (Si la valeur n'apparaît pas dans la page d'un stage, c'est que la valeur est nulle)
- Augmenter spark.shuffle.partitions (en priorité) et executor-memory petit à petit jusqu'à ce que Shuffle Spill (Disk) disparaisse 
- De préférence spark.shuffle.partitions = spark.dynamicAllocation.maxExecutors x executor-cores x n , où n est un entier, pour maximiser le parallélisme  

 **Important :** Vérifier que le GC fonctionne correctement depuis la page Executors (avoir un minimum de cases GC rouges sur les exécuteurs)

