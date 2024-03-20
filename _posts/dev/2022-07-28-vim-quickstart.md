---
title: Vim Quickstart
layout: article
categories: vim ide dev
tags: full_post
---

Voici une petite liste des éléments que j'ai pu collecter sur Vim au cours du temps.  
Ceci vaut pour un clavier azerty.
<!--more-->

## Vim quickstart

### Ne pas utiliser de plugins !

- Vim peut faire 80% de ce que font les plugins de base.
- c'est long et difficile à installer
- ce n'est pas portable
- ça fait prendre de mauvaises habitudes si jamais on rencontre un Vim non configuré
- ça ralentit vim

### Apprendre par étape

- Utiliser la souris ou les flèches directionnelles si besoin.
- Faire comme on peut et noter ce qu'on aimerait faire.  

### Ne pas se focaliser sur les touches

- globalement les touches sont peu efficaces (même pour le déplacement) ex : pour quitter `Esc :wq` ???  
- plein de trucs inutiles ou pas adaptés au clavier AZERTY

### Les touches basiques importantes:  

- Mouvement : `w b e ^ 0 $ ( )`
- Insertion : `i I a A c C o O`  
- Suppression et copie : `d y p`  

 Vim est un langage dont on compose les actions, la syntaxe est : `[nb][cmd][opt][mvt]`

### Copier coller couper

`yiw` copier le mot sous le curseur  
`diw` couper le mot sous le curseur  
`yy` copier la ligne  
`dd` couper la ligne  
`yt"` (ou `yf"`) copier jusqu'à `"` non inclu (t=untill=non inclu, f=find=inclu)  
`p` coller avant le curseur  
`P` coller après le curseur  

### Les mouvements utiles

`G` aller tout en bas  
`gg` aller tout en haut  
`/` rechercher une chaîne  
`?` rechercher une chaîne de bas en haut  
`n p` next et precedent dans une recherche  

### Utiliser les touches magiques :

`.` re-éxécute l'action précédente  
`*` cherche le mot sous le curseur  
`<Ctrl-n>` complète le mot courant  
`<Ctrl-x> + f` complète le path d'un fichier  
`' '` position précédente  
`q` et `@` pour macros  
`gd` pour aller à la définition de la variable sous le curseur  
`gf` pour ouvrir le fichier sous le curseur  
`:g/pattern/d` supprimer toutes les lignes contenant un certain pattern (`p` pour afficher)  
  
La liste des commandes commençant par `g` est intéressante autant que celle des `Ctrl`

### Les modes visuel, ligne visuel et bloc

Permet de copier/sélectionner plusieurs caractères à la fois, soit par ligne, soit par bloc.  
visuel : `V`  
ligne visuel : `<Shift-V>`  
bloc : `<Ctrl-V>`  

### Ouvrir plusieurs fichiers à la fois  

- utiliser les buffers (`:ls :b`) : parcourir les fichiers déjà ouverts  
- utiliser les splits (ou windows) (`:vsp :sp`) : diviser l'écran  
- utiliser les tabs : créer différentes vues  
- `<Ctrl-w> + flèche` pour changer de split  

### Configurer sobrement son `.vimrc`  

- plein de réglages très simples qui facilite la vie  
- possibilité de giter le fichier  
- exemple : [mon vimrc](https://github.com/LeoLeLonquer/Working-Setup/blob/master/.vimrc)
  
### Copier/coller depuis l'extérieur de Vim est compliqué. (Vim meilleur éditeur du monde)

 `:set paste` pour éviter les indentations automatiques au collage puis coller comme dans un terminal (`<Ctrl-shift-V>`)  

### Penser à utiliser `vimdiff`

Permet de comparer deux fichiers côte à côte et de les éditer en même temps.  

### Utiliser un multiplexeur de terminal éventuellement (exemple : `tmux`)

- laisse la session sur le serveur ouverte même en fermant la connexion ssh.    
- permet d'avoir autant de terminaux que souhaités.  

### Conférence Vim Workflow

 {% include embed.html url="https://www.youtube.com/embed/77RFt4U4A7Q" %}

### How to Do 90% of What Plugins Do (With Just Vim) :

 {% include embed.html url="https://youtube.be/embed/XA2WjJbmmoM" %}

### Autres

Et malgré la propagande, Vim n'est peut-être pas le meilleur éditeur pour le langage utilisé, mieux  vaut peut-être utiliser un IDE (VisualStudioCode est vraiment pas mal),  au besoin installer un plugin vim pour  parfois utiliser les outils très pratiques d'édition comme le mode bloc  (au passage configurer avec un raccourci clavier  l'activation/désactivation du plugin).
