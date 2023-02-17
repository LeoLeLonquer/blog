---
title: "Qui suis-je ?"
permalink: "/about/"
layout: post
---

![Photo de moi](assets/ressources/img/photos_de_oim/moialabeach.jpeg)
*Photo de moi à la plage avec un chien (mais c'est pas mon chien).*

Je conçois depuis 3 ans des solutions pour l’exploitation de données. 
Je vis à Brest où je me suis bien installé.

## Accès

- En ligne : <http://leolelonquer.github.io/blog>
- local : <http://127.0.0.1:4000/>
- repo : <https://github.com/LeoLeLonquer/blog>

## Jekyll local test

Installer Jekyll : [Jekyll Quickstart](https://jekyllrb.com/docs/)

Pour installer ruby sur le mac

```bash
PKG_CONFIG_PATH=/usr/local/opt/openssl@3/lib/pkgconfig:$PKG_CONFIG_PATH ruby-install ruby 3.1.3 -- --with-openssl-dir=/usr/local/opt/openssl@3
```

Cloner le projet

```bash
git clone https://github.com/LeoLeLonquer/blog
```

Pour lancer un serveur local, se placer dans le dossier et lancer :  

```bash
bundle # au premier lancement
jekyll serve --livereload
```

Si bug au démarrage exécuter :  

```bash
bundle add webrick
```

## License

[public domain](http://unlicense.org/)
