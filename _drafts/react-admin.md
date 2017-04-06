---
layout: post
title:  "Protéger une partie de votre site React"
author: Gkueny
date:   2017-01-27 10:00:00 +0200
featured_image: /assets/background-admin.jpg
comments: true
keywords: "react, redux, firebase, admin, protect, protection, admin react, react admin"
excerpt_separator: <!--more-->
---
Vous voulez protéger une partie de votre site afin que seul les utilisateurs authentifiés puisse y accéder ? Venez par ici !
<!--more-->

<div id="toc"></div>

## Concept

L'idée général, va être d'avoir un booléen `isConnected` qui nous permettre de connaitre le statut de notre utilisateur au travers de notre application.

    Note : pour ma part, j'utilise Redux afin de partager le même state avec tout mes composants.

## Limitation

Il faut garder en tête que notre application est entièrement exécuté côté client. Cela à beaucoup d'avantages mais aussi des inconvénients. Ici le notre c'est que l'utilisateur peut modifier le `localStorage`, il pourrait ainsi modifier notre booléen et ainsi être `"connecté"` sans s'être identifié.

## Une solution

### Idée générale

Comme nous l'avons vu, nous ne pouvons pas nous fier aux données de notre application. Pour contourner cette limitation, nous allons nous fier à notre serveur. Pour être plus précis, nous le contacterons celui-ci à chaque action de l'utilisateur, sur une partie `privée` de notre application, afin de connaître le statut de celui-ci.

On peux donc imaginer stocker l'id de notre utilisateur et utiliser celui-ci pour savoir s'il est connecté ou non. Si l'id est assez complexe (`zfjazofj9879jhguy65uy5_iydfGu` par exemple) il sera quasiment impossible à un hacker d'usurper l'identité de quelqu'un d'autre.

### Encapsulage

Maintenant que l'on sait qu'il nous faut contacter notre serveur pour vérifier le statut de l'utilisateur, il nous faut savoir où faire cette vérification.

- On pourrait très bien le faire directement dans tout les composants qui en ont besoins. <br/>`Mmmmh`, trop de copier-coller et on ne pourrait pas voir d'un coup d'oeil ce qui est privé de ce qui ne l'est pas (il nous faudra regarder tout les composants un à un, pas pratique pour quelqu'un qui reprend le projet)
- On pourrait utiliser l'attribut `onEnter` de nos routes (avec  react-router). Nous pourrions ainsi appeler une fonction ayant pour but de vérifier le statut de l'utilisateur. <br/>
Avec ça on règle la question du copié-collé (même si on devra copier-coller l'attribut `onEnter` pour chaque route privée). Cependant on ne pourra pas accéder au `state` de notre application et le mettre à jour.

Du coup, je vais vous présenter la solution qui m'a paru la plus simple et la plus efficace. Nous allons encapsuler nos routes dans un `"super-composant"` qui contiendra notre logique. Ainsi, pour rendre une route `privée`, il suffira de la définir en tant qu'enfant de ce `"super-composant"` et c'est tout.

(Par la même occasion, cela règle également les problèmes évoqués précédemment).

## Une exemple concret

Afin de ne pas avoir à créer un serveur juste pour cette exemple, je vous propose d'utiliser `Firebase`.

### Initialisation

Pour ceux qui veulent tester le code, je vous invite à utiliser le starter suivant : [lien github](https://gkueny.fr). Par défaut j'ai laissé mes configuration `Firebase`, libre à vous de la changer.
{% highlight cli %}
$ git clone https://github.com/gkueny/...
$ cd ...
{% endhighlight%}

{% highlight cli %}
$ yarn
$ yarn start
{% endhighlight%}

Pour les autres, il vous suffira d'appliquer la même "recette", que je vais vous montrer, à votre propre projet.

### Le "super-composant"


### La fonction de vérification

### Nos routes

<!-- ## Un exemple concret

Dans cette exemple nous utiliserons `Firebase`, mais il est tout a fait possible de remplacer `Firebase` par votre propre `API`.

Pour ceux qui veulent suivre le tutoriel en codant, voici le starter sur lequel je vais me baser : [https://github.com/gkueny/react-admin](https://github.com/gkueny/react-admin)

#### Aperçu sans filtrage

Pour l'instant notre projet ne contient aucune méthode de filtrage. Tout le monde peut donc y accéder :

// GIF

### Créons notre `super-composant`

Comme dis précédemment, ce `composant` aura pour but de filtrer l'accès aux `composants` privées.

Dans notre cas, `Firebase` nous fournit une fonction toute faite qui va nous permettre ce checker le statut de notre utilisateur :

{% gist 8f754d50c1c100e0f8abb315e5cdab26 have-to-login.component.js %}

### Modifions nos routes

Notre `super-composant` est prêt, il ne manque plus qu'à encapsuler notre route `admin`.

// gist

#### Aperçu avec filtrage

Maintenant notre utilisateur est obligé de se connecter pour voir le contenu `secret`.

// Gif

La modification du `localStorage` n'y change rien !

// Gif -->
