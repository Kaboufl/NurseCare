import { Request, Response } from "express";
import { prisma } from "../app";
import type { Prestation } from "@prisma/client";

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
                id: true,
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
    },

    async addIntervention(req: Request, res: Response) {
        const intervention = req.body
        

        const newIntervention = await prisma.intervention.create({
           data: { ...intervention,
                    id: undefined,
                    date: new Date(intervention.date).toISOString(),
                    date_facture: new Date().toISOString(), // penser à rendre le champ date_facture nullable
                    date_integration: undefined,
                    patient: {
                        connect: {
                            id: intervention.patient.id
                        }
                    },
                    prestations: {
                        create: intervention.prestations.map((prestation: Prestation & { soin: { id: number } }) => {
                            const { id, ...rest } = prestation
                            return {
                                ...rest,
                                soin: {
                                    connect: {
                                        id: prestation.soin.id
                                    }
                                }
                            }
                        })
                    },
                    personnel: {
                        connect: {
                            id: intervention.personnel.id
                        }
                    },
                    factureId: 0 } 
        })

        // @ts-ignore
        console.table(newIntervention, newIntervention.prestations)

        res.status(200).json({ message: "ok" })
    }
    
}

export default SecretaireController