---
layout: post
title:  "Un dernier mot sur React"
author: Gkueny
date: Thu Dec 16 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_2.png
comments: true
excerpt_separator: <!-- more -->
---
Notre application `React` est finie ! Ou pas ?
<!-- more -->

<div id="toc"></div>

<b>Vous pourrez retrouver les sources de la leçon précédente à l'adresse suivante : </b>
[github lecon 6](https://github.com/gkueny/HappyDrink/tree/Lecon_6){:target="\_blank"}

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

Dans un premier temps, perfectionnons notre petite application :).

### a. Une vraie API

Depuis le début de cette série de leçons, nous utilisons des données écrites en dur dans notre application. Mais une "vraie" application fait appel à une API pour cela ( question du jour : quelle est la définition d'une vraie application ? ;) ).  <br/>

##### json-server

Pour notre application, nous allons appeler une API grâce à `json-server`. Cet outil nous permet de créer une fausse API rapidement (oups oui, nos données seront toujours de "fausses données").

{% highlight cli %}
$ npm install --save json-server
{% endhighlight %}

`Json-server` a besoin d'un fichier servant de base de données. <br/>
Créons le fichier `db.json` qui contiendra celle-ci :

{% highlight json %}
// Fichier : ./db.json [nouveau fichier]

{
  "establishments": [
    {
      "id": "0890786GH",
      "name": "Tonton",
      "description": "Un super bar étudiant",
      "like": 124,
      "dislike": 3,
      "happyhour": {
        "text": "Des verres gratuits jusqu'au bout de la nuit",
        "time": "20H00 - 02H00"
      }
    },
    {
      "id": "0890786GD",
      "name": "The Londow Town",
      "description": "Un super bar à bière",
      "like": 24,
      "dislike": 432,
      "happyhour": {
        "text": "Une bierre acheté, une bière offerte",
        "time": "21H30 - 23H00"
      }
    },
    {
      "id": "MJLMH0389",
      "name": "Australian Bar",
      "like": 324,
      "dislike": 23,
      "description": "Un super bar dansant",
      "happyhour": {
        "text": "10 shot pour le prix d'un",
        "time": "22H00 - 22H30"
      }
    }
  ]
}
{% endhighlight %}

Il ne nous manque plus qu'à lancer le serveur de l'API (pensez à lancer `json-server` avant votre projet, car il utilise par défaut le port 3000 alors que `React` s'adapte si ce port n'est pas disponible)

{% highlight cli %}
// À la racine du projet :
$ json-server --watch db.json
{% endhighlight %}

Et voilà, vos données sont maintenant accessibles à l'adresse suivante : [http://localhost:3000/establishments](http://localhost:3000/establishments){:target="\_blank"}

### b. Récupérer les données depuis l'API

Maintenant que nous avons notre propre API, il va nous être nécessaire de modifier notre application afin de récupérer nos établissements, non pas depuis notre fichier de `fixture`, mais, depuis notre nouvelle API !

Nous allons également en profiter pour récupérer le nombre de `like` et `dislike` depuis l'API.

*Note :* je vous invite également à enlever tout ce qui concerne l'appel API `https://jsonplaceholder.typicode.com/posts/`, qui n'est plus d'actualité. (dans les fichiers : `./src/components/App.js`, `./src/containers/appContainer.js`, `./src/reducers/appReducer`, `./src/actions/actionsTypes.js` et  `./src/actions/appActions.js`)

##### Actions et reducers

Vous vous rappelez quand nous avions parlé de l'action "ADDESTABLISHMENT" pour récupérer les établissements depuis une API dans la [leçon sur redux]({{site.url}}/react-lecon-4/#42-création-des-reducers){:target="\_blank"} ? Eh bien, c'est le moment d'implémenter cette fonctionnalité.

Mettons donc à jour nos `actions` et nos `reducers` :

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
                likeCounter     : action.data.establishment.like,
                dislikeCounter  : action.data.establishment.dislike,
                favori          : false,
                visible         : true
            }

        // On met à jour nos actions "like" et "dislike", dans l'optique de les récupérer par l'API.
        case types.LIKE :

            if (state.id !== action.data.idEstablishment)
                return state

            return {
                ...state,
                isLiked         : !state.isLiked,
                isDisliked      : state.isDisliked ? !state.isDisliked : state.isDisliked,
                likeCounter     : !state.isLiked ? state.likeCounter + 1 : state.likeCounter - 1,
                dislikeCounter  : state.isDisliked ? state.dislikeCounter - 1 : state.dislikeCounter
            }

        case types.DISLIKE :
            if (state.id !== action.data.idEstablishment)
                return state

            return {
                ...state,
                isLiked         : state.isLiked ? !state.isLiked : state.isLiked,
                isDisliked      : !state.isDisliked,
                likeCounter     : state.isLiked ? state.likeCounter - 1 : state.likeCounter ,
                dislikeCounter  : !state.isDisliked ? state.dislikeCounter + 1 : state.dislikeCounter - 1
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
            ] // On retourne un nouveau tableau, à partir du state actuel, contenant le nouvel établissement

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
                textFilter      : ""
            }

            return {
                ...state,
                loadingStorage  : false,
            }

        ...
    }
}

