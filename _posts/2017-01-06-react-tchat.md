---
layout: post
title:  "Utiliser Firebase avec React"
author: Gkueny
date:   2017-01-06 23:00:00 +0200
featured_image: /assets/react-firebase.png
comments: true
keywords: "react, redux, firebase, chat, tchat, redux, real-time database, react with firebase, react avec firebase, react et firebase, realtime, database, realtime-database, state"
excerpt_separator: <!--more-->
---
Avec `React`, vous savez persister les données de l'utilisateur, mais une nouvelle question se pose. Comment en partager une partie avec les autres utilisateurs? Dans le cadre d'un tchat par exemple?
<!--more-->

C'est ce que nous allons voir en utilisant `firebase`.

**Attention** : un minimum de connaissances sur `React` est requis. Si vous ne connaissez pas encore `React`, c'est par ici que cela se passe : [feuille-de-route-react](http://gkueny.fr/feuille-de-route-react) :)

<div id="toc"></div>

![react and firebase tchat](assets/react-tchat.gif)


## 1. Firebase

`Firebase` est un outil qui fournit plusieurs services (authentification, base de données etc..). Ici nous allons nous intéresser au `real-time database` qui s'accorde parfaitement avec le concept de `state` de `React` :).

### 1.1. Configuration

    Note : Si vous voulez passez cette étape (ne pas avoir votre propre compte Firebase), vous pouvez utiliser les informations contenues dans la section 1.2.

Dans un premier temps, allons sur la [page d'accueil](https://firebase.google.com/){:target="\_blank"} de `Firebase` est connectons nous avec un compte google.

Une fois cela fait, rendez-vous dans la [console](https://console.firebase.google.com){:target="\_blank"} afin de créer le projet.

![création du projet firebase](assets/etape-1-firebase.png)

Maintenant que le projet est créé, il nous faut encore modifier les règles d'accès à la base de données, car, pour l'instant, celle-ci n'est accessible que lorsque l'utilisateur est authentifié, or nous n'avons pas besoin. Il nous faut donc modifier ces règles comme ceci :

![modification des règles](assets/regles-firebase.png)

<center>
    Et la configuration est fini !
</center>

### 1.2. Récupération des informations de connexion

Cliquez sur l'onglet "Overview" du menu gauche afin d'accéder à l'icône "Ajouter firebase à votre application web". Cliquez sur celle-ci, puis, dans la fenêtre qui apparaît copiez la variable `config`, nous en aurons besoin plus tard.

![récupération des informations de connexions à la base de données](assets/etape-2-firebase.png)

    Note : Vous pouvez utiliser mes informations, on pourra avoir le même tchat comme cela :D.

## 2. React

Maintenant que nous avons notre base de données, configurons notre application `React` afin de la synchroniser avec `Firebase`.

### 2.1. Installation du projet

    Note: J'utilise ici yarn, qui est, dans l'ensemble, plus rapide que npm. Si vous voulez utiliser npm, voici une page listant les correspondances entre les commandes yarn que je vais utiliser et celle de npm : http://ricostacruz.com/cheatsheets/yarn.html.

Récupérons donc le projet `react-chat-without-firebase` que j'ai créé pour vous :

{% highlight cli %}
$ git clone https://github.com/gkueny/react-chat-without-firebase.git react-chat-with-firebase
$ cd react-chat-with-firebase
$ yarn
{% endhighlight%}

Afin d'utiliser `firebase`, nous allons également avoir besoin du package npm `firebase`. Ajoutons celui-ci à notre projet. (Et bien sûre, on n'oublie pas de lancer notre serveur ;) ).

{% highlight cli %}
$ yarn add firebase
$ yarn start
{% endhighlight%}

![un chat sans connexion à firebase](assets/react-tchat-part-1.gif)

### 2.2. Mettons en place firebase

Bon... Là on a un beau tchat, mais il n'y a qu'un seul utilisateur possible. En plus si on supprime le `state` enregistré, pouf les messages disparaissent.

#### a. Connexion à firebase

Pour se connecter à notre base de données `Firebase`, nous allons utiliser notre variable `config` :

{% gist 03cef7b7039703a5f5ff0b8aed53b1aa index.js %}

#### b. Synchronisation avec firebase

Dans un premier temps, modifions la façon de gérer les messages. Nous allons les récupérer par `Firebase`. Du coup, au lieu de mettre à jour notre variable `messages` en y concaténant le nouveau message, nous allons la remplacer à chaque fois par les messages reçus de `Firebase`. Ce qui donne :

{% gist 03cef7b7039703a5f5ff0b8aed53b1aa chat.actions.js %}

{% gist 03cef7b7039703a5f5ff0b8aed53b1aa chat.reducer.js %}

{% gist 03cef7b7039703a5f5ff0b8aed53b1aa chat.container.js %}

Nous avons notre partie `Redux` prête pour la synchronisation avec `Firebase`. Maintenant il nous faut récupérer une référence à notre nouvelle base de données :

{% gist 03cef7b7039703a5f5ff0b8aed53b1aa chat.component-get-ref.js %}

    Mais attends... On récupère une référence vers "l'enfant" "messages" ? on ne l'a jamais créé dans Firebase non ?

Pas de souci ! Si "messages" n'existe pas, `Firebase` le créera.

Avec cette référence, nous allons pouvoir créer un `listener` qui sera appelé à chaque fois qu'un nouveau message est ajouté à `Firebase` :

{% gist 03cef7b7039703a5f5ff0b8aed53b1aa chat.component-listener.js %}

Allez, dernière étape ! Envoyons notre nouveau message à `Firebase` :

{% gist 03cef7b7039703a5f5ff0b8aed53b1aa chat.component-send.js %}

Plus besoin de mettre à jour notre `state`, car notre ajout entrainera l'appel de notre listener :D.

<center>
    Finis ! Maintenant, nos messages sont synchronisés avec Firebase et ainsi tout les utilisateurs possèdent les mêmes messages.
</center>
