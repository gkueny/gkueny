---
layout: post
title:  "Wordpress: Créer ses propres types de post"
date:   2016-05-05 21:39:54 +0200
author: Gkueny
featured_image: /assets/wordpress.png
comments: true
keywords: "wordpress, custom post, custom post type"
excerpt_separator: <!-- more -->
---
Par défaut Worpress comporte deux types de post : les pages et les articles. Mais cela n'est pas toujours suffisant, surtout dans le cas de sites complexes.
<!-- more -->

#### J'y vois deux grands avantages qui m'ont vite convaincu à apprendre comment créer mes propres types de post :

- Inteface d'admin plus clair

    Il me semble plus intuitif d'avoir à écrire un post de type Produit que de devoir crée (par exemple) un article auquel on ajoute la catégorie Produit.

- Possibilité d'ajouter des champs personnalisé (custom field) seulement pour notre nouveau post

    Ainsi nous ne polluerons pas le type Page de champ "Prix du produit" , "Ref Produit" etc...


### Comment faire ?

Tout d'abord rendez-vous dans votre fichier function.php et rajoutez y le code suivant (adapté à votre code).

{% highlight php %}
<?php

add_action( 'init', 'create_post_type' );

function create_post_type() {

	$args = array(
      	'public' => true, /* public ? */
      	'label'  =>  array(
      			'name' => __( 'Articles' ),
      			'singular_name' => __( 'Article' )
      		    ),
        'has_archive' => true, /* Archived ? */
      	'show_in_nav_menus'   => true,
    );

	register_post_type( 'articles', $args );
}

?>

{% endhighlight %}

**Petit astuce ici** : Pour que notre custom post apparaisse dans notre menu, il suffit de mettre `show_in_nav_menus` à true.

Et voilà !

Vous venez de créer votre propre type de post, félicitations !!

Pour plus d'info : [Wordpress Custom Post Type](https://codex.wordpress.org/Post_Types)


Si vous ne voulez pas toucher au code, je vous propose le plugin suivant : [WCK](https://fr.wordpress.org/plugins/wck-custom-fields-and-custom-post-types-creator/) qui fais du bon boulot !

Il vous permet également de créer facilement des champs personnalisés (custom fields).
Je l'ai découvert récemment et j'en suis ravi !