export default appReducer


{% endhighlight %}

Dans `appReducer`, nous ajoutons la variable `loadingStorage`. Celle-ci nous permet de connaître le moment où notre application a fini de mettre à jour le `state` à partir du stockage local. Cela va nous permettre de ne faire l'appel API que dans le cas où l'utilisateur n'a pas encore stocké les données.

##### Containers et components

Maintenant que tout est prêt pour ajouter les établissements récupérés depuis l'API, mettons à jour nos `containers`/`components`.


Dans un premier temps appelons notre API dans nos containers :

{% highlight javascript %}
// Fichier : ./src/containers/appContainer.js [extrait]

import * as establishmentActions  from '../actions/establishmentActions' // ajout

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

Et on met à jour nos fonctions `like` et `dislike` :

{% highlight javascript %}
// Fichier : ./src/containers/EstablishmentContainer.js [extrait]

...

const mapDispatchToProps = (dispatch) => {
    return {

        like : (establishment, isLiked)    => {

            var data = JSON.stringify({
                "id": establishment.id,
                "name": establishment.name,
                "description": establishment.description,
                "like": isLiked ? establishment.likeCounter - 1 : establishment.likeCounter + 1,
                "dislike": establishment.dislikeCounter,
                "happyhour": establishment.happyhour
            });

            fetch('http://localhost:3000/establishments/' + establishment.id, {
                 method: 'PUT',
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                 body: data
             })
                .then((response) => {
                    dispatch(establishmentActions.like(establishment.id))
                })
                .catch((error) => {
                    console.error(error);
                });



		},
        dislike : (establishment, isDisliked)    => {

            var data = JSON.stringify({
                "id": establishment.id,
                "name": establishment.name,
                "description": establishment.description,
                "like": establishment.likeCounter,
                "dislike": isDisliked ? establishment.dislikeCounter - 1 : establishment.dislikeCounter + 1,
                "happyhour": establishment.happyhour
            });

            fetch('http://localhost:3000/establishments/' + establishment.id, {
                 method: 'PUT',
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                 body: data
             })
                .then((response) => {
                    dispatch(establishmentActions.dislike(establishment.id))
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        ...
    }
}

...


{% endhighlight %}

Maintenant, que nos fonctions sont prêtes, appelons les dans nos `components` :

{% highlight javascript %}
// Fichier : ./src/components/App.js [extrait]

...

class App extends Component {

    ...

    componentDidUpdate(prevProps) {

        // Quand on passe de true à false
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

Ici, nous récupérons les établissements de l'API seulement si notre `store` a fini de se réhydrater et que la variable `establishments` du `state` est toujours vide.

Notre `component` `Establishment` maintenant :

{% highlight javascript %}
// Fichier : ./src/components/establishments/Establishment.js [extrait]

...

class Establishment extends Component {

    render() {

        ...


        return (
            <div className='establishment' >

                ...

                <div className='establishmentLikeDislike' >
                    <button onClick={() => this.props.like(this.props.establishment, this.props.establishment.isLiked)}>{ upIcon } </button> <span>{ this.props.establishment.likeCounter }</span>
                    <button onClick={() => this.props.dislike(this.props.establishment, this.props.establishment.isDisliked)}>{ downIcon }</button> <span>{ this.props.establishment.dislikeCounter }</span>
                </div>

            </div>
        );
    }
}

export default Establishment;

{% endhighlight %}



N'oubliez pas de purger votre `store` afin de mettre de le mettre à jour :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

persistStore(store).purge()
{% endhighlight %}

![ScreenShot 1](assets/HappyDrink_Lecon_7_1.gif)

    Une bonne chose de faite !

### c. Loader

Vous avez dû certainement le remarquer, ce qui peut être embêtant avec les fonctions asynchrones, c'est justement qu'elles sont asynchrones. Et dans notre cas, l'application affiche pendant quelques dixièmes de seconde les variables du `state` par défaut, avant de les mettre à jour à partir du stockage local.

C'est un peu embêtant.

Je vous propose donc de réaliser un loader qui disparaîtra ,pour laisser place à l'application, une fois la récupération des données locales terminée. Et tant que l'on y est, mettons également un loader pour les établissements (si on réalise un appel API, ils arriveront un peu après la récupération des données locales).

##### Le gif

Nous allons utiliser le loader suivant : [ring.gif]({{site.url}}/assets/ring.gif){:target="\_blank"}.

Placez le dans le dossier `assets`.

##### Le code

C'est dans la méthode `render()`, de notre `component` `home`, que nous allons vérifier si l'on doit afficher le loader ou l'application :

{% highlight javascript %}
// Fichier : ./src/components/home.js [extrait]

...

import ring from '../assets/ring.gif' // N'oubliez pas d'ajouter le gif au répertoire "assets"

class Home extends Component {

    render() {

        if( this.props.state.app.loadingStorage ) {
            return (
                <div className="loader">
                    <img src={ring} className="loader-gif" alt="logo" />
                </div>
            )
        }

        return (
            ...
        )
    }
}

export default Home
{% endhighlight %}

On met également à jour notre css :


{% highlight css %}
/* Fichier : ./src/css/index.css [extrait] \*/

...

html, body, #root{
    height : 100%;
}
{% endhighlight %}

{% highlight css %}
/* Fichier : ./src/css/App.css [extrait] \*/

...

.loader {
    display         : flex;
    align-items     : center;
    justify-content : center;
    height: 100%;
}
.loader-gif {
    width: 50px;
    height: 50px;
}

{% endhighlight %}


Maintenant que notre `component` n'est créé qu'après le chargement des données locales, il nous est nécessaire de faire notre appel API dans la fonction `componentDidMount`, `componentDidUpdate` n’étant pas appelé la première fois.

{% highlight javascript %}
// Fichhier : ./src/components/App.js [extrait]

 ...

componentDidMount()
{
    // Plus besoin de faire d'autres vérifications, car cette fonction ne sera appelée qu'une seule fois et toujours après avoir récupéré les données locales.
    if ( this.props.state.establishments.length === 0 ) {
        this.props.getEstablishmentsFromApi()
    }
}

// On supprime la fonction componentDidUpdate()

...

{% endhighlight %}


*Note :* afin de voir plus longtemps le loader :

{% highlight javascript %}
// Fichier : ./src/index.js [extrait]

setTimeout(() => {
    persistStore(store)
}, 1500)
{% endhighlight %}

![ScreenShot 2](assets/HappyDrink_Lecon_7_2.gif)

Vous l'avez peut-être remarqué, si l'on `purge` nos données locales alors que l'on a `liké` ou `disliké` un établissement, cela est toujours pris en compte lors du rechargement de la page (merci l'API). Mais la chose embêtante, c'est que nous pouvons `liker` ou `disliker` celui-ci à nouveau alors que nous l'avons déjà fait. <br/>
Afin de régler ce problème il faudrait que l'utilisateur se connecte à l'application afin que nous puissions nous souvenir de ce qu'il a `liké` ou `disliké`. Mais nous ne le ferons pas ici. ( Mais je suis curieux de voir le résultat de ce qui ont le courage de le faire :) )

Pour ce qui est du loader des établissements, rien de plus simple ! <br/>
Il nous suffit de rajouter une variable booléenne et de réaliser, plus ou moins, la même chose que précédemment :

{% highlight javascript %}
// Fichier : ./scr/actions/actionsTypes.js

...

// App
export const ENDDOWNLOAD    = 'ENDDOWNLOAD'

{% endhighlight %}

{% highlight javascript %}
// Fichier : ./scr/actions/appActions.js

...

// Cette action nous servira à mettre à jour notre variable booléenne
export function endDownload(text) {
    return {
        type: types.ENDDOWNLOAD
    }
}
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./scr/reducers/appReducer.js

...

const initialState = {
    loadingAPI      : true,
    loadingStorage  : true,
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

            return {
                ...state,
                loadingStorage  : false,
            }

      case types.ENDDOWNLOAD :
          return {
              ...state,
              loadingAPI : false
          }

          ...

    }
}

export default appReducer

{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/containers/appContainers

...

const mapDispatchToProps = (dispatch) => {
    return {
        getEstablishmentsFromApi : () => {

            fetch('http://localhost:3000/establishments')
                .then((response) => response.json())
                .then((establishments) => {

                    establishments.forEach((establishment) => {
                        dispatch(establishmentActions.addEstablishment(establishment))
                    })

                    setTimeout(() => {
                        dispatch(appActions.endDownload())
                    }, 1500) // Comme tout à l'heure, on simule une très mauvaise connexion afin de mieux voir le loader


                })
                .catch((error) => {
                    console.error(error);
                });
        },

        endDownload : () => dispatch(appActions.endDownload()),

        ...
}

...


{% endhighlight %}

Et enfin, on appelle notre loader dans le `component` `App` quand il le faut :

{% highlight javascript %}

// Fichier : ./src/components/App.js

import ring from '../assets/ring.gif'

...

class App extends Component {

    componentDidMount()
    {
        if ( this.props.state.establishments.length === 0 ) {
            this.props.getEstablishmentsFromApi()
        } else {
            // S'il n'y a pas d'appel API à faire, on met directement à jour notre nouvelle variable booléenne
            this.props.endDownload()
        }
    }

    ...

    render() {

        ...

        return (
            <div className="App-intro">

                ...

                <section>
                    { this.props.state.app.loadingAPI ?
                        <div className="App-intro">
                            <div className="loader">
                                <img src={ring} className="loader-gif" alt="logo" />
                            </div>
                        </div>
                        :
                        listEstablishment

                    }
                </section>

            </div>
        )
    }
}

export default App

{% endhighlight %}


![ScreenShot 3](/assets/HappyDrink_Lecon_7_3.gif)


    Fiouuuuu ! Fini :)

<br/>

## 3. Quelques mots de plus sur React

#### Les middlewares

Les `middlewares` sont des fonctions qui vont être appelées entre le moment où une action est `dispatchée` et où le `reducer` est appelé. Ceux-ci sont souvent utilisés pour la connexion d'un utilisateur, le report d'un crash ou encore pour parler à une API (tiens, tiens, ce dernier nous concerne ;) ).

Je vous conseille de jeter un œil à `redux-thunk` qui est souvent utile si vous voulez avoir des actions qui retournent une fonction, afin de `dispatcher` une autre action de façon asynchrone.

Exemple typique :

{% highlight javascript %}
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    }
}
{% endhighlight %}

