---
layout: post
title: 'Protéger son application'
author: Gkueny
date: 2017-05-13 19:00:00 +0200
featured_image: /assets/background-admin.jpg
comments: true
keywords: 'react, redux, firebase, admin, protect, protection, admin react, react admin'
excerpt: "Lorsque l’on code une application `React`, on est vite amené à protéger l’accès à une partie de celle-ci. Je vais vous montrer ici ma technique préférée afin de `filtrer l'accès` à certains composants."
---

**Attention, cet article n'est pas à jour.**

<b>[Article initialement publié sur [FrenchReact](http://frenchreact.fr/proteger-son-application/)]</b>

Lorsque l’on code une application `React`, on est vite amené à protéger l’accès à une partie de celle-ci. Je vais vous montrer ici ma technique préférée afin de `filtrer l'accès` à certains composants.

```
Cette technique est applicable autant pour React que pour React-Native, mais pour les besoins de l’article, je prendrai seulement exemple sur une application React.
```

<div id="toc"></div>

## Principe général

Afin d’interdire l’accès à certain composant si l’utilisateur n’est pas authentifié ou n’a pas les bons droits, nous allons englober ceux-ci dans un `super-composant`. Il n’aura qu’un seul but :

- vérifier un certain nombre de conditions et agir en conséquence.

Si les conditions requises sont réunies, le composant affichera ce qui est demandé, sinon il redirigera l’utilisateur.

## Protéger son Application

### Application de base

Prenons une simple application web avec trois routes différentes

- Accueil
- Login
- Admin

et avec le code ci-dessous (extrait) :

{% gist 0f652bf9c472ce008953489cad6b94a4 index.js %}

Pour voir l’application que j’ai codée pour cet article, c’est par ici : [https://github.com/gkueny/protect-route-react](https://github.com/gkueny/protect-route-react) <br/>
J’utilise [Firebase](http://frenchreact.fr/utiliser-firebase-avec-react/) et [React Router v4](https://reacttraining.com/react-router/web/guides/quick-start).

`/!\` Pour l’instant, notre composant AdminComponent est en libre accès `/!\`.

Ce que l’on cherche donc à faire, c’est de vérifier le token de l’utilisateur (qu’il en est un et que le serveur nous confirme son authenticité) et d’agir en conséquence.

### Notre super-composant

Une solution rapide, serait d’effectuer nos vérifications directement dans le composant `AdminComponent`. Cela marcherai, mais on serait amené à recopier le code pour chaque composant à protéger. Pas très efficace comme méthode et chronophage 🙁 .

Au lieu de cela, nous allons construire un `composant` qui englobera les composants à protéger et fera ces vérifications pour nous :

{% gist 0f652bf9c472ce008953489cad6b94a4 protected.component.js %}

Ici, à chaque fois qu’une des routes géré par `ProtectedRoute` est appelée, la fonction `componentWillReceiveProps()` sera exécutée, car le composant `Router` définit dans `index.js` « re-rend » notre composant lors d’un changement de route.

On profite donc de cette fonction pour vérifier les droits de l’utilisateur et afficher ou non la route demandée.

## Intégration du super-composant

Pour intégrer notre `super-composant`, il nous suffit de modifier la fonction `render()` de notre fichier `index.js` :

{% gist 0f652bf9c472ce008953489cad6b94a4 index-edited.js %}

    Et c'est tout !

On a donc juste eu besoin de définir une surcouche du composant `Route` pour protéger certaines d’entre elle. Avec ce code la lecture du code est assez intuitif et nous n’aurons pas besoin de faire de copier-coller pour chaque composant privé.
