const dotenv = require("dotenv");
dotenv.config();

import express from "express";
import "reflect-metadata";

import { Personnel } from "./entity/personnel";
import { Etablissement } from "./entity/etablissement";

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

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/personnel", PersonnelRoutes);

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
