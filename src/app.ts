/**
 * C'est ici le point d'entrée de l'application, étant donné que l'application a besoin
 * d'une connexion à la base de données pour fonctionner, nous allons initialiser la connexion
 * à la base de données avant de lancer le serveur, ainsi nous pourrons être sûr que la connexion
 * est bien établie avant de lancer le serveur, et éviter de créer de nouvelles connexions à chaque
 * requête (ce qui est très coûteux en ressources)
 */

/**
 * Cette partie permet de charger les variables d'environnement depuis le fichier .env
 * qui contiennent les identifiants de connexion à la base de données (cf README)
 */
const dotenv = require("dotenv");
dotenv.config();

import PersonnelRoutes from "./routes/PersonnelRoutes";
import AuthRoutes from "./routes/AuthRoutes";

import { NCDataSource } from "./data_source/datasource";
const datasource = NCDataSource;

datasource
  .initialize()
  .then(() => {
    console.log("Datasource initialisée");
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation de la base de données", err);
  });

/**
 * Cette partie permet de charger le serveur express et de définir le port 3000 (qui pourrait être une variable d'environnement)
 */

import express from "express";
import "reflect-metadata";

const app = express();
const port = 3000;

/**
 * Cette partie permet d'activer le middleware express.json() qui permet de parser les requêtes
 * au format JSON, ainsi nous pourrons récupérer les données envoyées par l'application cliente
 */
app.use(express.json());

/**
 * Cette partie permet de définir les routes de l'application, ici nous avons deux routes :
 * - /auth qui permet de gérer l'authentification
 * - /personnel qui permet de gérer les informations du personnel
 */
app.use("/auth", AuthRoutes);
app.use("/personnel", PersonnelRoutes);

/**
 * Ces routes sont des routes de test, elles permettent de vérifier que la connexion
 * à la base de données est bien établie et d'intéragir avec
 */
import Personnel from "./entity/personnel";
import { Etablissement } from "./entity/etablissement";

app.get("/", async (req, res) => {
  const personnel = datasource.manager.find(Personnel);

  console.log(personnel);
  res.send(personnel);
});

app.get("/add", async (req, res) => {
  const manager = datasource.manager;

  const newPersonnel = manager.create(Personnel, {
    nom: "Timber",
    prenom: "Saw",
    adresse: "20 rue des potiers",
    tel: "0123456789",
    etablissement: 4,
    role: 7,
  });

  try {
    const response = {
      statut: "ok",
      item: newPersonnel,
    };
    manager.save(newPersonnel);
    res.json(response);
  } catch (error) {
    console.error("Le personnel n'a pas pu être ajouté");
    const response = {
      statut: "error",
      item: null,
    };
  }
});

app.listen(port, async () => {
  console.log(`server is listening on ${port}`);

  console.log(__dirname);
});
