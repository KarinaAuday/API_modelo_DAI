# API Modelo DAI - Node.js + React

Proyecto full-stack con API REST en Node.js/Express y cliente React para gestionar Provincias, Cursos y Alumnos.

## Estructura del Proyecto

```
DAI - TP/
├── src/                      # Backend - API Node.js
│   ├── configs/             # Configuración de BD
│   ├── controllers/         # Controladores (endpoints)
│   ├── entities/            # Modelos de datos
│   ├── helpers/             # Funciones de validación
│   ├── repositories/        # Acceso a datos
│   ├── services/            # Lógica de negocio
│   └── index.js            # Entry point del servidor
├── client/                   # Frontend - React + Vite
│   ├── src/
│   │   ├── pages/          # Componentes principales
│   │   ├── App.jsx         # Componente raíz
│   │   └── main.jsx        # Entry point React
│   ├── package.json
│   └── vite.config.js
├── database.sql            # Script de BD
├── package.json            # Dependencias backend
└── README.md
```

## Prerequisites

- Node.js 16.x o superior
- npm 7.x o superior
- PostgreSQL 12.x o superior

## Instalación

### Backend

```bash
npm install
```

### Frontend

```bash
cd client
npm install
```

## Configuración de Base de Datos

1. Crear la base de datos:
```bash
$env:PGPASSWORD='root'; & 'C:\Program Files\PostgreSQL\16\bin\psql.exe' -U postgres -c 'CREATE DATABASE provinces_db;'
```

2. Ejecutar el script SQL:
```bash
$env:PGPASSWORD='root'; & 'C:\Program Files\PostgreSQL\16\bin\psql.exe' -U postgres -d provinces_db -f 'database.sql'
```

## Ejecución

### Terminal 1 - Backend (Puerto 3000)

```bash
npm start
```

O con hot reload:
```bash
npm run dev
```

### Terminal 2 - Frontend (Puerto 5173)

```bash
cd client
npm run dev
```

Luego accede a: `http://localhost:5173`

## API Endpoints

### Provincias
- `GET /api/province` - Obtener todas
- `GET /api/province/{id}` - Obtener por ID
- `POST /api/province` - Crear
- `PUT /api/province` - Actualizar
- `DELETE /api/province/{id}` - Eliminar

### Cursos
- `GET /api/cursos` - Obtener todos
- `POST /api/cursos` - Crear nuevo

### Alumnos
- `GET /api/alumnos` - Obtener todos
- `POST /api/alumnos` - Crear nuevo

## Variables de Entorno

Crear `.env` en la raíz:
```
PORT=3000
NODE_ENV=development
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
DB_NAME=provinces_db
```

## Validaciones Implementadas

- Nombre y full_name: mínimo 3 caracteres
- Coordenadas: latitude (-90 a 90), longitude (-180 a 180)
- Display order: debe ser mayor a 0
- Nombres de alumnos: mínimo 3 caracteres

## Stack Tecnológico

**Backend:**
- Express.js 4.x
- PostgreSQL
- Axios
- http-status-codes
- CORS
- dotenv

**Frontend:**
- React 18.x
- Vite
- Axios

## Desarrollo

### Agregar dependencias backend

```bash
npm install <package-name>
```

### Agregar dependencias frontend

```bash
cd client
npm install <package-name>
```

## License

ISC
"# API_modelo_DAI" 
