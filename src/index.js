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

// Endpoints (Routers)
app.use('/api/province', ProvinceRouter);
app.use('/api/cursos', CursoRouter);
app.use('/api/alumnos', AlumnoRouter);

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
