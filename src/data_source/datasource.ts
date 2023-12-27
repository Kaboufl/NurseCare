import { DataSource } from "typeorm";

import { Personnel } from "../entity/personnel";
import { Etablissement } from "../entity/etablissement";

const NCDB = async (): Promise<DataSource> => {
  const datasource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Personnel, Etablissement],
    synchronize: true,
  });

  const { dirname } = require("path");
  const appDir = require.main ? dirname(require.main.filename) : "";
  console.log("Dossier : ", appDir);

  try {
    await datasource.initialize();
    console.log("Data Source initialisée!");

    return datasource;
  } catch (err) {
    console.error("Erreur pendant l'initialisation du Data Source", err);
    throw err;
  }
};

export default NCDB;
