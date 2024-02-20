import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class EtablissementController {
  async getMoyennes(req: Request, res: Response) {
    try {
      const averages = await prisma.$queryRaw`
            SELECT e.id, e.nom, AVG(CAST(bo.note AS DECIMAL)) as averageNote
            FROM Etablissement e
            JOIN Personnel p ON p.etablissementId = e.id
            JOIN Intervention i ON i.personnelId = p.id
            JOIN Prestation pr ON pr.interventionId = i.id
            JOIN BonObservation bo ON bo.prestationId = pr.id
            GROUP BY e.id, e.nom
            `;

      res.json(averages);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur dans la récupération des données");
    }
  }
}
