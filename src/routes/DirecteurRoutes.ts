import express from "express";
import { AideSoignantController } from "../controllers/AideSoignantController";
import { authenticateToken } from "../middlewares/auth";
import { DirecteurController } from "../controllers/DirecteurController";

const controller = new DirecteurController();

const router = express.Router();
// router.use(authenticateToken);

router.get("/");
router.get("/moyenneEtablissement", controller.getMoyennes);
export default router;