---
title: "Tmux Quickstart" 
layout: post
tags: dev tmux tuning 
category: dev
---

tmux est un multiplexeur de terminal. Il permet de garder une session de plusieurs terminaux en fonctionnement même si vous vous déconnectez ou que vous êtes déconnecté de l'interface.

<!--more-->
A rajouter dans `~/.tmux.conf`
```conf
# Prefix
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

**Touches les plus importantes :**

- `ctrl-a` : la touche pour inter-agir avec tmux

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
- `ctrl-a + flèche directionnelle` : se déplacer entre les panneaux
- `ctrl-a + ;` : dernier panneau

Cheatsheet : <https://tmuxcheatsheet.com/>
