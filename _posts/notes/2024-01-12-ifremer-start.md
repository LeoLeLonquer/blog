---
title: Mes nouveaux débuts à Ifremer
layout: post
tags:
  - notes
category: notes
image: https://i.ibb.co/RP0hb5C/leverdesoleil.jpg
---

Quand on me demande mon travail à une soirée, j'explique que je bosse en temps qu'ingénieur informaticien à l'Ifremer, l'institut qui a inventé les surimis. Généralement, ça met des étoiles dans les yeux. ¹

En ce début de l'an de grâce 2024, j'ai envie de vous expliquer mon nouveau travail. En plus, j'ai passé ma période d'essai donc plus rien ne me retient, les rênes sont lâchés, je suis en roue libre.

![vue de mon bureau](https://i.ibb.co/RP0hb5C/leverdesoleil.jpg)
_Lever de soleil depuis mon bureau (faut que je me lève)_

<!--more-->

J'ai commencé le 4 septembre 2023 à l'Ifremer dans un un nouveau poste intitulé "Ingénieur Cloud pour la Science". A vrai dire, si vous m'aviez demandé 4 mois plus tôt ce que ça veut dire, j'aurais été bien incapable de vous répondre. Sur mon LinkedIn, j'ai mis que j'étais Data Engineer, mais c'est plus compliqué que ça. Aujourd'hui mes idées sont plus claires. Je vais donc essayer de faire une présentation accessible à tout le monde, même à mon chat (j'ai plus de chat).


# Trop Long Flemme de Lire (TLFL)

Mon job en gros c'est :
1. Animateur plateforme Cloud : je fais en sorte que les personnes ayant des besoins analytiques se parlent entre elles et partagent leurs pratiques/outils. J'organise la rédaction d'une feuille de route d'évolution de l'urbanisation de la plateforme. 
2. Responsable service technique : je maintiens des outils techniques ou j'apporte une expertise (mdr) sur leur utilisation. Je maintiens notamment Thredds et Erddap, deux serveurs de données, ce dernier mettant à disposition les jeux du réseau de collecte mondiale des données des profileurs [Argo](https://www.ifremer.fr/fr/infrastructures-de-recherche/observer-l-ocean-mondial-en-temps-reel). 
# Ifremer Usine à papier 📝

L'Ifremer ne fait pas que des surimis. C'est un institut qui a avant tout des missions scientifiques et d'appui de politiques publiques.

C'est surtout un paradis pour les biologistes et les physiciens qui peuvent étudier tout type de région et de climat puisque la France se trouve :
- dans les zones tempérés avec la France métropolitaine
- dans les zones "froides" : avec les îles Kerguelen, la Terre Adélie, Saint-Pierre et Miquelon
- dans les zones "chaudes" : avec la Guyane, les Antilles, la Nouvelle-Calédonie, la Polynésie Française, la Réunion, Mayotte

(La France possède la [deuxième ZEE au monde après les US](https://fr.wikipedia.org/wiki/Zone_%C3%A9conomique_exclusive_de_la_France)!)

D'ailleurs que cache l'acronyme IFREMER ? Petit indice, c'est l'Institut Français de Recherche pour l'E... de la MER. La réponse tout en bas².

Pour faire rapide, l'institut s'intéresse à trois grands types d'activités et ses déclinaisons : (je reprends le [site vitrine](https://www.ifremer.fr/fr)) 

- Protéger et restaurer les éco-systèmes marins
    - Etudier la biodiversité marine et les écosystèmes, 
    - Modéliser l'océan, le climat
    - Prévenir les événements extrêmes
    - Empêcher les pollutions et les contaminations et les traiter si besoin
- Gérer durablement les ressources marines
    - Surveiller la pêche et l'aquaculture, proposer des alternatives
    - Vérifier la qualité sanitaire des produits de la mer
    - Cartographier les ressources minérales
    - Etudier des nouvelles sources d'énergie et de matériaux
    - Rechercher des biotechnologies marines
- Acquérir et partager les données et informations marines
    - Produire des capteurs & systèmes de mesure et collecter les données produites
    - Développer des outils pour l'Océan numérique


Vous voyez donc que le panel est très large ! Je me situe dans le troisième volet "Acquérir et partager les données et informations marines".

Dans quasi tous ces cas de figures, l'Ifremer produit des connaissances. Un institut scientifique contrairement à une usine ne produit pas de marchandises comme des voitures, des brosses à dent ou des canards en plastique. Un institut scientifique produit des données scientifiques qualifiées et des connaissances scientifiques (sous la forme d'articles, de modèles).

# Ifremer le Poulpe 🐙

Produire un modèle de l'océan, c'est tout une affaire, c'est une collaboration de centaines de personnes, ce sont des millions d'euros investis, des centaines de milliers d'heures de travail. Car pour qu'un physicien puisse se dire "Hum je remarque une tendance dans ces données et si je testais cette équation", il lui faut des données, beaucoup de données, d'une grande variété et donc une grande chaîne de production de données. Chaque maillon de cette chaîne est important et dépendant des uns et des autres. Il faut d'abord les gens qui inventent les capteurs, celleux (celles et ceux) qui les produisent, celleux qui les déploient, celleux qui récupèrent les données produites, celleux qui les traitent et les stockent, celleux qui les mettent en forme pour l'analyse et les partagent, celleux qui les analysent et écrivent des papiers.

Par exemple, la collecte de données arrivent de différents canaux : 
- satellitaire : des satellites mesurent la couleur, la hauteur, la température de l'eau
- in situ : des flotteurs coulent dans l'océan en récupérant des profils de pression, températures mais aussi de données biogéochimiques, des capteurs sont posés sur la tête des morses aux Kerguelen (ils aiment bien aller en antarctique) puis on les récupère l'été suivant ...
- halieutique : des prélèvements de poissons permettent de mesurer le stock et les caractéristiques des poissons.
- bien d'autres encore que je n'ai pas fini d'explorer mais vous avez l'idée.

Après réflexions, Ifremer ça ressemble plutôt à un poulpe, avec des crampons qui captent les informations, des bras qui permettent de les convoyer et la tête qui les centralise, les trie et les organise.
Je me situe plutôt dans la tête du poulpe ou en bout de chaîne, je suis celui qui va aider les scientifiques à faire l'analyse. 

# La mer dans le nuage 🌊☁️

![bureau](https://i.ibb.co/VM6Zmg1/bureau.jpg)
_Mon bureau avec ma jolie plante, svp regardez pas les fils_

Enfin, on va arriver à mon travail ! Je suis au service ISI (Ingénierie des Systèmes d'Informations) au sein du département IRSI (Infrastructures de Recherche et Systèmes d'Information). Nous sommes toute une équipe d'informaticiennes et d'informaticiens qui gèrent les données qui arrivent, font en sorte qu'ils n'y ait pas d'embouteillage, qu'elles soient correctement triées, qu'il n'y ait pas d'incohérence, qu'elles soient inventoriées. Nous mettons également en place des services comme des cartes, des statistiques qui viennent se greffer aux données pour obtenir plus d'informations ou y accéder plus rapidement.

## Première casquette : animateur Cloud

L'équipe se divise de deux manières :
- par système d'information : celleux qui gèrent spécifiquement une tâche métier comme l'halieutique, le satellite, l'insitu, les publications scientifiques
- par tâche transverse : 
    - opérationnelles : les activités qui répondent à des besoins critiques (engagements contractuels et légaux)
    - analytiques : les activités qui répondent à un besoin d'analyse, d'expérimentation, de modélisation

Pour l'instant, la division par système d'information est la principale. Les gens ont des outils qui leur sont spécifiques. C'est là où j'interviens : je m'occupe des tâches transversales analytiques.
Mon rôle est de faire en sorte que les gens se parlent sur leurs besoins analytiques, échangent sur les pratiques et sur les outils pour potentiellement simplifier, faire converger, rationaliser, et imaginer de nouveaux usages en croisant les données. C'est un travail socio-technique qui s'apparente à de l'amélioration continue.

Exemple : Jean-Truc³ développe un outil qui permet d'afficher les lieux des prélèvements de poissons sur une carte mondiale. Anne-Machine³ a le même besoin mais pour indiquer les positions des différentes bouées en mer. Peut-être cette dernière peut réutiliser l'outil du premier ? Dans ce cas à quel point peut-il être généralisé ? Sinon faut-il utiliser un outil externe ? 

> Où sont passés les nuages dans tout ça ?

Le Cloud c'est un mot-valise (qui peut être utilisé de différentes manières). Pour la plupart des moldus, c'est simplement un espace de stockage en ligne qui centralisent tous les fichiers, images, vidéos et depuis lequel on peut accéder de toutes les machines possibles. Soit dit en passant, vos fichiers ne sont pas dématérialisés, ils sont toujours bien matériels, stockés sur des disques durs quelque part dans un datacenter en Finlande. L'apparente immatérialité du cloud n'est que virtuelle.

Mon cloud à moi, c'est la même idée, mais on ajoute aussi des capacités de traitement et tout un tas de fonctionnalités supplémentaires. Nous avons notre propre datacenter Datarmor qui est notre infrastructure sur laquelle nous construisons notre Cloud. Les utilisateurs n'ont besoin que d'une très simple machine qu'ils utilisent pour se connecter à un site web sur lequel ils vont pouvoir retrouver :
1. tout un catalogue de jeux de données directement accessible et interopérables  
2. des outils de traitement qui accèdent directement aux supercalculateurs

Exemple : Camille³ souhaite évaluer la corrélation entre taille des poissons, température de l'eau et intensivité de la pêche en mer d'Iroise. Camille se connecte donc à nuage.ifremer.fr, navigue dans le catalogue [Sextant](https://sextant.ifremer.fr/), sélectionne les jeux de données qui l'intéressent dans un panier. Une fois les courses terminées, Camille clique sur un bouton et cela ouvre une interface web de programmation (JupyterLab pour les initiés) dans laquelle des lignes de code préécritent permettent d'importer les données sur la zone géographique sélectionnée. Le code s'exécute sur une machine au sein de l'Ifremer, Camille ne récupère que le résultat.

## Deuxième casquette : responsable outils techniques

Dans un autre temps, je m'occupe d'outils qui composent cet environnement technique et de deux en particulier : Thredds et Erddap. Ce sont deux serveurs de données dont les fonctionnalités se recoupent. Ils permettent de mettre à disposition des données sur le web et des services comme l’échantillonnage, l'affichage, l'exploration. Alors leur interface web est vraiment préhistorique, donc ce n'est clairement pas sexy au début, mais en fait elles sont moins utilisées que les accès directs, automatiques. 

Erddap héberge notamment toutes les données du programme mondial de collecte de données insitu [Argo](https://www.ifremer.fr/fr/infrastructures-de-recherche/observer-l-ocean-mondial-en-temps-reel). Pour expliquer rapidement, on lâche ce qu'on appelle des profileurs en mer, qui peuvent flotter à la profondeur souhaitée, on les laisse dériver à -1000m ou -2000m suivant le besoin puis ils remontent à la surface et on récupère leurs données.

# Conclusion 

Voilà !


---

¹ L'Ifremer (Nantes) aurait en réalité inventé la protéine qui permet la congélation des surimis
² IFREMER : Institut Français de Recherche pour l'Exploitation de la MER  
³ Les prénoms ont été modifiés