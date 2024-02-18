import { Request, Response } from "express";
import { prisma } from "../app";

const SecretaireController = {

    async getInterventions(req: Request, res: Response) {
        const interventions = await prisma.intervention.findMany({ include: {
            prestations: true,
            personnel: true
        }})
        res.status(200).json(interventions)
    }
    
}

export default SecretaireController