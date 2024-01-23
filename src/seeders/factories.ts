import { Personnel, Role, Etablissement } from "@prisma/client";
import { prisma } from "./main.seeder";
import { faker } from "@faker-js/faker";

const RoleFactory = {
  async create(
    nbItems = 3,
    libelles = ["Directeur", "Secretaire", "Aide Soignant"]
  ) {
    nbItems < 1 ? (nbItems = libelles.length) : nbItems;
    let roles = [];
    for (let index = 0; index < nbItems; index++) {
      const role = await prisma.role.create({
        data: {
          libelle: libelles[index],
        },
      });
      roles.push(role);
    }
    return roles;
  },
};

const EtablissementFactory = {
  async create(nbItems: number) {
    let etablissements = [];
    for (let index = 0; index < nbItems; index++) {
      const etablissement = await prisma.etablissement.create({
        data: {
          nom: faker.company.name(),
        },
      });
      etablissements.push(etablissement);
    }
    return etablissements;
  },
};

const PersonnelFactory = {
  async create(
    nbItems: number,
    roles: Role[],
    etablissements: Etablissement[]
  ) {
    let personnel = [];
    for (let index = 0; index < nbItems; index++) {
      const Personnel = await prisma.personnel.create({
        data: {
          nom: faker.person.lastName(),
          prenom: faker.person.firstName(),
          adresse: faker.location.streetAddress(),
          tel: "0123456789",
          etablissement: {
            connect: {
              id: faker.helpers.arrayElement(etablissements).id,
            },
          },
          role: {
            create: {
              libelle: "Administrateur",
            },
          },
          mail: "testmail@nurse.care",
          password: "unmotdepassefortetcompliqueentouteslettres",
        },
      });
      personnel.push(Personnel);
    }
    return personnel;
  },
};

export { RoleFactory, EtablissementFactory, PersonnelFactory };
