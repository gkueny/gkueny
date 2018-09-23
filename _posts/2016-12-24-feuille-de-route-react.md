---
layout: post
title: Feuille de route d'une application React
author: Gkueny
date: Sat Dec 24 2016 18:00:00 GMT+0100 (CET)
featured_image: /assets/react_nowwwel.png
comments: true
excerpt_separator: <!-- more -->
---

Lorsque j'ai commencé à coder une application `React`, j'ai passé un petit bout de temps à `googler` "React c'est quoi ?", "Quelle librairie utiliser pour le routing ?" etc... C'est pourquoi je vous livre ici, une petite feuille de route pour réaliser votre première application `React` sans vous perdre dans les méandres de `google` :).

<!-- more -->

cc [#nowwwel](https://twitter.com/search?f=tweets&vertical=default&q=%23nowwwel) ;)

**Attention, cet article n'est pas à jour.**

<div id="toc"></div>

### 1. React ? C'est quoi ?

`React` est une librairie `Javascript` open source lancée par `Facebook`. Voici les grandes lignes de celle-ci :

#### a. Une histoire de DOM

`React` est basé sur un `DOM` virtuel. Ainsi, lorsque nous écrivons nos composants `React`, nous ne modifions pas directement le `DOM` principal, mais celui géré par `React` lui-même. Ce petit tour de passe-passe permet, par la suite, de comparer les deux `DOM` et de réaliser les opérations les moins coûteuses afin de mettre à jour le `DOM` principal.

#### b. Une application structurée en composant

Un composant `React` contient des `props` (variables passées et définies par le composant parent) et un `state`, (variable définie par le composant lui-même). Chaque modification de l'une d'entre elles entraîne la mise à jour du composant et de ses enfants.

Celui-ci contient également la fonction `render()` qui retourne la structure du `DOM` virtuel prise en charge par votre composant.

Si vous voulez avoir un meilleur aperçu du fonctionnement d'un composant, c'est par ici que cela se passe : [Introduction à React]({{site.url}}/react-lecon-1){:target="\_blank"} :) <br/>
Vous y trouverez :

- plus d'information sur les bases de `React`
- la réalisation, pas à pas, d'un composant `React`

### 2. Gérer le state

Prenons comme exemple un simple texte modifiable par l'utilisateur. Vous allez avoir besoin de modifier celui-ci selon les actions de l'utilisateur et mettre à jour son affichage. Pour cela, rien de mieux que le state de votre application.

Le `state` initial se déclare dans le `constructeur` de votre composant, comme-ci :

{% gist gkueny/58c27914de0eb2422ffabfcd28f10b82 init-state.js %}

et se met à jour via la fonction `setState()`.

{% gist gkueny/58c27914de0eb2422ffabfcd28f10b82 update-state.js %}

Pour voir l'implémentation et l'utilisation du `state` dans un composant, c'est par ici : [Découverte du state]({{site.url}}/react-lecon-2){:target="\_blank"} :)

### 3. Prendre en main le cycle de vie d'un composant React

Lors de l'initialisation d'un composant, `React` appelle successivement quatre fonctions :

- `constructor()`
- `componentWillMount()`
- `render()`
- `componentDidMount()`

C'est dans le `contructor` que vous initialiserez le `state`. La fonction `componentDidMount()`, quant à elle, vous permettra de faire des appels `API`.

De plus, à chaque modification du `state`, `React` appelle les fonctions suivantes :

- `componentWillReceiveProps(nextProps)`
- `shouldComponentUpdate(nextProps, nextState)`
- `componentWillUpdate(nextProps, nextState)`
- `render()`
- `componentDidUpdate(prevProps, prevState)`

J'ai également listé la fonction `componentWillReceiveProps(nextProps)`, mais celle-ci n'est appelée que lorsque le composant parent modifie les `props` de notre composant.

Avec la fonction `shouldComponentUpdate(nextProps, nextState)`, vous pourrez indiquer à `React` si vous voulez que les fonctions qui suivent soit appelées ou pas. Cela nous permet ainsi d'améliorer la performance de notre application dans le cas où un composant est "re-rendu" à chaque modification alors que cela n'est pas nécéssaire.

Pour une explication plus détaillée de chaque fonction et de leur implémentation, c'est par ici que cela se passe : [En savoir un peu plus sur le cycle de vie d'un composant React]({{site.url}}/react-lecon-3){:target="\_blank"} :)

### 4. Redux

`Redux` va vous permettre de manager tout le `state` de votre application en un seul et même endroit. Celui-ci sera ne sera jamais modifié, ce sont les `reducers` de `Redux` qui auront pour charge de retourner un nouveau `state` à partir d'une action qui aura été `dispatchée` (envoyée) par l'un de vos composant. Cela rend votre `state` totalement prédictible, car vous connaissez l'action qui est envoyée et ainsi quelles modifications seront faites.

`Redux` est donc composée :

- de `reducers` qui retournent un nouveau `state` à partir de celui existant et de l'action envoyée
- d'`actions`, qui sont prédéfinies et envoyées par vos composants
- de `containers`, qui ont pour charge de lier vos composant à `Redux`

Si vous voulez en savoir plus sur chaque élément de `redux` et leur implémentation : [Implémenter Redux dans une application React]({{site.url}}/react-lecon-4){:target="\_blank"} :) <br/>
Vous pourrez également y voir un exemple d'appel `API`.

### 5. Persister ses données

Le `state` c'est cool, mais si l'application n'en garde aucun souvenir lors du rechargement de la page, à quoi bon ?
Pour réaliser cette tâche, et en assumant que vous avez adopté `Redux` :) , je vous conseille la librairie `redux-persist`. <br/>
Celle-ci va sauvegarder votre `state` à chaque modification et le charger lors du chargement de l'application.

Je n'ai pas beaucoup de choses à rajouter, si ce n'est que cela va vous faciliter la vie ;).

Pour voir son implémentation, c'est par ici : [Persister ses données]({{site.url}}/react-lecon-5){:target="\_blank"} :)

### 6. La navigation

À moins que votre application ne contienne qu'une seul page, vous allez avoir besoin d'y naviguer. Pour cela je vous propose les librairies `react-router` et `react-router-redux`.

- la première nous permet de synchroniser notre interface React avec l’url et donc de naviguer dans notre application, via celle-ci.
- la seconde, quant à elle, nous permet de synchroniser tout cela avec Redux.

Pour voir un exemple d'utilisation, c'est par ici que cela se passe : [Naviguer dans son application React]({{site.url}}/react-lecon-6){:target="\_blank"} :)

### 7. En apprendre un peu plus

Je vous liste ici quelques liens utiles pour en savoir un peu plus sur `React` :)

- propTypes : [https://facebook.github.io/react/docs/typechecking-with-proptypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html){:target="\_blank"}
- les tests :) : [https://facebook.github.io/react/docs/test-utils](https://facebook.github.io/react/docs/test-utils.html){:target="\_blank"}
- thinking in React : [https://facebook.github.io/react/docs/thinking-in-react](https://facebook.github.io/react/docs/thinking-in-react.html){:target="\_blank"}
