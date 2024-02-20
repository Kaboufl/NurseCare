import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * LoginController constitue l'ensemble des routes utilisées pour l'authentification sur l'application
 */
const LoginController = {
  /**
   * Cette fonction permet de générer le token JWT avec en entrée un objet et une potentielle durée personnalisée de validité pour le token
   * @param user
   * @param tokenLifetime
   * @returns
   */
  generateAccessToken(user: object, tokenLifetime: Number = 2) {
    return jwt.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: tokenLifetime + "h", // la valeur par défaut est de 2h
    });
  },

  /**
   * C'est ici que se trouve la logique de vérification des identifiants et le
   * retour de la requête avec soit un message d'erreur soit un message de
   * succès avec le token (tel que je l'ai imaginé, adaptes en fonction
   * ton implémentation)
   * @param req
   * @param res
   */
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.personnel.findUnique({
        where: { mail: email },
        include: { role: true },
      });

      //Si l'utilisateur n'est pas trouvé (= False) on retourne une erreur 403
      if (!user) {
        return res.status(403).json({ message: "Email non trouvé" });
      }

      //Sinon on prend le mdp du formulaire, on le hash et on compare avec celui en BDD

      const passwordIsValid = await bcrypt.compare(password, user.password);

      //Si le mdp est valide on envoie le token

      if (passwordIsValid) {
        const token = LoginController.generateAccessToken(
          { user_id: user.id },
          2
        );
        res
          .status(200)
          .json({ statut: "ok", token: "Bearer " + token, user: user });
      }
      //Sinon on renvoie un 401 avec la raison de l'erreur
      else {
        res.status(401).json({
          msg: "Identifiants de connexion incorrects",
          statut: "error",
        });
      }
      //Si un autre type d'erreur est survenu
    } catch (error) {
      res.status(500).json({ message: "Erreur du serveur" });
    }
  },
};

export default LoginController;
