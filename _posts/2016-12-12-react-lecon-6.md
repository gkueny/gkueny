---
layout: post
title:  "Naviguer dans son application React"
author: Gkueny
date: Mon Dec 12 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_2.png
comments: true
timerArticle: Mon Dec 12 2016 20:00:00 GMT+0100 (CET)
timerNextArticle: Thu Dec 16 2016 20:00:00 GMT+0100 (CET)
keywords: "react, redux, tutorial, react lecon 6, routing, react-router, react-router-redux"
excerpt_separator: <!-- more -->
---
Une application `React` c'est cool, mais pouvoir naviguer entre plusieurs pages c'est mieux non ?
<!-- more -->

<div id="toc"></div>

<b>Vous pourrez retrouver les sources de la leçon précédente à l'adresse suivante : </b>
[github lecon 5](https://github.com/gkueny/HappyDrink/tree/Lecon_5){:target="\_blank"}

*[12/12/2016]* Petite info avant de commencer : J'ai fait une petite erreur (maintenant corrigée) dans le fichier `./src/reducers/establishmensReducer.js` lors de la dernière leçon, ainsi il faut écrire :

{% highlight javascript %}
// Fichier : ./src/reducers/establishmensReducer.js [extrait]

...

const establishmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case REHYDRATE :
            // [Edit du 12/12/2016]
            if(action.payload.establishments) // On vérifie que le paramètre est bien disponible
                return action.payload.establishments.map(establishmentState =>
                    establishment(establishmentState, action)
                )
            // Sinon on retourne le state initial
            return state

        ...

    }

}
{% endhighlight %}

## 1. Rappel de l'organisation du projet

{% highlight cli %}
src
|___actions
|   |
|   |___actionsTypes.js
|   |
|   |___appActions.js
|   |
|   |___establishmentActions.js
|
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
|___containers
|   |
|   |___appContainer.js
|   |
|   |___establishmentContainer.js
|
|___css
|   |
|   |___App.css
|   |
|   |___index.css
|
|___reducers
|   |
|   |___appReducer.js
|   |
|   |___establishmentReducer.js
|   |
|   |___index.js
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

Et non pas de correction pour une fois ! Entrons tout de suite dans le vif du sujet ;)

## 3. Routing

Jusqu'à maintenant, notre application se cantonnait à une seul page.
Or, nous, on aimerait bien que lorsque l'on clique sur le lien "Voir l'happy-hour" d'un établissement,
l'application nous dirige vers une nouvelle page, d'url `/happyhour/[id de notre etablissement]` et nous affiche l'happy-hour correspondante.

Eh bien devinez quoi ? J'ai la solution à ce petit problème !

### react-router et react-router-redux

Cette fois-ci, nous allons utiliser les packages npm `react-router` et `react-router-redux`:

{% highlight cli %}
$ npm install --save react-router
$ npm install --save react-router-redux
{% endhighlight %}

Le premier nous permet de synchroniser notre interface `React` avec l'url ( exactement ce que l'on veut \o/ ). <br/>
Le second, quant à lui, nous permet de synchroniser tout cela avec `Redux`.

### Implémentation


Nous allons avoir besoin de modifier le point d'entrée de notre application afin de mettre en place le `routing` :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

...

import { Router, Route,IndexRoute, browserHistory }     from 'react-router'
import { syncHistoryWithStore }                         from 'react-router-redux'

const store = createStore(allReducers, undefined, autoRehydrate())

// On crée un nouvel historique à partir de celui fourni par react-router. Ceci afin de synchroniser les évènements de navigation avec notre store
const history = syncHistoryWithStore(browserHistory, store)

persistStore(store)

ReactDOM.render(

    <Provider store={ store }>
{/*  On créé notre router en lui passant en paramètre notre historique modifié \*/}
        <Router history={history}>

            {/* On définit notre route \*/}
            <Route path="/" component={(props) => <AppContainer {...props} title="HappyDrink"/>}></Route>

        </Router>

    </Provider>,

    document.getElementById('root')
)

{% endhighlight %}

petit zoom sur cette partie de code :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

<Route path="/" component={(props) => <AppContainer {...props} title="HappyDrink"/>}></Route>
{% endhighlight %}

Ici nous définissons notre première route. Notre `AppContainer` sera ainsi accessible à l'url `/`.

La notation : `component={(props) => <AppContainer {...props} title="HappyDrink"/>}` permet de passer des `props` supplémentaires. Sinon, nous aurions simplement écrit : `component={AppContainer}`

Il ne nous manque plus qu'à mettre à jour notre `store` :

{% highlight javascript %}
// Fichier : ./src/reducers/index.js [extrait]

...

import { routerReducer }  from 'react-router-redux'

const allReducers = combineReducers({
    app : appReducer,
    establishments : establishmentReducer,
    routing : routerReducer
})

export default allReducers
{% endhighlight %}

Avec ceci, nous aurons accès au `state` de notre `routing` :).


