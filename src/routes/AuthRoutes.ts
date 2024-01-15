import express from "express";
import LoginController from "../controllers/LoginController";
import jwt from "jsonwebtoken";
import { Personnel } from "../entity/personnel";

const router = express.Router();

function generateAccessToken(user: object) {
  return jwt.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: "5m",
  });
}

router.get("/", (req, res) => {
  res.json({ statut: "WIP" });
});

router.post("/login", LoginController.login);


/**
 * Ces routes sont directement accompagnées de fonctions, il est possible de faire comme ça, notamment pour expérimenter, mais il est préférable et considéré "bonne pratique" de déplacer à termes la logique dans un controlleur associé aux routes (cf pattern design MVC / MVVC)
 */
router.get("/token", (req, res) => {
  const loginObj = {
    name: "username",
    password: "password",
  };
  const token = generateAccessToken(loginObj);
  res.json({ accessToken: token });
});

router.get("/check-token/:token", (req, res) => {
  var token = req.params.token;
  try {
    const decoded = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET));
    res.json({ statut: "ok", token: token });
  } catch (error) {
    res.status(403).json({
      statut: "unauthorized",
      message: "Le token n'a pas été vérifié",
    });
  }
});

export default router;
