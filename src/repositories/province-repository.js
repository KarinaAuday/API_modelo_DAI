import pool from '../configs/database.js';
import { Province } from '../entities/province.js';

export class ProvinceRepository {
  // Obtener todas las provincias
  static async getAll() {
    try {
      console.log('📊 [ProvinceRepository.getAll] Ejecutando query...');
      const result = await pool.query('SELECT * FROM provinces ORDER BY display_order ASC');
      console.log(`✅ [ProvinceRepository.getAll] Query completada. Filas: ${result.rowCount}`);
      
      return result.rows.map(row => new Province(
        row.id,
        row.name,
        row.full_name,
        row.latitude,
        row.longitude,
        row.display_order
      ));
    } catch (error) {
      console.error('❌ [ProvinceRepository.getAll] Error:', error.message);
      throw new Error(`Error al obtener provincias: ${error.message}`);
    }
  }

  // Obtener provincia por ID
  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;
      
      const row = result.rows[0];
      return new Province(
        row.id,
        row.name,
        row.full_name,
        row.latitude,
        row.longitude,
        row.display_order
      );
    } catch (error) {
      throw new Error(`Error al obtener provincia: ${error.message}`);
    }
  }

  // Crear nueva provincia
  static async create(province) {
    try {
      const result = await pool.query(
        'INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [province.name, province.full_name, province.latitude, province.longitude, province.display_order]
      );
      
      const row = result.rows[0];
      return new Province(
        row.id,
        row.name,
        row.full_name,
        row.latitude,
        row.longitude,
        row.display_order
      );
    } catch (error) {
      throw new Error(`Error al crear provincia: ${error.message}`);
    }
  }

  // Actualizar provincia
  static async update(id, province) {
    try {
      const result = await pool.query(
        'UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE id = $6 RETURNING *',
        [province.name, province.full_name, province.latitude, province.longitude, province.display_order, id]
      );
      
      if (result.rows.length === 0) return null;
      
      const row = result.rows[0];
      return new Province(
        row.id,
        row.name,
        row.full_name,
        row.latitude,
        row.longitude,
        row.display_order
      );
    } catch (error) {
      throw new Error(`Error al actualizar provincia: ${error.message}`);
    }
  }

  // Eliminar provincia
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM provinces WHERE id = $1 RETURNING id', [id]);
      return result.rows.length > 0;
    } catch (error) {
      throw new Error(`Error al eliminar provincia: ${error.message}`);
    }
  }
}
