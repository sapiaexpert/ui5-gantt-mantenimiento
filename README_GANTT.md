# Diagrama de Gantt para Órdenes de Mantenimiento

Esta aplicación SAPUI5 proporciona una visualización interactiva de órdenes de mantenimiento mediante un diagrama de Gantt.

## 🚀 Características

- **Diagrama de Gantt Visual**: Cronograma interactivo que muestra todas las órdenes de mantenimiento
- **Codificación por Colores**: Prioridades visuales (Crítico, Alto, Medio, Bajo)
- **Búsqueda y Filtros**: Búsqueda por equipo/descripción y filtro por prioridad
- **Estadísticas en Tiempo Real**: Métricas clave de las órdenes de mantenimiento
- **Vista de Tabla Detallada**: Lista completa con todos los detalles de las órdenes
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla

## 📋 Datos de Ejemplo

La aplicación incluye 12 órdenes de mantenimiento de ejemplo que cubren:
- Diferentes tipos de equipos (bombas, compresores, transformadores, etc.)
- Variedad de prioridades (Crítico, Alto, Medio, Bajo)
- Múltiples departamentos (Mecánica, Eléctrica, Operaciones, Instrumentación)
- Rango de duraciones (2-4 días)

## 🎨 Código de Colores

- 🔴 **Crítico** (Rojo): Requiere atención inmediata
- 🟠 **Alto** (Naranja): Alta prioridad
- 🟢 **Medio** (Verde): Prioridad media
- 🔵 **Bajo** (Azul): Puede esperar

## 🛠️ Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

### Pasos

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar la aplicación**
   ```bash
   npm start
   ```

3. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:8080`
   - Si no se abre automáticamente, navega manualmente a esa URL

## 📊 Uso de la Aplicación

### Panel Superior
- **Buscador**: Filtra órdenes por ID, equipo o descripción
- **Selector de Prioridad**: Filtra por nivel de prioridad
- **Tarjetas de Estadísticas**: Muestra totales y promedios

### Diagrama de Gantt
- Cada barra representa una orden de mantenimiento
- El color indica la prioridad
- Pasa el mouse sobre una barra para ver detalles
- Scroll horizontal para ver todo el cronograma

### Tabla de Detalles
- Panel expandible con información completa
- Ordenable y filtrable
- Click en cualquier fila para ver detalles completos

## 🔧 Personalización

### Modificar Datos de Órdenes
Edita el archivo: `webapp/model/maintenanceOrders.json`

Estructura de cada orden:
```json
{
  "id": "PM-2025-XXX",
  "equipment": "Nombre del Equipo",
  "description": "Descripción del trabajo",
  "startDate": "2025-10-15",
  "endDate": "2025-10-18",
  "duration": 3,
  "priority": "Critical|High|Medium|Low",
  "responsible": "Nombre del Técnico",
  "department": "Departamento"
}
```

### Ajustar Colores
En `webapp/controller/Main.controller.ts`, modifica el objeto `priorityColors`:
```typescript
const priorityColors: Record<string, string> = {
    "Critical": "#bb0000",  // Rojo
    "High": "#e78c07",      // Naranja
    "Medium": "#2b7c2b",    // Verde
    "Low": "#427cac"        // Azul
};
```

### Cambiar Dimensiones del Gantt
En el método `generateGanttChart()`:
```typescript
const dayWidth = 60;     // pixels por día
const rowHeight = 50;    // pixels por fila
const labelWidth = 250;  // pixels para columna de etiquetas
```

## 📁 Estructura del Proyecto

```
com.mycompany.newapp/
├── webapp/
│   ├── controller/
│   │   ├── Main.controller.ts      # Lógica del Gantt
│   │   └── BaseController.ts       # Controlador base
│   ├── model/
│   │   ├── maintenanceOrders.json  # Datos de órdenes
│   │   └── formatter.ts            # Formateadores
│   ├── view/
│   │   └── Main.view.xml           # Vista principal
│   ├── i18n/
│   │   └── i18n.properties         # Textos
│   └── manifest.json               # Configuración de app
├── package.json
└── ui5.yaml
```

## 🐛 Solución de Problemas

### La aplicación no inicia
1. Verifica que Node.js esté instalado: `node --version`
2. Reinstala dependencias: `npm install`
3. Limpia caché: `npm cache clean --force`

### No se muestran los datos
1. Verifica que el archivo `maintenanceOrders.json` exista
2. Revisa la consola del navegador (F12) para errores
3. Verifica que el modelo esté cargado correctamente

### Problemas de estilo
1. Limpia caché del navegador (Ctrl+Shift+Del)
2. Verifica que la aplicación esté en modo desarrollo
3. Recarga la página con Ctrl+F5 (recarga forzada)

## 📝 Notas Técnicas

- Framework: SAPUI5 1.141.1
- Lenguaje: TypeScript
- Patrón: MVC (Model-View-Controller)
- Binding: Two-way data binding con JSONModel

## 🔄 Próximas Mejoras

Ideas para expandir la funcionalidad:
- [ ] Drag & drop para reprogramar órdenes
- [ ] Exportar a PDF/Excel
- [ ] Vista de calendario
- [ ] Notificaciones de órdenes atrasadas
- [ ] Integración con backend SAP
- [ ] Asignación de recursos
- [ ] Seguimiento de costos

## 📞 Soporte

Para problemas o preguntas:
- Revisa la documentación de SAPUI5: https://ui5.sap.com
- Consulta la guía de desarrollo: https://sapui5.hana.ondemand.com

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Autor**: Equipo de Desarrollo
