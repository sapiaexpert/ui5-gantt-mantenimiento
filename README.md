# 📊 SAP Maintenance Order Gantt Chart

> **SAPUI5 Gantt Chart application integrated with SAP S/4HANA Maintenance Order CDS Views**

[![SAP](https://img.shields.io/badge/SAP-S/4HANA-0FAAFF?style=flat-square&logo=sap)](https://www.sap.com/)
[![SAPUI5](https://img.shields.io/badge/SAPUI5-1.120+-blue?style=flat-square)](https://sapui5.hana.ondemand.com/)
[![OData](https://img.shields.io/badge/OData-v4-green?style=flat-square)](https://www.odata.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

## 🎯 **Overview**

This application provides a **visual timeline** for SAP Maintenance Orders using SAPUI5 Gantt Chart component. It connects directly to SAP S/4HANA **`I_MAINTENANCEORDER`** and **`I_MAINTENANCEORDEROPERATION`** CDS Views from the **`RAP_EAM_MAINTENANCEORDER`** package.

### ✨ **Key Features**

- 📅 **Visual Timeline** - Gantt chart with order start/end dates
- 🔍 **Smart Filters** - Filter by Plant, Equipment, Order Type, Date Range
- 🎨 **Color Coding** - Priority and status-based visualization
- 🔗 **SAP Integration** - Direct connection to I_MAINTENANCEORDER CDS
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🌐 **OData V4** - Modern SAP OData protocol
- 🎯 **Operations View** - Expandable operations per order

---

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     SAPUI5 Gantt Chart                       │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Filters   │  │  Gantt View  │  │  Data Binding    │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  OData V4 Model │
                    └─────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    SAP S/4HANA Backend                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Package: RAP_EAM_MAINTENANCEORDER             │  │
│  │                                                         │  │
│  │  ┌────────────────────┐   ┌──────────────────────┐   │  │
│  │  │ I_MAINTENANCEORDER │◄──┤ I_MAINTENANCEORDER   │   │  │
│  │  │                    │   │ OPERATION            │   │  │
│  │  └────────────────────┘   └──────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 **SAP CDS Views Used**

### 1️⃣ **I_MAINTENANCEORDER** (Main Entity)

| Field | SAP Field | Type | Description |
|-------|-----------|------|-------------|
| Order ID | `MaintenanceOrder` | CHAR(12) | Primary Key |
| Description | `MaintenanceOrderDesc` | CHAR(40) | Order title |
| Start Date | `MaintOrdBasicStartDate` | DATE | Gantt start |
| End Date | `MaintOrdBasicEndDate` | DATE | Gantt end |
| Priority | `MaintPriority` | CHAR(1) | 1-4 (High-Low) |
| Phase | `MaintenanceProcessingPhase` | CHAR(1) | Status code |
| Plant | `MaintenancePlanningPlant` | CHAR(4) | Planning plant |
| Equipment | `Equipment` | CHAR(18) | Equipment number |
| Type | `MaintenanceOrderType` | CHAR(4) | PM01, PM02, etc. |

### 2️⃣ **I_MAINTENANCEORDEROPERATION** (Operations)

| Field | Description |
|-------|-------------|
| `MaintenanceOrderOperation` | Operation number |
| `OperationDescription` | Operation description |
| `OperationControlKey` | Control key |
| `MaintOperationExecStageCode` | PRE/MAIN/POST |

---

## 🎨 **Visual Legend**

### Priority Colors
```
🔴 Priority 1 (Very High) → Red    (#BB0000)
🟠 Priority 2 (High)      → Orange (#E76500)
🔵 Priority 3 (Medium)    → Blue   (#0070F2)
🟢 Priority 4 (Low)       → Green  (#107E3E)
```

### Status/Phase Colors
```
⚪ Phase 1 (Created)      → Grey   (#5E696E)
🔵 Phase 2 (In Progress)  → Blue   (#0070F2)
🟢 Phase 3 (Completed)    → Green  (#107E3E)
🟠 Phase 4 (Cancelled)    → Orange (#E76500)
```

---

## 🚀 **Quick Start**

### Prerequisites

- Node.js 18+ and npm
- SAP S/4HANA system with Maintenance Order CDS Views
- SAPUI5 SDK 1.120+
- (Optional) SAP Cloud Connector for on-premise systems

### Installation

```bash
# Clone repository
git clone https://github.com/sapiaexpert/ui5-gantt-mantenimiento.git
cd ui5-gantt-mantenimiento

# Install dependencies
npm install

# Run with mock data (local development)
npm start
```

The app will open at `http://localhost:8080`

---

## ⚙️ **Configuration**

### 1. **Connect to SAP Backend**

Edit `webapp/manifest.json`:

```json
{
  "dataSources": {
    "maintenanceOrderService": {
      "uri": "https://your-sap-system.com/sap/opu/odata4/sap/api_maintenanceorder/srvd/sap/api_maintenanceorder/0001/",
      "type": "OData",
      "settings": {
        "odataVersion": "4.0"
      }
    }
  }
}
```

### 2. **SAP Authorizations Required**

```
S_SERVICE      - OData Service Access
Authorization Object for I_MAINTENANCEORDER (Read)
Authorization Object for I_MAINTENANCEORDEROPERATION (Read)
```

---

## 📂 **Project Structure**

```
ui5-gantt-mantenimiento/
├── webapp/
│   ├── controller/
│   │   └── MainView.controller.js    # Main logic & filters
│   ├── view/
│   │   ├── App.view.xml              # Shell container
│   │   └── MainView.view.xml         # Gantt chart view
│   ├── i18n/
│   │   └── i18n.properties           # Translations
│   ├── localService/
│   │   ├── metadata.xml              # OData V4 metadata
│   │   └── mockdata/
│   │       ├── MaintenanceOrder.json
│   │       └── MaintenanceOrderOperation.json
│   ├── css/
│   │   └── style.css                 # Custom styles
│   ├── manifest.json                 # App descriptor
│   └── index.html                    # Entry point
├── docs/
│   └── SAP_INTEGRATION.md            # Detailed integration guide
├── package.json
└── README.md
```

---

## 🔍 **Features in Detail**

### Filtering

- **Plant**: Filter by `MaintenancePlanningPlant`
- **Equipment**: Search by equipment number (contains)
- **Order Type**: Filter by `MaintenanceOrderType` (PM01, PM02, etc.)
- **Date Range**: Filter orders within date boundaries

### Gantt Visualization

- **Timeline**: Shows order duration based on Basic Start/End dates
- **Colors**: Priority or phase-based coloring
- **Tooltips**: Hover to see order details
- **Selection**: Click to select orders
- **Zoom**: Day/Week/Month view options

### Data Binding

```javascript
// Automatic OData V4 binding
rows="{
  path: '/MaintenanceOrder',
  parameters: {
    $expand: 'to_Operation'
  }
}"
```

---

## 🧪 **Testing**

### Run with Mock Data

The app includes realistic mock data based on actual SAP structures:

```bash
npm start
```

Mock data includes:
- 6 sample maintenance orders
- Different priorities and statuses
- Multiple operations per order
- Realistic equipment and functional locations

---

## 📊 **Sample Data**

### Maintenance Order Example

```json
{
  "MaintenanceOrder": "000001000001",
  "MaintenanceOrderDesc": "Preventive Maintenance - Pump P-101",
  "MaintenanceOrderType": "PM01",
  "MaintPriority": "2",
  "MaintenanceProcessingPhase": "2",
  "MaintenancePlanningPlant": "1000",
  "Equipment": "10000001",
  "FunctionalLocation": "PLANT-AREA1-PUMP01",
  "MaintOrdBasicStartDate": "2025-10-15",
  "MaintOrdBasicEndDate": "2025-10-17"
}
```

---

## 📚 **Documentation**

- [SAP Integration Guide](docs/SAP_INTEGRATION.md) - Detailed backend integration
- [SAPUI5 Gantt Documentation](https://sapui5.hana.ondemand.com/#/topic/db1f3cd0e6db44a5b6e7de63c0be1449) - Official docs
- [OData V4 Specification](https://www.odata.org/documentation/) - Protocol details

---

## 🐛 **Troubleshooting**

### CORS Errors
```
Configure SAP Cloud Connector or enable CORS in SAP Gateway
```

### No Data Displayed
```bash
# Check OData service
https://your-sap-system.com/sap/opu/odata4/sap/api_maintenanceorder/srvd/sap/api_maintenanceorder/0001/MaintenanceOrder

# Verify authorizations
# Check browser console for errors
```

---

## 🤝 **Contributing**

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License.

---

## 🙏 **Acknowledgments**

- SAP for SAPUI5 framework and CDS Views
- Anthropic Claude for development assistance
- SAP Community for best practices

---

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/sapiaexpert/ui5-gantt-mantenimiento/issues)
- **SAP Help**: https://help.sap.com/
- **API Hub**: https://api.sap.com/

---

## 🔗 **Links**

- [Repository](https://github.com/sapiaexpert/ui5-gantt-mantenimiento)
- [SAP S/4HANA Cloud API](https://api.sap.com/package/SAPS4HANACloud)
- [RAP_EAM_MAINTENANCEORDER Package](https://help.sap.com/docs/SAP_S4HANA_CLOUD/)

---

**Built with ❤️ using SAPUI5 and SAP S/4HANA**
