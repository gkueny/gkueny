---
layout: post
title:  "React - Leçon 7"
author: Gkueny
date: Mon Dec 12 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_2.png
comments: true
timerArticle: Mon Dec 12 2016 20:00:00 GMT+0100 (CET)
timerNextArticle: Thu Dec 16 2016 20:00:00 GMT+0100 (CET)
excerpt_separator: <!-- more -->
---
Notre application `React` est fini ! Ou pas ?
<!-- more -->

<div id="toc"></div>

<b>Vous pourrez retrouver les sources de la leçon précédente à l'adresse suivante : </b>
[github lecon 6](https://github.com/gkueny/HappyDrink/tree/Lecon_6)

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

On n'oublie pas de lancer l'application afin de voir les changements dans notre navigateur.

{% highlight cli %}
$ cd HappyDrink
$ npm start
{% endhighlight %}

## 2. Finalisation de l'application

Dans un premier temps, finalisons notre petite application :).

### a. Une vraie API

Depuis le début de cette série de leçon, nous utilons des données écrites en dure dans notre application. Mais une "vraie" application fais appelle à une API pour cela ( question du jour : quelle est la défnition d'une vraie application ? ;) ).  <br/>

#### json-server
Du coup aujourd'hui nous allons à la place appeler une API grâce à `json-server` qui nous permet de créer une fausse API rapidement (oups oui, nos données seront toujours de "fausses données").

{% highlight cli %}
$ npm install --save json-server
{% endhighlight %}

Maintenant, créons le fichier `db.json` qui contiendra nos "fausses données" :

{% highlight json %}
// Fichier : ./db.json [nouveau fichier]

{
    "establishments": [
        {
            "id"          : "0890786GH",
            "name"        : "Tonton",
            "description" : "Un super bar étudiant",
            "happyhour"   : {
                "text"        : "Des verres gratuits jusqu'au bout de la nuit",
                "time"        : "20H00 - 02H00"
            }
        },
        {
            "id"          : "0890786GD",
            "name"        : "The Londow Town",
            "description" : "Un super bar à bière",
            "happyhour"   : {
                "text"        : "Une bierre acheté, une bière offerte",
                "time"        : "21H30 - 23H00"
            }
        },
        {
            "id"          : "MJLMH0389",
            "name"        : "Australian Bar",
            "description" : "Un super bar dansant",
            "happyhour"   : {
                "text"        : "10 shot pour le prix d'un",
                "time"        : "22H00 - 22H30"
            }
        }
    ]
}
{% endhighlight %}

Il ne nous manque plus qu'à lancer le serveur de l'API :

{% highlight cli %}
// A la racine du projet :
$ json-server --watch db.json
{% endhighlight %}

Et voilà, vos données sont accessible ici : [http://localhost:3000/establishments](http://localhost:3000/establishments)

### b. Récuperer les données depuis l'API

Maintenant que nous avons notre propre API, il va nous être nécessaire de modifier notre application afin de récupérer nos établissements, non pas depuis notre fichier de `fixture` mais, depuis notre nouvelle API !

##### Actions et reducers

Vous vous rappelez quand nous avions parlé de l'action "ADDESTABLISHMENT" pour récupérer les établissements depuis une API dans la [leçon sur redux]({{site.url}}/react-lecon-4/#42-création-des-reducers) ? Eh bien, c'est le moment d'implémenter cette fonctionnalité.

Mettons donc à jours nos `actions` et nos `reducer` :

{% highlight javascript %}
// Fichier : ./src/actions/actionsTypes.js [extrait]

// establishments
export const ADDESTABLISHMENT   = "ADDESTABLISHMENT"

...
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/actions/establishmentActions.js [extrait]

...

export function addEstablishment(establishment) {

    return {
        type: types.ADDESTABLISHMENT,
        data: {
            establishment : establishment
        }
    }
}
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/reducers/establishmentReducer.js [extrait]

...

let initialState = []

// establishments.map((establishment) => {
//     initialState.push({
//        ...
//     })
//     return establishment
// }) // On supprime cette partie

const establishment = (state = {}, action) => {

    switch (action.type) {

        case types.ADDESTABLISHMENT :
            return {
                id              : action.data.establishment.id,
                name            : action.data.establishment.name,
                description     : action.data.establishment.description,
                happyhour       : action.data.establishment.happyhour,
                isLiked         : false,
                isDisliked      : false,
                likeCounter     : 0,
                dislikeCounter  : 0,
                favori          : false,
                visible         : true
            }

        ...
    }
}


const establishmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.ADDESTABLISHMENT :
            return [
                ...state,
                establishment(undefined, action)
            ] // On retourne un nouveau tableau à partir du state actuel, avec le nouvelle établissement

        ...

    }

}

export default establishmentsReducer

{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/reducers/appReducer.js [extrait]

...

const initialState = {
    loadingStorage  : true,
    dataFromAPI     : "",
    pseudo          : "Inconnu",
    textFilter      : ""
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case REHYDRATE:

          var incoming = action.payload.app

          if (incoming)
            return {
                ...state,
                ...incoming,
                loadingStorage  : false,
                loadingAPI      : true,
                textFilter      : ""
            }

          return state

        ...
    }
}

export default appReducer


{% endhighlight %}

Dans `appReducer`, nous ajoutons la variable `loadingStorage`. Celle-ci nous permet de connaître le moment où notre application a finit de mettre à jour le `state` à partir du stockage local. Cela va nous permettre de ne faire l'appelle API que dans le cas ou l'utilisateur n'a pas encore stocké les données.

##### Container et component

Maintenant que tout est prêt pour ajouter les établissements récupérer de l'API, mettons à jour notre `container`/`component` principal :

{% highlight javascript %}
// Fichier : ./src/containers/appContainer.js [extrait]

import * as establishmentActions  from '../actions/establishmentActions' // add

...

const mapDispatchToProps = (dispatch) => {
    return {
        getEstablishmentsFromApi : () => {
            fetch('http://localhost:3000/establishments')
                .then((response) => response.json())
                .then((establishments) => {
                    console.log("Download establishments")
                    establishments.forEach((establishment) => {
                        dispatch(establishmentActions.addEstablishment(establishment))
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        ...
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer

{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/components/App.js [extrait]

...

class App extends Component {

    ...

    componentDidUpdate(prevProps) {
        if( prevProps.state.app.loadingStorage !== this.props.state.app.loadingStorage ) {
            if ( this.props.state.establishments.length === 0 ) {
                this.props.getEstablishmentsFromApi()
            } else {
                console.log("Establishments are already present in our store")
            }
        }
    }


    ...
}

export default App
{% endhighlight %}

Ici, nous récupérons les établissements de l'API seulement si notre `store` a finit de se réhydrater et que la variable `establishments`du `state` est toujours vide.

N'oubliez pas de purger votre `store` afin de mettre de le mettre à jour :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

persistStore(store).purge()
{% endhighlight %}

![ScreenShot 1](assets/HappyDrink_Lecon_7_1.gif)

    Une bonne chose de faite !

### c. Loader

Vous avez dû certainement le remarquer, ce qui est embêtant avec les fonctions asynchrones c'est justement qu'elles sont asynchrones. Et dans notre cas, l'application affiche pendant quelques dixième de secondes les variables du `state` par défaut, avant de les mettres à jours à partir du du stockage local.

C'est un peu embêtant.

Je vous propose donc de réaliser un loader qui disparaitra pour laiser place à l'application une fois la récupération des données locals terminé. Et tant qu'on y est mettons également un loader pour les établissements (si on réalise un appel API, ils arriveront un peut après la récupération des données locales).
