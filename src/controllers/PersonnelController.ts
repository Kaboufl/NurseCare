import { Request, Response } from "express";
import { prisma } from "../app";
import { Personnel } from "@prisma/client";
import type { RequestWithUser } from "../middlewares/auth";


/**
 * Ce controlleur rassemble les méthodes permettant d'accéder aux informations du personnel de NC, de les modifiers ou même de les supprimer
 */
const PersonnelController = {

  async getAllPersonnel(req: Request, res: Response) {
    const personnel = await prisma.personnel.findMany();
    res.json(personnel);
  },

  async getPersonnel(req: Request, res: Response) {
    console.log("GET un seul profil personnel, le ", req.params.id);

    try {
      const personnel = {}
      res.json(personnel);
    } catch (error) {
      console.log("Echec de la récupération du profil à l'id ", req.params.id);
      res.status(500).json({
        error: "Échec de la récupération du profil à l'id " + req.params.id,
      });
      throw error;
    }
  },

  async addNewPersonnel(req: Request, res: Response) {
    /*const table = datasource.manager;
    const newPersonnel = table.create(Personnel, {
      nom: "Timber",
      prenom: "Saw",
      adresse: "20 rue des potiers",
      tel: "0123456789",
      etablissement: 4,
      role: 7,
    });

    let response = {
      status: "",
      item: {},
    };

    try {
      table.save(newPersonnel);
      response = {
        status: "ok",
        item: newPersonnel,
      };
      res.json(response);
    } catch (error) {
      console.error("Erreur ! Le personnel n'a pas pu être ajouté");
      response = {
        ...response,
        status: "error",
      };
      res.json(response);
    }*/
  },

  async updatePersonnel(req: Request, res: Response) {
    console.log(`Mise à jour d'un profil du personnel à l'id ${req.params.id}`);
    /*
    try {
      const personnel = datasource.manager.findOneByOrFail(Personnel, {
        id: Number(req.params.id),
      });

      console.log(personnel);
    } catch (error) {
      const errorMsg =
        "Erreur ! Impossible de trouver un profil personnel à l'id " +
        req.params.id;
      console.error(errorMsg);
      res.status(500).send(errorMsg);
    }
    */
  },

  async getAideSoignants(req: any, res: Response) {
    const aideSoignants = await prisma.personnel.findMany({
        where: {
            roleId: 3,
          },
        select: {
          id: false,
          nom: true,
          prenom: true,
          adresse: true,
          tel: true,
          mail: true,
          password: false,
          interventions: true
        }
    });
    const { user } = req
    console.table(user)
    res.json(aideSoignants)
  }
};

export default PersonnelController;
