---
layout: post
title:  "React - Leçon 2"
author: Gkueny
date: Wed Nov 30 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_2.png
comments: true
timerArticle: Wed Nov 30 2016 20:00:00 GMT+0100 (CET)
timerNextArticle: Sat Dec 03 2016 20:00:00 GMT+0100 (CET)
excerpt_separator:  <!-- more -->
---
C'est parti pour découvrir le *state* d'un composant React !
 <!-- more -->

Mais tout d'abord, voyons une façon de réaliser les deux points laissés en suspens lors de la dernière leçon :

<b>Vous pourrez retrouver les sources de la leçon précédente à l'adresse suivante : <b> [github lecon_1](https://github.com/gkueny/HappyDrink/tree/Lecon_1)


## 1. Proposition de correction

Rappel de ce que nous cherchons à faire :

- créer un nouveau `component` "Establishment", en vous inspirant d' `App`, qui s'occupera de l'affichage d'un établissement dans notre liste.
- utiliser ce même `component` "Establishment" dans la fonction `map` vu précédemment.


Voici un exemple de ce à quoi pourrait ressembler le `component` "Establishment" :

{% highlight javascript %}
// Fichier : ./src/components/establishment/Establishment.js

import React, { Component } from 'react'

class Establishment extends Component {

    render() {

        return (
            <div className='establishment' >
                <h3>{ this.props.establishment.name }</h3>

                { this.props.establishment.description }

            </div>
        );
    }
}

export default Establishment;
{% endhighlight %}

Rien de bien nouveau ici.

Mais j'aimerai vous montrer une autre façon de définir un component :

{% highlight javascript %}
// Fichier : ./src/components/establishment/Establishment.js [modifié]

import React from 'react'

const Establishment = ({establishment}) => {

    return (
        <div className='establishment' >
            <h3>{ establishment.name }</h3>

            { establishment.description }

        </div>
    );
}

export default Establishment;
{% endhighlight %}

On appelle cela un component `stateless`, car, comme son nom l'indique, il n'a pas de `state`. Et c'est pour cela que l'on peut l'écrire sous cette forme "plus légère", qui est aussi (de mon avis) plus facilement compréhensible. <br/>

En savoir plus : [React Stateless Functional Components: Nine Wins You Might Have Overlooked](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.1tjsc34mf)

    Mais... Mais... On ne sait même pas ce que c'est le "state" ...

Cela arrive ! :) ( mais dans cette leçon le component Establishment ne bougera plus. Du coup libre à vous de l'écrire de cette manière pour le moment. )

Revenons à nos moutons.

Gardons en tête que nous avons besoin de la props `establishment` qui correspond à l'établissement que l'on affiche.

Nous utilisons notre `component` Establishment de la façon suivante dans le `component` App :

{% highlight javascript %}
// Fichier ./src/components/App.js [extrait]

...

import Establishment         from './establishments/Establishment'

...
    render() {

        const listEstablishment = establishments.map( (establishment) => {
            return (
                <Establishment
                    key={ establishment.id }
                    establishment={ establishment } // on n'a pas oublié la props "establishment" :)
                />
            )
        })

        ...
    }

...
{% endhighlight %}

## 2. Rappel de l'organisation du projet

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

## 2. Utilisation du `state` d'un `component`

Bon, j'avoue, je vous ai menti...

Nous n'allons pas, ici,  utiliser la méthode `getInitialState`, car celle-ci est seulement supportée par les classes créées avec `React.createClass`. Or nous utilisons une "simple" classe JavaScript.

Du coup, dans notre cas, nous allons procéder autrement :

{% highlight javascript %}
// Fichier : ./src/App.js [extrait]

...

class App extends Component {

    constructor(props) {

        // Ne pas oublier d'appeler le constructeur père ! (Obligatoire)
        super(props);

        // On définit le state de notre component que l'on hérite de la classe "Component"
        // Cela remplace la fonction "getInitialState"
        this.state = {
            pseudo  : "Inconnu"
        }

    }

    // On définit la fonction appelée lors d'un clic sur le lien "Changer le pseudo !"
    // la syntaxe  " nomFonction = () => {} " nous permet de conserver le contexte `this` du scope courant. (Ici, la classe App)
    randomPseudo = () => {

        // On s'amuse un peu ;)
        let randomPseudo    = ""
        const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        const size          = Math.floor(Math.random() * 10) + 5

        for( let i=0; i < size; i++ )
            randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))

        // On met à jour le state via la fonction "setState" hérité de la classe Component
        this.setState({
            pseudo : randomPseudo
        })
    }

    render() {

        ...

        return (
            <div className="App">

                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <h2>Welcome "{ this.state.pseudo }" to { this.props.title }</h2>

                </div>

                <div className="App-intro">

                    <!-- On appelle notre fonction lors du clic sur le lien -->
                    <p> <a onClick={ this.randomPseudo } >Changer le pseudo !</a> </p>

                    <section>
                        { listEstablishment }
                    </section>

                </div>

            </div>
        );
    }

