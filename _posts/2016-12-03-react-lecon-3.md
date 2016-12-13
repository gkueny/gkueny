---
layout: post
title:  "React - Leçon 3"
author: Gkueny
date: Sat Dec 03 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_2.png
comments: true
timerArticle: Sat Dec 03 2016 20:00:00 GMT+0100 (CET)
timerNextArticle: Tue Dec 06 2016 20:00:00 GMT+0100 (CET)
excerpt_separator: <!-- more -->
---
Aller ! Aujourd'hui, on va avancer notre superbe application :)
<!-- more -->

Mais tout d'abord, voyons comment réaliser les différentes tâches laissées en suspens lors de la précédente leçon.

<b>Vous pourrez retrouver les sources de la leçon précédente à l'adresse suivante :</b> [github lecon_2](https://github.com/gkueny/HappyDrink/tree/Lecon_2)

## 1. Rappel de l'organisation du projet

{% highlight cli %}
src
|___assets
|   |
|   |___logo.svg
|
|___components
|   |
|   |___establishments
|   |   |
|   |   |___establishments.js
|   |   |
|   |   |___fixtures.js
|   |
|   |___App.js
|
|___css
|   |
|   |___App.css
|   |
|   |___index.css
|
|___App.test.js
|
|___index.js
{% endhighlight %}

On n'oublie pas de lancer l'application afin de voir les changements dans notre navigateur.

{% highlight cli %}
$ cd HappyDrink
$ npm start
{% endhighlight %}


## 2. Proposition de correction

Rappel de ce que nous voulons faire :

- créer un `bouton` `like` et un `bouton` `dislike` pour chacun des établissements
- incrémenter un `compteur` de `like` et de `dislike` lors d'un clic sur le bouton correspondant
- `afficher le compteur` associé à chacun des boutons
- créer un bouton `favori` (une icône `étoile` par exemple) qui a un fond transparent s'il n'est pas en favori et jaune s'il l'est

#### Le bouton de "like" et de "dislike"

Ici nous allons utiliser deux variables : `isLiked` et `isDisliked`. Comme elles vont être amenées à changer dans le temps, nous allons les utiliser avec le state :

{% highlight javascript %}
// Fichier : ./src/components/establishments/Establishments.js

import React, { Component } from 'react'

class Establishment extends Component {

    constructor(props) {

        super(props);
        // On initialise nos deux variables
        this.state = {
            isLiked     : false,
            isDisliked  : false
        }

    }

    // fonction appelée lors du clic sur l'élément "like"
    like = () =>
    {
        this.setState({
            isLiked     : !this.state.isLiked,
            isDisliked  : this.state.isDisliked ? !this.state.isDisliked : this.state.isDisliked,
        })
    }

    // fonction appelée lors du clic sur l'élément "dislike"
    dislike = () =>
    {
        this.setState({
            isDisliked  : !this.state.isDisliked,
            isLiked     : this.state.isLiked ? !this.state.isLiked : this.state.isLiked,
        })
    }

    render() {

        // On définit les éléments "upIcon(like) et downIcon(dislike)"
        // on utilise ici Font-Answome (on inclura le fichier css dans ./public.index.html)
        let upIcon      = <i className="fa fa-thumbs-up" aria-hidden="true"></i>
        let downIcon    = <i className="fa fa-thumbs-down" aria-hidden="true"></i>

        // Si l'on n'a pas encore "liké"
        if(!this.state.isLiked)
            upIcon = <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>

        // Si l'on a pas encore "disliké"
        if(!this.state.isDisliked)
            downIcon = <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>

        return (
            <div className='establishment' >
                <div className='establishment-description' >
                    <h3>{ this.props.establishment.name }</h3>

                    { this.props.establishment.description }
                </div>
                <div className='establishmentLikeDislike' >
                    {/* Au clic sur le bouton on appelle la fonction */}
                    <button onClick={this.like}>{ upIcon } </button>
                    <button onClick={this.dislike}>{ downIcon }</button>
                </div>

            </div>
        );
    }
}