#### Route imbriqué

    Bon, c'est bien tout cela, mais notre header :

![header](assets/header_lecon_6.png)

    nous allons l'utiliser tout le long de l'application, et on ne va quand même pas faire du copier-coller ? si ?

Alors, non en effet. Pour cela, nous allons imbriquer nos routes comme cela :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

...

import AppContainer from './containers/appContainer';
import HomeContainer from './containers/homeContainer';

...

ReactDOM.render(
    <Provider store={ store }>

        <Router history={history}>
            <Route path="/" component={(props) => <HomeContainer {...props} title="HappyDrink"/>}>
                <IndexRoute component={AppContainer}/>
                <Route path="/example" component={UnComponentQuiNexistePasCarIlSertDExampleDeRouteSupplementaire} />
            </Route>
        </Router>

    </Provider>,

    document.getElementById('root')
)
{% endhighlight %}

Nous définissons une route d'url `/` lié au `container` `HomeContainer` qui sera notre "template" ( on construira tout de suite après le `HomeContainer` et son `component`). <br/>
Ensuite, à l'intérieur de celle-ci, nous définissons les routes "enfants" (`IndexRoute` permet de définir la route par défaut).


Ainsi, pour chacunes des urls "enfants", ce sera le `component` parent qui sera appelé. <br/>
Pour afficher le contenu du `component` "enfant" lié à l'url appelée (c'est quand même ce que l'on veut faire), il sera nécessaire d'utiliser la variable `this.props.children` dans le `component` parent.

Voyons tout de suite cela en application.

##### Container et component Home

{% highlight javascript %}
// Fichier : ./src/containers/homeContainer.js [nouveau fichier]

import { connect }  from 'react-redux'

import Home         from '../components/home'

