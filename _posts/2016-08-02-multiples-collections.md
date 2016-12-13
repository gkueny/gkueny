---
layout: post
title:  "Titanium : Inclure plusieurs fois la même collection"
author: Gkueny
date:   2016-08-02 23:50:35 +0200
featured_image: /assets/multiple-collections.jpeg
comments: true
excerpt_separator: <!-- more -->
---
Avez-vous déjà eu besoin d'utiliser plusieurs fois la même collection dans votre vue afin de réaliser différents traitements sur celle-ci ?

Voici le moyen de réaliser cette opération.
<!-- more -->


### Exemple type

Vous disposez de la collection "user" et vous voulez afficher une liste d'utilisateurs hommes et une liste d'utilisateurs femmes dans la même vue.


### user.xml

{% highlight xml %}
<Alloy>

	<Collection src="user" instance="true" id="userMan" />
	<Collection src="user" instance="true" id="userWoman" />

	<View id="man" layout="horizontal" dataCollection="$.userMan"  dataFilter="filterMan">
		<Label text="{name}"/>
	</View>

	<View id="man" layout="horizontal" dataCollection="$.userWoman"  dataFilter="filterWoman">
		<Label text="{name}"/>
	</View>

</Alloy>
{% endhighlight %}

	NOTE : J'utilise ici Alloy

### user.js

{% highlight javascript %}
//fetch data to view
$.userMan.fetch();
$.userWoman.fetch();

function filterMan(collection) {
	return collection.where({
	    type: 'Man'
	});
}
function filterWoman(collection) {
	return collection.where({
	    type: 'Woman'
	});
}
{% endhighlight %}

### Comment cela marche-t-il ?

Décortiquons l'élément `<Collection />`.

C'est l'attribut `instance="true"` qui réalise toute la magie.

En passant à `true` cet attribut nous créons une instance de notre collection `user`. Et en créant différentes instances de la même collection, nous pouvons les manipuler chacune indépendamment de l'autre grâce à l'attribut `id`.

Ainsi dans la vue ou le contrôleur il suffit de référencer la collection souhaitée avec `$.` suivit de son `id`. `$.userMan` par exemple.

<center>
	Et voilà !
</center>
