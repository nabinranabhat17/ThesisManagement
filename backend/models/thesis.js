import db from "../config/db.js";

class Thesis {
  static async getAll() {
    try {
      const [rows] = await db.query(`
        SELECT t.*, 
               s.name as student_name,
               sup.name as supervisor_name
        FROM theses t
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN supervisors sup ON t.supervisor_id = sup.id
        ORDER BY t.submission_date DESC
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error getting theses: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query(`
        SELECT t.*, 
               s.name as student_name,
               sup.name as supervisor_name
        FROM theses t
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN supervisors sup ON t.supervisor_id = sup.id
        WHERE t.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error getting thesis: ${error.message}`);
    }
  }

  static async create(thesis) {
    const {
      title,
      description,
      student_id,
      supervisor_id,
      submission_date,
      grade,
    } = thesis;

    try {
      const [result] = await db.query(
        `INSERT INTO theses 
          (title, description, student_id, supervisor_id, submission_date, grade) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, student_id, supervisor_id, submission_date, grade]
      );
      const id = result.insertId;
      return { id, ...thesis };
    } catch (error) {
      throw new Error(`Error creating thesis: ${error.message}`);
    }
  }

  static async update(id, thesis) {
    const {
      title,
      description,
      student_id,
      supervisor_id,
      submission_date,
      grade,
    } = thesis;

    try {
      await db.query(
        `UPDATE theses 
         SET title = ?, description = ?, student_id = ?, supervisor_id = ?, 
             submission_date = ?, grade = ?
         WHERE id = ?`,
        [title, description, student_id, supervisor_id, submission_date, grade, id]
      );
      return { id, ...thesis };
    } catch (error) {
      throw new Error(`Error updating thesis: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      await db.query("DELETE FROM theses WHERE id = ?", [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting thesis: ${error.message}`);
    }
  }
  
  static async getBySubmissionDateRange(startDate, endDate) {
    try {
      const [rows] = await db.query(`
        SELECT t.*, 
               s.name as student_name,
               sup.name as supervisor_name
        FROM theses t
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN supervisors sup ON t.supervisor_id = sup.id
        WHERE t.submission_date BETWEEN ? AND ?
        ORDER BY t.submission_date DESC
      `, [startDate, endDate]);
      return rows;
    } catch (error) {
      throw new Error(`Error getting theses by date range: ${error.message}`);
    }
  }
  
  static async getByYear(year) {
    try {
      const [rows] = await db.query(`
        SELECT t.*, 
               s.name as student_name,
               sup.name as supervisor_name
        FROM theses t
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN supervisors sup ON t.supervisor_id = sup.id
        WHERE YEAR(t.submission_date) = ?
        ORDER BY t.submission_date DESC
      `, [year]);
      return rows;
    } catch (error) {
      throw new Error(`Error getting theses by year: ${error.message}`);
    }
  }
  
  static async getBySupervisor(supervisorId) {
    try {
      const [rows] = await db.query(`
        SELECT t.*, 
               s.name as student_name,
               sup.name as supervisor_name
        FROM theses t
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN supervisors sup ON t.supervisor_id = sup.id
        WHERE t.supervisor_id = ?
        ORDER BY t.submission_date DESC
      `, [supervisorId]);
      return rows;
    } catch (error) {
      throw new Error(`Error getting theses by supervisor: ${error.message}`);
    }
  }
  
  static async getByStudent(studentId) {
    try {
      const [rows] = await db.query(`
        SELECT t.*, 
               s.name as student_name,
               sup.name as supervisor_name
        FROM theses t
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN supervisors sup ON t.supervisor_id = sup.id
        WHERE t.student_id = ?
      `, [studentId]);
      return rows;
    } catch (error) {
      throw new Error(`Error getting theses by student: ${error.message}`);
    }
  }
  
  static async search(query) {
    try {
      const searchTerm = `%${query}%`;
      const [rows] = await db.query(`
        SELECT t.*, 
               s.name as student_name,
               sup.name as supervisor_name
        FROM theses t
        LEFT JOIN students s ON t.student_id = s.id
        LEFT JOIN supervisors sup ON t.supervisor_id = sup.id
        WHERE t.title LIKE ?
          OR s.name LIKE ?
          OR sup.name LIKE ?
        ORDER BY t.submission_date DESC
      `, [searchTerm, searchTerm, searchTerm]);
      return rows;
    } catch (error) {
      throw new Error(`Error searching theses: ${error.message}`);
    }
  }
}

export default Thesis;
