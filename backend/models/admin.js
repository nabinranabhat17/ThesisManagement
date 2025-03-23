import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Admin {
  static async getAll() {
    try {
      const [rows] = await db.query(
        "SELECT id, username, email, created_at FROM admins"
      );
      return rows;
    } catch (error) {
      throw new Error(`Error getting admins: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query(
        "SELECT id, username, email, created_at FROM admins WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Error getting admin: ${error.message}`);
    }
  }

  static async getByUsername(username) {
    try {
      const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [
        username,
      ]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error getting admin by username: ${error.message}`);
    }
  }

  static async create(admin) {
    const { username, email, password } = admin;
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const [result] = await db.query(
        "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
      const id = result.insertId;
      return { id, username, email };
    } catch (error) {
      throw new Error(`Error creating admin: ${error.message}`);
    }
  }

  static async authenticate(username, password) {
    try {
      // Get the admin
      const admin = await this.getByUsername(username);

      if (!admin) {
        console.log(`No admin found with username: ${username}`);
        return null;
      }

      console.log(`Admin found: ${admin.username}`);

      // Check password
      const passwordMatch = await bcrypt.compare(password, admin.password);

      console.log(`Password comparison result: ${passwordMatch}`);

      if (!passwordMatch) {
        return null;
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        },
      };
    } catch (error) {
      console.error(`Authentication error for ${username}:`, error);
      throw new Error(`Authentication error: ${error.message}`);
    }
  }

  static async update(id, admin) {
    const { username, email, password } = admin;
    try {
      let hashedPassword = password;

      // If password is provided, hash it
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      // Update with or without password
      if (password) {
        await db.query(
          "UPDATE admins SET username = ?, email = ?, password = ? WHERE id = ?",
          [username, email, hashedPassword, id]
        );
      } else {
        await db.query(
          "UPDATE admins SET username = ?, email = ? WHERE id = ?",
          [username, email, id]
        );
      }

      return { id, username, email };
    } catch (error) {
      throw new Error(`Error updating admin: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await db.query("DELETE FROM admins WHERE id = ?", [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting admin: ${error.message}`);
    }
  }
}

export default Admin;
