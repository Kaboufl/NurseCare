import { Request, Response } from "express";
import { prisma } from "../app";
import nodemailer from "nodemailer";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
// import { readFileSync } from "fs";

export class PrestationController {
  async getPrestations(req: Request, res: Response) {
    const intervention = req.params.id;
    const prestation = await prisma.prestation.findMany({
      where: {
        interventionId: Number(intervention),
      },
      include: {
        intervention: {
          include: {
            patient: true,
            personnel: true,
          },
        },
        soin: true,
      },
    });
    res.json(prestation);
  }

  async maillingIntervention(req: Request, res: Response) {
    const intervention = req.params.id;
    const prestations = await prisma.prestation.findMany({
      where: {
        interventionId: Number(intervention),
      },
      include: {
        intervention: {
          include: {
            patient: true,
            personnel: true,
          },
        },
        soin: {
          include: {
            categorie: true,
          },
        },
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      auth: {
        user: "nurseCare4R7@outlook.com",
        pass: "nrsCr31200!!",
      },
      secure: false,
    });

    const pdf = new jsPDF();
    const prestation = prestations[0].intervention;

    const fullDate = `${prestation.date.getDate()}${
      prestation.date.getMonth() + 1
    }${prestation.date.getFullYear()}${prestation.date.getHours()}${prestation.date.getMinutes()}`;

    const fullDateNoTime = `${prestation.date.getDate()}/${
      prestation.date.getMonth() + 1
    }/${prestation.date.getFullYear()}`;

    const fullLetterDateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const fullLetterDate = `${new Date(prestation.date).toLocaleString(
      "fr-FR",
      fullLetterDateOptions as Intl.DateTimeFormatOptions
    )}`;

    const titleText = `Facture des prestations de ${prestation.patient.nom} ${prestation.patient.prenom} du ${fullDateNoTime}`;
    const titleLines = pdf.splitTextToSize(
      titleText,
      pdf.internal.pageSize.width - 20
    );
    titleLines.forEach((line: any, index: any) => {
      pdf.text(line, 10, 10 + index * 10);
    });

    const titleHeight = titleLines.length * 10;
    const data = prestations.map((prestations) => [
      prestations.soin.libelle,
      prestations.soin.categorie.libelle,
      `${prestations.soin.prix} €`,
    ]);
    const totalPrix = prestations.reduce(
      (total, prestations) => total + prestations.soin.prix.toNumber(),
      0
    );
    data.push(["Total", "", `${totalPrix} €`]);

    autoTable(pdf, {
      head: [["Soin Appliqué", "Type de Soin", "Prix"]],
      body: data,
      startY: 20 + titleHeight,
    });

    const pdfFileName = `fact-${fullDate}-${prestation.id}.pdf`;
    // pdf.save(pdfFileName);
    const fakePdfBase64 = pdf.output("datauristring");

    const mailContent = {
      from: "nurseCare4R7@outlook.com",
      to: prestation.patient.mail,
      subject: `Intervention du ${fullDateNoTime}`,
      text: `Bonjour Madame/Monsieur ${prestation.patient.nom},\n\nVoici la facture de votre intervention du ${fullLetterDate} ci-joint d'un motant total de ${totalPrix} €.\n\nCordialement, \nL'équipe NurseCare`,
      attachments: [
        {
          filename: pdfFileName,
          content: fakePdfBase64.split(",")[1],
          encoding: "base64",
        },
      ],
    };
    //const html = readFileSync("./email.html").toString("utf8").replace(/{{(.*?)}}/g,(match) => {
    //    return prestations[0].toString() || ''});
    try {
      const response = await transporter.sendMail(mailContent);
      res.status(200).send("Mail envoyé");
    } catch (error) {
      res.status(500).send("Erreur lors de l'envoi du mail" + error);
    }
  }
}
