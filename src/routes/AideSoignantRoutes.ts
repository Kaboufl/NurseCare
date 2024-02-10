import express from "express";
import { AideSoignantController } from "../controllers/AideSoignantController";
import { PrestationController } from "../controllers/PrestationController";
import authenticateToken from "../middlewares/auth";
import nodemailer from "nodemailer";
import { readFileSync } from "fs";
const router = express.Router();
router.use(authenticateToken);

const controllerAS = new AideSoignantController();
const controllerPrestations = new PrestationController();
// console.log(controller);


router.get("/", controllerAS.index);
router.get("/interventions", controllerAS.getInterventions);
router.get("/interventions/:id/prestations", controllerPrestations.getPrestations)
router.get("/intervention/:id/prestations/mailing", (req,res)=> {
    controllerPrestations.getPrestations(req,res)
    const transporter = nodemailer.createTransport({
        service: '',
        auth: {
            user:'',
            pass:''
        }
    })

    const html = readFileSync("./email.html").toString("utf8").replace(/{{(.*?)}}/g,()=> {
        return data
    });
    const mailOptions = {
        from:'noreply-nursecareAS@nursecare.org',
        to:'',
        subject:'Facture Intervention du ???',
        html:''
    }

})

export default router;

