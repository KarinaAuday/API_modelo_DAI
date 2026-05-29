import { Router } from 'express';
import { AlumnoService } from '../services/alumno-service.js';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const alumnos = await AlumnoService.getAll();
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusText: getReasonPhrase(StatusCodes.OK),
      data: alumnos
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const alumno = await AlumnoService.create(req.body);
    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      statusText: getReasonPhrase(StatusCodes.CREATED),
      data: alumno
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
      error: error.message
    });
  }
});

export default router;
