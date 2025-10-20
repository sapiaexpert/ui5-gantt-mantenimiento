# 📊 Diagrama de Gantt para Órdenes de Mantenimiento

Una aplicación SAPUI5 moderna e interactiva para visualizar y gestionar órdenes de mantenimiento mediante un diagrama de Gantt.

![SAPUI5](https://img.shields.io/badge/SAPUI5-1.141.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Características Principales

- **📊 Diagrama de Gantt Interactivo**: Visualización clara del cronograma de mantenimiento
- **🎨 Código de Colores**: 4 niveles de prioridad (Crítico, Alto, Medio, Bajo)
- **🔍 Búsqueda Avanzada**: Filtrado por equipo, descripción o ID
- **📈 Dashboard de Estadísticas**: Métricas clave en tiempo real
- **📋 Vista Detallada**: Tabla completa con información de cada orden
- **🖱️ Efectos Interactivos**: Hover con zoom y tooltips
- **📱 Diseño Responsive**: Adaptable a cualquier dispositivo

## 🚀 Demo Rápido

![Gantt Chart Demo](docs/screenshot-placeholder.png)

## 📦 Instalación

### Requisitos Previos
- Node.js v16+ (recomendado v18+)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/gantt-mantenimiento.git
   cd gantt-mantenimiento
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:8080`

### Inicio Rápido con Scripts

**Windows**:
```bash
# Verificar instalación
VERIFICAR_INSTALACION.bat

# Iniciar aplicación
START_GANTT.bat
```

**Linux/Mac**:
```bash
# Instalar dependencias e iniciar
npm install && npm start
```

## 🎨 Código de Colores

| Prioridad | Color | Uso |
|-----------|-------|-----|
| **🔴 Crítico** | Rojo (#bb0000) | Requiere atención inmediata |
| **🟠 Alto** | Naranja (#e78c07) | Alta prioridad |
| **🟢 Medio** | Verde (#2b7c2b) | Prioridad media |
| **🔵 Bajo** | Azul (#427cac) | Puede esperar |

## 📊 Datos de Ejemplo

La aplicación incluye **12 órdenes de mantenimiento** de ejemplo:
- **3** órdenes críticas
- **4** órdenes de alta prioridad
- **4** órdenes de prioridad media
- **1** orden de baja prioridad

Cubriendo equipos como:
- Bombas centrífugas
- Compresores
- Transformadores
- Motores eléctricos
- Válvulas de control
- Y más...

## 🛠️ Personalización

### Modificar Órdenes de Mantenimiento

Edita el archivo `webapp/model/maintenanceOrders.json`:

```json
{
  "maintenanceOrders": [
    {
      "id": "PM-2025-XXX",
      "equipment": "Nombre del Equipo",
      "description": "Descripción del trabajo",
      "startDate": "2025-10-15",
      "endDate": "2025-10-18",
      "duration": 3,
      "priority": "Critical",
      "responsible": "Nombre Técnico",
      "department": "Departamento"
    }
  ]
}
```

### Cambiar Colores de Prioridad

En `webapp/controller/Main.controller.ts` (línea ~50):

```typescript
const priorityColors: Record<string, string> = {
    "Critical": "#bb0000",  // Tu color aquí
    "High": "#e78c07",
    "Medium": "#2b7c2b",
    "Low": "#427cac"
};
```

### Ajustar Dimensiones del Gantt

En `webapp/controller/Main.controller.ts` (línea ~70):

```typescript
const dayWidth = 60;      // Ancho de cada día en pixels
const rowHeight = 50;     // Alto de cada fila
const labelWidth = 250;   // Ancho de columna de etiquetas
```

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [INICIO_RAPIDO.md](INICIO_RAPIDO.md) | Guía de inicio en 2 minutos |
| [README_GANTT.md](README_GANTT.md) | Documentación completa |
| [COMANDOS_RAPIDOS.md](COMANDOS_RAPIDOS.md) | Referencia de comandos |
| [ESTADO_PROYECTO.md](ESTADO_PROYECTO.md) | Estado y roadmap |
| [SOLUCION_PROBLEMAS.md](SOLUCION_PROBLEMAS.md) | Troubleshooting |

## 🏗️ Estructura del Proyecto

```
com.mycompany.newapp/
├── webapp/
│   ├── controller/
│   │   ├── BaseController.ts
│   │   └── Main.controller.ts      # Lógica del Gantt
│   ├── model/
│   │   ├── maintenanceOrders.json  # Datos de órdenes
│   │   └── formatter.ts            # Formateadores
│   ├── view/
│   │   └── Main.view.xml           # Vista principal
│   ├── i18n/
│   │   └── i18n.properties
│   └── manifest.json
├── DEMO_PREVIEW.html               # Demo standalone
├── START_GANTT.bat                 # Iniciador Windows
├── VERIFICAR_INSTALACION.bat       # Verificador
└── package.json
```

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm start              # Iniciar servidor de desarrollo
npm run build          # Construir para producción
npm test               # Ejecutar tests

# Linting
npx @ui5/cli ui5lint  # Verificar código UI5
```

## 🐛 Solución de Problemas

### Puerto 8080 ocupado
```bash
netstat -ano | findstr :8080
taskkill /PID <número> /F
```

### La aplicación no inicia
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm start
```

### Cambios no se reflejan
- Navegador: `Ctrl + F5` (recarga forzada)
- O limpia caché del navegador

Para más detalles, consulta [SOLUCION_PROBLEMAS.md](SOLUCION_PROBLEMAS.md)

## 🚀 Roadmap

### Corto Plazo
- [ ] Conectar a backend OData
- [ ] Tests unitarios con QUnit
- [ ] CI/CD con GitHub Actions

### Mediano Plazo
- [ ] Drag & drop para reprogramar órdenes
- [ ] Exportación a PDF/Excel
- [ ] Vista de calendario
- [ ] Notificaciones push

### Largo Plazo
- [ ] Integración completa con SAP PM
- [ ] Mobile app nativa
- [ ] IA para predicciones
- [ ] Dashboard analítico avanzado

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

- **Nombre**: Tu Nombre
- **Email**: tu.email@ejemplo.com
- **LinkedIn**: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- SAP UI5 Team por el excelente framework
- Comunidad SAP por el soporte continuo
- Todos los contribuidores de este proyecto

## 📞 Soporte

- 📖 [Documentación SAPUI5](https://ui5.sap.com)
- 💬 [SAP Community](https://community.sap.com)
- 🐛 [Issues](https://github.com/TU_USUARIO/gantt-mantenimiento/issues)

---

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!**

---

Desarrollado con ❤️ usando SAPUI5 + TypeScript
