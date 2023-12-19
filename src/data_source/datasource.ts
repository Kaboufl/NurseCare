import { DataSource } from "typeorm"

const connexion = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

connexion.initialize()
    .then(() => {
        console.log("Data Source initialisée!")
    })
    .catch((err) => {
        console.error("Erreur pendant l'initialisation du Data Source", err)
    })