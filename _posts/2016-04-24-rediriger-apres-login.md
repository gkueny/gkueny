---
layout: post
title:  "Symfony tips : Rediriger après le login selon le ROLE de l'utilisateur"
date:   2016-04-24 14:54:54 +0200
author: Gkueny
featured_image: /assets/symfony.jpg
comments: true
keywords: "symfony, redirection, login, connexion"
excerpt_separator: <!--more-->
---
Par défaut, l'utilisateur est redirigé vers la dernière page visité ou la page par défaut spécifié. Mais comment diriger nos utilisateurs différamment selon leur ROLE ?
<!--more-->

### Posons le problème :

- Je veux que l’administrateur soit redirigé vers la page admin
- Je veux que l’utilisateur lambda soit redirigé vers la page home

### Comment faire ?

Par défaut, l’utilisateur est redirigé vers la dernière page qu’il a visitée. On peut modifier cette redirection par défaut en rajoutant  `default_target_path: /ma-page`  dans notre fichier security.yml :

{% highlight yml %}
firewalls:
    main:
        pattern: ^/
        form_login:
            provider: fos_userbundle
            login_path: /
            default_target_path: /page
            csrf_token_generator: security.csrf.token_manager
        logout: true
        anonymous: true

{% endhighlight %}
    (J’utilise ici le bundle FOSUserBundle)

**Mais nous sommes toujours confrontés à notre problème. Tout le monde sera redirigé vers cette page.**

### Solution

Pour régler notre problème nous allons créer un service qui aura pour charge de rediriger l’utilisateur selon son rôle, puis nous l’appellerons au bon moment.

#### Créons tout d’abord notre service :

{% highlight php %}

<?php

namespace AppBundle\Listener;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

/**
 * Class AfterLoginRedirection
 *
 * @package AppBundle\AppListener
 */
class AfterLoginRedirection implements AuthenticationSuccessHandlerInterface
{
    private $router;

    /**
     * AfterLoginRedirection constructor.
     *
     * @param RouterInterface $router
     */
    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    /**
     * @param Request        $request
     *
     * @param TokenInterface $token
     *
     * @return RedirectResponse
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $roles = $token->getRoles();

        $rolesTab = array_map(function ($role) {
            return $role->getRole();
        }, $roles);

        if (in_array('ROLE_ADMIN', $rolesTab, true)) {
            // c'est un aministrateur : on le rediriger vers l'espace admin
            $redirection = new RedirectResponse($this->router->generate('amin'));
        } else {
            // c'est un utilisaeur lambda : on le rediriger vers l'accueil
            $redirection = new RedirectResponse($this->router->generate('homepage'));
        }

        return $redirection;
    }
}

{% endhighlight %}


Nous implémentons l’interface **AuthenticationSuccessHandlerInterface**
qui nous fournit la fonction **onAuthenticationSuccess** qui nous intéresse. Vous pouvez maintenant mettre votre propre logique.


#### On n'oublie pas d'enregistrer notre service :

{% highlight yml %}
services:
    redirect.after.login:
        class: AppBundle\Listener\AfterLoginRedirection
        arguments: ['@router']
{% endhighlight %}

#### Et enfin nous informons le firewall qu’il faut appeler ce service lorsque l’utilisateur à réussi à s’authentifier :

{% highlight yml %}
firewalls:
    main:
        pattern: ^/
        form_login:
            provider: fos_userbundle
            login_path: /
            csrf_token_generator: security.csrf.token_manager
            success_handler: redirect.after.login
        logout: true
        anonymous: true
{% endhighlight %}


Et voila !
