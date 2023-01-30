---
title: "Spark 2.x : Méthodologie d'optimisation des jobs" 
layout: post
tags: dev spark tuning 
category: dev
---
## Métrique temps CPU

Dans le contexte d'un cluster, la métrique générale qui permet d'identifier les charge des jobs est le temps CPU cumulé.  
Un cluster à 100 machines possédant chacune 4 coeurs peut être associée à une machine de 400 coeurs.  
Sur 1 journée, les 400 coeurs peuvent donc produire  24 \* 400 = 9600 heures de traitement.  
Ces 9600 heures de traitement sont notre ressources à partager entre nos utilisateurs et nos traitements.  

Les fournisseurs de PaaS comme GCP et AWS peuvent prendre comme mesure de facturation le temps de traitement CPU ou la quantité de données stockées sur disque.

<!--more-->
## Méthode pour un traitement d'enrichissement

On suppose que l'on n'utilise que les DataFrames ici.

### Récupérer du contexte

- Faire un schéma du traitement global (utiliser par exemple : [Diagon](https://arthursonzogni.com/Diagon/))
- Récupérer la taille des données d'entrée:
  - données lues
  - données utiles (données après filtrage)
  - données de jointure
- Faire une liste des temps de traitement actuel (sur le pas le plus important de préférence)
  - Récupérer les métriques Uptime (page Jobs) et TaskTime (page Executors)
  - Si une application a plusieurs Jobs, récupérer les temps de traitement de chacun des jobs

#### Exemple

##### Schéma des traitements

```
┌─────────────┐┌──────────────┐┌─────────┐┌───────┐┌───────────────┐┌───────┐┌────────┐┌──────┐
│tableA1      ││tableA2       ││ref1     ││ref2   ││ref2           ││ref3   ││ref4    ││ref5  │
└┬────────────┘└┬─────────────┘└┬────────┘└┬──────┘└┬──────────────┘└┬──────┘└┬───────┘└┬─────┘
┌▽─────────────▽┐              │          │        │                │        │         │      
│tableAUnion     │union         │          │        │                │        │         │      
└┬───────────────┘              │          │        │                │        │         │      
┌▽─────────────────────────────▽──────────▽────────▽────────────────▽────────▽─────────▽┐     
│tableAJoinDF                                                                            │join     
└┬───────────────────────────────────────────────────────────────────────────────────────┘     
┌▽────────┐                                                                                    
│tableADF │                                                                                    
└┬────────┘                                                                                    
┌▽──────┐                                                                                      
│finalDF│                                                                                      
└───────┘
```

##### Chemin données

- Entrées
  - ofr
    - `db1.tableA1`
    - `/apps/hive/warehouse/db1.db/tableA1`
  - mvnolight
    - `db2.tableA2`
    - `/apps/hive/warehouse/db2.db/tableA2`
- Sortie
  - `/user/leo/agreg/tableA/date=2022-07-01`

##### Volumétrie

Sur un mois :

```txt
... = /apps/hive/warehouse/db1.db/tableA1
921.7 G  2.7 T    .../date_part=2022-07-01
498.9 G  1.5 T    .../date_part=2022-07-02
423.5 G  1.2 T    .../date_part=2022-07-03
198.4 G  595.3 G  .../date_part=2022-07-04
173.3 G  519.9 G  .../date_part=2022-07-05
291.1 G  873.3 G  .../date_part=2022-07-06
296.6 G  889.8 G  .../date_part=2022-07-07
292.6 G  877.9 G  .../date_part=2022-07-08
267.3 G  802.0 G  .../date_part=2022-07-09
263.8 G  791.3 G  .../date_part=2022-07-10
288.5 G  865.4 G  .../date_part=2022-07-11
309.4 G  928.2 G  .../date_part=2022-07-12
305.4 G  916.2 G  .../date_part=2022-07-13
295.2 G  885.6 G  .../date_part=2022-07-14
304.0 G  912.0 G  .../date_part=2022-07-15
286.0 G  858.0 G  .../date_part=2022-07-16
185.1 G  555.4 G  .../date_part=2022-07-17
```

Sur une journée (ici en sortie) :

```txt
... = /apps/hive/warehouse/db1.db/tableA1
9.6 G   28.7 G  .../date=2022-07-19/0000
6.5 G   19.5 G  .../date=2022-07-19/0100
3.9 G   11.6 G  .../date=2022-07-19/0200
2.9 G   8.7 G   .../date=2022-07-19/0300
1.6 G   4.9 G   .../date=2022-07-19/0400
1.7 G   5.0 G   .../date=2022-07-19/0500
2.8 G   8.4 G   .../date=2022-07-19/0600
4.8 G   14.3 G  .../date=2022-07-19/0700
6.9 G   20.6 G  .../date=2022-07-19/0800
7.8 G   23.4 G  .../date=2022-07-19/0900
8.2 G   24.5 G  .../date=2022-07-19/1000
7.9 G   23.8 G  .../date=2022-07-19/1100
8.2 G   24.5 G  .../date=2022-07-19/1200
8.6 G   25.8 G  .../date=2022-07-19/1300
8.3 G   24.8 G  .../date=2022-07-19/1400
8.4 G   25.2 G  .../date=2022-07-19/1500
8.2 G   24.6 G  .../date=2022-07-19/1600
8.6 G   25.7 G  .../date=2022-07-19/1700
9.0 G   27.0 G  .../date=2022-07-19/1800
9.7 G   29.2 G  .../date=2022-07-19/1900
10.7 G  32.1 G  .../date=2022-07-19/2000
10.7 G  32.1 G  .../date=2022-07-19/2100
9.1 G   27.2 G  .../date=2022-07-19/2200
8.3 G   24.9 G  .../date=2022-07-19/2300
```

##### Volumétrie table de jointure

| **Table**    | **Path Hdfs vers partition Hive**                                                                    | **Taille données sur disque(sérialisées)** | **Estimation Taille données en mémoire (déserialisées)** |
| ------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| ref1      | /apps/hive/warehouse/ref.db/ref1/000000_0 | 20.7 K                                     | 62.0 K                                                   |
| ref2        | /user/leo/ref/ref2.csv                                                    | 3.8 K                                      | 11.5 K                                                   |
| ref3 | /user/leo/ref/ref3.csv                             | 65.1 K                                     | 195.2 K                                                  |
| ref4        | user/leo/ref/ref4/date=2022-07-28                                               | 47.1 M                                     | 141.4 M                                                  |
| ref5      | /user/leo/ref/ref5/date=2022-07-28_1200                                          | 872.4 M                                    | 2.6 G                                                    |
| ref6    | /user/leo/ref/ref6/date=2022-07-28                                             | 1.1 G                                      | 3.3G                                                         |

##### Temps de traitement

Pour le step 2100

| Date(2022-08) | Duration application | Duration job1 | Duration job2 | Task time |
| ------------- | -------------------- | ------------- | ------------- | --------- |
| 29            | 19min                | 14min         | 27s           | 8.3h      |
| 30            | 30min                | 8.1min        | 20min         | 7.2h      |
| 31            | 13min                | 9.2min        | 1.5min        | 8.4h          |

### Optimisation code et configuration

#### Liste ordonnée des optimisations

1. Supprimer les transformations de type wide (qui produisent du shuffle) autant que possible (.repartition, jointures inutiles)
    - [Shuffle operations](https://spark.apache.org/docs/latest/rdd-programming-guide.html#shuffle-operations)
2. Supprimer les actions qui produisent des jobs autant de possible (ex: .count() pouvant être réunies)
    - [List of actions](https://spark.apache.org/docs/latest/rdd-programming-guide.html#actions)
3. Identifier les tables lues deux fois (par exemple les tables de traitement sur lesquels on fait un .count()) et ajouter un .cache()
4. Résoudre les jointures de données asymétriques : voir la section ci-dessous
5. Remplacer au maximum les UDFs par des méthodes internes Spark.
6. Identifier les tables qui peuvent être broadcastées pour la jointure (tables <250Mo)
    - note : les tables < 10Mo sont broadcastées par défaut grâce à l'option `spark.sql.autoBroadcastJoinThreshold`
7. Ajouter la sérialisation Kryo si elle n'est pas activée
8. Ajouter les valeurs recommandées suivantes dans le workflow.xml ou spark2Job.sh :  

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
SELECT `lac`, COUNT(`lac`) as occurence FROM noria GROUP BY `lac` ORDER BY occurence DESC LIMIT 10;
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

#### Saturer en exécuteurs

Dans un premier temps, nous allons saturer en exécuteurs le job en lui attribuant autant d'exécuteurs que nécessaire ou plus.  
Deux solutions :

1. A partir de la taille des données lues, évaluer le nombre de partitions au total (c'est à dire le parallélisme maximum) et attribuer autant de cores.
    - ex : 12Go de données à lire, taille de partition HDFS = 120Mo donc nombre de partitions au total = 100. Donc par exemple executor-cores=4 et num-executor=25.
    - désavantage : si la donnée en entrée n'est pas réunie dans des gros fichiers HDFS mais dans des petits, on pourra avoir plus de partitions au total dans la réalité
2. Activer l'allocation dynamique, lancer un job et noter le nombre d'exécuteurs alloués. Fixer le nombre d'exécuteurs du job avec cette valeur par la suite.
    - Utiliser les valeurs suivantes :

```sh
num-executor=1 # (se baser sur le nombre de partitions du pas le plus faible de la journée divisé par executor-cores)
executor-cores=5
spark.dynamicAllocation.executorIdleTimeout=120s  
spark.dynamicAllocation.cachedExecutorIdleTimeout=180s
spark.dynamicAllocation.executorAllocationRatio=0.5
spark.dynamicAllocation.schedulerBacklogTimeout=1s # valeur à ajuster
spark.dynamicAllocation.minExecutors=0
spark.dynamicAllocation.maxExecutors # assigner une valeur très importante au début
```

#### Saturer en _spark.shuffle.partitions_

A partir de la charge utile, on peut estimer le nombre de partitions nécessaires.  
**Exemple :**  
Si la charge utile (en entrée) est de 14,3Go et que l'on souhaite avoir des partitions de taille spécifiques :

| partition_size | spark.shuffle.partitions |
| -------------- | ------------------------ |
| 100mo          | 143                      |
| 150mo          | 95                       |
| 200mo          | 71                         |

Trouver une première valeur de _spark.shuffle.partitions_ intéressante

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

Tout d'abord activer l'allocation dynamique si cela n'a pas été fait auparavant.  
Pour ajuster _spark.dynamicAllocation.maxExecutors_ et _executor-cores_

- Utiliser la nouvelle valeur de _spark.shuffle.partitions_
- Assigner à spark.dynamicAllocation.maxExecutors une valeur faible, faire un test en collectant Total Uptime, durées des jobs, Task Time
- Augmenter la valeur petit à petit jusqu'à attendre un palier de temps de traitement
- Choisir la première valeur atteignant le palier
- Exemple de table de résultat :

<div class="overflow-x-auto" markdown="1">

| Total cores | num-executor | executor-cores | Total Uptime | Duration orc | Duration count | Task Time | Locality Level (Any; Node local; Rack Local) |
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
- Augmenter _spark.shuffle.partitions_ (en priorité) et executor-memory petit à petit jusqu'à ce que Shuffle Spill (Disk) disparaisse
- De préférence `spark.shuffle.partitions = spark.dynamicAllocation.maxExecutors x executor-cores x n` , où n est un entier, pour maximiser le parallélisme  

 **Important :** Vérifier que le GC fonctionne correctement depuis la page Executors (avoir un minimum de cases GC rouges sur les exécuteurs)

#### Ajuster pour des volumétries variables

Le pipeline peut avoir des tailles de données variable.  
Le mieux est de produire un modèle qui nous permet de calculer pour chaque volumétrie, le nombre de ressource à allouer.  
En gros, on sélectionne des volumétries, on optimise le pipeline indépendemment pour chacun d'entre eux, on note les valeurs trouvées dans un tableau, et on tente de trouver une règle pour chacune des valeurs trouvées. Ne pas oublier de mettre un min max à chaque fois.
