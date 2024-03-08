import { Request, Response } from "express";
import { prisma } from "../app";
import type { Intervention, Prestation } from "@prisma/client";

const SecretaireController = {

    async getInterventions(req: Request, res: Response) {
        const interventions = await prisma.intervention.findMany({
            include: {
                prestations: true,
                personnel: true,
                patient: true
            }
        })
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
            data: {
                ...intervention,
                id: undefined,
                date: new Date(intervention.date).toISOString(),
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
                factureId: 0
            }
        })

        // @ts-ignore
        console.table(newIntervention, newIntervention.prestations)

        res.status(200).json({ message: "ok" })
    },

    async editIntervention(req: Request, res: Response) {
        const updatedIntervention: Partial<Intervention | any> = req.body
        // console.log(updatedIntervention)
        console.log(updatedIntervention.prestations)
        const intervention = await prisma.intervention.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...updatedIntervention,
                patientId: undefined,
                personnelId: undefined,
                date: updatedIntervention.date ? new Date(updatedIntervention.date).toISOString() : new Date().toDateString(),
                prestations: undefined,
                patient: {
                    connect: {
                        id: updatedIntervention.patientId
                    }
                },
                personnel: {
                    connect: {
                        id: updatedIntervention.personnelId
                    }
                }
            },
            include: {
                prestations: true
            }
        })

        const newPrestationsPromises = updatedIntervention.prestations.filter((prestation: Prestation) => prestation.id === 0).map((prestation: Prestation) => {
            return prisma.prestation.create({
                data: {
                    commentaire: prestation.commentaire,
                    intervention: {
                        connect: {
                            id: intervention.id
                        }
                    },
                    soin: {
                        connect: {
                            id: prestation.soinId
                        }
                    }
                }
            }).then((newPrestation) => { return newPrestation })
        })

        const newPrestations = await Promise.all(newPrestationsPromises);

        const reqPrestations = updatedIntervention.prestations.filter((prestation: Prestation) => prestation.id !== 0)

        const supPrestations = intervention.prestations.filter((prestation: Prestation) => !reqPrestations.some((existPrestation: Prestation) => existPrestation.id === prestation.id))

        const deletePrestations = await prisma.prestation.deleteMany({
            where: {
                id: {
                    in: supPrestations.map((p: Prestation) => p.id)
                }
            }
        })

        res.status(200).json({
            message: "ok"
        })
    },

    async deleteIntervention(req: Request, res: Response) {
        const interventionId = req.params.id
        try {
            const intervention = await prisma.intervention.delete({
                where: {
                    id: parseInt(interventionId)
                }
            })
            res.status(200).json({
                message: "Intervention supprimée"
            })
        } catch (error) {
            res.status(500).json({
                message: "Une erreur est survenue",
                error: error
            })
        }
    }

}

export default SecretaireController