---
layout: post
title:  "React - Leçon 5"
author: Gkueny
date: Fri Dec 09 2016 20:00:00 GMT+0100 (CET)
featured_image: /assets/react_lecon_2.png
comments: true
timerArticle: Fri Dec 09 2016 20:00:00 GMT+0100 (CET)
timerNextArticle: Mon Dec 12 2016 22:00:00 GMT+0100 (CET)
excerpt_separator:  <!-- more -->
---
Aujourd'hui, on termine notre application et on regarde comment persister nos données.
 <!-- more -->

<div id="toc"></div>

<b>Vous pourrez retrouver les sources de la leçon précédente à l'adresse suivante : </b> [github lecon_4](https://github.com/gkueny/HappyDrink/tree/Lecon_4)

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

Dans la leçon précédente, nous avions laissé en suspens le filtrage de nos établissements. Il est temps de voir une façon de réaliser cette action.

### Créons notre action

{% highlight javascript %}
// Fichier : ./src/actions/actionsTypes.js [extrait]

...

export const FILTER         = "FILTER"
{% endhighlight %}

{% highlight javascript %}
// Fichier : ./src/actions/appActions.js

...

export function filter(text) {

    return {
        type: types.FILTER,
        data: {
            text : text
        }
    }
}
{% endhighlight %}

###  Modifions notre reducer

{% highlight javascript %}
// Fichier : ./src/reducers/establishmentReducer.js [extrait]

...

establishments.map((establishment) => {
    initialState.push({
        id              : establishment.id,
        name            : establishment.name,
        description     : establishment.description,
        isLiked         : false,
        isDisliked      : false,
        likeCounter     : 0,
        dislikeCounter  : 0,
        favori          : false,
        visible         : true // On ajoute la variable visible pour pouvoir filtrer
    })
    return establishment
})

const establishment = (state = {}, action) => {

    switch (action.type) {

        case types.FILTER :
            // On compare la recherche au nom de notre établissement afin de savoir s'il doit être visible ou pas
            return {
                ...state,
                visible : state.name.toUpperCase().indexOf(action.data.text.toUpperCase()) >= 0
            }

        ...
    }
}

const establishmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.FILTER :
            return state.map(establishmentState =>
                establishment(establishmentState, action)
            )

        ...

    }

}

export default establishmentsReducer
{% endhighlight %}

#### Dispatchons notre action

Ajoutons une fonction dans notre `appContainer`, afin de dispatcher notre nouvelle action :


{% highlight javascript %}
// Fichier : ./src/containers/appContainer.js [extrait]

...

const mapDispatchToProps = (dispatch) => {
    return {
        ...

        filter : (text) => dispatch(appActions.filter(text))
    }
}

...
{% endhighlight %}


#### Stocker le texte de la recherche :

Profitons de l'action `filter` qui est `dispatchée` pour mettre à jour la variable `textFilter` dans notre `reducer` app :

{% highlight javascript %}
// Fichier : ./src/reducers/appReducer.js [extrait]

import * as types from '../actions/actionsTypes'

const initialState = {
    dataFromAPI : "",
    pseudo      : "Inconnu",
    textFilter  : "" // on ajoute notre variable
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        ...

        // Et on la met à jour
        case types.FILTER :
            return {
                ...state,
                textFilter : action.data.text
            }
        default:

            return state
    }
}

export default appReducer

{% endhighlight %}

Maintenant que tout est en place, il ne nous manque plus qu'à mettre à jour notre `component`:

{% highlight javascript %}
// Fichier : ./src/components/App.js [extrait]

...

class App extends Component {

    ...

    // Fonction appelée à chaque changement de texte dans notre input
    handleChange = (e) => {
        this.props.filter(e.target.value)
    }

    render() {

        // On filtre
        const establishmentFilter = this.props.state.establishments.filter(e => e.visible )

        const listEstablishment = establishmentFilter.map( establishment => {
            return (
                    <EstablishmentContainer
                        key={ establishment.id }
                        establishment={ establishment }
                    />
                )

        })

        return (
            ...
                <div className="App-intro">

                    <p> <a onClick={ this.props.randomPseudo } >Changer le pseudo !</a> </p>

                    <div>
                        <input
                            type="text"
                            placeholder="search"
                            value={this.props.state.app.textFilter}
                            onChange={this.handleChange}
                        />
                    </div>

                    <section>
                        { listEstablishment }
                    </section>

                    <section>
                        { this.props.state.app.dataFromAPI }
                    </section>

                </div>

            ...
        )
    }
}

export default App;

{% endhighlight %}

![ScreenShot0](assets/HappyDrink_lecon_5_0.gif)

## 3. Sauvegarder nos données

Pour l'instant, à chaque fois que nous rafraîchissons notre application, on perd tout notre `state`. Pas super-pratique tout cela. <br/>
On va donc voir une façon de persister nos données.

Pour cela, je vous propose d'utiliser le package npm `redux-persist`.

{% highlight cli %}
$ npm install --save redux-persist
{% endhighlight %}

