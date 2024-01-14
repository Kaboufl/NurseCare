import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const LoginController = {
  generateAccessToken(user: object, tokenLifetime: Number = 2) {
    return jwt.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: tokenLifetime + "h",
    });
  },

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
