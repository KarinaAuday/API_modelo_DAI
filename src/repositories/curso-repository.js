import pool from '../configs/database.js';
import { Curso } from '../entities/curso.js';

export class CursoRepository {
  static async getAll() {
    const result = await pool.query('SELECT * FROM cursos ORDER BY id');
    return result.rows.map(row => new Curso(row.id, row.nombre));
  }

  static async create(curso) {
    const result = await pool.query(
      'INSERT INTO cursos (nombre) VALUES ($1) RETURNING *',
      [curso.nombre]
    );
    const row = result.rows[0];
    return new Curso(row.id, row.nombre);
  }
}
