const dotenv = require("dotenv");
dotenv.config();

import express from "express";
import "reflect-metadata";

import { Personnel } from "./entity/personnel";

import NCDB from "./data_source/datasource";

import PersonnelRoutes from "./routes/PersonnelRoutes";
import AuthRoutes from "./routes/AuthRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/personnel", PersonnelRoutes);

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
});
