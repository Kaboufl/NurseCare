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

    async updatePatient(req: Request, res: Response) {
        try {
            delete req.body.id
            const updatedPatient = req.body
            const patientId: number = parseInt(req.params.id)
            
            
            const patient = await prisma.patient.update({
                where: {
                    id: patientId
                },
                data: updatedPatient
            })
            
            res.status(200).json({
                statut: "ok",
                message: "Patient mis à jour",
                patient: patient
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                statut: "error",
                message: "Echec lors de la mise à jour du patient",
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
        } catch (error: any) {
            if(error.code == "P2003") {
                return res.status(409).json({
                    message: "Le patient possède des interventions assignées, impossible de le supprimer"
                })
            }
            res.status(500).json({
                message: "Echec de la suppression du patient",
                error: error
            })
        }
    }
}

export default PatientController