const mapStateToProps = (state) => {
    return {
        state: {
            app : state.app
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default HomeContainer
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/components/home.js [nouveau fichier]

import React, { Component } from 'react'
import logo                 from '../assets/logo.svg'
import '../css/App.css'

class Home extends Component {

    render() {

        return (
            <div className="App">

                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <h2>Welcome "{ this.props.state.app.pseudo }" to { this.props.title }</h2>


                </div>

                {/* On affiche l'enfant courant \*/}
                { this.props.children }

            </div>
        );
    }
}

export default Home;

{% endhighlight %}

##### Mise à jour du `component` App

Maintenant que `home` prend en charge le header, on peut enlever cette partie du `component` App :

{% highlight javascript %}
// Fichier : ./src/components/App.js [extrait]

// On enlève l'import du logo qui ne sert plus à rien ici
// import logo from '../assets/logo.svg'
...
render() {

    ...

    return (
        <div className="App-intro">

            <p> <a onClick={ this.props.randomPseudo } >Changer le pseudo !</a> </p>

            <div>
                <input type="text" placeholder="search" value={this.props.state.app.textFilter} onChange={this.handleChange}/>

            </div>

            <section>
                { listEstablishment }
            </section>

            <section>
                { this.props.state.app.dataFromAPI }
            </section>

        </div>

    )
}

...

{% endhighlight %}

Et voilà ! On se retrouve avec le même affichage que la leçon précédente, mais maintenant notre application est parée pour avoir plusieurs pages :) !

![Application](assets/HappyDrink_Lecon_6_1.gif)


### 4. Les happy-hours

Première étape : mettre à jour nos `fixtures` :

{% highlight javascript %}
// Fichier : ./src/components/establishments/fixtures.js

export const establishments = [
    {
        id          : "0890786GH",
        name        : "Tonton",
        description : "Un super bar étudiant",
        happyhour   : {
            text        : "Des verres gratuits jusqu'au bout de la nuit",
            time        : "20H00 - 02H00"
        }
    },
    {
        id          : "0890786GD",
        name        : "The Londow Town",
        description : "Un super bar à bière",
        happyhour   : {
            text        : "Une bierre achetée, une bière offerte",
            time        : "21H30 - 23H00"
        }
    },
    {
        id          : "MJLMH0389",
        name        : "Australian Bar",
        description : "Un super bar dansant",
        happyhour   : {
            text        : "10 shots pour le prix d'un",
            time        : "22H00 - 22H30"
        }
    }
]

{% endhighlight %}

ainsi que notre reducer `establishmentReducer` :

{% highlight javascript %}
// Fichier : ./src/reducers/establishmentReducer.js [extraint]

...


establishments.map((establishment) => {
    initialState.push({
        id              : establishment.id,
        name            : establishment.name,
        description     : establishment.description,
        happyhour       : establishment.happyhour,
        isLiked         : false,
        isDisliked      : false,
        likeCounter     : 0,
        dislikeCounter  : 0,
        favori          : false,
        visible         : true
    })
    return establishment
})

...

{% endhighlight %}

Vu que nous avons modifié le `state` géré par `Redux`, je vous invite à "purger" votre store :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]
persistStore(store).purge() // Rechargez une fois la page avec `.purge()`, afin de mettre à jour le store stocké, puis vous pouvez l'enlever
{% endhighlight %}

Maintenant que nos données sont prêtes, ajoutons la nouvelle route :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

...

import HappyhourContainer   from './containers/happyhourContainer' // On va le créer par la suite

...

ReactDOM.render(
    <Provider store={ store }>

        <Router history={history}>
            <Route path="/" component={(props) => <HomeContainer {...props} title="HappyDrink"/>}>
                <IndexRoute component={AppContainer}/>

            {/* :id est un paramètre  \*/}
                <Route path="/happyhour/:id" component={HappyhourContainer} />
            </Route>
        </Router>

    </Provider>,

    document.getElementById('root')
)
{% endhighlight %}

Ici, nous indiquons le paramètre `id` dans l'url de notre nouvelle route. Sachez que tout ce qui commence par `:` dans le `path` est un paramètre, cela nous permet de customiser notre url ;). <br/>
Ce paramètre pourra être récupéré par la `prop` `this.props.params[name]` ( Dans notre cas : `this.props.params.id` )

Afin de pouvoir accéder à cette nouvelle route, nous allons utiliser l'élément `Link` fournit par `react-router` :

{% highlight javascript %}
// Fichier : ./src/components/establishments/Establishment.js [extrait]

import React, { Component } from 'react'
import { Link } from 'react-router'

class Establishment extends Component {

    render() {

        let id = this.props.establishment.id
        let url = "/happyhour/" + id

        ...

        return (
            <div className='establishment' >

                ...

                <div className='establishment-description' >

                    ...

                    <div>
                        <Link to={url}>Voir l happy-hour </Link>
                    </div>

                </div>

                ...

            </div>
        );
    }
}

export default Establishment;

{% endhighlight %}

Vous remarquerez, que le paramètre `id` de notre route sera égal à l' `id de l'établissement`. Cela va nous permettre de récupérer par la suite les données dont nous aurons besoin.

Créons maintenant le `container` et le `component` qui se chargeront d'afficher l'happyhour de l'établissement :

{% highlight javascript %}
// Fichier : ./src/containers/happyhourContainer.js

import { connect }  from 'react-redux'

import Happyhour    from '../components/establishments/Happyhour'

const mapStateToProps = (state) => {
    return {
        state: {
            establishments : state.establishments
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const HappyhourContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Happyhour)

export default HappyhourContainer
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/components/establishments/Happyhour.js

import React, { Component } from 'react'

class Happyhour extends Component {

    goBack = () =>
    {
        // Cela nous permet de renvoyer l'utilisateur à la dernière page visitée
        this.props.router.goBack()
    }

    render() {

        let establishment = this.props.state.establishments.find((establishment) =>  establishment.id == this.props.params.id)

        return (
            <div className='happyhour' >
                <button onClick={this.goBack}>  Back </button>
                <h1> Happyhour chez : {establishment.name} </h1>
                <p> Horaire : {establishment.happyhour.time} </p>
                <p> {establishment.happyhour.text}</p>
            </div>
        );
    }
}

export default Happyhour;


{% endhighlight %}

Dans ce `component`, nous récupérons l'établissement selon l'id passé en paramètre de l'url et nous affichons les informations voulues.

![Fin de leçon](assets/HappyDrink_Lecon_6_2.gif)

Et voilà une bonne chose de faite !

## 4. Récapitulatif

### Organisation du projet

{% highlight cli %}
src
|___actions
|   |
|   |___actionsTypes.js
|   |
|   |___appActions.js
|   |
|   |___establishmentActions.js
|
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
|   |   |
|   |   |___Happyhour.js
|   |
|   |___App.js
|   |
|   |___home.js
|
|___containers
|   |
|   |___appContainer.js
|   |
|   |___establishmentContainer.js
|   |
|   |____HappyHourContainer.js
|   |
|   |___homeContainer.js
|
|___css
|   |
|   |___App.css
|   |
|   |___index.css
|
|___reducers
|   |
|   |___appReducer.js
|   |
|   |___establishmentReducer.js
|   |
|   |___index.js
|
|___App.test.js
|
|___index.js
{% endhighlight %}


### Regardons un peu l'avancement de notre projet HappyDrink :

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  `Lister` les bars.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  `filtrer` la liste.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   `mettre en favori` un bar.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   `visualiser l'happy-hour` de celui-ci.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   `Liker/disliker` ce bar.


On a fini notre application !!!

<b>Vous pourrez retrouver les sources de cette leçon à l'adresse suivante : </b>[github lecon_6](https://github.com/gkueny/HappyDrink/tree/Lecon_6){:target="\_blank"}

## 5. Pour la suite

Dans la prochaine et dernière leçon, nous verrons quelques éléments supplémentaires sur `React` et nous peaufinerons notre application (récupérer les données d'une API par exemple).

<center >
    À plus !
</center>

<center >

    ↓ Prochaine leçon dans ↓

</center>
