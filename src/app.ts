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

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import PersonnelRoutes from "./routes/PersonnelRoutes";
import AuthRoutes from "./routes/AuthRoutes";


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

app.get("/", async (req, res) => {
  const allPersonnel = await prisma.personnel.findMany()
  console.log(allPersonnel)

  console.log("Root route called");
  res.send({ ok: "ok", personnel: allPersonnel });
});

app.get("/add", async (req, res) => {
  console.log("Add route called");
  res.send({ ok: "ok" });
});

app.listen(port, async () => {
  console.log(`server is listening on ${port}`);

  console.log(__dirname);
});
