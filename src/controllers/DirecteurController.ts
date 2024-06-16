import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class DirecteurController {
  async getMoyennes(req: Request, res: Response) {
    try {
      const averages = await prisma.$queryRaw`
            SELECT e.id, e.nom, AVG(CAST(bo.note AS DECIMAL)) as averageNote
            FROM Etablissement e
            JOIN Personnel p ON p.etablissementId = e.id
            JOIN BonObservation bo ON bo.stagiaireId = p.id
            GROUP BY e.id, e.nom
            `;
console.log(averages)
      res.json(averages);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur dans la récupération des données");
    }
  }
}
