import pool from '../configs/database.js';
import { Alumno } from '../entities/alumno.js';

export class AlumnoRepository {
  static async getAll() {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY id');
    return result.rows.map(row => new Alumno(
      row.id,
      row.nombre,
      row.apellido,
      row.id_curso,
      row.fecha_nacimiento,
      row.hace_deportes
    ));
  }

  static async create(alumno) {
    const result = await pool.query(
      'INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [alumno.nombre, alumno.apellido, alumno.id_curso, alumno.fecha_nacimiento, alumno.hace_deportes]
    );
    const row = result.rows[0];
    return new Alumno(
      row.id,
      row.nombre,
      row.apellido,
      row.id_curso,
      row.fecha_nacimiento,
      row.hace_deportes
    );
  }
}
