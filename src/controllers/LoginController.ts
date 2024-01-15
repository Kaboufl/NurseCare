import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
    // insérer logique de login

    const email = "validemail@nurse.care";
    const password = "validpassword";

    console.log(req.body);

    if (req.body.email === email && req.body.password === password) {
      // si login ok

      // générer token

      const token = LoginController.generateAccessToken(req.body);

      res.status(200).json({
        statut: "ok",
        token: "Bearer " + token,
      });
    } else {
      // si login pas ok
      res.status(404).json({
        msg: "Identifiants de connexion incorrects",
        statut: "error",
      });
    }
  },
};

export default LoginController;
