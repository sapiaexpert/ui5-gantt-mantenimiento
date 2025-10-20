# 🚀 SAP BTP Deployment Guide

## Prerequisites

- ✅ SAP BTP Account (Trial or Productive)
- ✅ SAP Business Application Studio access
- ✅ Cloud Foundry CLI installed
- ✅ MBT (Multi-Target Application) build tool
- ✅ SAP Cloud Connector configured (for on-premise)
- ✅ Destination `IQT_800` created in BTP Cockpit

---

## 📋 Destination Configuration

### In BTP Cockpit: Connectivity → Destinations

```
Name: IQT_800
Type: HTTP
URL: http://your-virtual-host:port
Proxy Type: OnPremise
Authentication: BasicAuthentication
User: YOUR_SAP_USER
Password: YOUR_SAP_PASSWORD

Additional Properties:
  sap-client = 800
  WebIDEEnabled = true
  WebIDEUsage = odata_abap
  HTML5.DynamicDestination = true
```

---

## 🛠️ SAP Cloud Connector Configuration

### Cloud To On-Premise Mapping

```
Backend Type: ABAP System
Protocol: HTTPS
Internal Host: your-sap-server.company.com
Internal Port: 44300
Virtual Host: your-virtual-host
Virtual Port: 44300
Principal Type: None

Resources:
  URL Path: /sap/opu/odata4/
  Active: ✓
  Access Policy: Path and all sub-paths
```

---

## 🏗️ Build & Deploy Steps

### 1. Clone Repository in SAP BAS

```bash
git clone https://github.com/sapiaexpert/ui5-gantt-mantenimiento.git
cd ui5-gantt-mantenimiento
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install MBT Tool (if not installed)

```bash
npm install -g mbt
```

### 4. Login to Cloud Foundry

```bash
cf login -a https://api.cf.eu10.hana.ondemand.com
# Enter your credentials

cf target -o YOUR_ORG -s YOUR_SPACE
```

### 5. Build MTA

```bash
npm run build:mta
```

This creates: `mta_archives/ui5-gantt-maintenance_1.0.0.mtar`

### 6. Deploy to BTP

```bash
npm run deploy
```

Or manually:

```bash
cf deploy mta_archives/ui5-gantt-maintenance_1.0.0.mtar
```

### 7. Verify Deployment

```bash
cf apps
```

You should see:
```
name                              state     instances   memory   disk
ui5-gantt-maintenance-deployer    stopped   0/1         256M     1G
```

### 8. Access Application

Go to BTP Cockpit:
```
HTML5 Applications → ui5-gantt-maintenance
```

Or via Launchpad:
```
https://[your-subdomain].launchpad.cfapps.eu10.hana.ondemand.com/
```

---

## 🔧 Local Testing (Mock Data)

### With Mock Data (Development)

```bash
npm start
# or
npm run start:mock
```

Opens: `http://localhost:8080/index.html`

### With Real SAP Data (via BAS Preview)

```bash
npm run start:prod
```

Opens: `http://localhost:8080/index-production.html`

---

## 🔐 Security Configuration

### Assign Role Collection

1. Go to BTP Cockpit → Security → Role Collections
2. Find `MaintenanceOrderViewer-[space]`
3. Add your user to this role collection

---

## 🐛 Troubleshooting

### Error: "Destination IQT_800 not found"

**Solution**: Create destination in BTP Cockpit as described above.

### Error: "401 Unauthorized"

**Solution**: 
- Check SAP user credentials in destination
- Verify authorization objects in SAP:
  - S_SERVICE
  - Authorization for I_MAINTENANCEORDER

### Error: "503 Service Unavailable"

**Solution**:
- Verify Cloud Connector is running
- Check system is connected in Cloud Connector
- Verify firewall allows connection

### Error: "CORS blocked"

**Solution**:
- For BAS preview, this is normal
- Deploy to BTP to avoid CORS issues

### Error: Build fails with MBT

```bash
# Install latest MBT
npm install -g mbt

# Clean and rebuild
npm run clean
npm install
npm run build:mta
```

---

## 🔄 Update Deployment

```bash
# Make your changes
git pull
npm install

# Rebuild and redeploy
npm run deploy:dev
```

The `-f` flag forces update without confirmation.

---

## 🗑️ Undeploy Application

```bash
npm run undeploy
```

This removes:
- Application
- Services (XSUAA, Destination, HTML5 Repo)
- Service keys

---

## 📊 Check Application Logs

```bash
# List apps
cf apps

# View logs
cf logs ui5-gantt-maintenance-deployer --recent
```

---

## 🎯 Production Checklist

```
☐ Cloud Connector configured and connected
☐ Destination IQT_800 created with correct credentials
☐ SAP user has required authorizations
☐ Service I_MAINTENANCEORDER is active
☐ Client 800 is accessible
☐ MockServer disabled (using index-production.html)
☐ xs-app.json routing configured
☐ MTA build successful
☐ CF deployment successful
☐ Role collection assigned to users
☐ Application accessible via Launchpad
☐ Real data loads from SAP
```

---

## 📞 Support

- **SAP BTP Issues**: https://help.sap.com/
- **Cloud Connector**: https://help.sap.com/docs/CP_CONNECTIVITY
- **UI5 Issues**: https://sapui5.hana.ondemand.com/

---

**Last Updated**: 2025-10-20
