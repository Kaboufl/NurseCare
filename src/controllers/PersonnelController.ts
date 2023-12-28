import { Request, Response } from "express";
import NCDB from "../data_source/datasource";
import { Personnel } from "../entity/personnel";

const PersonnelController = {
  async getAllPersonnel(req: Request, res: Response) {
    const personnel = await (await NCDB()).manager.find(Personnel);
    res.json(personnel);
  },

  async addNewPersonnel(req: Request, res: Response) {
    const table = (await NCDB()).manager;
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
};

export default PersonnelController;
