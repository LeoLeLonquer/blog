---
title: "Tmux Quickstart" 
layout: article
categories: dev tmux tuning 
tags: full_post
---

tmux est un multiplexeur de terminal. Il permet de garder une session de plusieurs terminaux en fonctionnement même si vous vous déconnectez ou que vous êtes déconnecté de l'interface.

<!--more-->
A rajouter dans `~/.tmux.conf`
```conf
# Prefix (bind prefix to ctrl-a instead of ctrl-a)
unbind C-b
set-option -g prefix C-a

# go to the beginning of the line
bind a send-prefix

# vertical split
unbind %
bind v split-window -h
```

```bash
# Lancer une session tmux:
tmux
# Lister les sessions tmux
tmux ls
# se rattacher à une session tmux
tmux a -t [nom-session]
```

Notations ici :
- `ctrl-a` : appuyer simultanément sur les touche Contrôle et `a` 
- `ctrl-a + s` : appuyer sur contrôle-a , relâcher, puis appuyer sur `s`

**Touches les plus importantes :**
- `ctrl-a` : la touche pour inter-agir avec tmux (par défaut `ctrl-b`, ici reconfiguré)

Session :

- `ctrl-a + s` : changer de session
- `ctrl-a + $` : renommer la session
- `ctrl-a + L` : dernière session

Fenêtres :

- `ctrl-a + c` : nouvelle fenêtre  
- `ctrl-a + n` : fenêtre suivante
- `ctrl-a + p` : fenêtre précédente
- `ctrl-a + l` : dernière fenêtre

Panneaux :

- `ctrl-a + V` : nouveau panneau vertical
- `ctrl-a + "` : nouveau panneau horizontal
- `ctrl-a + ↑/↓/←/→` : se déplacer entre les panneaux
- `ctrl-a + ;` : dernier panneau

Se balader dans la console :

- `ctrl-a + PageUp` : activer le mode déroulement de la console (`PageUp` = `⇞` = `fn + ↑`)
- `↑/↓` : se déplacer dans la console
- `⇞/⇟` : se déplacer d'une page
- `/` : rechercher vers le bas, `n` pour suivant (next), `p` pour précédent
- `?` : rechercher vers le haut, `n` pour suivant (next), `p` pour précédent
- `⏎` : revenir en mode entrée

Cheatsheet : <https://tmuxcheatsheet.com/>
