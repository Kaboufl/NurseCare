import {
  Intervention,
  Personnel,
  Role,
  Etablissement,
  Patient,
  Soin,
  CategorieSoin,
} from "@prisma/client";
import { prisma } from "./main.seeder";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prestationSoins = [
    {
      libelle: "Actes de soin",
      soins: [
        {
          "libelle": "Pose / retrait d'une attelle",
          "prix": 15.00
        },
        {
          "libelle": "Nettoyage d'une plaie",
          "prix": 12.00
        },
        {
          "libelle": "Changement d'un pansement",
          "prix": 17.00
        },
        {
          "libelle": "Remise en place d'une articulation",
          "prix": 13.00
        },
        {
          "libelle": "Toilette du patient",
          "prix": 22.00
        }
    ],
  },
  {
    libelle: "Actes d'analyse",
    soins: [
      {
        "libelle": "Prise de sang",
        "prix": 19.00
      },
      {
        "libelle": "Prise d'échantillon buccal",
        "prix": 24.00
      },
      {
        "libelle": "Prise d'autres échantillons",
        "prix": 27.00
      },
    ]
  },
  {
    libelle: "Actes préventifs",
    soins: [
      {
        "libelle": "Evaluation Sevrage Alcool",
        "prix": 19.00
      },
      {
        "libelle": "Evaluation Sevrage Tabac",
        "prix": 19.00
      },
      {
        "libelle": "Evaluation Psychologique Dépression",
        "prix": 19.00
      },
      {
        "libelle": "Evaluation Psychologique Troubles de l'alimentation",
        "prix": 19.00
      },
    ],
  }];

export const RoleFactory = {
  async create(libelles = ["Directeur", "Secretaire", "Aide Soignant"]) {
    let roles = [];
    for (let index = 0; index < libelles.length; index++) {
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

export const EtablissementFactory = {
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

export const PersonnelFactory = {
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
            connect: {
              id: faker.helpers.arrayElement(roles).id,
            },
          },
          mail: faker.internet.email(),
          password: await bcrypt.hash("password", 10),
        },
      });
      personnel.push(Personnel);
    }
    return personnel;
  },
};

export const PatientFactory = {
  async create(nbItems: number) {
    let patients = [];
    for (let index = 0; index < nbItems; index++) {
      const patient = await prisma.patient.create({
        data: {
          nom: faker.person.lastName(),
          prenom: faker.person.firstName(),
          adresse: faker.location.streetAddress(),
          tel: "0123456789",
          mail: faker.internet.email(),
        },
      });
      patients.push(patient);
    }
    return patients;
  },
};

export const InterventionFactory = {
  async create(nbItems: number, patients: Patient[], personnel: Personnel[]) {
    let interventions = [];
    for (let index = 0; index < nbItems; index++) {
      const intervention = await prisma.intervention.create({
        data: {
          date: faker.date.recent(),
          lieu: faker.location.streetAddress(),
          factureId: index + 1,
          etat_facture: faker.helpers.arrayElement(["payé", "non payé"]),
          date_facture: faker.date.recent(),
          date_integration: faker.date.recent(),
          patient: {
            connect: {
              id: faker.helpers.arrayElement(patients).id,
            },
          },
          personnel: {
            connect: {
              id: faker.helpers.arrayElement(personnel).id,
            },
          },
        },
      });
      interventions.push(intervention);
    }
    return interventions;
  },
};

export const CategorieSoinFactory = {
  async create(libelles = ["Actes de soin", "Actes préventifs"]) {
    let categories = [];
    for (let index = 0; index < libelles.length; index++) {
      const categorie = await prisma.categorieSoin.create({
        data: {
          libelle: libelles[index],
        },
      });
      categories.push(categorie);
    }
    return categories;
  },
  async createFromJson() {
    let categories = [];
    const soins = [];
    for (const categorie of prestationSoins) {
      const category = await prisma.categorieSoin.create({
        data: {
          libelle: categorie.libelle,
        },
      });
      categories.push(category);
      for (const soin of categorie.soins) {
        const soinData = await prisma.soin.create({
          data: {
            libelle: soin.libelle,
            prix: soin.prix,
            categorie: {
              connect: category
            }
          }
        })
        soins.push(soinData);
      }
    }
    return { categories, soins };
  }
};

export const SoinFactory = {
  async create(
    nbItems: number,
    CategoriesSoins: CategorieSoin[],
    libelles: any = []
  ) {
    if (!libelles.length) {
      libelles = faker.lorem.words();
    }
    let soins = [];
    for (let index = 0; index < nbItems; index++) {
      const soin = await prisma.soin.create({
        data: {
          libelle: faker.lorem.word(),
          prix: faker.number.float(50),
          categorie: {
            connect: {
              id: faker.helpers.arrayElement(CategoriesSoins).id,
            },
          },
        },
      });
      soins.push(soin);
    }
    return soins;
  },
};

export const PrestationFactory = {
  async create(nbItems: number, interventions: Intervention[], soins: Soin[]) {
    let prestations = [];
    for (let index = 0; index < nbItems; index++) {
      const prestation = await prisma.prestation.create({
        data: {
          commentaire: faker.lorem.paragraph(),
          intervention: {
            connect: {
              id: faker.helpers.arrayElement(interventions).id,
            },
          },
          soin: {
            connect: {
              id: faker.helpers.arrayElement(soins).id,
            },
          },
        },
      });
      prestations.push(prestation);
    }
    return prestations;
  },
};
