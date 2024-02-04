import express from "express";
import { AideSoignantController } from "../controllers/AideSoignantController";
import authenticateToken from "../middlewares/auth";

const router = express.Router();
router.use(authenticateToken);

const controller = new AideSoignantController();
// console.log(controller);

router.get("/", controller.index);
router.get("/interventions", controller.getInterventions);

export default router;

