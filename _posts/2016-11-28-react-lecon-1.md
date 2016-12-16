---
layout: post
title:  "React - Leçon 1"
author: Gkueny
date: Mon Nov 28 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_1.png
comments: true
timerArticle: Mon Nov 28 2016 20:00:00 GMT+0100 (CET)
timerNextArticle: Wed Nov 30 2016 20:00:00 GMT+0100 (CET)
excerpt_separator: <!-- more -->
---
Cela fait maintenant quelques mois que je me suis mis à la librairie React et à son association avec Redux. Il est temps pour moi de vous en montrer un aperçu !
<!-- more -->

<div id="toc"></div>

## Introduction

Pour tout vous dire, je suis tombé amoureux de React (et également de React-native, mais cela sera pour une autre fois ;) ) et c'est pour cela qu'il m'est venu l'envie de partager mes connaissances à ce sujet.

### Comment fonctionne React ?

React part d'une simple constatation : le DOM, c'est  *L E N T* et en plus il change tout le temps.

- Cela change tout le temps ? Appelons la méthode `render` à chaque modification !
- Le DOM c'est lent         ? Implémentons notre propre `DOM virtuel` très rapide ! Et mettons à jour le `DOM` par des opérations simples en le comparant avec notre nouveau `DOM virtuel`.

### De quoi est composé une classe React ?

Chaque `classe React` est composée au minimum d'un `state` (état), de `props` (propriétés) et d'une méthode `render`.

- Le `state` est défini à l'initialisation de la classe par la méthode `getInitialState` et l'on peut le mettre à jour par la méthode `setState`.
- Les `props` sont passées à l'initialisation et sont définies en dehors de la classe.
- La méthode `render` retourne un objet représentant une partie du `DOM virtuel`.


## 1. Commençons notre projet React !

Chaque langage, librairie, framework a son "Hello World", React a sa "Todo-list".

Cependant, je vais ici vous proposer de réaliser toute autre chose pour me différencier un peu :)
Nous allons donc construire une application listant des bars ainsi que leur happy-hour.

Nous pourrons :

- `Lister` les bars.
- `filtrer` la liste.
- `mettre en favori` un bar.
- `visualiser l'happy-hour` de celui-ci.
- `Liker/disliker` ce bar.

### Initialisation

Si vous avez déjà essayé de réaliser un projet React, vous avez dû rencontrer des difficultés avec [`Babel`](https://babeljs.io/) et [`Webpack`](http://putaindecode.io/fr/articles/js/webpack/).

Facebook l'a bien compris et nous permet de nous abstenir de toute cette configuration, qui peut être difficile/incompréhensible, grâce au package npm `create-react-app`.

Installons celui-ci :

{% highlight cli %}
$ npm install -g create-react-app
{% endhighlight %}
    On a ici besoin de Node.js 4.x ou une version supérieur


Créons notre application :

{% highlight cli %}
$ create-react-app HappyDrink
{% endhighlight %}
    Je suis assez fier du nom ^^

Pour voir l'application dans votre navigateur :

{% highlight cli %}
$ cd HappyDrink
$ npm start
{% endhighlight %}
    Cela lance pour vous le serveur : http://localhost:3000/ et le mettra à jour à chaque modification de fichier.


### Notre premier composant React

Allons voir un peu ce que React nous a créé par défaut.

Nous avons tout d'abord le fichier `index.js` qui est notre point d'entrée.

{% highlight javascript %}
// Fichier : ./src/index.js

import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './App'; //on import le composant App
import './index.css';

// On utilise la méthode render de ReactDOM pour décrire DOM ,
// le premier paramètre correspond à ce que l'on veut rendre
// et le deuxième l'endroit où "accrocher" le DOM que l'on crée.
//      ici : l'élément d'id root dans le fichier ./public/index.html
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
{% endhighlight %}

Regardons maintenant le composant App

{% highlight javascript %}
// Fichier : ./src/App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Un Component implémente la méthode render et reçoit en paramètre ses props
class App extends Component {

    // Notre fameuse méthode render
    // On utilise dans cette méthode la syntaxe JSX qui nous permet d'écrire  avec une syntaxe xml
    render() {
        return (

            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>

        );
    }
}

export default App;
{% endhighlight %}

Regardons d'un peu plus près la méthode `render`. Au premier coup d'oeil on a l'impression que l'on retourne du code `html`.
*Attention*, ici on utilise la syntaxe `JSX`, qui est très proche du `HTML`. Il y a quelques différences, comme l'utilisation de l'attribut `className` à la place de `class`. Cela vient du fait que `JSX` est du Javascript et que `class` est un mot-clé réservé.

le code JSX ci-dessous :

{% highlight javascript %}
render() {
    return (
        <h1 class='large'>Hello World</h1>
    )
}
{% endhighlight %}

correspond en réalité à :

{% highlight javascript %}
render() {
    return (
        React.createElement(
            'h1',
            {className: 'large'},
            'Hello World'
        )
    )
}

{% endhighlight %}

On admettra facilement, que la syntaxe `JSX` est plus plaisante à lire et à écrire.

#### Mais elles sont où tes `props` ici ?!?

"Amusons-nous" un peu avec, pour voir comment les utiliser :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

...

// On ajoute le paramètre title à notre composant
ReactDOM.render(
    <App title = "HappyDrink"/>,
    document.getElementById('root')
);
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/App.js [extrait]

...

// Le paramètre title est ajouté aux props que nous fournit la classe Component
class App extends Component {

    render() {

        // On peut ainsi facilement l'utiliser grâce à l'objet this.props
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <h2>Welcome to { this.props.title }</h2>
                    <!-- Et voilà ! -->

                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>

        );
    }
}
{% endhighlight %}

