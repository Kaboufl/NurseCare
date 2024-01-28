import express from "express";
import PersonnelController from "../controllers/PersonnelController";
import authenticateToken from "../middlewares/auth";

/**
 * Ce fichier de routes représente la correspondance entre les URLs de l'app et les méthodes à exécuter pour ces routes,
 * Il est important de préciser que ces routes ont toutes comme préfixe "/personnel" (voir l'importation de ces routes dans app.ts)
 */

const router = express.Router();

/**
 * Cette directive importe le middleware authenticateToken, qui permet de vérifier
 * avant même de passer par le controlleur si l'utilisateur possède un token valide,
 * le code importé ici sera exécuté avant chaque requête sur les routes définies ci-dessous
 * de sorte que si le token n'est pas valide, la requête ne sera pas traitée
 */
router.use(authenticateToken);

/**
 * Cette route permet de vérifier si la datasource est bien initialisée
 */
/**
 * Bien que l'url soit "/", la route est en réalité "/personnel" car elle est définie
 * dans le fichier src/app.ts avec le préfixe "/personnel", les routes suivantes font appel
 * aux méthodes du controlleur PersonnelController (cf pattern design MVC / MVVC)
 */
router.get("/", PersonnelController.getAllPersonnel);
router.get("/:id", PersonnelController.getPersonnel);
router.put("/:id", PersonnelController.updatePersonnel);
router.post("/", PersonnelController.addNewPersonnel);
router.delete("/:id", async (req, res) => {
  res.status(200).json({ statut: "WIP" });
});

export default router;
