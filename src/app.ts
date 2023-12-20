import express from "express";
import "reflect-metadata";
require("dotenv").config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Salut sa marche");
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
