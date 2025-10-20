# 🎯 INICIO RÁPIDO - Diagrama de Gantt

## 📁 Ubicación del Proyecto
```
D:\2024\GEMINI\MisterSAPPM\UI5Projects\com.mycompany.newapp\
```

---

## 🚀 COMANDOS DE INICIO (Elige uno)

### ✅ Opción 1: Más Fácil (Recomendado)
```bash
# Doble-click en:
START_GANTT.bat
```

### ✅ Opción 2: Línea de Comandos
```bash
cd "D:\2024\GEMINI\MisterSAPPM\UI5Projects\com.mycompany.newapp"
npm start
```

### ✅ Opción 3: Preview Sin Backend
```bash
# Abre en navegador:
DEMO_PREVIEW.html
```

---

## 🔍 ANTES DE INICIAR

### Verificar Instalación
```bash
# Ejecuta:
VERIFICAR_INSTALACION.bat

# Debe mostrar:
✅ Node.js instalado
✅ npm instalado
✅ Archivos presentes
✅ Estructura válida
```

### Si Hay Problemas
```bash
# Reinstalar dependencias:
npm install

# Limpiar caché:
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 📖 DOCUMENTACIÓN

| Archivo | Descripción | ¿Cuándo usarlo? |
|---------|-------------|-----------------|
| **README_GANTT.md** | Guía completa con todo detalle | Primera vez, configuración |
| **COMANDOS_RAPIDOS.md** | Referencia rápida de comandos | Desarrollo diario |
| **DEMO_PREVIEW.html** | Vista previa HTML | Presentaciones, demos |
| Este archivo | Inicio ultra-rápido | Siempre que inicies |

---

## ⚡ ACCESO RÁPIDO

### URLs de la Aplicación
- **Principal**: http://localhost:8080
- **Test**: http://localhost:8080/test/flpSandbox.html

### Archivos Clave para Editar
```
webapp/model/maintenanceOrders.json  ← Datos (órdenes)
webapp/controller/Main.controller.ts ← Lógica (colores, dimensiones)
webapp/view/Main.view.xml           ← UI (layout)
```

---

## 🎨 PERSONALIZACIÓN RÁPIDA

### 1. Agregar/Editar Órdenes
📄 Archivo: `webapp/model/maintenanceOrders.json`

```json
{
  "id": "PM-2025-XXX",
  "equipment": "Nombre Equipo",
  "description": "Descripción",
  "startDate": "2025-10-15",
  "endDate": "2025-10-18",
  "duration": 3,
  "priority": "Critical",
  "responsible": "Técnico",
  "department": "Área"
}
```

### 2. Cambiar Colores
📄 Archivo: `webapp/controller/Main.controller.ts` (línea 50)

```typescript
const priorityColors = {
    "Critical": "#bb0000",  // Rojo
    "High": "#e78c07",      // Naranja
    "Medium": "#2b7c2b",    // Verde
    "Low": "#427cac"        // Azul
};
```

### 3. Ajustar Tamaños
📄 Archivo: `webapp/controller/Main.controller.ts` (línea 70)

```typescript
const dayWidth = 60;      // Ancho día
const rowHeight = 50;     // Alto fila
const labelWidth = 250;   // Ancho etiquetas
```

---

## 🐛 SOLUCIÓN RÁPIDA DE PROBLEMAS

### ❌ Puerto ocupado
```bash
netstat -ano | findstr :8080
taskkill /PID <número> /F
```

### ❌ No inicia
```bash
npm cache clean --force
npm install
npm start
```

### ❌ Cambios no se ven
```
Navegador: Ctrl + F5 (recarga forzada)
```

### ❌ Error TypeScript
```bash
npx tsc --noEmit
```

---

## 📊 ¿QUÉ INCLUYE?

### ✅ Datos de Ejemplo
- 12 órdenes de mantenimiento
- 4 niveles de prioridad
- Múltiples equipos y departamentos
- Fechas de octubre 2025

### ✅ Funcionalidades
- Diagrama de Gantt interactivo
- Búsqueda y filtros
- Estadísticas en tiempo real
- Tabla detallada
- Efectos hover
- Diseño responsive

### ✅ Documentación
- 3 guías completas
- Scripts de inicio
- Demo HTML
- Verificador de instalación

---

## 🎓 FLUJO DE TRABAJO

```
1. VERIFICAR_INSTALACION.bat
   ↓
2. START_GANTT.bat
   ↓
3. Abre http://localhost:8080
   ↓
4. Edita maintenanceOrders.json
   ↓
5. Recarga navegador (Ctrl+F5)
   ↓
6. ¡Listo!
```

---

## 📞 NECESITAS AYUDA?

### Recursos
- 📖 SAPUI5 Docs: https://ui5.sap.com
- 💬 SAP Community: https://community.sap.com
- 🔧 GitHub: https://github.com/SAP/openui5

### Archivos de Ayuda en el Proyecto
- `README_GANTT.md` - Guía detallada
- `COMANDOS_RAPIDOS.md` - Comandos útiles
- `DEMO_PREVIEW.html` - Vista previa

---

## ⏱️ TIEMPO DE INICIO

| Paso | Tiempo | Acción |
|------|--------|--------|
| **Verificación** | 30 seg | `VERIFICAR_INSTALACION.bat` |
| **Inicio** | 1 min | `START_GANTT.bat` |
| **Listo** | - | Navegar a localhost:8080 |

**Total: ~2 minutos** desde cero hasta ver el Gantt

---

## 🎯 CHECKLIST ANTES DE INICIAR

- [ ] Node.js instalado (verifica con: `node --version`)
- [ ] npm instalado (verifica con: `npm --version`)
- [ ] Estás en el directorio correcto
- [ ] Puerto 8080 disponible
- [ ] Ejecutaste `VERIFICAR_INSTALACION.bat`

---

## 🌟 TIPS FINALES

1. **Primera vez**: Lee `README_GANTT.md` completo
2. **Desarrollo**: Ten `COMANDOS_RAPIDOS.md` a mano
3. **Presentación**: Usa `DEMO_PREVIEW.html`
4. **Debugging**: Abre DevTools (F12) en navegador
5. **Editar datos**: Solo modifica `maintenanceOrders.json`

---

## 📝 ESTRUCTURA DEL PROYECTO

```
com.mycompany.newapp/
├── webapp/
│   ├── model/
│   │   └── maintenanceOrders.json    ← EDITA AQUÍ
│   ├── controller/
│   │   └── Main.controller.ts         ← Lógica
│   ├── view/
│   │   └── Main.view.xml              ← UI
│   └── ...
├── START_GANTT.bat                    ← EJECUTA ESTO
├── VERIFICAR_INSTALACION.bat          ← O ESTO PRIMERO
├── DEMO_PREVIEW.html                  ← Vista previa
├── README_GANTT.md                    ← Docs completas
├── COMANDOS_RAPIDOS.md                ← Referencia
└── INICIO_RAPIDO.md                   ← Este archivo
```

---

## 🚀 ¡AHORA SÍ, A TRABAJAR!

```bash
# Paso 1: Verifica
VERIFICAR_INSTALACION.bat

# Paso 2: Inicia
START_GANTT.bat

# Paso 3: Navega
http://localhost:8080

# ¡Disfruta tu Diagrama de Gantt!
```

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0  
**Framework**: SAPUI5 1.141.1 + TypeScript