export default Establishment;
{% endhighlight %}

on met à jour notre css :

{% highlight css %}
/* Fichier : ./src/css/App.css [extrait]*/
...
.establishment {
    display             : flex;
    align-items         : center;
    background-color    : gray;
    padding             : 10px;
    margin              : 5px 30px;
    border-radius       : 8px;
}
.establishment-description {
    flex : 0.8;
}
.establishmentLikeDislike {
    flex            : 0.2;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
}
.establishmentLikeDislike button {
    background  : none;
    border      : none;
    color       : white;
}

{% endhighlight %}

Et le fichier `index.html` afin d'utiliser `Font-Answome` :

{% highlight html %}
<!-- Fichier : ./public/index.html -->

<!doctype html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

        <title>React App</title>

    </head>
    <body>

        <div id="root"></div>

    </body>
</html>


{% endhighlight %}


![Screenshot 1](/assets/HappyDrink_Lecon_3_1.gif)

#### Le compteur

À partir d'ici, il va être facile de réaliser le compteur de "like" et "dislike" :

{% highlight javascript %}
// Fichier : ./src/components/establishments/Establishments.js [Extrait]

...

constructor(props) {

    super(props);

    // On ajoute les deux variables à notre "state"
    this.state = {
        isLiked         : false,
        isDisliked      : false,
        likeCounter     : 0,
        dislikeCounter  : 0
    }

}

like = () =>
{

    // On met à jour le compteur à chaque clic sur le composant "like"
    let likeCounter     = this.state.likeCounter;
    let dislikeCounter  = this.state.dislikeCounter;

    likeCounter     +=  !this.state.isLiked ? 1 : -1
    dislikeCounter  +=  this.state.isDisliked ? -1 : 0

    this.setState({
        isLiked         : !this.state.isLiked,
        isDisliked      : this.state.isDisliked ? !this.state.isDisliked : this.state.isDisliked,
        likeCounter     : likeCounter,
        dislikeCounter  : dislikeCounter
    })
}

dislike = () =>
{

    // On met à jour le compteur à chaque clic sur le composant "dislike"
    let likeCounter     = this.state.likeCounter;
    let dislikeCounter  = this.state.dislikeCounter;

    dislikeCounter  +=  !this.state.isDisliked ? 1 : -1
    likeCounter     +=  this.state.isLiked ? -1 : 0

    this.setState({
        isDisliked      : !this.state.isDisliked,
        isLiked         : this.state.isLiked ? !this.state.isLiked : this.state.isLiked,
        likeCounter     : likeCounter,
        dislikeCounter  : dislikeCounter
    })
}

render() {

    ...

    return (
        <div className='establishment' >
            <div className='establishment-description' >
                <h3>{ this.props.establishment.name }</h3>

                { this.props.establishment.description }
            </div>
            <div className='establishmentLikeDislike' >
                {/* On affiche les compteurs */}
                <button onClick={this.like}>{ upIcon } </button> <span>{ this.state.likeCounter }</span>
                <button onClick={this.dislike}>{ downIcon }</button> <span>{ this.state.dislikeCounter }</span>
            </div>

        </div>
    );
}

...

{% endhighlight %}


![Screenshot 2](/assets/HappyDrink_Lecon_3_2.gif)

Bon pour l'instant, les compteurs ne servent à rien. Mais pour les prochaines leçons nous allons utiliser une `API` afin de récupérer les "like" et "dislike" des autres utilisateurs. <br/>
Cela deviendra ainsi de vrais compteurs :) .

#### Favori

Aller, rien de compliquer ici. <br/>
Nous allons réutiliser une icône `Font-Answome` et ajouter une variable booléenne à notre `state` pour faire le boulot :

{% highlight javascript %}
// Fichier : ./src/components/establishments/Establishments.js [Extrait]

...
constructor(props) {

    super(props);

    this.state = {
        isLiked         : false,
        isDisliked      : false,
        likeCounter     : 0,
        dislikeCounter  : 0,
        favori          : false
    }

}
...
favori = () =>
{
    this.setState({
        favori  : !this.state.favori
    })
}
...

