import db from "../config/db.js";

class Department {
  static async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM departments");
      return rows;
    } catch (error) {
      throw new Error(`Error getting departments: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM departments WHERE id = ?", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error getting department: ${error.message}`);
    }
  }

  static async create(name) {
    try {
      const [result] = await db.query(
        "INSERT INTO departments (name) VALUES (?)",
        [name]
      );
      const id = result.insertId;
      return { id, name };
    } catch (error) {
      throw new Error(`Error creating department: ${error.message}`);
    }
  }

  static async update(id, name) {
    try {
      await db.query("UPDATE departments SET name = ? WHERE id = ?", [
        name,
        id,
      ]);
      return { id, name };
    } catch (error) {
      throw new Error(`Error updating department: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await db.query("DELETE FROM departments WHERE id = ?", [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting department: ${error.message}`);
    }
  }
}

export default Department;
