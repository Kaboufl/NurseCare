import { Request, Response } from 'express'
import { prisma } from "../app"
import nodemailer from "nodemailer";
import { jsPDF } from "jspdf";
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
            service: 'smtp.office365.com',
            auth: {
                user:'',
                pass:''
            }
        })
        const pdf = new jsPDF();
        const prestation = prestations[0].intervention;
        const titleText = `Facture des prestations de ${prestation.patient.nom} ${prestation.patient.prenom} du ${prestation.date_integration}`;
        const titleLines = pdf.splitTextToSize(titleText, pdf.internal.pageSize.width - 20);
        titleLines.forEach((line:any, index:any) => {
            pdf.text(line, 10, 10 + index * 10);
          });

        const titleHeight = titleLines.length * 10;
        const data = this.prestationsFiltrees.map(intervention => [intervention.libelle_prestation, `${intervention.prix_prestation} €`]);
    
        //const html = readFileSync("./email.html").toString("utf8").replace(/{{(.*?)}}/g,(match) => {
        //    return prestations[0].toString() || ''});
    
        const mailOptions = {
            from:'noreply-nursecareAS@nursecare.org',
            to:'',
            subject:'Facture Intervention du ???',
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