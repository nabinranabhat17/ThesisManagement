import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Extract token (remove 'Bearer ' prefix)
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add admin data to request
    req.admin = decoded;

    // Continue to the next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
