import { Request, Response } from "express";
import { prisma } from "../app";

const SecretaireController = {

    async getInterventions(req: Request, res: Response) {
        const interventions = await prisma.intervention.findMany({ include: {
            prestations: true,
            personnel: true
        }})
        res.status(200).json(interventions)
    },

    async getAideSoignants(req: Request, res: Response) {
        const infirmiers = await prisma.personnel.findMany({
            where: {
                roleId: 3
            },
            select: {
                nom: true,
                prenom: true,
                adresse: true,
                tel: true,
                mail: true,
                role: true,
              }
        });
        res.status(200).json(infirmiers)
    },

    async getSoins(req: Request, res: Response) {
        const soins = await prisma.soin.findMany()
        res.status(200).json(soins)
    }
    
}

export default SecretaireController