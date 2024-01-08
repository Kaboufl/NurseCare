import express from "express";
import PersonnelController from "../controllers/PersonnelController";
import authenticateToken from "../middlewares/auth";

const router = express.Router();

router.use(authenticateToken)

router.get("/", PersonnelController.getAllPersonnel);
router.get("/:id", PersonnelController.getPersonnel);
router.put("/:id", PersonnelController.updatePersonnel);
router.post("/", PersonnelController.addNewPersonnel);
router.delete("/:id", async (req, res) => {
    res.status(200).json({ statut: "WIP"});
})

export default router;
