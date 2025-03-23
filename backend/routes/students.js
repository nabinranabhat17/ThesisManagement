import express from "express";
import Student from "../models/student.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.getAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.getById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student's thesis
router.get("/:id/thesis", async (req, res) => {
  try {
    const thesis = await Student.getThesis(req.params.id);
    if (!thesis) {
      return res
        .status(404)
        .json({ error: "Thesis not found for this student" });
    }
    res.json(thesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create student
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, student_id, department_id, enrollment_year } =
      req.body;
    if (!name || !email || !student_id) {
      return res
        .status(400)
        .json({ error: "Name, email, and student ID are required" });
    }
    const student = await Student.create({
      name,
      email,
      student_id,
      department_id,
      enrollment_year,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, student_id, department_id, enrollment_year } =
      req.body;
    if (!name || !email || !student_id) {
      return res
        .status(400)
        .json({ error: "Name, email, and student ID are required" });
    }
    const student = await Student.update(req.params.id, {
      name,
      email,
      student_id,
      department_id,
      enrollment_year,
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Student.delete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
