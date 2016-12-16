---
layout: post
title:  "Mon premier bundle externe"
author: Gkueny
date:   2016-06-08 10:44:25 +0200
featured_image: /assets/monPremierBundle.png
comments: true
keywords: "symfony, symfony 3, bundle, externalisation, composer, crawler bundle"
excerpt_separator: <!-- more -->
---
Si comme moi, vous êtes novices dans l'externalisation d'un bundle, alors bienvenue !

J'ai depuis peu mis à disposition sur packagist mon premier bundle et voici mon retour.
<!-- more -->

    Note : Je travaille avec Symfony3

### 1ère étape

{% highlight cli %}
$ bin/console generate:bundle

Are you planning on sharing this bundle across multiple applications? [no]: yes

...

Everything is OK! Now get to work :).

{% endhighlight %}

Lors de la génération de votre bundle avec la commande symfony, n'oubliez pas de répondre  `yes` à la première question afin qu'il nous génère automatiquement les fichiers nécessaires au partage de notre bundle.

Si vous ne l'avez pas fait, je vous laisse copier le contenu du dossier  [DependencyInjection](https://github.com/gkueny/GKHtmlMetaCrawlerBundle/tree/master/src) en l'adaptant à votre bundle.

### 2ième étape

Une fois le bundle terminé, il nous est nécessaire de le configurer afin que d'autres personnes puisse l'utiliser en dehors de notre projet.

#### Le fichier composer.json

Créons donc, à racine du bundle (dans mon cas, dans le dossier `HtmlMetaCrawlerBundle`), le fichier composer.json qui permettra à composer de gérer ce bundle .

Adaptez y le code suivant :

{% highlight json %}
{
    "name" : "votre-organisation/votre-nom-de-bundle",
    "description" : "Votre description",
    "type" : "symfony-bundle",
    "authors" : [{
        "name" : "gkueny",
        "email" : "gateankueny@gmail.com"
    }],
    "keywords" : [
        "Vos mot clés"
    ],
    "license" : [
        "MIT"
    ],
    "require" : {
    },
    "autoload" : {
        "psr-4" : {
          "GK\\HtmlMetaCrawlerBundle\\" : "src"
        }
    }
}
{% endhighlight %}

### 3ième étape

Pour partager votre bundle via packagist, il nous faut maintenant l'héberger sur github.

À la racine de votre dépôt, copiez le fichier composer.json et créer le dossier src. Puis copier le contenu de votre bundle dans ce nouveau dossier.

Il ne vous manque plus que de vous rendre sur le site de packagist pour soumettre votre nouveau bundle.


<center>
    Et voilà !
</center>

## Aide

* Dépôt github de mon premier bundle externe [GKHtmlMetaCrawlerBundle](https://github.com/gkueny/GKHtmlMetaCrawlerBundle)

* [How to Load Service Configuration inside a Bundle](http://symfony.com/doc/current/cookbook/bundles/extension.html)

* [How to Create Friendly Configuration for a Bundle](http://symfony.com/doc/current/cookbook/bundles/configuration.html)
