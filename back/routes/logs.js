import express from "express";
import { Log } from "../src/model/modelLog.js";

const router = express.Router();

// Route pour récupérer tous les logs
router.get("/logs", async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des logs" });
  }
});

// Route pour supprimer un log par ID
router.delete("/logs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLog = await Log.findByIdAndDelete(id);
    if (!deletedLog) {
      return res.status(404).json({ message: "Log non trouvé" });
    }
    res.json({ message: "Log supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du log" });
  }
});

// Route pour ajouter un log
router.post("/logs", async (req, res) => {
  try {
    const { name, message, date, heure } = req.body;
    const newLog = new Log({ name, message, date, heure });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du log" });
  }
});

export default router;