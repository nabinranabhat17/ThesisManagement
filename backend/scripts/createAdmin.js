import dotenv from "dotenv";
import db from "../config/db.js";
import bcrypt from "bcrypt";

dotenv.config();

async function createAdmin() {
  try {
    console.log("Creating new admin user...");

    // Admin credentials
    const username = "admin";
    const email = "admin@thesismanagement.com";
    const password = "admin123";

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if admin already exists
    const [existingAdmins] = await db.query(
      "SELECT id FROM admins WHERE username = ?",
      [username]
    );

    if (existingAdmins.length > 0) {
      // Update existing admin
      await db.query("UPDATE admins SET password = ? WHERE username = ?", [
        hashedPassword,
        username,
      ]);
      console.log("Admin password updated successfully.");
    } else {
      // Insert new admin
      await db.query(
        "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
      console.log("Admin created successfully.");
    }

    // Verify the password works
    const hash = hashedPassword;
    const isValid = await bcrypt.compare(password, hash);
    console.log("Password verification:", isValid ? "Valid" : "Invalid");
    console.log("Admin username:", username);
    console.log("Admin password:", password);

    // Close the database connection
    await db.end();
  } catch (error) {
    console.error("Error creating admin:", error);
  }
}

createAdmin();
