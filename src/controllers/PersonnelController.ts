import { Request, Response } from "express";
import { Personnel } from "../entity/personnel";
import { NCDataSource } from "../data_source/datasource";

const datasource = NCDataSource;

const PersonnelController = {
  async isDatasourceInitialized(req: Request, res: Response) {
    datasource.isInitialized
      ? console.log("Datasource OK")
      : console.log("Datasource KO");
  },

  async getAllPersonnel(req: Request, res: Response) {
    const personnel = await datasource.manager.find(Personnel);
    res.json(personnel);
  },

  async getPersonnel(req: Request, res: Response) {
    console.log("GET un seul profil personnel, le ", req.params.id);

    try {
      const personnel = await datasource.manager.findOneByOrFail(Personnel, {
        id: Number(req.params.id),
      });
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
    const table = datasource.manager;
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
    }
  },

  async updatePersonnel(req: Request, res: Response) {
    console.log(`Mise à jour d'un profil du personnel à l'id ${req.params.id}`);

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
  },
};

export default PersonnelController;
