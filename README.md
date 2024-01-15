# Nurse Care

## Installation du projet

- ### Prérequis

  - Un compte GitHub autorisé sur le repository avec les clés d'accès SSH configurées
  - PHP 8.3 avec les extensions nécéssaires pour composer et laravel :

  ```
  sudo apt install openssl php8.3-bcmath php8.3-curl php8.3-json php8.3-mbstring php8.3-mysql php8.3-tokenizer php8.3-xml php8.3-zip
  ```

  - Composer (trouvable [ici](https://getcomposer.org/download/))
  - nodeJS 20.10
  - MySQL 8 / mariaDB
  - git
  - Docker (optionnel)

  Télécharger les fichiers du projet avec git, la branche main est supposée être la branche la plus stable. Copier le fichier `.env.example` vers `.env` à la racine du projet.

- ### Installation des librairies et dépendances

  À la racine du projet, réaliser les commandes `composer install` suivi de `php artisan key:generate`, et enfin `npm install`

## Démarrer le projet

- ### Avec Docker

  L'architecture docker du projet se présente sous la forme d'un paquet nommé `laravel sail` (documentation [disponible ici](https://laravel.com/docs/10.x/sail)).
  Vous pouvez ajouter l'alias du script shell avec la commande suivante sous linux `alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'`.

  Il suffit ensuite d'exécuter la commande `sail up -d` à la racine du projet pour démarrer les conteneurs. Sail inclut un conteneur pour l'exécution de code en PHP, ainsi qu'un conteneur pour la base de données dont les identifiants sont appliqués via le fichier `.env`.

- ### Sans Docker

  Il est tout à fait possible de travailler sur l'API sur du _bare metal_, il vous faudra cependant installer vous même la base de données ainsi que l'environnement d'exécution de la solution (PHP pour l'app, nodeJS pour les différents packages auxiliaires à Laravel)

> _Commenté à l'aide de copilot_
