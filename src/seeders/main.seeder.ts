import { PrismaClient } from "@prisma/client";
import { faker, type Faker } from "@faker-js/faker";
import * as factories from "./factories";
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const DB_URL = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
export const prisma = new PrismaClient({
  datasourceUrl: DB_URL,
});

async function main() {
  const roles = await factories.RoleFactory.create();

  const categoriesSoins = await factories.CategorieSoinFactory.createFromJson();

  //const categoriesSoins = await factories.CategorieSoinFactory.create();
  //const soins = await factories.SoinFactory.create(8, categoriesSoins);

  const etablissements = await factories.EtablissementFactory.create(4);
  const personnel = await factories.PersonnelFactory.create(
    10,
    roles,
    etablissements
  );
  const patients = await factories.PatientFactory.create(10);
  const interventions = await factories.InterventionFactory.create(
    20,
    patients,
    personnel.filter((p) => p.roleId === 3)
  );
  const prestations = await factories.PrestationFactory.create(
    30,
    interventions,
    categoriesSoins.soins
  );

  return {
    roles: roles,
    categoriesSoins: categoriesSoins.categories,
    soins: categoriesSoins.soins,
    etablissements: etablissements,
    personnel: personnel,
    patients: patients,
    interventions: interventions,
    prestations: prestations,
  };
}

main()
  .then(async (result) => {
    console.log(result);
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