Et voilà, c'est comme cela que l'on définit/utilise les `props`.

![Screenshot 1](/assets/HappyDrink_Lecon_1_change_title.gif)


    Okey pour l'amusement on repassera, mais bon, je l'avais bien mis entre guillemet non ?


## 2. Et HappyDrink dans tout ça ?

Okey, commençons à donner forme à notre application.


###  Nos Bars

Je vous propose, pour commencer, de créer un fichier `fixtures.js` dans lequel nous allons stocker nos établissements, tels que nous pourrions les recevoir via une api.

{% highlight javascript %}
// Fichier : ./src/fixtures.js

export const establishments = [
    {
        id          : "0890786GH",
        name        : "Tonton",
        description : "Un super bar étudiant"
    },
    {
        id          : "0890786GD",
        name        : "The Londow Town",
        description : "Un super bar à bière"
    },
    {
        id          : "MJLMH0389",
        name        : "Australian Bar",
        description : "Un super bar dansant"
    }
]
{% endhighlight %}

### Listons les bars

Maintenant, listons tout cela dans notre component `App` :

{% highlight javascript %}
// Fichier : ./src/App.js [extrait]

...

// On n'oublie pas d'importer nos établissements
import { establishments }     from './fixtures'

...

render() {


    const listEstablishment = establishments.map( (establishment) => {
        return (
            // L'attribut "key" permet à React d'identifier les éléments.
            // Cela améliore les performances lors de l'ajout,
            // la modification et la suppression d'un élément.
            <li
                key = { establishment.id }
                className = 'establishment'
            >
                <h3>{ establishment.name }</h3>

                { establishment.description }

            </li>
        )
    })

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to { this.props.title }</h2>
            </div>
            <div className="App-intro">
                { listEstablishment }
            </div>

        </div>
    );
}
...
{% endhighlight %}

Vous pouvez vous demander : `mais c'est quoi cette fonction map ?` <br>
Décortiquons un peu ce bout de code :

{% highlight javascript %}
const listEstablishment = establishments.map( (establishment) => {
    return (
        <li key = { establishment.id } className = 'establishment' >
            <h3>{ establishment.name }</h3>
            { establishment.description }
        </li>
    )
})
{% endhighlight %}

> La méthode `map()` crée un nouveau tableau composé des images des éléments d'un tableau par une fonction donnée en argument. <br>
[https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map)

Ici, avec la fonction anonyme `(establishment) => {}` (notation es6), nous retournons l'élément JSX `<li ... > ... </li>` <br/>
Ce qui permet par la suite d'afficher les établissements sous forme de liste avec la variable `{ listEstablishment }`.

{% highlight html %}
<!-- extrait de l'affichage html -->
<div class="App-intro">
    <li class="establishment">
        <h3>Tonton</h3>
            Un super bar étudiant
    </li>
    <li class="establishment">
        <h3>The Londow Town</h3>
        un super bar à bière
    </li>
    <li class="establishment">
        <h3>Australian Bar</h3>
        Un super bar dansan
    </li>
</div>
{% endhighlight %}

##### css

Faisons également un petit ajout dans notre fichier css pour que cela soit un petit peu plus "beau" (notez les guillemets ;) )


{% highlight css %}
/*
Fichier : ./src/App.css [Extrait]
*/

...

.establishment {
    background-color    : gray;
    padding             : 10px;
    margin              : 5px 30px;
    border-radius       : 8px;
    list-style          : none;
}

...

{% endhighlight %}

Et nous voilà avec une petite liste de bars !


![Screenshot 2](/assets/HappyDrink_Lecon_1_list_bars.gif)

## 3. Organisons un peu tout cela

Pour l'instant, nous avons peu de fichier et nous les avons tous mis au même endroit.
Cela va vite devenir un beau petit bordel lorsque notre application commencera à grandir.

Je vous propose donc de réorganiser tout cela :

{% highlight cli %}
src
|
|___assets
|   |
|   |___logo.svg
|
|___components
|   |
|   |___establishments
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

Et de modifier les différents `import` comme ceci :

{% highlight javascript %}
// Fichier : ./src/index.js [imports]

import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './components/App';
import './css/index.css';
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/components/App.js [import]

import React, { Component } from 'react'
import logo                 from '../assets/logo.svg'
import '../css/App.css'

import { establishments }    from './establishments/fixtures'
{% endhighlight %}

## 4. Récapitulatif

Regardons un peu l'avancement de notre projet HappyDrink :


![Screenshot 3](/assets/HappyDrink_Lecon_1.gif)

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  `Lister` les bars
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `filtrer` la liste
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>  `mettre en favori` un bar
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `visualiser l'happy-hour` de celui-ci
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `Liker/disliker` ce bar

_Petit bémol : Nous ne récupérons pas les établissements d'une api pour l'instant ( cela viendra ;) )_



<b>Vous pourrez retrouver les sources de cette leçon à l'adresse suivante :</b> [github lecon_1](https://github.com/gkueny/HappyDrink/tree/Lecon_1)

## 5. Pour la suite

Ce que je vous propose, c'est d'essayer de réaliser seul les tâches suivantes :

- créer un nouveau `component` "Establishment", en vous inspirant d' `App`, qui s'occupera de l'affichage d'un établissement dans notre liste.
- utiliser ce même `component` "Establishment" dans la fonction `map` vu précédemment.

Nous corrigerons cela dans la prochaine leçon !

<center>
    À plus !
</center>

<center>

    ↓ Prochaine leçon dans ↓

</center>
