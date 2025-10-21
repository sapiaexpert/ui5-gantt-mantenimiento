import BaseController from "./BaseController";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import DateFormat from "sap/ui/core/format/DateFormat";

export default class Main extends BaseController {
    private allOrders: any[] = [];
    
    public onInit(): void {
        console.log("🚀 Main controller initialized");
        
        const startDate = new Date(2024, 0, 1);
        const endDate = new Date(2025, 11, 31);
        
        const oFilterModel = new JSONModel({
            startDate: startDate,
            endDate: endDate
        });
        this.getView()?.setModel(oFilterModel, "filterModel");
        
        setTimeout(() => {
            this.loadMaintenanceOrders();
        }, 1000);
    }

    public formatDateRange(startDate: Date, endDate: Date): string {
        if (!startDate || !endDate) return "";
        
        const oDateFormat = DateFormat.getDateInstance({ pattern: "dd/MM/yyyy" });
        return `${oDateFormat.format(new Date(startDate))} - ${oDateFormat.format(new Date(endDate))}`;
    }

    private loadMaintenanceOrders(): void {
        const oModel = this.getView()?.getModel() as ODataModel;
        
        if (!oModel) {
            console.error("❌ OData model not found, retrying in 2s...");
            setTimeout(() => this.loadMaintenanceOrders(), 2000);
            return;
        }

        console.log("📡 Cargando órdenes desde OData...");
        
        oModel.read("/MaintenanceOrder", {
            urlParameters: {
                "$top": "200"
            },
            success: (oData: any) => {
                console.log("✅ Órdenes cargadas:", oData.results.length);
                
                this.allOrders = oData.results;
                
                const stats = {
                    total: oData.results.length,
                    loaded: new Date().toLocaleTimeString()
                };
                
                const oStatsModel = new JSONModel(stats);
                this.getView()?.setModel(oStatsModel, "statsModel");
                
                this.onFilterByDate();
            },
            error: (oError: any) => {
                console.error("❌ Error al cargar órdenes:", oError);
                MessageBox.error("Error al cargar las órdenes de mantenimiento");
            }
        });
    }

    public onFilterByDate(): void {
        const oFilterModel = this.getView()?.getModel("filterModel") as JSONModel;
        
        if (!oFilterModel || this.allOrders.length === 0) {
            console.log("⚠️ No hay datos para filtrar");
            return;
        }
        
        const filters = oFilterModel.getData();
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        
        console.log("🔍 Filtrando desde", startDate.toLocaleDateString(), "hasta", endDate.toLocaleDateString());
        
        const filteredOrders = this.allOrders.filter((order: any) => {
            if (!order.MaintOrdBasicStartDate) return false;
            const orderStartDate = new Date(order.MaintOrdBasicStartDate);
            return orderStartDate >= startDate && orderStartDate <= endDate;
        });
        
        console.log(`✅ Encontradas ${filteredOrders.length} órdenes de ${this.allOrders.length}`);
        
        const oOrdersModel = new JSONModel({ orders: filteredOrders });
        this.getView()?.setModel(oOrdersModel, "ordersModel");
        
        this.prepareGanttData(filteredOrders);
        
        const oStatsModel = this.getView()?.getModel("statsModel") as JSONModel;
        if (oStatsModel) {
            const stats = oStatsModel.getData();
            stats.filtered = filteredOrders.length;
            oStatsModel.setData(stats);
        }
    }

    private prepareGanttData(orders: any[]): void {
        const ganttTasks = orders
            .filter(o => o.MaintOrdBasicStartDate && o.MaintOrdBasicEndDate)
            .map(order => ({
                id: order.MaintenanceOrder,
                title: `${order.MaintenanceOrderDesc || 'Sin descripción'}`.substring(0, 50),
                start: new Date(order.MaintOrdBasicStartDate),
                end: new Date(order.MaintOrdBasicEndDate),
                priority: order.MaintPriority || "3",
                equipment: order.EquipmentName || order.Equipment || "N/A",
                plant: order.MaintenancePlant || "N/A"
            }));

        console.log("📊 Tareas Gantt preparadas:", ganttTasks.length);

        // Calcular horizontes para el timeline
        let minDate: Date;
        let maxDate: Date;
        
        if (ganttTasks.length > 0) {
            const dates = ganttTasks.flatMap(t => [t.start.getTime(), t.end.getTime()]);
            minDate = new Date(Math.min(...dates));
            maxDate = new Date(Math.max(...dates));
            
            // Agregar margen de 7 días a cada lado
            minDate.setDate(minDate.getDate() - 7);
            maxDate.setDate(maxDate.getDate() + 7);
        } else {
            // Si no hay tareas, usar fechas por defecto
            minDate = new Date();
            maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3);
        }

        const oGanttModel = new JSONModel({
            tasks: ganttTasks,
            totalHorizon: {
                startTime: minDate.toISOString(),
                endTime: maxDate.toISOString()
            },
            visibleHorizon: {
                startTime: minDate.toISOString(),
                endTime: maxDate.toISOString()
            }
        });
        
        this.getView()?.setModel(oGanttModel, "ganttModel");
        console.log("🎨 Gantt Chart configurado con", ganttTasks.length, "tareas");
    }
}
