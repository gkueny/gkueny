---
layout: post
title: 'Implémenter Redux dans une application React'
author: Gkueny
date: Tue Dec 06 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_1.png
comments: true
timerArticle: Tue Dec 06 2016 20:00:00 GMT+0100 (CET)
timerNextArticle: Fri Dec 09 2016 20:00:00 GMT+0100 (CET)
keywords: 'react, redux, tutorial, react lecon 4, state'
subtitle: react - leçon 4
excerpt_separator: <!-- more -->
---

Aujourd'hui on attaque REDUX !!!!

<!-- more -->

**Attention, cet article n'est pas à jour.**

<div id="toc"></div>

<b>Vous pourrez retrouver les sources de la leçon précédente à l'adresse suivante : </b>[github lecon_3](https://github.com/gkueny/HappyDrink/tree/Lecon_3){:target="\_blank"}

## 1. Rappel de l'organisation du projet

{% highlight cli %}
src
|**_assets
| |
| |_**logo.svg
|
|**_components
| |
| |_**establishments
| | |
| | |**_establishments.js
| | |
| | |_**fixtures.js
| |
| |**_App.js
|
|_**css
| |
| |**_App.css
| |
| |_**index.css
|
|**_App.test.js
|
|_**index.js
{% endhighlight %}

On n'oublie pas de lancer l'application afin de voir les changements dans notre navigateur.

{% highlight cli %}
$ cd HappyDrink
$ npm start
{% endhighlight %}

## 2. Proposition de correction

Rappel de ce que nous voulons faire :

- utiliser Jquery pour faire un appel API :
- faire un appel API sur cette adresse : "https://jsonplaceholder.typicode.com/posts/1"
- afficher le champ "body" de ce que répond l'API

On n'oublie pas d'installer `Jquery` si cela n'est pas encore fait :

{% highlight cli %}
$ npm install --save jquery
{% endhighlight %}

Comme nous l'avions vue, le meilleur endroit pour faire un appel API est la fonction `componentDidMount` :

{% highlight javascript %}
// Fichier : ./src/components.App.js [extrait]

...

var $ = require('jquery');

class App extends Component {

    ...

    constructor(props) {

        super(props);

        this.state = {
            pseudo      : "Inconnu",
            dataFromAPI : ""
        }

    }

    componentDidMount () {

        // Pour que cela change à chaque appel :) ( Comment cela je ne respecte pas mes propres consignes ? )
        const random = Math.floor(Math.random() * 99) + 1

        let cpThis = this
        $.get( "https://jsonplaceholder.typicode.com/posts/" + random, function( data ) {
            cpThis.setState({
                dataFromAPI : data.body
            })
        })

    }

    ...

    render() {

        const listEstablishment = establishments.map( (establishment) => {
            return (
                <Establishment
                    key={ establishment.id }
                    establishment={ establishment }
                />
            )
        })

        return (
            <div className="App">

                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <h2>Welcome "{ this.state.pseudo }" to { this.props.title }</h2>

                </div>

                <div className="App-intro">

                    <p> <a onClick={ this.randomPseudo } >Changer le pseudo !</a> </p>

                    <section>
                        { listEstablishment }
                    </section>

                    <section>
                        { this.state.dataFromAPI }
                    </section>

                </div>

            </div>
        );
    }

}

export default App;
{% endhighlight %}

![Screenshot 0](/assets/HappyDrink_Lecon_4_1.gif)

On peut très bien utiliser `Jquery` pour nos appels http. Mais laissez-moi vous montrer une alternative, `fetch` :

{% highlight javascript %}
// Fichier : ./src/components/App.js [extrait]

componentDidMount () {

    const random = Math.floor(Math.random() * 99) + 1
    fetch('https://jsonplaceholder.typicode.com/posts/' + random)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataFromAPI : responseJson.body
            })
        })
        .catch((error) => {
            console.error(error);
        });

}

{% endhighlight %}

Personnellement je préfère utiliser `fetch`, car cela m'évite de m'encombrer avec `Jquery`. Mais vous pouvez utiliser ce avec quoi vous êtes le plus familier.

## 3. REDUX

La première chose importante à savoir est que vous n'avez pas besoin de `Redux` pour réaliser une application `React`.

    Mais alors pourquoi l'utiliser ? Notre application marche très bien sans, n'est-ce pas ?

