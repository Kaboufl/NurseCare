import { DataSource } from "typeorm";

import Personnel from "../entity/personnel";
import { Etablissement } from "../entity/etablissement";

export const NCDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //entities: [Personnel, Etablissement],
  entities: [__dirname + "/../entity/*.js"],
  synchronize: true,
});
