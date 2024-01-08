---
title: "Git worktree : se dénouer les branches" 
layout: post
tags: dev git 
category: dev
---

Git worktree est une commande intégrée à git qui permet d'associer un dossier à chaque branche. L'utilisation des branches est fluidifiée sur un repo local.
Le principal avantage est de pouvoir travailler sur plusieurs branches à la fois sans s'emmêler les pinceaux et sans avoir à dupliquer le repo initial.

<!--more-->

Voici les scénarios dans lesquels j'utilise la commande :

- travailler sur plusieurs features à la fois
- faire un hotfix sans devoir à la hâte commit ou stash sa branche de travail
- comparer deux branches l'une à l'autre
- ouvrir la branche d'un·e collègue pour lire son travail

C'est beaucoup plus difficile faire des bêtises, ça me permet d'être serein sur l'utilisation de git et de me concentrer sur la tâche à accomplir.
## Exemple whattimeisit

Jean-Eustache et moi travaillons sur le repo whattimeisit stocké sur Github composé des branches suivantes :

```md
+ dev
+ feature/timeinnanoseconds
+ feature/timeofyesterday
+ hotfix/timeinindia
* main
```

## Organisation de Jean-Eustache (sans git worktree) 👎

```txt
~/whattimeisit (branche feature/timeinnanoseconds)
```

Ici depuis son IDE, il change de branche pour travailler sur une nouvelle feature, sur un hotfix, ou pour aller voir main.  
Il n'oublie donc pas de commit tous ses fichiers avant de faire quelconque basculement de branche.  
Avant toute nouvelle création de branche, il n'oublie pas de switcher vers la bonne branche de départ sinon il retrouvera les commits de la branche sur laquelle il travaille dans la nouvelle branche alors que le travail n'est peut-être pas encore fini.

```bash
cd whattimeisit
git add .
git commit -m "Saving stuff because I need to fix time in gare montparnasse"
git switch dev
git switch -c hotfix/garemontparnasse
```

Jean-Eustache fout souvent le sbeul dans ses commits et ses branches, il a du mal à s'y retrouver.

## Organisation de moi 👍 
_Mis à jour le 08/02/2024_

```txt
~/whattimeisit                  (contient le dossier .git)
├── dev                         (branche dev)
├── feature-timeinnanoseconds   (branche feature-timeinnanoseconds)
├── feature-timeofyesterday     (branche feature-timeofyesterday)
├── hotfix-timeinindia          (branche hotfix-timeinindia)
└── main                        (branche main)
```

A chaque dossier correspond sa branche !
Lorsque je souhaite créer une nouvelle branche ou récupérer une branche distante, j'utilise la commande `git worktree`.

## Comment l'utiliser ??? 
### Cloner depuis un repo existant

```bash
mkdir whattimeisit
cd whattimeisit
# Faire de whattimeisit un repo dépouillé (sans être rattaché à une branche/sans avoir de copie de travail)
git clone --bare https://github.com/monuser/whattimeisit.git .git

# Vérfier que la copie est bien effectuée
ls -a
#> .git
git branch
#> * main
#> dev
#> feature-timeinnanoseconds
#> ...

git worktree add main
cd main
git status
#> Sur la branche main
# idem pour chacune des branches (attention à bien séectionner whattimeisit comme répertoire parent)
```

### Créer un repo

```bash
mkdir -p whattimeisit/.git
cd whattimeisit/.git
# Faire de whattimeisit un repo dépouillé (sans être rattaché à une branche/sans avoir de copie de travail)
git init --bare

cd ..
git worktree add main -b main
```

### Switcher de branche

Créer une nouvelle branche à partir de la branche `dev`
```bash
cd whattimeisit/dev
git worktree add ../hotfix-garemontparnasse -b hotfix-garemontparnasse
#> Préparation de l'arbre de travail (nouvelle branche 'hotfix-garemontparnasse')
#> HEAD est maintenant à d81d55b Dernier commit de dev

cd ../hotfix-garemontparnasse
git status 
#> Sur la branche hotfix-garemontparnasse
```

## Désavantages

Le seul vrai désavantage est qu'il faut reconfigurer son IDE à chaque fois que l'on ouvre une nouvelle branche.  
Mais si l'on est un peu malin, on peut trouver des astuces pour compenser :

- avoir l'environnement de l'app dans un dossier mis en commun
- copier coller certains fichiers de configurations de l'IDE (des tests par exemple) de l'ancien dossier dans le nouveau
- Ouvrir le dossier parent à tous les dossiers-branche (marche bien dans VSCode, peut-être moins dans Intellij ou PyCharm)
- ...

Sinon un autre désavantage, mais franchement ça va, si on utilise une convention de nommage de branche utilisant des `/` (ex: `feature/timeinnanoseconds`) alors on peut éventuellement confondre avec les dossiers. En vrai, il suffit de remplacer les slashs par des tirets ou autre à la création du dossier (ex: `git worktree add ../feature-timeinnanoseconds feature/timeinnanoseconds`) 
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