...
}

export default App;
{% endhighlight %}

Et voilà ! Simple n'est-ce pas ?


![Screenshot 1](/assets/HappyDrink_Lecon_2.gif)

#### Qu'avons-nous vu d'important à retenir ?

##### Initialisation du `state` de notre component

* On initialise l'objet `state` avec :
    * pour `clé` : les différents noms de variables que vous voulez garder dans le `state`
    * et en `valeur` : la valeur de ces variables.

##### Modifier le `state` de notre component

* On fait appel à la fonction `setState`, et on lui passe en argument un nouvel objet ayant :
    * pour `clé` : le nom des variables du `state` que l'on veut modifier
    * et en `valeur` : la nouvelle valeur de la variable.

##### Exemple Rapide :

{% highlight javascript %}
state = {
    pseudo  : "test",
    age     : 18
}

//Ici je ne passe en paramètre que ce que je souhaite modifier
this.setState({
    pseudo : "randomPseudo"
})
{% endhighlight %}

###### Bonus

En utilisant la fonction `setState` , `React` détecte qu'il y a eu un changement. <br/>
Et comme nous l'avons vu précédemment, lors de cette situation, React rappelle la méthode `render` des `components`.

C'est cela qui nous permet de voir le changement du pseudo lors de chaque clic.

#### Disclaimer

Quand vous construisez un component, posez-vous ces questions :

* Ma variable m'est passée par mon parent via les `props` ? <i class="fa fa-times" style="color: red" aria-hidden="true"></i> Ne la mettez pas dans le `state`
* Ma variable n'est pas amenée à changer dans le temps ? <i class="fa fa-times" style="color: red" aria-hidden="true"></i> Ne la mettez pas dans le `state`
* Ma variable peut être créée à partir d'autres variables du `state` ou des `props` ? <i class="fa fa-times" style="color: red" aria-hidden="true"></i> Ne la mettez pas dans le `state`

* Ma variable ne remplie aucun des cas ci-dessus ? <i class="fa fa-check" style="color: green" aria-hidden="true"></i> Alors sa place est surement dans le `state`

En savoir plus : [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)

## 3. Récapitulatif

Regardons un peu l'avancement de notre projet HappyDrink :

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  `Lister` les bars.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `filtrer` la liste.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `mettre en favori` un bar.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>  `visualiser l'happy-hour` de celui-ci.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i> `Liker/disliker` ce bar.

Bonus :

* <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  Afficher un pseudo random.

<p class="comment">
    Mais... On n'a pas avancé là ! Remboursez !
</p>

Ne vous inquiétez pas, cela arrive ;).

<b>Vous pourrez retrouver les sources de cette leçon à l'adresse suivante : </b>[github lecon_2](https://github.com/gkueny/HappyDrink/tree/Lecon_2)

## 4. Pour la suite

Maintenant que nous avons vu les deux principaux fondements de `React`, nous sommes capables de construire entièrement notre application ! <br/>
Mais allons-y pas à pas, tout en découvrant au fur et à mesure différents autres aspects de `React`.

De plus on n'a pas encore parlé de `Redux` !

Je vous propose donc, pour l'instant, de réaliser les tâches suivantes :

- créer un `bouton` `like` et un `bouton` `dislike` pour chacun des établissements
- incrémenter un `compteur` de `like` et de `dislike` lors d'un clic sur le bouton correspondant
- `afficher le compteur` associé à chacun des boutons
- créer un bouton `favori` (une icône `étoile` par exemple) qui a un fond transparent s'il n'est pas en favori et jaune s'il l'est

Nous corrigerons cela dans la prochaine leçon !

<center>
    À plus !
</center>

<center>
    
    ↓ Prochaine leçon dans ↓

</center>
    
