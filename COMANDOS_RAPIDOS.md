# 🚀 Comandos Rápidos - Diagrama de Gantt

## Iniciar Aplicación
```bash
cd "D:\2024\GEMINI\MisterSAPPM\UI5Projects\com.mycompany.newapp"
npm start
```

O simplemente ejecuta: `START_GANTT.bat`

## Ver Demo HTML (Sin Backend)
Abre en navegador: `DEMO_PREVIEW.html`

## Verificar con UI5 Linter
```bash
cd "D:\2024\GEMINI\MisterSAPPM\UI5Projects\com.mycompany.newapp"
npx @ui5/cli ui5lint
```

## Construir para Producción
```bash
npm run build
```

## Instalar/Actualizar Dependencias
```bash
npm install
```

## Limpiar Caché
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## URLs de Acceso
- **Aplicación Principal**: http://localhost:8080
- **Fiori Launchpad**: http://localhost:8080/test/flpSandbox.html
- **Mock Server (si aplica)**: http://localhost:8080/test/mockServer.html

## Estructura de Archivos Clave

```
webapp/
├── model/
│   └── maintenanceOrders.json  ← Datos de órdenes (EDITAR AQUÍ)
├── controller/
│   └── Main.controller.ts      ← Lógica del Gantt
├── view/
│   └── Main.view.xml           ← UI principal
└── manifest.json               ← Configuración
```

## Personalización Rápida

### Cambiar Colores de Prioridad
Archivo: `webapp/controller/Main.controller.ts`
```typescript
const priorityColors: Record<string, string> = {
    "Critical": "#bb0000",  // Cambiar aquí
    "High": "#e78c07",
    "Medium": "#2b7c2b",
    "Low": "#427cac"
};
```

### Ajustar Dimensiones del Gantt
```typescript
const dayWidth = 60;      // Ancho de cada día
const rowHeight = 50;     // Alto de cada fila
const labelWidth = 250;   // Ancho columna etiquetas
```

### Agregar Nueva Orden
Archivo: `webapp/model/maintenanceOrders.json`
```json
{
  "id": "PM-2025-XXX",
  "equipment": "Nombre del Equipo",
  "description": "Descripción",
  "startDate": "2025-10-15",
  "endDate": "2025-10-18",
  "duration": 3,
  "priority": "Critical",  // Critical|High|Medium|Low
  "responsible": "Nombre",
  "department": "Departamento"
}
```

## Debugging

### Ver Logs en Consola
F12 → Console (en el navegador)

### Recargar Cambios
- **HTML/CSS**: Ctrl+F5 (recarga forzada)
- **TypeScript**: Guardar archivo → Auto-reload
- **JSON**: Guardar archivo → Recargar página

### Errores Comunes

1. **Puerto 8080 ocupado**
   ```bash
   netstat -ano | findstr :8080
   taskkill /PID <number> /F
   ```

2. **Dependencias faltantes**
   ```bash
   npm install
   ```

3. **Caché corrupto**
   ```bash
   npm cache clean --force
   ```

## Testing

### Probar Búsqueda
1. Escribe en el campo de búsqueda
2. Verifica que filtra por equipo/descripción/ID

### Probar Filtros
1. Selecciona una prioridad en el dropdown
2. Verifica que la tabla se filtra correctamente

### Probar Gantt
1. Pasa el mouse sobre las barras
2. Verifica el efecto hover (zoom)
3. Verifica colores por prioridad

## Documentación
- 📖 README completo: `README_GANTT.md`
- 🎨 Demo visual: `DEMO_PREVIEW.html`
- 📚 SAPUI5 Docs: https://ui5.sap.com

## Próximos Pasos Sugeridos

1. ✅ Conectar a servicio OData real
2. ✅ Agregar drag & drop para reprogramar
3. ✅ Implementar exportación a PDF/Excel
4. ✅ Agregar notificaciones push
5. ✅ Integrar con SAP PM
6. ✅ Dashboard de analíticas

---
**Nota**: Este proyecto usa SAPUI5 1.141.1 con TypeScript
