import { Router } from 'express';
import { ProvinceService } from '../services/province-service.js';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const router = Router();

// GET /api/province - Obtener todas las provincias
router.get('/', async (req, res) => {
  try {
    console.log('\n========== REQUEST: GET /api/province ==========');
    console.log(`📍 Timestamp: ${new Date().toISOString()}`);
    console.log(`📋 Headers: ${JSON.stringify(req.headers, null, 2)}`);
    
    const provinces = await ProvinceService.getAll();
    
    console.log(`✅ Response preparada. Total provincias: ${provinces.length}`);
    console.log('========== RESPONSE 200 OK ==========\n');
    
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusText: getReasonPhrase(StatusCodes.OK),
      data: provinces
    });
  } catch (error) {
    console.error('❌ ERROR EN GET /api/province:', error.message);
    console.log('========== RESPONSE 500 ERROR ==========\n');
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      error: error.message
    });
  }
});

// GET /api/province/:id - Obtener provincia por ID
router.get('/:id', async (req, res) => {
  try {
    const province = await ProvinceService.getById(req.params.id);
    
    if (!province) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        statusText: getReasonPhrase(StatusCodes.NOT_FOUND),
        error: 'Provincia no encontrada'
      });
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusText: getReasonPhrase(StatusCodes.OK),
      data: province
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      error: error.message
    });
  }
});

// POST /api/province - Crear nueva provincia
router.post('/', async (req, res) => {
  try {
    const province = await ProvinceService.create(req.body);
    
    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      statusText: getReasonPhrase(StatusCodes.CREATED),
      data: province
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
      error: error.message
    });
  }
});

// PUT /api/province - Actualizar provincia
router.put('/', async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: 'ID es requerido'
      });
    }

    const province = await ProvinceService.update(req.body.id, req.body);
    
    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      statusText: getReasonPhrase(StatusCodes.CREATED),
      data: province
    });
  } catch (error) {
    if (error.message === 'Provincia no encontrada') {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        statusText: getReasonPhrase(StatusCodes.NOT_FOUND),
        error: error.message
      });
    }

    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      statusText: getReasonPhrase(StatusCodes.BAD_REQUEST),
      error: error.message
    });
  }
});

// DELETE /api/province/:id - Eliminar provincia
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ProvinceService.delete(req.params.id);
    
    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        statusText: getReasonPhrase(StatusCodes.NOT_FOUND),
        error: 'Provincia no encontrada'
      });
    }

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusText: getReasonPhrase(StatusCodes.OK),
      message: 'Provincia eliminada correctamente'
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      error: error.message
    });
  }
});

export default router;