render() {

    ...

    let starIcon    = <i className="fa fa-star-o" aria-hidden="true"></i>

    ...

    if (this.state.favori) {
        starIcon = <i className="fa fa-star favoriIcon" aria-hidden="true"></i>
    }

    return (
        <div className='establishment' >
            <div className='establishment-favori' >
                <button onClick={this.favori}>{ starIcon }</button>
            </div>
            <div className='establishment-description' >
                <h3>{ this.props.establishment.name }</h3>

                { this.props.establishment.description }
            </div>
            <div className='establishmentLikeDislike' >
                <button onClick={this.like}>{ upIcon } </button> <span>{ this.state.likeCounter }</span>
                <button onClick={this.dislike}>{ downIcon }</button> <span>{ this.state.dislikeCounter }</span>
            </div>

        </div>
    );
}
{% endhighlight %}

Et on met à jour le css :

{% highlight css %}
/* Fichier : ./src/css/App.css [extrait]*/
...
.establishment-favori {
    flex : 0.1;
}
.establishment-description {
    flex : 0.7;
}
.establishmentLikeDislike {
    flex            : 0.2;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
}
.establishment button {
    background  : none;
    border      : none;
    color       : white;
}

.favoriIcon {
    color: yellow;
}
{% endhighlight %}


![Screenshot 3](/assets/HappyDrink_Lecon_3_3.gif)

## 3. Le cycle de vie d'un composant `React`

#### Initialisation

Jetons un coup d'oeil aux fonctions, de notre `component`, qui sont appelées par `React` à l'initialisation de celui-ci :

{% highlight cli %}
|
|__constructor()
|
|__componentWillMount()
|
|__render()
|
|__componentDidMount()
|
|__componentWillUnmount()
{% endhighlight %}

Avec `componentWillMount`, vous pourrez réaliser des opérations avant que votre `component` ne soit rendu. <br/>
Vous pouvez par exemple initialiser le `state` (car toute modification du state dans cette fonction n'implique pas le rechargement du `component`). Cependant `React` conseille de réaliser cette opération dans le constructeur, comme nous l'avons fait depuis le début.

`componentDidMount` est quant à elle, appelée après le rendu du `component`. C'est ici que nous réaliserons les futurs appels API.

Et `componentWillUnmount` est appelée quand votre `component` est "démonté".

Voici un exemple d'implémentation :

{% highlight javascript %}
// Fichier : ./src/components/App.js [Extrait]

...

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            pseudo  : "Inconnu"
        }

    }

    componentWillMount () {
        console.log("componentWillMount")
    }

    componentDidMount () {
        console.log("componentDidMount")
    }


    render () {
        console.log("render")
        ...
    }

    ...
}

...

{% endhighlight %}

Vous devriez avoir un aperçu dans la console de votre navigateur préféré ( `#chrome` ;) ), similaire à celui-ci :

{% highlight cli %}
componentWillMount
render
componentDidMount
{% endhighlight %}

#### Changement d'état

À chaque changement de notre `state`, `React` appelle les fonctions suivantes :

{% highlight cli %}
|
|__componentWillReceiveProps(nextProps)
|
|__shouldComponentUpdate(nextProps, nextState)
|
|__componentWillUpdate(nextProps, nextState)
|
|__render
|
|__componentDidUpdate(prevProps, prevState)
{% endhighlight %}

