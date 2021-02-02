# Molotov

<img src="https://i.imgur.com/Jn02Vle.png" />

Molotov est un catalogue de recettes de cocktails. On y trouve une multitude de cocktails du monde entier ainsi que, pour chacun, la liste des ingrédients et des instructions pour leur réalisation. Une recherche filtrée permet à l’utilisateur de trouver aisément le cocktail de ses rêves. L’application peut être utilisée avec authentification ou bien anonymement. Dans le second cas, certaines fonctionnalités comme la note des cocktails ou pouvoir les ajouter à ses favoris ne sont pas disponibles. A noter que notre application est en anglais car l’API ne fournit que des données en anglais ou partiellement en allemand.
L'API utilisée pour récupérer les cocktails est https://www.thecocktaildb.com
<img src="https://i.imgur.com/ZhLb0LH.png" />

## Fonctionnalités

<ul>Fonctionnalités pour un utilisateur qui n'est pas authentifié
  <li>Module de connexion/création de compte (option d'utiliser l'application de manière anonyme)</li>
  <li>Recherche par nom de cocktail</li>
    <li>Rechercher par ingrédient</li>
    <li>Filtrer sa recherche avec/sans alcool</li>
    <li>Accéder aux cocktails populaires</li>
    <li>Accéder aux informations des cocktails (ingrédients, quantités, recette, note moyenne)</li>
    <li>Changer la couleur du site</li>
  </ul>
  
  <ul>Fonctionnalités supplémentaires pour un utilisateur qui est authentifié
  <li>Accéder à une liste de cocktails récupérés aléatoirement</li>
  <li>Attriburer une note à un cocktail</li>
    <li>Ajouter un cocktail à ses favoris</li>
    <li>Accéder à ses cocktails favoris</li>
    <li>Accéder à ses cocktails notés</li>
    <li>Déconnexion</li>
  </ul>
  
## Todo

<ul>
  <li>Améliorer le responsive du site</li>
  <li>Fonctionnalités mot de passe oublié</li>
  <li>Modification du mot de passe</li>
  </ul>
  
## Utiliser l'application 

### Version live

Une version live de l'application tourne à <a href="https://ndeguillaume.github.io/Molotov">cette adresse</a> 

### Version locale

Lancer dans un termina la commande : <code>sudo sh deploy.sh</code>

Le serveur par défaut est lancé sur le port 5000.

Si le script ne fonctionne pas :
Copy <code>sample.env</code> in <code>server/.env</code>
Lancer dans un terminal : <code>cd server/ && npm install && node server.js</code>
Lancer dans un autre terminal : <code>cd client/ && npm install && npm start</code>

Le site est lancé à cette adresse : <a href="localhost:3000">localhost:3000</a>

### Database

Nous utilsons MongoDB pour la base de données de notre site. Vous pouvez utiliser votre propre base de données en la créant sur https://mongodb.com. Il faudra lors changer la ligne de connexion dans <code>sample.env</code>

### Rapport

Nous avons réalisé un rapport de ce projet disponible à <a href="https://ndeguillaume.github.io/molotov_rapport.pdf">cette adresse</a>