Alors en effet, les bénéfices de `Redux` pour une petite application peuvent être discutables. <br/>
Mais laissez-moi tout de même vous expliquer pourquoi j'ai adopté Redux, et comment l'implémenter.

### Redux c'est quoi ? Cela fonctionne comment ?

`Redux` c'est une librairie, qui a pour but de manager le `state` de votre application.

`Redux` part de plusieurs principes fondamentaux :

- Il offre `un seul et même container` pour tout le `state` de votre application. C'est-à-dire que celui-ci va être géré au même endroit.
- Le state `ne peut être modifié`. Chaque changement que nous opérerons se concrétise par la création d'un nouvel objet `state` reprenant l'ancien et en y apportant des modifications.
- Chaque changement est décrit par une `action`. Les `components` ne connaissent pas la façon dont le `state` va changer. Ils `dispatchent` (envoient) seulement une action qui décrit le changement à effectuer.

#### Ce que j'y vois de bien

- Tout d'abord, `Redux` permet de séparer la logique du state de vos `components`.
  Ceux-ci vont se contenter d'afficher les variables du `state` et de `dispatcher` des `actions` afin de le modifier.
  Ils ne savent pas comment cela se passe et tant mieux.
  Nous pourrons changer toute la logique derrière sans toucher aux components eux-mêmes.
- Tout le `state` de l'application se trouve au même endroit. Cela nous permet de mieux nous y retrouver et par la suite de plus facilement sauvegarder celui-ci.
- Le `state` devient immuable. À chaque `action dispatchée`, nous pourrons voir l'ancien et le nouveau `state`. Et ainsi déboguer plus facilement.

Dans de grosse applications, `Redux` permet de mieux s'y retrouver.
Dans notre cas, cela va surtout surcharger l'application. Même si, comme nous le verrons, cela facilitera la persistance de notre `state`. <br/>
À titre personnel, je suis adepte du `Redux` partout. Je me suis habitué à son architecture et cela me permet de bien partitionner mon application.

#### Petit tout d'horizon de `Redux`

##### Les actions

Afin de modifier notre `state`, les components vont `dispatcher` une action.

Cette action est un objet, qui décrit le changement à effectuer.

{% highlight javascript %}
// Exemple d'action
{
type : "INCREMENT"
}
{% endhighlight %}

Ci-dessus, on peut voir le minimum syndical d'une action.

Le type de l'action permet d'indiquer les modifications à effectuer sur `state`. Un type correspondant, en général, à une modification précise du `state`. <br/>
Ici on pourrait imaginer que cela correspond à l'incrémentation d'un compteur.

Cependant, on a souvent besoin de décrire plus précisément l'action. <br/>
Par exemple, pour nos "like" et "dislike", il nous faudrait également préciser l'id de l'établissement auquel on applique cette action :

{% highlight javascript %}
// Exemple d'action plus détaillée
{
type : "LIKE",
data : {
id : 1
}
}
{% endhighlight %}

##### Les reducers

Une fois l'action " `dispatchée` ", nous avons besoin de fonctions qui écoutent les actions et modifient le `state` en conséquence. <br/>
Ce sont les `reducers`. <br/>
Chaque `reducer` prend en charge une partie du `state`. Un `reducer` a pour but de décrire le `state` initial et de retourner le nouveau `state` pour les différents types d'actions qu'il prend en charge :

{% highlight javascript %}
// Exemple de reducer

const initialState = {
test: "test"
}

const testReducer = (state = initialState, action) => {

    switch (action.type) {

        case "TEST" :

            return {
                ...state,
                test : action.data.test
            }
        default:

            return state
    }

}

export default testReducer

{% endhighlight %}
On définit une fonction qui prend en paramètre le `state` actuel et l'action qui a été " `dispatchée` ". Si le paramètre `state` de notre fonction vaut `undefined`, alors on l'initialise en indiquant une valeur par défaut.
Enfin, on retourne le nouveau `state` selon le type de l'action.

<b>Il est important de ne pas modifier le state courant et de retourner un nouvel objet !</b> <br/>
C'est pourquoi on utilise la notation `{ ...state, test : action.data.test }` qui nous permet de retourner un nouvel objet à partie de celui indiqué après `...` (ici : `state`) et de modifier les paramètres spécifiés. <br/>
De plus il ne faut pas oublier le `default` de notre switch, car un reducer doit toujours renvoyer une réponse.

##### Les containers

Le container a pour but de faire le lien entre le `state` géré par `Redux` et les `props` du `component`. Il définit également des fonctions qui `dispatchent` des actions afin de mettre à jour le `state`.

