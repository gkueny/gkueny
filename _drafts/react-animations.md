---
layout: post
title:  "Utiliser les animations avec React"
author: Gkueny
date:   2017-01-08 12:00:00 +0200
featured_image: /assets/react-firebase.png
comments: true
keywords: "react, redux, animations, animate, react animations, animer un composant react, composant, animation"
excerpt_separator: <!--more-->
---
Afin de rendre un site plus accueillant, plus moderne, les animations sont devenues monnaie courante. Nous allons voir ici, comment animer un composant `React` lors de son entrée et sa sortie du DOM.
<!--more-->

Nous allons travailler sur le tchat précédemment créé dans le [dernier article](http://gkueny.fr/react-tchat){:target="\_blank"}. Voyons voir comment animer nos messages lors de leur entrée dans le DOM :).

<div id="toc"></div>

## 1. Installer le projet

Pour commencer, reprennez le projet de l'article [Utiliser Firebase avec React](http://gkueny.fr/react-tchat){:target="\_blank"} si vous l'avez réalisé. Sinon vous pouvez récupérer mon projet :

{% highlight cli %}
$ git clone https://github.com/gkueny/react-chat-with-firebase.git react-with-animation
$ cd react-with-animation
{% endhighlight%}

On n'oublie pas d'installer les dépendances et de démarer le serveur locale :

    Note: J'utilise ici yarn, qui est, dans l'ensemble, plus rapide que npm. Si vous voulez utiliser npm, voici une page listant les correspondances entre les commandes yarn que je vais utiliser et celle de npm : http://ricostacruz.com/cheatsheets/yarn.html.

{% highlight cli %}
$ yarn
$ yarn start
{% endhighlight%}
