import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import Personnel from "./entity/personnel";
import { Patient } from "./entity/patient";
import Prestation from "./entity/prestation";
import Intervention from "./entity/intervention";
import { PersonnelFactory } from "./entity/personnel";
import { PatientFactory } from "./entity/patient";
import MainSeeder from "./seeders/main.seeder";

const dotenv = require("dotenv");
dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + "/../entity/*.{js,ts}"],
  factories: [PersonnelFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);

datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
