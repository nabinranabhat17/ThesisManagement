import db from "../config/db.js";

class Student {
  static async getAll() {
    try {
      const [rows] = await db.query(`
        SELECT s.*, d.name as department_name 
        FROM students s
        LEFT JOIN departments d ON s.department_id = d.id
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error getting students: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query(
        `
        SELECT s.*, d.name as department_name 
        FROM students s
        LEFT JOIN departments d ON s.department_id = d.id
        WHERE s.id = ?
      `,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Error getting student: ${error.message}`);
    }
  }

  static async create(student) {
    const { name, email, student_id, department_id, enrollment_year } = student;
    try {
      const [result] = await db.query(
        "INSERT INTO students (name, email, student_id, department_id, enrollment_year) VALUES (?, ?, ?, ?, ?)",
        [name, email, student_id, department_id, enrollment_year]
      );
      const id = result.insertId;
      return { id, ...student };
    } catch (error) {
      throw new Error(`Error creating student: ${error.message}`);
    }
  }

  static async update(id, student) {
    const { name, email, student_id, department_id, enrollment_year } = student;
    try {
      await db.query(
        "UPDATE students SET name = ?, email = ?, student_id = ?, department_id = ?, enrollment_year = ? WHERE id = ?",
        [name, email, student_id, department_id, enrollment_year, id]
      );
      return { id, ...student };
    } catch (error) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await db.query("DELETE FROM students WHERE id = ?", [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting student: ${error.message}`);
    }
  }

  static async getThesis(studentId) {
    try {
      const [rows] = await db.query(
        "SELECT t.* FROM theses t WHERE t.student_id = ?",
        [studentId]
      );
      return rows[0]; // A student should only have one thesis
    } catch (error) {
      throw new Error(`Error getting student's thesis: ${error.message}`);
    }
  }
}

export default Student;
