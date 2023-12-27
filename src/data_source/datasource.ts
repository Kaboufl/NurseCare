import { DataSource } from "typeorm"

import { Personnel } from "../entity/personnel"
import { Etablissement } from "../entity/etablissement"

const NCDB = async () => {
    const connexion = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Personnel, Etablissement],
        synchronize: true
    })

    const { dirname } = require('path');
    const appDir = require.main ? dirname(require.main.filename) : '';
    console.log("Dossier : ", appDir)

    try {
        await connexion.initialize()
        console.log("Data Source initialisée!")

        return connexion
    } catch (err) {
        console.error("Erreur pendant l'initialisation du Data Source", err)
        return false
    }
}

export default NCDB