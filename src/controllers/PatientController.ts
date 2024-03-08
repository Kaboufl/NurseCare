import { Request, Response } from 'express'
import { prisma } from "../app"

const PatientController = {
    
    async getAllPatients(req: any, res: Response) {
        const patients = await prisma.patient.findMany()
        console.log(`${patients.length} patients chargés`)
        res.status(200).json(patients)
    },

    async addPatient(req: Request, res: Response) {
        console.log(req.body)
        try {
            const { id, ...newPatient } = req.body
            const patient = await prisma.patient.create({
                data: newPatient
            })
            return res.status(200).json({ 'message': 'Patient ajouté' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Echec lors de la création du patient',
                error: error
            })
        }
    },

    async deletePatient(req: Request, res: Response) {
        console.log(req.params)
        try {
            const patient = await prisma.patient.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            res.status(200).json({
                message: "Patient supprimé"
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Echec de la suppression du patient",
                error: error
            })
        }
    }
}

export default PatientController