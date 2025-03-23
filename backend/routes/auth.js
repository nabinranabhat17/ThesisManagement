import express from "express";
import Admin from "../models/admin.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Login for admin users
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    const result = await Admin.authenticate(username, password);

    if (!result) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current admin profile (requires auth)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.getById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register new admin (this should be protected in production)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email and password are required",
      });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
