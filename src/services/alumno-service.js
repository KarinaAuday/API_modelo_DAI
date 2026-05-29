import { AlumnoRepository } from '../repositories/alumno-repository.js';
import { Alumno } from '../entities/alumno.js';
import { validateStringLength, validateNumber } from '../helpers/validations-helpers.js';

export class AlumnoService {
  static async getAll() {
    return await AlumnoRepository.getAll();
  }

  static async create(data) {
    const nombreValidation = validateStringLength(data.nombre, 3);
    if (!nombreValidation.valid) {
      throw new Error(nombreValidation.error);
    }

    const apellidoValidation = validateStringLength(data.apellido, 3);
    if (!apellidoValidation.valid) {
      throw new Error(apellidoValidation.error);
    }

    const cursoValidation = validateNumber(data.id_curso, 'id_curso');
    if (!cursoValidation.valid) {
      throw new Error(cursoValidation.error);
    }

    const alumno = new Alumno(
      null,
      data.nombre.trim(),
      data.apellido.trim(),
      data.id_curso,
      data.fecha_nacimiento || null,
      data.hace_deportes === true
    );

    return await AlumnoRepository.create(alumno);
  }
}
