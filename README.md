# Nurse Care API

Ce repository constitue le backend le l'application Nurse Care, il prend la forme d'une API qui sera consomée par l'application client.

## Installation du projet

- ### Prérequis

  - Un compte GitHub autorisé sur le repository avec les clés d'accès SSH configurées
  - PHP 8.3 avec les extensions nécéssaires pour composer et laravel :

    - Un compte GitHub autorisé sur le repository avec les clés d'accès SSH configurées
    - nodeJS 20.10
    - MySQL 8 / mariaDB
    - git
    - Docker (optionnel)

    Cloner les fichiers du projet avec git, la branche main est supposée être la branche la plus stable. Copier le fichier `.env.example` vers `.env` à la racine du projet.

- ### Installation des librairies et dépendances

  À la racine du projet, compléter votre fichier `.env` pour paramétrer les identifiants de connexion à la base de données (à noter que si vous utilisez Docker, les identifiants de la base de données seront ceux que vous renseignerez), et enfin `npm install`

  À ce jour, le projet utilise un certain nombre de package pour son fonctionnement, lesquels sont :
    - ``ExpressJS``, il prend en charge les requêtes du serveur HTTP
    - ``PrismaORM``, ORM pour interagir avec la base de données
    - ``jsonwebtoken``, prend en charge la logique de création et de validations et tokens d'identification

## Démarrer le projet

Le projet est une application [expressJS](https://expressjs.com/fr/) écrite en TypeScript reposant sur une connexion à une base de données. Ainsi pour démarrer le serveur, vous devez avoir une base de données accessible dont les identifiants de connexion sont pris dans le fichier `.env`.

- ### Avec Docker

  Pour le moment, l'environnement docker du projet ne contient qu'un conteneur de base de données, lors du démarrage le cluster configure l'utilisateur renseigné dans le fichier `.env`. Pour démarrer l'environnement d'exécution avec Docker, taper `docker-compose up -d` dans un terminal à la racine du projet

- ### Sans Docker

  Il est tout à fait possible de travailler sur l'API sans docker, il vous faudra cependant installer vous même la base de données sur votre manchine.

Pour démarrer le serveur d'API, taper `npm run start` à la racine du projet. À noter que le serveur à besoin d'un build du code TS pour démarrer, donc une fois le serveur démarré, pour appliquer des modifications au code, il est nécéssaire de l'arrêter pour ensuite le redémarrer.

## Comment travailler sur le projet ?

La branche `main` du projet est la branche supposée être la plus stable, constituant ainsi une base saine avec laquelle partir pour développer une nouvelle fonctionnalité :

- Assurez vous d'avoir récupéré les dernières modifications (avec un `git pull`)
- Créez une nouvelle branche `git checkout -b <votre-nom-de-branche>`
- Une fois vos modifications faites (ainsi que vos commits), répliquez votre branche sur github `git push --set-upstream origin <votre-nom-de-branche>`
- Une fois votre fonctionnalitée prête, vous pouvez intégrer vos changements à la branche `main` :
  - Mettez vous sur la branche main `git checkout main`
  - Récupérez vos changements sur votre branche `git pull origin <votre-nom-de-branche>`
  - Résolvez d'éventuels conflits
  - Poussez vos modifications

> _Commenté à l'aide de copilot_
