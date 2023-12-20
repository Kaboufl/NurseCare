# Nurse Care

## Installation du projet

- ### Prérequis

  - nodeJS 20.10
  - MySQL 8 / mariaDB
  - git
  - Docker (optionnel)

  Télécharger les fichiers du projet avec git, la branche main est supposée être la branche la plus stable. Copier le fichier `.env.example` vers `.env` à la racine du projet.

  > ```bash
  > cp .env.example .env
  > ```

- ### Installation des librairies et dépendances

  À la racine du projet, taper `npm install`

## Démarrer le projet

- ### Base de données

  Il est possible de monter une base de données avec Docker, pour cela, exécuter `docker-compose up` pour démarrer le serveur MySQL, les identifiants de connexions sont paramétrés en fonction du fichier `.env`.
