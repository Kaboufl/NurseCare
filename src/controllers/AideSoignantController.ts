import { Request, Response } from 'express'
import { prisma } from "../app"

export class AideSoignantController {

  async index(req: any, res: Response) {
    const { user_id } = req.user
    const aideSoignant = await prisma.personnel.findUnique({
      where: {
        id: Number(user_id),
      },
      include: {
        interventions: {
          include: {
            patient: true,
            prestations: {
              include: {
                soin: true
              }
            }
          }
        }
      }
    })
    res.json(aideSoignant)
  }

  async getInterventions(req: any, res: Response) {
    const { user_id } = req.user
    const aideSoignant = await prisma.personnel.findUnique({
      where: {
        id: Number(user_id),
      },
      include: {
        interventions: {
          include: {
            patient: true,
            prestations: {
              include: {
                soin: true
              }
            }
          }
        }
      }
    })
    const interventions = aideSoignant?.interventions ?? []
    res.json(interventions)
  }
}