{% highlight javascript %}
// Exemple d'un container

// On installera cela après, ne vous inquiétez pas ;)
import { connect } from 'react-redux'

import EstablishmentComponent from '../components/establihment/Establihment'
import \* as testAction from '../actions/testAction'

const mapStateToProps = (state) => {
return {
state: {
test : state.test
}
}
}

const mapDispatchToProps = (dispatch) => {
return {
test : dispatch(testAction.test)
}
}

const EstablishmentContainer = connect(
mapStateToProps,
mapDispatchToProps
)(EstablishmentComponent)

export default EstablishmentContainer

{% endhighlight %}

- `mapStateToProps` a pour rôle de retourner le `state` qui sera "attaché" aux `props` du component. <br/>
- `mapDispatchToProps`, quant à elle, définit plusieurs fonctions qui seront accessible via les `props` du component. <br/>
  Celles-ci ont pour but de `dispatcher` une action.
- enfin, on " `connecte` " le container à son component. <br/>
  Le state et les fonctions définies plus haut seront ainsi accessibles par le component "connecté" (ici `EstablishmentComponent`) via ses `props`

p.s : on reparlera de la fonction `connect`.

## 4. Implémentation

Vous avez surement la tête tout embrouillée après le petit cours ci-dessus. Je vous propose donc de mettre en place l'architecture `Redux` dans notre application afin d'avoir un exemple concret.