Dans notre application, nous pourrions l'utiliser afin de réaliser les appels API avec une action et non dans le container.

#### En savoir plus

Voici les principaux liens de mes sources, n'hésitez pas à les visiter pour en apprendre plus :

- [react : tutoriel officiel](https://facebook.github.io/react/tutorial/tutorial.html){:target="\_blank"}
- [redux (todo list)](http://redux.js.org/docs/basics/ExampleTodoList.html){:target="\_blank"} (je me suis pas mal inspirer de cet exemple)
- [react-router : github](https://github.com/ReactTraining/react-router){:target="\_blank"}
- [react-router-redux : github](https://github.com/reactjs/react-router-redux){:target="\_blank"}
- [redux-persist : github](https://github.com/rt2zz/redux-persist){:target="\_blank"}


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
|   |
|   |___ring.gif
|
|___components
|   |
|   |___establishments
|   |   |
|   |   |___establishments.js
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

##### Bonus

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   Afficher un `loader` lors du chargement de la page.

<b>Vous pourrez retrouver les sources de cette leçon à l'adresse suivante : </b>[github lecon_7](https://github.com/gkueny/HappyDrink/tree/Lecon_7){:target="\_blank"}

## 5. Fin

J'espère vous avoir convaincu que `React`, ainsi que `Redux`, c'est génial et pas compliqué !

<center >
    À plus !
</center>

*ps : N'hésitez pas à me faire part de vos retours ! C'est la première fois que je m'essaye à l'exercice du tutoriel et tout ce qui peut m'aider à m'améliorer est le bienvenu !!*
