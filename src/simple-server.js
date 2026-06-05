import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const alumnos = [
  { id: 1, nombre: 'Ana', apellido: 'Gómez', edad: 17, curso: 'Programación I' },
  { id: 2, nombre: 'Diego', apellido: 'Pérez', edad: 18, curso: 'Matemática' },
];

const cursos = [
  { id: 1, nombre: 'Programación I', descripcion: 'Introducción a JavaScript' },
  { id: 2, nombre: 'Matemática', descripcion: 'Álgebra básica' },
];

const nextId = (items) => Math.max(0, ...items.map((item) => item.id)) + 1;

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/alumnos', (req, res) => {
  res.json({ data: alumnos });
});

app.get('/api/alumnos/:id', (req, res) => {
  const id = Number(req.params.id);
  const alumno = alumnos.find((item) => item.id === id);

  if (!alumno) {
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }

  res.json({ data: alumno });
});

app.post('/api/alumnos', (req, res) => {
  const { nombre, apellido, edad, curso } = req.body;

  if (!nombre || !apellido || !edad || !curso) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, apellido, edad, curso' });
  }

  const alumno = { id: nextId(alumnos), nombre, apellido, edad, curso };
  alumnos.push(alumno);

  res.status(201).json({ data: alumno });
});

app.get('/api/cursos', (req, res) => {
  res.json({ data: cursos });
});

app.post('/api/cursos', (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, descripcion' });
  }

  const curso = { id: nextId(cursos), nombre, descripcion };
  cursos.push(curso);

  res.status(201).json({ data: curso });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log('Servidor básico iniciado en http://localhost:' + port);
  console.log('Endpoints disponibles:');
  console.log('  GET  /health');
  console.log('  GET  /api/alumnos');
  console.log('  GET  /api/alumnos/:id');
  console.log('  POST /api/alumnos');
  console.log('  GET  /api/cursos');
  console.log('  POST /api/cursos');
});
