import express from "express";
import "reflect-metadata";
require("dotenv").config();

const jwt = require("jsonwebtoken");

const app = express();

app.get("/", (req, res) => {
  res.send("Salut sa marche");
});

app.get("/JWT", (req, res) => {
  /**
   * Cette fonction génère un token en prenant un object en entrée, ainsi qu'une clé secrète
   * @param jsonData
   * @param options
   * @returns
   */
  const createTokenFromJson = (jsonData: {}, options = {}) => {
    try {
      const secretKey = "test";
      const token = jwt.sign(jsonData, secretKey, options);
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const jsonData = { email: "test@test.com", password: "motdepassefort" };
  const token = createTokenFromJson(jsonData);

  res.json({ status: true, token: token });
});

app.listen(process.env.API_PORT, () => {
  console.log(`server is listening on ${process.env.API_PORT}`);
});
