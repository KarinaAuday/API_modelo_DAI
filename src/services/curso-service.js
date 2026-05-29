import { CursoRepository } from '../repositories/curso-repository.js';
import { Curso } from '../entities/curso.js';
import { validateStringLength } from '../helpers/validations-helpers.js';

export class CursoService {
  static async getAll() {
    return await CursoRepository.getAll();
  }

  static async create(data) {
    const validation = validateStringLength(data.nombre, 1);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const curso = new Curso(null, data.nombre.trim());
    return await CursoRepository.create(curso);
  }
}
