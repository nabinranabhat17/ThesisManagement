import express from "express";
import Department from "../models/department.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.getAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.getById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create department
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Department name is required" });
    }
    const department = await Department.create(name);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update department
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Department name is required" });
    }
    const department = await Department.update(req.params.id, name);
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete department
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Department.delete(req.params.id);
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
