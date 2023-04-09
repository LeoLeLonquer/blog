---
title: "Git worktree : se dénouer les branches" 
layout: post
tags: dev git 
category: dev
---

Git worktree est une commande intégrée à git qui permet d'associer un dossier à chaque branche. L'utilisation des branches est fluidifiée sur un repo local.
Le principal avantage est de pouvoir travailler sur plusieurs branches à la fois sans s'emmêler les pinceaux et sans avoir à dupliquer le repo initial.

<!--more-->

## Exemple whattimeisit

Jean-Eustache et moi travaillons sur le repo whattimeisit stocké sur Github composé des branches suivantes :

```md
+ dev
+ feature/timeinnanoseconds
+ feature/timeofyesterday
+ hotfix/timeinindia
* main
```

### Organisation de Jean-Eustache (sans git worktree) 👎

```txt
~/whattimeisit (branche feature/timeinnanoseconds)
```

Ici depuis son IDE, il change de branche pour travailler sur une nouvelle feature, sur un hotfix, ou pour aller voir main.  
Il n'oublie donc pas de commit tous ses fichiers avant de faire quelconque basculement de branche.  
Avant toute nouvelle création de branche, il n'oublie pas de switcher vers la bonne branche de départ 
sinon il retrouvera les commits de la branche sur laquelle il travaille dans la nouvelle branche alors que le travail n'est peut-être pas encore fini.

```bash
cd whattimeisit
git add .
git commit -m "Saving stuff because I need to fix time in gare montparnasse"
git switch dev
git switch -c hotfix/garemontparnasse
```

Jean-Eustache fout souvent le sbeul dans ses commits et ses branches, il a du mal à s'y retrouver.

### Organisation de moi (avec git worktree) 👍

```txt
~/whattimeisit                  (pas un dossier git)
├── dev                         (branche dev)
├── feature-timeinnanoseconds   (branche feature/timeinnanoseconds)
├── feature-timeofyesterday     (branche feature/timeofyesterday)
├── hotfix-timeinindia          (branche hotfix/timeinindia)
└── main                        (branche main et contient le .git)
```

Ici depuis mon IDE, j'ouvre un nouvel espace de travail sur chacun des nouveaux dossiers créés correspondant chacun à sa branche.  
Lorsque je souhaite créer une nouvelle branche ou récupérer une branche distante, j'utilise la commande `git worktree`.

```bash
cd whattimeisit/dev
git worktree add ../hotfix-garemontparnasse -b hotfix/garemontparnasse
cd ../hotfix-garemontparnasse
code . # ouverture de VScode depuis le dossier courant
```

C'est beaucoup plus difficile faire des bêtises, ça me permet d'être serein sur l'utilisation de git et de me concentrer sur la tâche à accomplir.

Voici les scénarios dans lesquels j'utilise la commande :

- travailler sur plusieurs features à la fois
- faire un hotfix sans devoir à la hâte commit ou stash sa branche de travail
- comparer deux branches l'une à l'autre
- ouvrir la branche d'un·e collègue pour lire son travail

## Désavantage

Le seul vrai désavantage est qu'il faut reconfigurer son IDE à chaque fois que l'on ouvre une nouvelle branche.  
Mais si l'on est un peu malin, on peut trouver des astuces pour compenser :

- avoir l'environnement de l'app dans un dossier mis en commun
- copier coller certains fichiers de configurations de l'IDE (des tests par exemple) de l'ancien dossier dans le nouveau
- ...

## Comment ça fonctionne

Je sais pas trop comment ça fonctionne. En tout cas, il n'existe qu'un seul dossier .git qui est celui initialisé dans le dossier créé au téléchargement du repo.  
Toutes les infos sur l'emplacement des branches sont stockées là. Par ce biais on évite de devoir télécharger ou copier un lourd dossier .git.

## Liste de commandes

Source : [git worktree tldr InBrowser.App](https://tldr.inbrowser.app/pages.fr/common/git-worktree)

> Gérer plusieurs arbres de travail attachés au même dépôt.
> Plus d'informations : [git-scm](https://git-scm.com/docs/git-worktree).
>
> - Créer un nouvel arbre de travail avec une branche spécifiée :
>
> `git worktree add <chemin/vers/répertoire> <branche>`
>
> - Créer un nouvel arbre de travail avec une nouvelle branche :
>
> `git worktree add <chemin/vers/répertoire> -b <nouvelle_branche>`
>
> - Répertorier tous les arbres de travail attachés à ce dépôt :
> 
> `git worktree list`
>
> - Supprimer les arbres de travail (après avoir supprimé les répertoires de travail) :
> 
> `git worktree prune`
