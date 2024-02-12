import { Request, Response } from 'express'
import { prisma } from "../app"
import nodemailer from "nodemailer";
import { readFileSync } from "fs";

export class PrestationController {

    async getPrestations(req: Request, res:Response) {
        const intervention = req.params.id
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
            res.json(prestation)
        }

    async maillingController(req: Request,res: Response) {
        const intervention = req.params.id
        const prestations = await prisma.prestation.findMany({
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
        const transporter = nodemailer.createTransport({
            service: '',
            auth: {
                user:'',
                pass:''
            }
        })
    
        const html = readFileSync("./email.html").toString("utf8").replace(/{{(.*?)}}/g,(match) => {
            return prestations[0].toString() || ''});
    
        const mailOptions = {
            from:'noreply-nursecareAS@nursecare.org',
            to:'',
            subject:'Facture Intervention du ???',
            html: html
        }
    
        transporter.sendMail(mailOptions, (err,info) => {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de l'envoi du mail");
            }
            else {
                console.log(info);
                res.status(200).send("Mail envoyé");
            }
        });
    }

}