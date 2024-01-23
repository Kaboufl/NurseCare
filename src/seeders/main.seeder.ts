import { PrismaClient } from "@prisma/client";
import { faker, type Faker } from "@faker-js/faker";
import * as factories from "./factories";
export const prisma = new PrismaClient();

async function main() {
  const roles = await factories.RoleFactory.create();
  const etablissements = await factories.EtablissementFactory.create(4);
  const personnel = factories.PersonnelFactory.create(
    10,
    roles,
    etablissements
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
