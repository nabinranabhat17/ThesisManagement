import express from "express";
import Thesis from "../models/thesis.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get all theses
router.get("/", async (req, res) => {
  try {
    const theses = await Thesis.getAll();
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get thesis by ID
router.get("/:id", async (req, res) => {
  try {
    const thesis = await Thesis.getById(req.params.id);
    if (!thesis) {
      return res.status(404).json({ error: "Thesis not found" });
    }
    res.json(thesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get theses by status
router.get("/status/:status", async (req, res) => {
  try {
    const theses = await Thesis.getByStatus(req.params.status);
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get theses by submission date range
router.get("/date-range/:startDate/:endDate", async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const theses = await Thesis.getBySubmissionDateRange(startDate, endDate);
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get theses by year
router.get("/year/:year", async (req, res) => {
  try {
    const theses = await Thesis.getByYear(req.params.year);
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get theses by supervisor
router.get("/supervisor/:supervisorId", async (req, res) => {
  try {
    const theses = await Thesis.getBySupervisor(req.params.supervisorId);
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get theses by student
router.get("/student/:studentId", async (req, res) => {
  try {
    const theses = await Thesis.getByStudent(req.params.studentId);
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search theses
router.get("/search/:query", async (req, res) => {
  try {
    const theses = await Thesis.search(req.params.query);
    res.json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected routes - admin only
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      student_id,
      supervisor_id,
      submission_date,
      grade,
    } = req.body;

    if (!title || !student_id || !supervisor_id || !submission_date) {
      return res
        .status(400)
        .json({
          error:
            "Title, student ID, supervisor ID, and submission date are required",
        });
    }

    const thesis = await Thesis.create({
      title,
      description,
      student_id,
      supervisor_id,
      submission_date,
      grade,
    });

    res.status(201).json(thesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      student_id,
      supervisor_id,
      submission_date,
      grade,
    } = req.body;

    if (!title || !submission_date) {
      return res
        .status(400)
        .json({ error: "Title and submission date are required" });
    }

    const thesis = await Thesis.update(req.params.id, {
      title,
      description,
      student_id,
      supervisor_id,
      submission_date,
      grade,
    });

    res.json(thesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Thesis.delete(req.params.id);
    res.json({ message: "Thesis deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