_`/!\SPOILER/!\`_ cela peut paraître un peu long, _Accrochez-vous, je vous jure ce n'est pas compliqué du tout !_ :) _`/!\SPOILER/!\`_

### Installation de redux

Afin d'utiliser `Redux` avec `React`, nous avons besoin d'installer les packages `redux` et `react-redux` :

{% highlight cli %}
$ npm install redux --save
$ npm install react-redux --save
{% endhighlight %}

## 4.1 Création des actions

Dans un premier temps, définissons les types d'actions que réalise notre application :

{% highlight javascript %}
// Fichier : ./src/actions/actionsTypes.js [nouveau fichier]

// establishments
export const LIKE = "LIKE"
export const DISLIKE = "DISLIKE"
export const FAVORI = "FAVORI"

// App
export const SETDATAFROMAPI = "SETDATAFROMAPI"
export const SETPSEUDO = "SETPSEUDO"
{% endhighlight %}

Maintenant que nous avons défini les types d'actions, écrivons les actions elles-mêmes :

{% highlight javascript %}
// Fichier : ./src/actions/establishmentActions.js [nouveau fichier]

import \* as types from './actionsTypes'

export function like(idEstablishment) {

    return {
        type: types.LIKE,
        data: {
            idEstablishment : idEstablishment
        }
    }

}

export function dislike(idEstablishment) {

    return {
        type: types.DISLIKE,
        data: {
            idEstablishment : idEstablishment
        }
    }

}

export function favori(idEstablishment) {

    return {
        type: types.FAVORI,
        data: {
            idEstablishment : idEstablishment
        }
    }

}
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/actions/appActions.js [nouveau fichier]

import \* as types from './actionsTypes'

export function setDataFromApi(text) {

    return {
        type: types.SETDATAFROMAPI,
        data: {
            text : text
        }
    }

}

export function setPseudo(pseudo) {

    return {
        type: types.SETPSEUDO,
        data: {
            pseudo : pseudo
        }
    }

}
{% endhighlight %}

Ici, rien de bien compliqué. Nous définissons une fonction par action, qui retourne un objet avec :

- un type (le type de l'action)
- des "datas" (les informations supplémentaires dont nous avons besoin dans nos futurs `reducers`)

### 4.2 Création des reducers

Ici, nous allons créer trois reducers.

- le premier prendra en charge le state de notre `component` App
- le second celui de Establishment.
- le troisième combinera les deux en un seul

{% highlight javascript %}
// Fichier : ./src/reducers/appReducer.js [nouveau fichier]

import \* as types from '../actions/actionsTypes'

const initialState = {
dataFromAPI : "",
pseudo : "Inconnu"
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SETDATAFROMAPI :

            return {
                ...state,
                dataFromAPI : action.data.text
            }

        case types.SETPSEUDO :

            return {
                ...state,
                pseudo : action.data.pseudo
            }

        default:

            return state
    }

}

export default appReducer
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/reducers/establishmentReducer.js [nouveau fichier]

import \* as types from '../actions/actionsTypes'

import { establishments } from '../components/establishments/fixtures'

let initialState = []

establishments.map((establishment) => {
initialState.push({
id : establishment.id,
name : establishment.name,
description : establishment.description,
isLiked : false,
isDisliked : false,
likeCounter : 0,
dislikeCounter : 0,
favori : false
})
return establishment
})

const establishment = (state = {}, action) => {

    switch (action.type) {

        case types.LIKE :

            if (state.id !== action.data.idEstablishment)
                return state

            return {
                ...state,
                isLiked         : !state.isLiked,
                isDisliked      : state.isDisliked ? !state.isDisliked : state.isDisliked,
                likeCounter     : !state.isLiked ? state.likeCounter + 1 : state.likeCounter - 1,
                dislikeCounter  : state.isDisliked ? state.dislikeCounter - 1 : 0
            }

        case types.DISLIKE :
            if (state.id !== action.data.idEstablishment)
                return state

            return {
                ...state,
                isLiked         : state.isLiked ? !state.isLiked : state.isLiked,
                isDisliked      : !state.isDisliked,
                likeCounter     : state.isLiked ? state.likeCounter - 1 : 0 ,
                dislikeCounter  : !state.isDisliked ? state.dislikeCounter + 1 : state.dislikeCounter - 1
            }

        case types.FAVORI :
            if (state.id !== action.data.idEstablishment)
                return state

            return {
                ...state,
                favori : !state.favori
            }

        default:
            return state
    }

}

const establishmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.LIKE :
            return state.map(establishmentState =>
                establishment(establishmentState, action)
            )


        case types.DISLIKE :
            return state.map(establishmentState =>
                establishment(establishmentState, action)
            )

        case types.FAVORI :
            return state.map(establishmentState =>
                establishment(establishmentState, action)
            )

        default:
            return state

    }

}

export default establishmentsReducer
{% endhighlight %}

    Houla !!! Celui-ci est un peu compliqué non :o ?! En plus, il y en a deux d'un coup !

Oui, en effet, `establishmentsReducer` peut paraître compliqué, au premier abord. <br/>
Détaillons un peu ce que nous y faisons :

{% highlight javascript %}
// Fichier : ./src/reducers/establishmentReducer.js [Extrait]

import { establishments } from '../components/establishments/fixtures'

let initialState = []

establishments.map((establishment) => {
initialState.push({
id : establishment.id,
name : establishment.name,
description : establishment.description,
isLiked : false,
isDisliked : false,
likeCounter : 0,
dislikeCounter : 0,
favori : false
})
return establishment
})
{% endhighlight %}

Dans un premier temps, nous importons les établissements de notre `fixture` et nous créons pour chacun d'eux un `state` initial.

{% highlight javascript %}
// Fichier : ./src/reducers/establishmentReducer.js [Extrait]

const establishment = (state = {}, action) => { ... }
{% endhighlight %}

Ensuite, nous définissons le reducer associé au `state` d'un seul établissement.

{% highlight javascript %}
// Fichier : ./src/reducers/establishmentReducer.js [Extrait]

const establishmentsReducer = (state = initialState, action) => { .. }
{% endhighlight %}

Et enfin, nous définissons le `reducer` global qui, pour chaque action, appelle le `reducer` establishment en lui passant le `state` d'un seul établissement à la fois.

Plus tard nous récupèrerons les établissements par une API. Ainsi, le `state` initial sera vide, mais nous appelerons une nouvelle action "ADDESTABLISHMENT" qui s'occupera de créer un nouveau `state` pour chaque établissement récupéré. <br/>

Il ne nous manque plus qu'à connecter nos deux `reducers` en un seul et même `reducer` :

{% highlight javascript %}
// Fichier : ./src/reducers/index.js [nouveau fichier]

import { combineReducers } from 'redux'

import appReducer from './appReducer'
import establishmentReducer from './establishmentReducer'

const allReducers = combineReducers({
app : appReducer,
establishments : establishmentReducer
})

export default allReducers

{% endhighlight %}

La fonction `combineReducers` nous permet de faire cela en créant un nouveau `state`.

- Le state managé par `appReducer` sera accessible à la clé `app`.
- De même, le state managé par `establishmentReducer` sera accessible à la clé `establishment`.

Maintenant que nous avons créé notre nouveau `state`, il faut le rendre accessible pour notre application :

{% highlight javascript %}
// Fichier : ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import allReducers from './reducers'
import App from './components/App';

import './css/index.css';

const store = createStore(allReducers)

ReactDOM.render(
<Provider store={ store }>

        <App title="HappyDrink"/>

    </Provider>,

    document.getElementById('root')

)
{% endhighlight %}

Dans notre fichier `index.js`, qui est l'entrée de notre application, nous créons un `store`, via la fonction `createStore` de `Redux`, à partir du `reducer` global précédemment construit.

Le `store` est l'élément qui contient tout le `state` de notre application. <br/>
Le seul moyen de modifier le `state` géré par celui-ci est de `dispatcher` les actions précédemment construites.
Nous allons voir tout de suite après le moyen de le faire.

Enfin `react-redux` nous fournit l'élément `Provider` qui nous permet de rendre accessible le `store` précédemment créé via la fonction `connect()`. Nous utiliserons celle-ci dans nos `containers`.

### 4.3 Création des containers

Maintenant que nous avons construit toute l'architecture `Redux`, il est temps de connecter cela à nos `components`. Et cela se fait via les `containers` :

{% highlight javascript %}
// Fichier : ./src/containers/appContainer.js

import { connect } from 'react-redux'

import \* as appActions from '../actions/appActions'

import App from '../components/App'

const mapStateToProps = (state) => {
return {
state: {
app : state.app,
establishments : state.establishments
}
}
}

const mapDispatchToProps = (dispatch) => {
return {
getDataFromApi : () => {

            console.log("getDataFromApi");
            const random = Math.floor(Math.random() * 99) + 1

            fetch('https://jsonplaceholder.typicode.com/posts/' + random)
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch(appActions.setDataFromApi(responseJson.body))
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        randomPseudo : () => {
            let randomPseudo    = ""
            const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

            const size          = Math.floor(Math.random() * 10) + 5

            for( let i=0; i < size; i++ )
                randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))

            dispatch(appActions.setPseudo(randomPseudo))
        }
    }

}

const AppContainer = connect(
mapStateToProps,
mapDispatchToProps
)(App)

export default AppContainer
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/containers/establishmentContainer.js

import { connect } from 'react-redux'

import \* as establishmentActions from '../actions/establishmentActions'

import Establishment from '../components/establishments/Establishment'

const mapStateToProps = (state) => {
return {
state: {
establishment : state.establishments
}
}
}

const mapDispatchToProps = (dispatch) => {
return {

        like : (idEstablishment)    => {

    		dispatch(establishmentActions.like(idEstablishment))

    	},
        dislike : (idEstablishment)    => {

    		dispatch(establishmentActions.dislike(idEstablishment))

    	},
        favori : (idEstablishment)    => {

    		dispatch(establishmentActions.favori(idEstablishment))

    	}
    }

}

const EstablishmentContainer = connect(
mapStateToProps,
mapDispatchToProps
)(Establishment)

export default EstablishmentContainer
{% endhighlight %}

Rien de bien nouveau vu ici, par rapport à la présentation générale du container vu plus haut.

- `mapStateToProps` prend en paramètre le `state` général du l'application et retourne le `state` auquel il `s'abonne`. Celui-ci sera accessible dans notre `component` via ses `props` <br/>
- `mapDispatchToProps` prend en paramètre la fonction `dispatch` de `Redux` et retourne un ensemble de fonctions qui seront également accessible via les `props` de notre component.

