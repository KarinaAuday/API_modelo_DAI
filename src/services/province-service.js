import { ProvinceRepository } from '../repositories/province-repository.js';
import { Province } from '../entities/province.js';
import {
  validateStringLength,
  validateCoordinates,
  validateDisplayOrder
} from '../helpers/validations-helpers.js';

export class ProvinceService {
  // Validar datos de provincia
  static validateProvinceData(data) {
    // Validar name
    const nameValidation = validateStringLength(data.name, 3);
    if (!nameValidation.valid) {
      return { valid: false, error: nameValidation.error };
    }

    // Validar full_name
    const fullNameValidation = validateStringLength(data.full_name, 3);
    if (!fullNameValidation.valid) {
      return { valid: false, error: fullNameValidation.error };
    }

    // Validar coordenadas
    const coordValidation = validateCoordinates(data.latitude, data.longitude);
    if (!coordValidation.valid) {
      return { valid: false, error: coordValidation.error };
    }

    // Validar display_order
    const displayOrderValidation = validateDisplayOrder(data.display_order);
    if (!displayOrderValidation.valid) {
      return { valid: false, error: displayOrderValidation.error };
    }

    return { valid: true };
  }

  // Obtener todas las provincias
  static async getAll() {
    try {
      return await ProvinceRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  // Obtener provincia por ID
  static async getById(id) {
    try {
      if (!Number.isInteger(parseInt(id))) {
        throw new Error('ID inválido');
      }
      return await ProvinceRepository.getById(parseInt(id));
    } catch (error) {
      throw error;
    }
  }

  // Crear nueva provincia
  static async create(data) {
    try {
      const validation = this.validateProvinceData(data);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const province = new Province(
        null,
        data.name.trim(),
        data.full_name.trim(),
        data.latitude,
        data.longitude,
        data.display_order
      );

      return await ProvinceRepository.create(province);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar provincia
  static async update(id, data) {
    try {
      if (!Number.isInteger(parseInt(id))) {
        throw new Error('ID inválido');
      }

      // Verificar que la provincia existe
      const existing = await ProvinceRepository.getById(parseInt(id));
      if (!existing) {
        throw new Error('Provincia no encontrada');
      }

      const validation = this.validateProvinceData(data);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const province = new Province(
        parseInt(id),
        data.name.trim(),
        data.full_name.trim(),
        data.latitude,
        data.longitude,
        data.display_order
      );

      return await ProvinceRepository.update(parseInt(id), province);
    } catch (error) {
      throw error;
    }
  }

  // Eliminar provincia
  static async delete(id) {
    try {
      if (!Number.isInteger(parseInt(id))) {
        throw new Error('ID inválido');
      }

      // Verificar que la provincia existe
      const existing = await ProvinceRepository.getById(parseInt(id));
      if (!existing) {
        throw new Error('Provincia no encontrada');
      }

      const deleted = await ProvinceRepository.delete(parseInt(id));
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
