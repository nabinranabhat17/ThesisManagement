import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import departmentRoutes from "./routes/departments.js";
import supervisorRoutes from "./routes/supervisors.js";
import studentRoutes from "./routes/students.js";
import thesisRoutes from "./routes/theses.js";
import authRoutes from "./routes/auth.js";

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use("/api/departments", departmentRoutes);
app.use("/api/supervisors", supervisorRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/theses", thesisRoutes);
app.use("/api/auth", authRoutes); // New auth routes

// Root route
app.get("/", (req, res) => {
  res.send("Thesis Management System API");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