On retrouve la fonction `connect()` de `Redux` qui nous permet d'utiliser le `state` géré par redux, et qui lie notre `container` à son `component`. <br/>

### 4.4 Dernière étape

Okey, tout est bon. Il ne manque plus qu'à adapter nos `components`.

{% highlight javascript %}
// Fichier: ./src/index.js [Extrait]

...

import AppContainer from './containers/appContainer';

...

ReactDOM.render(
<Provider store={ store }>

        <AppContainer title="HappyDrink"/>

    </Provider>,

    document.getElementById('root')

);

{% endhighlight %}

Eh oui, maintenant on utilise les `containers`. Ce sont eux qui se chargent d'initialiser leur `component`, et donc ce sont eux que l'on appelle à la place du `component` lui-même.

{% highlight javascript %}
// Fichier: ./src/components/App.js [Extrait]

...

import EstablishmentContainer from '../containers/establishmentContainer'

class App extends Component {

    componentDidMount () {

        this.props.getDataFromApi()
    }

    render() {

        const listEstablishment = this.props.state.establishments.map( establishment => {
            return (
                <EstablishmentContainer
                    key={ establishment.id }
                    establishment={ establishment }
                />
            )
        })

        return (
            <div className="App">

                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <h2>Welcome "{ this.props.state.app.pseudo }" to { this.props.title }</h2>

                </div>

                <div className="App-intro">

                    <p> <a onClick={ this.props.randomPseudo } >Changer le pseudo !</a> </p>

                    <section>
                        { listEstablishment }
                    </section>

                    <section>
                        { this.props.state.app.dataFromAPI }
                    </section>

                </div>

            </div>
        )
    }

}

