const dotenv = require("dotenv");
dotenv.config();

import express from "express";
import "reflect-metadata";

import { Personnel } from "./entity/personnel";

import NCDB from "./data_source/datasource";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const personnel = await (await NCDB()).manager.find(Personnel);

  console.log(personnel);
  res.send(personnel);
});

app.get("/add", async (req, res) => {
  const manager = (await NCDB()).manager;

  const newPersonnel = manager.create(Personnel, {
    nom: "Timber",
    prenom: "Saw",
    adresse: "20 rue des potiers",
    tel: "0123456789",
    etablissement: 4,
    role: 7,
  });

  try {
    manager.save(newPersonnel);
  } catch (error) {
    console.error("Le personnel n'a pas pu être ajouté");
  }

  res.send("personnel ajouté");
});

app.listen(port, async () => {
  console.log(`server is listening on ${port}`);
});
