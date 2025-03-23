import express from "express";
import Supervisor from "../models/supervisor.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get all supervisors
router.get("/", async (req, res) => {
  try {
    const supervisors = await Supervisor.getAll();
    res.json(supervisors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get supervisor by ID
router.get("/:id", async (req, res) => {
  try {
    const supervisor = await Supervisor.getById(req.params.id);
    if (!supervisor) {
      return res.status(404).json({ error: "Supervisor not found" });
    }
    res.json(supervisor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get supervisor's theses
router.get("/:id/theses", async (req, res) => {
  try {
    const theses = await Supervisor.getTheses(req.params.id);
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create supervisor
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, department_id, specialization } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const supervisor = await Supervisor.create({
      name,
      email,
      department_id,
      specialization,
    });
    res.status(201).json(supervisor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update supervisor
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, department_id, specialization } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const supervisor = await Supervisor.update(req.params.id, {
      name,
      email,
      department_id,
      specialization,
    });
    res.json(supervisor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete supervisor
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Supervisor.delete(req.params.id);
    res.json({ message: "Supervisor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