`componentWillReceiveProps(nextProps)` est appelée lorsqu'un `component`, qui est déjà initialisé, reçoit de nouvelles `props`. <br/>
Dans cette fonction, on peut comparer les nouvelles `props` (ici contenues dans l'objet `nextProps`), avec les anciennes (`this.props`).

La fonction `shouldComponentUpdate(nextProps, nextState)` est appelée à chaque changement du `state`. On utilise cette fonction afin de faire savoir à `React` si, oui ou non, le `component` est affecté par le changement en retournant `true` ou `false`.
Si l'on retourne `false`, les méthodes  `componentWillUpdate()`, `render(),` et `componentDidUpdate()` ne seront pas appelées.

`componentWillUpdate(nextProps, nextState)` est appelée par `React` juste avant que les nouvelles `props` et le nouveau `state` ne soit rendues.

La fonction `componentDidUpdate(prevProps, prevState)` est, quant à elle, exécutée après le rendu du nouveau `state`/ des nouvelles `props`. On utilisera cette fonction pour réaliser des actions sur le `DOM` ou des appelles d' `API`

Toutes ces fonctions ne sont pas appelées à l'initialisation du `component`.

Voyons un petit exemple :

{% highlight javascript %}
// Fichier : ./src/components/establishments/Establishments.js [Extrait]

...

class Establishment extends Component {

    ...

    componentWillReceiveProps(nextProps)
    {
        console.log("componentWillReceiveProps")
        console.log("    this.props : ", this.props)
        console.log("    nextProps  : ", nextProps)
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        console.log("shouldComponentUpdate")
        console.log("    this.props : ", this.props)
        console.log("    nextProps  : ", nextProps)
        console.log("    this.state : ", this.state)
        console.log("    nextState  : ", nextState)

        return true
    }

    componentWillUpdate(nextProps, nextState)
    {
        console.log("componentWillUpdate")
        console.log("    this.props : ", this.props)
        console.log("    nextProps  : ", nextProps)
        console.log("    this.state : ", this.state)
        console.log("    nextState  : ", nextState)

    }

    componentDidUpdate(prevProps, prevState)
    {
        console.log("componentDidUpdate")
        console.log("    prevProps : ", prevProps)
        console.log("    prevState : ", prevState)
    }

    ...
}

...

{% endhighlight %}

Et l'affichage console correspondant (lors du clic sur l'élément "favori" par exemple):

{% highlight cli %}
shouldComponentUpdate
    this.props :  Object {establishment: Object}
    nextProps  :  Object {establishment: Object}
    this.state :  Object {isLiked: false, isDisliked: false, likeCounter: 0, dislikeCounter: 0, favori: false}
    nextState  :  Object {isLiked: false, isDisliked: false, likeCounter: 0, dislikeCounter: 0, favori: true}
componentWillUpdate
    this.props :  Object {establishment: Object}
    nextProps  :  Object {establishment: Object}
    this.state :  Object {isLiked: false, isDisliked: false, likeCounter: 0, dislikeCounter: 0, favori: false}
    nextState  :  Object {isLiked: false, isDisliked: false, likeCounter: 0, dislikeCounter: 0, favori: true}
componentDidUpdate
        prevProps :  Object {establishment: Object}
        prevState :  Object {isLiked: false, isDisliked: false, likeCounter: 0, dislikeCounter: 0, favori: false}
{% endhighlight %}

## 4. Récapitulatif

Regardons un peu l'avancement de notre projet HappyDrink :

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  `Lister` les bars.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `filtrer` la liste.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   `mettre en favori` un bar.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `visualiser l'happy-hour` de celui-ci.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   `Liker/disliker` ce bar.


On a bien avancé cette fois-ci !


<b>Vous pourrez retrouver les sources de cette leçon à l'adresse suivante : </b>[github lecon_3](https://github.com/gkueny/HappyDrink/tree/Lecon_3)

## 5. Pour la suite

Aller, je vous promets `Redux` c'est pour bientôt ;)

En attendant, amusons-nous un peu à utiliser le cycle de vie de notre composant App.

Je vous propose la chose suivante :

- utiliser Jquery pour faire un appel API :

     npm install --save jquery

et

{% highlight javascript %}
    var $ = require('jquery');
{% endhighlight %}

pour utiliser "$" dans un `component`

- faire un appel API sur cette adresse : "https://jsonplaceholder.typicode.com/posts/1"
- afficher le champ "body" de ce que répond l'API

<center>
    À plus !
</center>

<center>

    ↓ Prochaine leçon dans ↓

</center>

