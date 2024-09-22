---
layout: article
category: dev
tags:
  - full_post
title: Ecrire un blog pour 0€
---

Voici comment j'ai écrit mon blog pendant mon voyage sans sortir un seul euro de ma poche !

![Liste des technos](https://i.ibb.co/YXhYQ1q/techno3.jpg)
_Reconnaîtrez-vous les logos ?_

<!--more-->

Pour créer ce blog et trouver la manière de le peupler, j'ai un peu tâtonné. Si j'avais voulu faire un simple blog de voyage, j'aurais sans doute utiliser [polarsteps](https://www.polarsteps.com/). Si j'avais voulu créer un simple blog de développeur, j'aurais utilisé [Medium](https://medium.com/), [dev.to](https://dev.to) ou [Hashnode](hashnode.com). Mais c'eût été mal me connaître. 

Je veux un endroit unique où je peux gérer à la fois le design et le contenu, la forme et le fond. (C'est mon approche moniste)

En somme j'ai besoin d'un système simple, flexible, portable, ouvert et gratuit.

Pour être succinct pour les connaisseurs, j'ai utilisé GithubPages. Voici le reste des technos adjacentes :


## Le design

Première étape indispensable, le design, c'est à dire à quoi je veux que mon site ressemble. Vu que je me connais et que si j'avais fait moi-même le design, j'aurais terminé avec des couleurs [caca d'oie](https://fr.wikipedia.org/wiki/Caca_d%27oie), j'ai donc préféré m'en remettre à des professionnels. J'ai cherché pas mal et finalement je me suis inspiré du thème [Leap Day](https://github.com/pages-themes/leap-day) proposé par GithubPages qui est simple et dont je peux lire le code. Bon finalement je suis retombé sur la couleur caca d'oie.

Note importante : la qualité du design d'un site web d'un développeur n'est pas corrélé à la qualité du développeur. Exemple [ici](https://www.brendangregg.com/overview.html) et [là](https://bloggingfordevs.com/trends/).

## Le code

J'ai voulu faire à la main, donc forcément [HTML](https://developer.mozilla.org/fr/docs/Learn/Getting_started_with_the_web/HTML_basics) + [CSS](https://developer.mozilla.org/fr/docs/Learn/Getting_started_with_the_web/CSS_basics). J'ai appris avec l'excellent tuto [Créez votre site web avec HTML5 et CSS3](https://openclassrooms.com/fr/courses/1603881-creez-votre-site-web-avec-html5-et-css3) d'OpenClassroom. J'ai basculé de CSS à [Sass](https://sass-lang.com/) qui est juste plus concis.

- La combinaison HTML+Sass me permet d'implémenter le design.
- Le format [Markdown](https://www.markdownguide.org/getting-started/) me permet d'écrire mes textes en texte brut (sans format propriétaire ou chiffré) tout en ayant une mise en forme basique.

## L'édition

Pour écrire j'ai utilisé [Obsidian](https://obsidian.md/), l'outil que j'utilise aujourd'hui pour ma prise de notes au quotidien. Je recommande à tout le monde même les non développeurs ! Il permet d'éditer des fichiers au format brut Markdown, en utilisant la syntaxe du même nom et d'avoir un rendu visuel immédiat. Je peux voir les images, les éléments en LaTeX directement.

De plus, il peut interpréter du HTML-CSS donc on peut faire des mises en forme impossibles à faire en Markdown seul. On peut y inclure toutes sortes de petits éléments HTML-CSS en plus (les cartes OpenStreetMap, Google Maps, les éléments Deezer etc.).

Bref, j'ai une image très proche de ce à quoi ma page va ressembler avant d'être publiée.

Obsidian est largement disponible sur Windows, Mac, Linux, Apple, Androïd.

## L'hébergement

Droit au but, j'ai utilisé [GitHub Pages](https://pages.github.com/), ça conditionnera à git et Jekyll. L'hébergement est gratuit, ils fournissent une URL accessible sur internet, et je peux configurer un nom de domaine, à la condition que j'en achète un. Sauf que j'ai pas envie d'y mettre les sous.

Les fichiers sont évidemment stockés sur [Github](https://github.com/).

## Le versionnement

Forcément [git](https://git-scm.com/). Je pense que [Wordpress](https://fr.wordpress.org/) propose des solutions  pour le versionnement également, mais l'outil requiert une base de données et d'autres trucs. Là, j'ai tous mes fichiers HTML-CSS et Markdown qui font la base de mon site et que je peux lire et éditer avec n'importe quel éditeur de texte.

## Générateur de site web statique

 [GitHub Pages](https://pages.github.com/) requiert l'utilisation de [Jekyll](https://jekyllrb.com/)  pour les sites web les plus simples. Encore une fois je suis allé au plus simple, c'est ce que j'ai utilisé. Par contre, si on débloque les [Github Actions](https://docs.github.com/en/actions), je pense qu'on peut utiliser à peu près n'importe quel générateur de site web statique.

Jekyll est assez facile à utiliser. Je ferai cependant un reproche au langage de templating [Liquid](https://shopify.github.io/liquid/) qui est assez opaque : il est difficile de tester simplement les sorties (j'ai sûrement du rater un truc).

## La mise à jour

Vu que j'ai tous mes fichiers à plat sur mon téléphone et que l'application [Github Mobile](https://docs.github.com/fr/get-started/using-github/github-mobile)(👎 application de flic, je hais la double authent) ne permet pas l'édition ou la synchronisation des repos sur téléphone, j'ai du passer par [Termux](https://termux.dev/en/), un terminal sur Androïd, puis [installer git sur termux](https://www.techrepublic.com/article/how-to-install-git-on-android/). Il fallait donc qu'à chaque fois que je souhaite publier une modification faire le triptique `git add . && git commit -m "Blog Update" && git push`.

J'aurais bien aimé utiliser [Git for Obsidian](https://github.com/denolehov/obsidian-git), mais ça buggait sur mobile malheureusement.

## Les images

Pour le **stockage**, j'ai utilisé [imgbb](https://leoluoleke.imgbb.com/), c'est un service d'hébergement d'images gratuit, on peut théoriquement en déposer à l'infini. Il me permet d'avoir un accès direct à l'image et pas à un un outil de visualisation. Je réfléchis à passer à un autre service, parce que je le trouve un peu lent, les images prennent pas mal de temps à charger.

Pour **réduire la taille des images**, j'ai utilisé [litPhoto](https://litphoto-compress-resize.fr.softonic.com/android) sur Android, très pratique, il permet de remplacer toutes les images sur votre album par leur équivalente compressée. On peut facilement diviser par 10 la taille des images sans que la qualité soit détectable à l'œil nu pour une visualisation sur ordinateur ou téléphone. (Ok si vous zoomer, ça baisse la qualité)

Pour **l'édition**, j'ai utilisé [Canva](https://www.canva.com/) ou l'éditeur de photos de mon tel. Gros défaut de Markdown, c'est assez compliqué de mettre deux photos côte à côte proprement (et plus généralement de créer des colonnes dans un texte, il faut un peu tricher). Donc j'ai fait des vieux collages en redimensionnant les photos au besoin, c'est pas la partie dont je suis le plus fier. (j'aimerai ajouter des carousels)

## Les vidéos 

Bon vieux [Youtube](https://www.youtube.com/watch?v=HBfy_kjkt4I&pp=ygUKY2hhdCBuaW5qYQ%3D%3D). Le stockage est infini. [Certains](https://hackaday.com/2023/02/21/youtube-as-infinite-file-storage/) l'utilisent comme outil de stockage pour fichiers.







