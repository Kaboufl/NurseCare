import express from "express";
import SecretaireController from "../controllers/SecretaireController";
import { RequestWithUser } from "../middlewares/auth";
import PersonnelController from "../controllers/PersonnelController";
import { authenticateToken, permit } from "../middlewares/auth";
import { prisma } from "../app";

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
 * Bien que l'url soit "/", la route est en réalité "/personnel" car elle est définie
 * dans le fichier src/app.ts avec le préfixe "/personnel", les routes suivantes font appel
 * aux méthodes du controlleur PersonnelController (cf pattern design MVC / MVVC)
 */
router.get("/aide-soignants", PersonnelController.getAideSoignants);


export default router;
