import db from "../config/db.js";

class Supervisor {
  static async getAll() {
    try {
      const [rows] = await db.query(`
        SELECT s.*, d.name as department_name 
        FROM supervisors s
        LEFT JOIN departments d ON s.department_id = d.id
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error getting supervisors: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query(
        `
        SELECT s.*, d.name as department_name 
        FROM supervisors s
        LEFT JOIN departments d ON s.department_id = d.id
        WHERE s.id = ?
      `,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Error getting supervisor: ${error.message}`);
    }
  }

  static async create(supervisor) {
    const { name, email, department_id, specialization } = supervisor;
    try {
      const [result] = await db.query(
        "INSERT INTO supervisors (name, email, department_id, specialization) VALUES (?, ?, ?, ?)",
        [name, email, department_id, specialization]
      );
      const id = result.insertId;
      return { id, ...supervisor };
    } catch (error) {
      throw new Error(`Error creating supervisor: ${error.message}`);
    }
  }

  static async update(id, supervisor) {
    const { name, email, department_id, specialization } = supervisor;
    try {
      await db.query(
        "UPDATE supervisors SET name = ?, email = ?, department_id = ?, specialization = ? WHERE id = ?",
        [name, email, department_id, specialization, id]
      );
      return { id, ...supervisor };
    } catch (error) {
      throw new Error(`Error updating supervisor: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await db.query("DELETE FROM supervisors WHERE id = ?", [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting supervisor: ${error.message}`);
    }
  }

  static async getTheses(supervisorId) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM theses WHERE supervisor_id = ?",
        [supervisorId]
      );
      return rows;
    } catch (error) {
      throw new Error(`Error getting supervisor's theses: ${error.message}`);
    }
  }
}

export default Supervisor;
