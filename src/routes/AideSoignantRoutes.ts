import express from "express";
import { AideSoignantController } from "../controllers/AideSoignantController";
import { PrestationController } from "../controllers/PrestationController";
import authenticateToken from "../middlewares/auth";
const router = express.Router();
router.use(authenticateToken);

const controllerAS = new AideSoignantController();
const controllerPrestations = new PrestationController();
// console.log(controller);


router.get("/", controllerAS.index);
router.get("/interventions", controllerAS.getInterventions);
router.put("/interventions/facturer/:id", controllerAS.editIntervention);
router.get("/interventions/:id/prestations", controllerPrestations.getPrestations)
router.get("/interventions/:id/prestations/mailing",)


export default router;

