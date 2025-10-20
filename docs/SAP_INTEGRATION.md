# SAP Integration Documentation

## 🔗 CDS Views Integration

This Gantt Chart application is designed to integrate with SAP S/4HANA Maintenance Order CDS Views.

### 📊 Primary Data Sources

#### 1. **I_MAINTENANCEORDER** (Main Entity)

**Package**: `RAP_EAM_MAINTENANCEORDER`

**Key Fields Used**:
- `MaintenanceOrder` - Order ID (Key)
- `MaintenanceOrderDesc` - Description
- `MaintenanceOrderType` - Order Type (PM01, PM02, PM03)
- `MaintPriority` - Priority (1-4)
- `MaintenanceProcessingPhase` - Phase (1=Created, 2=In Progress, 3=Completed)

**Date Fields** (Critical for Gantt Timeline):
- `MaintOrdBasicStartDate` - Basic start date
- `MaintOrdBasicEndDate` - Basic end date
- `ScheduledBasicStartDate` - Scheduled start
- `ScheduledBasicEndDate` - Scheduled end
- `TechnicalCompletionDate` - Completion date

**Organization**:
- `MaintenancePlanningPlant` - Planning plant
- `MaintenancePlant` - Execution plant
- `MaintenancePlannerGroup` - Planner group

**Technical Objects**:
- `Equipment` - Equipment number
- `FunctionalLocation` - Functional location
- `Assembly` - Assembly

**Responsible**:
- `MaintOrdPersonResponsible` - Person responsible
- `MainWorkCenter` - Main work center

---

#### 2. **I_MAINTENANCEORDEROPERATION** (Operations)

**Associated Entity**: Linked via `MaintenanceOrder`

**Key Fields**:
- `MaintenanceOrder` - Order ID (FK)
- `MaintenanceOrderOperation` - Operation number (Key)
- `OperationDescription` - Operation description
- `OperationControlKey` - Control key
- `MaintOperationExecStageCode` - Execution stage (PRE/MAIN/POST)
- `Equipment` - Equipment
- `FunctionalLocation` - Functional location

---

## 🔧 OData Service Configuration

### Service Endpoint

```
/sap/opu/odata4/sap/api_maintenanceorder/srvd/sap/api_maintenanceorder/0001/
```

### Entity Sets

1. **MaintenanceOrder**
   - Path: `/MaintenanceOrder`
   - Navigation: `to_Operation`

2. **MaintenanceOrderOperation**
   - Path: `/MaintenanceOrderOperation`

---

## 📝 Data Model Mapping

### Gantt Chart Requirements

| Gantt Field | SAP CDS Field | Type | Description |
|-------------|---------------|------|-------------|
| Task ID | MaintenanceOrder | String(12) | Unique order ID |
| Title | MaintenanceOrderDesc | String(40) | Order description |
| Start Date | MaintOrdBasicStartDate | Date | Start date |
| End Date | MaintOrdBasicEndDate | Date | End date |
| Status | MaintenanceProcessingPhase | String(1) | Phase code |
| Priority | MaintPriority | String(1) | Priority level |
| Resource | Equipment | String(18) | Equipment |

---

## 🎨 Visual Mapping

### Priority Colors

```javascript
"1" (Very High) → #BB0000 (Red)
"2" (High)      → #E76500 (Orange)
"3" (Medium)    → #0070F2 (Blue)
"4" (Low)       → #107E3E (Green)
```

### Phase Colors

```javascript
"1" (Created)    → #5E696E (Grey)
"2" (In Progress)→ #0070F2 (Blue)
"3" (Completed)  → #107E3E (Green)
"4" (Cancelled)  → #E76500 (Orange)
```

---

## 🔍 Filter Implementation

### Available Filters

1. **Plant Filter**
   - Field: `MaintenancePlanningPlant`
   - Operator: EQ (Equal)

2. **Equipment Filter**
   - Field: `Equipment`
   - Operator: Contains

3. **Order Type Filter**
   - Field: `MaintenanceOrderType`
   - Operator: EQ

4. **Date Range**
   - Start: `MaintOrdBasicStartDate` >= dateFrom
   - End: `MaintOrdBasicEndDate` <= dateTo

---

## 🚀 Deployment Steps

### 1. Configure Backend Connection

Update `manifest.json` with your SAP system details:

```json
"dataSources": {
  "maintenanceOrderService": {
    "uri": "https://your-sap-system.com/sap/opu/odata4/sap/api_maintenanceorder/srvd/sap/api_maintenanceorder/0001/",
    "type": "OData",
    "settings": {
      "odataVersion": "4.0"
    }
  }
}
```

### 2. Authentication

Add authentication in `xs-app.json` or configure SAP Cloud Connector.

### 3. Testing with Mock Data

The app includes mock data in `webapp/localService/mockdata/` for local testing.

To switch to mock mode, update `index.html`:

```javascript
sap.ui.require([
    "sap/ui/core/ComponentSupport",
    "sap/ui/core/ComponentContainer"
], function (ComponentSupport, ComponentContainer) {
    "use strict";
    
    // Enable mock server
    sap.ui.require(["sap/ui/core/util/MockServer"], function(MockServer) {
        var oMockServer = new MockServer({
            rootUri: "/sap/opu/odata4/sap/api_maintenanceorder/srvd/sap/api_maintenanceorder/0001/"
        });
        oMockServer.simulate("localService/metadata.xml", {
            sMockdataBaseUrl: "localService/mockdata"
        });
        oMockServer.start();
    });
});
```

---

## 📊 Sample Data Structure

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
  "MaintOrdBasicEndDate": "2025-10-17",
  "MaintOrdPersonResponsible": "JSMITH"
}
```

---

## 🔐 Authorization

Required SAP Authorizations:

- **S_SERVICE** - OData Service access
- **I_MAINTENANCEORDER** - Read access to Maintenance Orders
- **I_MAINTENANCEORDEROPERATION** - Read access to Operations

---

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Configure SAP Cloud Connector
   - Enable CORS in SAP Gateway

2. **Authentication Failed**
   - Check destination configuration
   - Verify user credentials

3. **No Data Displayed**
   - Verify OData service is active
   - Check authorization objects
   - Validate filter parameters

4. **Date Format Issues**
   - Ensure dates are in YYYY-MM-DD format
   - Check timezone settings

---

## 📞 Support

For SAP-specific integration questions:
- SAP Note: Check for relevant SAP Notes on Maintenance Order APIs
- SAP API Business Hub: https://api.sap.com/
- Documentation: https://help.sap.com/

---

## 🔄 Version History

- **v1.0.0** - Initial integration with I_MAINTENANCEORDER CDS View
- Connected to RAP_EAM_MAINTENANCEORDER package
- Support for basic Gantt visualization
