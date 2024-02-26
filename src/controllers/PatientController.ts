import { Request, Response } from 'express'
import { prisma } from "../app"

const PatientController = {
    
    async getAllPatients(req: any, res: Response) {
        const patients = await prisma.patient.findMany()
        console.log(`${patients.length} patients chargés`)
        res.status(200).json(patients)
    }
}

export default PatientController