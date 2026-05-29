# Guía Rápida de Debugging

## ⚡ Inicio Rápido

### 1️⃣ Debuguear con VS Code

```bash
# Abre VS Code
# Presiona F5 o Ctrl+Shift+D
# Selecciona "Backend - Node.js"
# El servidor iniciará con debugger activo
```

**Haz breakpoints:**
- Haz clic en el número de línea izquierdo
- Cuando se ejecute ese código, se pausa
- Inspecciona variables en el panel "Variables"

---

### 2️⃣ Con Console.log (Más rápido)

El logging ya está agregado en el código. Simplemente ejecuta:

```bash
npm start
```

Verás outputs como:
```
📊 [ProvinceRepository.getAll] Ejecutando query...
🔍 [ProvinceService.getAll] Iniciando servicio...
✅ [ProvinceService.getAll] Se obtuvieron 5 provincias
========== REQUEST: GET /api/province ==========
📍 Timestamp: 2026-05-29T...
========== RESPONSE 200 OK ==========
```

---

### 3️⃣ Probar con Postman

**GET simple:**
```
GET http://localhost:3000/api/province
```

Observa en la terminal:
```
========== REQUEST: GET /api/province ==========
📊 [ProvinceRepository.getAll] Ejecutando query...
✅ [ProvinceService.getAll] Se obtuvieron 5 provincias
========== RESPONSE 200 OK ==========
```

---

### 4️⃣ Debuguear Frontend React

```bash
cd client
npm run dev
```

Abre DevTools (F12):
- **Network tab**: Ve todas las requests
- **Console tab**: Ve console.log de React
- **Elements tab**: Inspecciona componentes

---

## 📍 Flujo de una Request GET

### Terminal Backend ve:

```
========== REQUEST: GET /api/province ==========
📍 Timestamp: 2026-05-29T10:30:00.123Z
📋 Headers: { "user-agent": "PostmanRuntime/7.32.3", ... }
📊 [ProvinceRepository.getAll] Ejecutando query...
✅ [ProvinceRepository.getAll] Query completada. Filas: 5
🔍 [ProvinceService.getAll] Iniciando servicio...
✅ [ProvinceService.getAll] Se obtuvieron 5 provincias
✅ Response preparada. Total provincias: 5
========== RESPONSE 200 OK ==========
```

### Postman ve:

```json
{
  "status": 200,
  "statusText": "OK",
  "data": [
    {
      "id": 1,
      "name": "Buenos Aires",
      ...
    }
  ]
}
```

### DevTools Browser ve:

- Status: 200 OK
- Duration: 45ms
- Response size: 2.3 KB

---

## 🔧 Debugging Avanzado

### Con Breakpoints

1. Abre `src/repositories/province-repository.js`
2. Haz clic en línea **14** (el query)
3. Presiona F5 para debuguear
4. Haz una request: `GET http://localhost:3000/api/province`
5. El código se pausa en el breakpoint
6. Panel "Variables" muestra:
   - `result` = resultado de la query
   - `result.rowCount` = número de filas
   - `result.rows` = array de provincias

### Step by step:

- **F10**: Step Over (siguiente línea)
- **F11**: Step Into (entra en función)
- **Shift+F11**: Step Out (sale de función)
- **F5**: Continue (continúa ejecución)

---

## ❌ Errores Comunes

### Error: "Cannot GET /api/province"

**Causa**: El servidor no está iniciado

**Solución**:
```bash
npm start
```

---

### Error: "Connection refused on 3000"

**Causa**: Puerto 3000 en uso

**Solución**:
```bash
# Windows
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

### Error: "FATAL: database "provinces_db" does not exist"

**Causa**: BD no existe

**Solución**:
```bash
$env:PGPASSWORD='root'; & 'C:\Program Files\PostgreSQL\16\bin\psql.exe' -U postgres -c 'CREATE DATABASE provinces_db;'
```

---

## 📊 Monitorear Performance

En `src/index.js` ya hay logging de timing:

```javascript
// Agrega esto al handler de request:
const startTime = Date.now();

// ... procesa request ...

const duration = Date.now() - startTime;
console.log(`⏱️  [Performance] Tiempo: ${duration}ms`);
```

---

## 💾 Ver Logs Guardados

```bash
# Guardar logs en archivo
npm start > debug.log 2>&1

# Leer logs en tiempo real
tail -f debug.log

# En Windows PowerShell:
npm start | Tee-Object -FilePath debug.log
```

---

## 🚀 Checklist de Debug

- ✅ ¿Servidor iniciado? `npm start`
- ✅ ¿BD conectada? Ver "✅ [Database] Conexión establecida"
- ✅ ¿Logs visibles? Ver outputs en terminal
- ✅ ¿Postman ok? Status 200
- ✅ ¿Frontend conecta? DevTools > Network