export default App;
{% endhighlight %}

{% highlight javascript %}
// Fichier: ./src/components/estbalishments/Establishment.js [Extrait]

...

class Establishment extends Component {

    render() {

        let id = this.props.establishment.id

        let upIcon      = <i className="fa fa-thumbs-up" aria-hidden="true"></i>
        let downIcon    = <i className="fa fa-thumbs-down" aria-hidden="true"></i>

        let starIcon    = <i className="fa fa-star-o" aria-hidden="true"></i>


        if(!this.props.establishment.isLiked)
            upIcon = <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>

        if(!this.props.establishment.isDisliked)
            downIcon = <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>

        if (this.props.establishment.favori) {
            starIcon = <i className="fa fa-star favoriIcon" aria-hidden="true"></i>
        }

        return (
            <div className='establishment' >
                <div className='establishment-favori' >
                    <button onClick={() => this.props.favori(id)}>{ starIcon }</button>
                </div>
                <div className='establishment-description' >
                    <h3>{ this.props.establishment.name }</h3>

                    { this.props.establishment.description }
                </div>
                <div className='establishmentLikeDislike' >
                    <button onClick={() => this.props.like(id)}>{ upIcon } </button> <span>{ this.props.establishment.likeCounter }</span>
                    <button onClick={() => this.props.dislike(id)}>{ downIcon }</button> <span>{ this.props.establishment.dislikeCounter }</span>
                </div>

            </div>
        );
    }

}

...
{% endhighlight %}

<center>
    ET BA VOILÀ, ENFIN FINI !!! :)
</center>

![Screenshot 1](/assets/HappyDrink_Lecon_4.gif)

## 5. Récapitulatif

### Organisation du projet

{% highlight cli %}
src
|**_actions
| |
| |_**actionsTypes.js
| |
| |**_appActions.js
| |
| |_**establishmentActions.js
|
|**_assets
| |
| |_**logo.svg
|
|**_components
| |
| |_**establishments
| | |
| | |**_establishments.js
| | |
| | |_**fixtures.js
| |
| |**_App.js
|
|_**containers
| |
| |**_appContainer.js
| |
| |_**establishmentContainer.js
|
|**_css
| |
| |_**App.css
| |
| |**_index.css
|
|_**reducers
| |
| |**_appReducer.js
| |
| |_**establishmentReducer.js
| |
| |**_index.js
|
|_**App.test.js
|
|\_\_\_index.js
{% endhighlight %}

### Laborieux ?

La mise en place de `Redux` est en effet assez longue et possiblement laborieuse les premières fois. <br/>
Cependant, on a maintenant tout notre `state` au même endroit et géré de la meilleure des façons possibles ( comment cela mon avis est biaisé ? )

Si je pouvais rajouter un avantage de `Redux`, c'est celui de permettre à plusieurs `components` de partager le même `state` sans n'avoir aucune relation entre eux. Ici nous n'en avions pas besoin, mais dans des applications complexes, il n'est pas exclu de modifier le même élément du `state` à plusieurs endroits.

### Regardons un peu l'avancement de notre projet HappyDrink :

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i> `Lister` les bars.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i> `filtrer` la liste.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i> `mettre en favori` un bar.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i> `visualiser l'happy-hour` de celui-ci.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i> `Liker/disliker` ce bar.

Bonus :

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i> Implémenter Redux

<b>Vous pourrez retrouver les sources de cette leçon à l'adresse suivante :</b> [github lecon_4](https://github.com/gkueny/HappyDrink/tree/Lecon_4){:target="\_blank"}

## 6. Pour la suite

Ce que je vous propose maintenant, c'est de filtrer notre liste de bars par leurs noms :

- ajouter un input de type `text`
- filtrer la liste selon ce qui est rentré dans cet input

<center>
    À plus !
</center>

<center>

    ↓ Prochaine leçon dans ↓

</center>