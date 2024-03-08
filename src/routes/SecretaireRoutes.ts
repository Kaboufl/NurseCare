import express from "express";
import SecretaireController from "../controllers/SecretaireController";
import { RequestWithUser } from "../middlewares/auth";
import PersonnelController from "../controllers/PersonnelController";
import { authenticateToken, permit } from "../middlewares/auth";
import { prisma } from "../app";
import PatientController from "../controllers/PatientController";

/**
 * Ce fichier de routes représente la correspondance entre les URLs de l'app et les méthodes à exécuter pour ces routes,
 * Il est important de préciser que ces routes ont toutes comme préfixe "/secretaire" (voir l'importation de ces routes dans app.ts)
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
 * Celle ci permet de vérifier le rôle de l'utilisateur dans le système et ainsi vérifier
 * qu'il possède les bonnes permissions pour accéder aux méthodes des controlleurs, on définit
 * en avance quels roles pourront accéder à ces routes
 */

const validRoles = ["Secretaire", "Directeur"]

router.use(permit(validRoles));

/**
 * Bien que l'url soit "/", la route est en réalité "/secretaire" car elle est définie
 * dans le fichier src/app.ts avec le préfixe "/secretaire", les routes suivantes font appel
 * aux méthodes du controlleur SecretaireController (cf pattern design MVC / MVVC)
 */
router.get("/aide-soignants", PersonnelController.getAideSoignants);
router.get("/interventions", SecretaireController.getInterventions);
router.delete("/interventions/:id", SecretaireController.deleteIntervention);
router.get("/patients", PatientController.getAllPatients);
router.post("/patients", PatientController.addPatient);
router.delete("/patients/:id", PatientController.deletePatient);
router.get("/infirmiers", SecretaireController.getAideSoignants);
router.get("/soins", SecretaireController.getSoins);
router.post("/intervention", SecretaireController.addIntervention);
router.put("/intervention/:id", SecretaireController.editIntervention);


export default router;