### Implémentation

Afin d'utiliser `redux-persist`, nous allons quelque peu modifier notre fichier d'entrée :

{% highlight javascript %}
...
// Fichier ./src/index.js [extrait]

import { persistStore, autoRehydrate } from 'redux-persist'

const store = createStore(allReducers, undefined, autoRehydrate())

persistStore(store)
//persistStore(store).purge() : si vous voulez "purger" ce que vous avez enregistré

...
{% endhighlight %}

![ScreenShot1](/assets/HappyDrink_lecon_5_1.gif)

Et c'est tout !! <br/>
`Redux-persist` s'occupe de `persister` le store à chaque modification grâce à la fonction `persistStore`.
La fonction `autoRehydrate` s'occupe quant à elle de mettre à jour le `store` avec la dernière sauvegarde.

    Mmmmmh, ça marche oui.
    Mais ce n'est pas super de garder le filtre au rechargement de la page non ?

Tout à fait d'accord avec vous ! ( comment ça, je me parle à moi-même ?)

Nous avons plusieurs possibilités :

#### `blacklister` votre reducer

La première possibilité est de `blacklister` votre reducer comme cela :

{% highlight javascript %}
...
// Fichier ./src/index.js [extrait]

persistStore(store, {blacklist: ['app']})// on indique le nom de la clé du reducer à blacklister

...
{% endhighlight %}

Cela aura pour effet de ne pas sauvegarder votre `reducer` et donc le `state` qui va avec.

    Heuuu oui, mais moi c'est juste le filtre que je ne veux pas sauvegarder ..

Cela est également possible.

#### Ne mettre à jour qu'une partie du `state` de notre reducer

Pour cela, il vous faut prendre en charge le type de l'action `REHYDRATE` définit par `redux-persist` dans notre `reducer`.

{% highlight javascript %}
// Fichier : ./src/reducers/appReducer.js [extrait]

import { REHYDRATE } from 'redux-persist/constants'
...

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        //...
        case REHYDRATE:

          var incoming = action.payload.app

          if (incoming)
            return {
                ...state,
                ...incoming,
                textFilter : ""
            }

          return state

        ...

    }
}

export default appReducer

{% endhighlight %}

Ici, nous indiquons à notre `reducer` de mettre à jour tout notre `state` avec ce que nous donne `redux-persist`, à l'exception du `textFilter` qui est remis à vide.


On n'oublie pas de modifier également notre `establishmentsReducer` afin de remettre à zéro la variable `visible` :

{% highlight javascript %}
// Fichier : ./src/reducers/establishmensReducer.js [extrait]

import {REHYDRATE} from 'redux-persist/constants'
...

const establishment = (state = {}, action) => {

    switch (action.type) {

        case REHYDRATE:
          return {
              ...state,
              visible : true
          }

        ...
    }
}


const establishmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case REHYDRATE :
            // [Edit du 12/12/2016]
            if(action.payload.establishments)
                return action.payload.establishments.map(establishmentState =>
                    establishment(establishmentState, action)
                )
            return state

        ...

    }

}

export default establishmentsReducer
{% endhighlight %}

Et enfin on met à jour notre fonction `persistStore` :

{% highlight javascript %}
...
// Fichier ./src/index.js [extrait]

persistStore(store)

...
{% endhighlight %}


![ScreenShot2](/assets/HappyDrink_lecon_5_2.gif)

#### Utiliser le `state` "local"

Même si nous utilisons `Redux`, rien ne nous empêche d'utiliser le `state` “local” de nos `components`. J'entends par  `state "local"` le state définit par la variable `this.state` et modifiable par la fonction `setState`. <br/>
En procédant ainsi, ce `state` ne sera pas sauvegardé. Cependant, vous perdrez les avantages liés à `Redux` dont nous avions parlé dans la précédente leçon.

Personnellement j'utilise `Redux` pour :

- le `state` auquel je veux avoir accès à plusieurs endroits de mon application
- le `state` dont je souhaite sauvegarder le contenu

Pour les autres, j'utilise le `state` "local".

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


### Regardons un peu l'avancement de notre projet HappyDrink :

- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  `Lister` les bars.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>  `filtrer` la liste.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   `mettre en favori` un bar.
- <i class="fa fa-times" style="color: red" aria-hidden="true"></i>   `visualiser l'happy-hour` de celui-ci.
- <i class="fa fa-check" style="color: green" aria-hidden="true"></i>   `Liker/disliker` ce bar.

<b>Vous pourrez retrouver les sources de cette leçon à l'adresse suivante : </b>[github lecon_5](https://github.com/gkueny/HappyDrink/tree/Lecon_5)

    Bientôt fini !

## 5. Pour la suite

Dans la prochaine leçon, nous verrons le `routing` de notre application afin de visualiser l'happy-hour de nos établissements.

D'ici la : Vacances :)

<center>
    À plus !
</center>

<center>

    ↓ Prochaine leçon dans ↓

</center>
