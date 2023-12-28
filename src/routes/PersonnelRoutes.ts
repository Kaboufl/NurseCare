import express from "express";
import PersonnelController from "../controllers/PersonnelController";

const router = express.Router();

router.get("/", PersonnelController.getAllPersonnel);
router.get("/add", PersonnelController.addNewPersonnel);

export default router;
