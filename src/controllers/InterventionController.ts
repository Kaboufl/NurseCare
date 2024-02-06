import { Request, Response } from 'express'
import { prisma } from "../app"

export class InterventionController {

    async getPrestations(req: Request, res:Response) {
        const intervention = req.intervention
        const prestation = await prisma.prestation.findMany({
            where: {
                interventionId: Number(intervention)
            },
            include: {
                intervention:{
                    include: {
                        patient: true,
                        personnel:true,
                    }
                },
                soin: true,
                }
            })
            //res.
        }
    }