---
layout: post
title:  'Wordpress: Ajouter et récuperer des champs dans le customizer de Wordpress'
date:   2016-05-16 22:05:35 +0200
author: Gkueny
featured_image: /assets/wordpress-code.png
comments: true
excerpt_separator: <!-- more -->
---
Introduit par Wordpress 3.4, le customizer de Wordpress offre une interface visuelle afin de modifier l'apparence du thème. Nous allons ici apprendre à ajouter et récupérer des champs à ce customizer.
<!-- more -->

Afin de vous présenter cette fonctionnalité, je vais m'appuyer sur un exemple pratique. Nous allons créer des champs afin que notre utilisateur puisse indiquer ses différents liens sociaux. Nous les afficherons ensuite dans le footer de notre site.

### Première étape : Créer les champs

Avant toute chose, rendez vous dans le fichier customizer.php de notre thème (qui porte bien son nom)!

Ajoutons maintenant le code suivant :

{% highlight php %}
<?php

    add_action('customize_register', 'theme_social_customizer'); // hook

    function theme_social_customizer($wp_customize){

    	 //add section in wordpress customizer
    	$wp_customize->add_section('social_settings_section', array(
    	  'title'          => 'Social link Section'
    	 ));

         // add input
    	$wp_customize->add_setting('fb_setting', array(
    	 'default'        => 'https://www.facebook.com',
    	 ));

         // add user's control
    	$wp_customize->add_control('fb_setting', array(
    	 'label'   => 'Facebook',
    	  'section' => 'social_settings_section',
    	 'type'    => 'text',
    	));

    	$wp_customize->add_setting('tw_setting', array(
    	 'default'        => 'https://twitter.com',
    	 ));
    	$wp_customize->add_control('tw_setting', array(
    	 'label'   => 'Twitter',
    	  'section' => 'social_settings_section',
    	 'type'    => 'text',
    	));

    }

?>
{% endhighlight %}

La création de nos nouveaux champs se décompose en plusieurs parties :

- création de la section qui accueillera les différents champs
- création de notre élément
- Ajout d'un contrôle afin de permettre à l'utilisateur de modifier cet élément (c'est à ce moment là que l'on spécifie le type d'élément)


On peut dès maintenant apercevoir notre nouvelle section avec ses champs dans le customizer (Themes -> Personnaliser dans le menu admin)


### Dernière étape : Récupérer les champs

C'est tout simple !

la fonction `get_theme_mod( $name, $default )` suffit !

{% highlight php %}
    <footer class="footer" id="site-footer" role="contentinfo">

        <ul class="footer_socials_wrapper">

            <!-- Check if setting exist -->
            <?php if (get_theme_mod("fb_setting")) : ?>
            <li>
                <a target="_blank" class="social_media" href=" <?php echo get_theme_mod('fb_setting'); ?> " >
                    <i class="fa fa-facebook"></i>
                </a>
            </li>
            <?php endif; ?>

            <!-- Check if setting exist -->
            <?php if (get_theme_mod('tw_setting')) : ?>
            <li>
                <a target="_blank" class="social_media" href=" <?php echo get_theme_mod('tw_setting'); ?> " >
                    <i class="fa fa-twitter"></i>
                </a>
            </li>
            <?php endif; ?>
        </ul>


        <div id="copyright">
            <p class="copyright">2016©MoNsUpErSiTe - All right reserved.<p>
        </div><!-- .copyright_text -->
    </footer>
{% endhighlight %}

Et voilà !

Quelques lien pour plus d'info :

- [add_section](https://codex.wordpress.org/Class_Reference/WP_Customize_Manager/add_section)
- [add_setting](https://codex.wordpress.org/Class_Reference/WP_Customize_Manager/add_setting)
- [add_control](https://codex.wordpress.org/Class_Reference/WP_Customize_Manager/add_control)
- [get_theme_mod](https://codex.wordpress.org/Function_Reference/get_theme_mod)
