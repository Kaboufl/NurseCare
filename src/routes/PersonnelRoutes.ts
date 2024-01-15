import express from "express";
import PersonnelController from "../controllers/PersonnelController";
import authenticateToken from "../middlewares/auth";

/**
 * Ce fichier de routes représente la correspondance entre les URLs de l'app et les méthodes à exécuter pour ces routes,
 * Il est important de préciser que ces routes ont toutes comme préfixe "/personnel" (voir l'importation de ces routes dans app.ts)
 */

const router = express.Router();


/**
 * Cette directive importe le middleware authenticateToken, qui permet de vérifier avant même de passer par le controlleur si l'utilisateur possède un token valide
 */
router.use(authenticateToken);

router.get("/datasource", PersonnelController.isDatasourceInitialized);

router.get("/", PersonnelController.getAllPersonnel);
router.get("/:id", PersonnelController.getPersonnel);
router.put("/:id", PersonnelController.updatePersonnel);
router.post("/", PersonnelController.addNewPersonnel);
router.delete("/:id", async (req, res) => {
  res.status(200).json({ statut: "WIP" });
});

export default router;
