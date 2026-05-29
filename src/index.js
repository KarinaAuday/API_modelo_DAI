import express from 'express';
import cors from 'cors';
import ProvinceRouter from './controllers/province-controller.js';
import CursoRouter from './controllers/curso-controller.js';
import AlumnoRouter from './controllers/alumno-controller.js';

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('💚 [Health Check] Request recibido');
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Endpoints (Routers)
app.use('/api/province', ProvinceRouter);
app.use('/api/cursos', CursoRouter);
app.use('/api/alumnos', AlumnoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ [Error Handler] Error no manejado:', err.message);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Start Server
app.listen(port, () => {
  console.log('\n╔════════════════════════════════════╗');
  console.log('║   API Modelo DAI - Servidor        ║');
  console.log('║   ✅ Iniciado correctamente        ║');
  console.log(`║   📍 http://localhost:${port}         ║`);
  console.log('║   Endpoints disponibles:           ║');
  console.log('║   • /api/province (CRUD)           ║');
  console.log('║   • /api/cursos (GET, POST)        ║');
  console.log('║   • /api/alumnos (GET, POST)       ║');
  console.log('╚════════════════════════════════════╝\n');
});
