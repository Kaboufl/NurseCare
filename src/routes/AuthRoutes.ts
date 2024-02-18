import express from "express";
import LoginController from "../controllers/LoginController";
import { authenticateToken } from "../middlewares/auth";
import jwt from "jsonwebtoken";


const router = express.Router();

function generateAccessToken(user: object) {
  return jwt.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: "5m",
  });
}

/**
 * Bien que l'url soit "/", la route est en réalité "/auth" car elle est définie
 * dans le fichier src/app.ts avec le préfixe "/auth"
 */
router.get("/", (req, res) => {
  res.json({ statut: "WIP" });
});

/**
 * Cette route permet de se connecter à l'application, elle est accompagnée d'une
 * fonction qui permet de vérifier les identifiants et de générer le token,
 * cependant ici la logique est déplacée dans un controlleur, en l'occurence LoginController
 */
router.post("/login", LoginController.login);
router.get("/logout", authenticateToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Utilisateur déconnecté" });
});

/**
 * Ces routes sont directement accompagnées de fonctions, il est possible de faire
 * comme ça, notamment pour expérimenter, mais il est préférable et considéré
 * "bonne pratique" de déplacer à termes la logique dans un controlleur associé
 * aux routes (cf pattern design MVC / MVVC)
 */

router.get("/profile", LoginController.getUserProfileFromToken)

export default router;
