# Guía de Debugging - API Modelo DAI

## 1. Debugger de VS Code (Recomendado)

### Para el Backend (Node.js)

1. Abre VS Code
2. Ve a "Run and Debug" (Ctrl+Shift+D)
3. Selecciona "Backend - Node.js"
4. Presiona F5 o haz clic en "Start Debugging"

**Características:**
- Breakpoints (haz clic en el número de línea)
- Watch variables
- Console automática
- Reload automático

Ejemplo - Agregar breakpoint en `src/controllers/province-controller.js`:
```javascript
router.get('/', async (req, res) => {
  try {
    console.log('REQUEST RECIBIDO'); // ← Breakpoint aquí
    const provinces = await ProvinceService.getAll();
    res.status(StatusCodes.OK).json({...})
  }
})
```

---

## 2. Console.log (Quick Debug)

### Backend Example - GET Provincias

Modifica `src/services/province-service.js`:
```javascript
static async getAll() {
  console.log('🔍 [ProvinceService.getAll] Iniciando consulta...');
  try {
    const result = await ProvinceRepository.getAll();
    console.log(`✅ [ProvinceService.getAll] Se obtuvieron ${result.length} provincias`);
    return result;
  } catch (error) {
    console.error('❌ [ProvinceService.getAll] Error:', error.message);
    throw error;
  }
}
```

Modifica `src/repositories/province-repository.js`:
```javascript
static async getAll() {
  console.log('📊 [ProvinceRepository.getAll] Ejecutando query...');
  try {
    const result = await pool.query('SELECT * FROM provinces ORDER BY display_order ASC');
    console.log('📊 [ProvinceRepository.getAll] Query resultado:', {
      rowCount: result.rowCount,
      firstRow: result.rows[0]
    });
    return result.rows.map(row => new Province(...));
  } catch (error) {
    console.error('❌ [ProvinceRepository.getAll] Error de BD:', error.message);
    throw error;
  }
}
```

---

## 3. Postman - Testing Manual

### Crear Collection "API Modelo DAI"

#### Test: GET /api/province

```
GET http://localhost:3000/api/province

Headers:
  Content-Type: application/json

Response esperado:
{
  "status": 200,
  "statusText": "OK",
  "data": [
    {
      "id": 1,
      "name": "Buenos Aires",
      "full_name": "Provincia de Buenos Aires",
      "latitude": -34.614,
      "longitude": -58.442,
      "display_order": 1
    }
  ]
}
```

#### Test: POST /api/province

```
POST http://localhost:3000/api/province

Body (raw JSON):
{
  "name": "Nueva Prov",
  "full_name": "Provincia Nueva de Test",
  "latitude": -25.5,
  "longitude": -60.5,
  "display_order": 99
}

Response esperado: 201 Created
```

#### Debugging con Postman:

1. Abre "Tests" tab
2. Agrega validaciones:
```javascript
pm.test("Status es 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Response contiene data array", function() {
  var jsonData = pm.response.json();
  pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Provinces tienen estructura correcta", function() {
  var jsonData = pm.response.json();
  jsonData.data.forEach(province => {
    pm.expect(province).to.have.property('id');
    pm.expect(province).to.have.property('name');
    pm.expect(province).to.have.property('latitude');
  });
});
```

---

## 4. DevTools del Navegador (Frontend)

### Para debuguear React:

1. Inicia: `cd client && npm run dev`
2. Abre `http://localhost:5173` en navegador
3. Presiona F12 para abrir DevTools
4. Ve a "Network" tab
5. Realiza una acción en la UI
6. Observa las requests

#### Inspeccionar request GET:

```
Headers:
  Request URL: http://localhost:3000/api/province
  Request Method: GET
  Status: 200 OK

Response:
  {
    "status": 200,
    "statusText": "OK",
    "data": [...]
  }
```

#### Inspeccionar respuesta en Console:

Modifica `client/src/pages/ProvincesList.jsx`:
```javascript
const fetchProvinces = async () => {
  setLoading(true)
  setError('')
  try {
    console.log('📡 [ProvincesList] Request iniciado...');
    const response = await axios.get(`${API_URL}/province`)
    console.log('📡 [ProvincesList] Response recibido:', response.data);
    console.log('📡 [ProvincesList] Provincias:', response.data.data);
    setProvinces(response.data.data)
  } catch (err) {
    console.error('❌ [ProvincesList] Error:', err);
    setError('Error al cargar provincias: ' + err.message)
  } finally {
    setLoading(false)
  }
}
```

---

## 5. Logger Estructurado (Avanzado)

Crea `src/helpers/logger.js`:

```javascript
export const logger = {
  info: (module, action, data) => {
    console.log(`[${new Date().toISOString()}] ✅ [${module}] ${action}`, data);
  },
  error: (module, action, error) => {
    console.error(`[${new Date().toISOString()}] ❌ [${module}] ${action}`, error.message);
  },
  warning: (module, action, data) => {
    console.warn(`[${new Date().toISOString()}] ⚠️  [${module}] ${action}`, data);
  }
};
```

Uso:
```javascript
import { logger } from '../helpers/logger.js';

static async getAll() {
  logger.info('ProvinceService', 'getAll() iniciado', {});
  const result = await ProvinceRepository.getAll();
  logger.info('ProvinceService', 'getAll() completado', { count: result.length });
  return result;
}
```

---

## 6. Verificar Conexión a BD

Crea `src/helpers/test-db.js`:

```javascript
import pool from '../configs/database.js';

export const testDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT 1');
    console.log('✅ Conexión a BD exitosa');
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a BD:', error.message);
    return false;
  }
};
```

En `src/index.js`:
```javascript
import { testDatabaseConnection } from './helpers/test-db.js';

// ... resto del código

const startServer = async () => {
  const dbConnected = await testDatabaseConnection();
  
  if (!dbConnected) {
    console.error('No se puede iniciar: BD no disponible');
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`✅ Servidor escuchando en puerto ${port}`);
  });
};

startServer();
```

---

## 7. Flujo Completo de Debug - GET /api/province

```
1. Backend inicia
   └─ pool.query() se conecta a BD
   └─ console.log: "✅ BD conectada"

2. Frontend realiza GET request
   └─ axios.get('/api/province')
   └─ console.log: "📡 Request enviado"

3. Backend recibe request
   └─ router.get('/')
   └─ console.log: "🔍 GET /api/province recibido"

4. Service procesa
   └─ ProvinceService.getAll()
   └─ console.log: "Consultando BD..."

5. Repository ejecuta query
   └─ pool.query('SELECT * FROM provinces')
   └─ console.log: "Query ejecutada, ${rowCount} filas"

6. Response regresa
   └─ res.status(200).json({data})
   └─ console.log: "✅ Response enviado"

7. Frontend recibe
   └─ setProvinces(data)
   └─ console.log: "Provincias actualizadas:", data
```

---

## Comandos Útiles

### Ver logs en tiempo real:
```bash
npm start 2>&1 | tee debug.log
```

### Debuguear con nodemon:
```bash
npm run dev
```

### Para React:
```bash
cd client && npm run dev
```

### Inspeccionar requests (curl):
```bash
curl http://localhost:3000/api/province
curl -X POST http://localhost:3000/api/province -H "Content-Type: application/json" -d '{"name":"Test",...}'
```

---

## Tips de Debug

✅ Usa emojis para fácil escaneo visual
✅ Incluye timestamp en logs
✅ Log en entrada Y salida de funciones
✅ Usa try/catch con console.error
✅ Prueba con Postman primero
✅ Usa DevTools Network tab para verificar requests
✅ Breakpoints en places críticos
✅ Watch variables importantes

