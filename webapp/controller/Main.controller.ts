import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import formatter from "../model/formatter";

/**
 * @namespace com.mycompany.newapp.controller
 */
export default class Main extends BaseController {
    public formatter = formatter;
    
    public onInit(): void {
        // Load maintenance orders data
        const oMaintenanceModel = new JSONModel();
        this.getView()?.setModel(oMaintenanceModel, "maintenanceModel");
        
        // Load data from JSON file
        oMaintenanceModel.loadData(sap.ui.require.toUrl("com/mycompany/newapp/model/maintenanceOrders.json"));
        
        // Wait for data to load and then generate Gantt chart
        oMaintenanceModel.attachRequestCompleted(() => {
            console.log("✅ Datos cargados:", oMaintenanceModel.getData());
            this.calculateStats();
            this.generateGanttChart();
        });
        
        oMaintenanceModel.attachRequestFailed((oEvent: any) => {
            console.error("❌ Error al cargar datos:", oEvent);
            MessageBox.error("No se pudieron cargar los datos de mantenimiento.");
        });
    }

    private calculateStats(): void {
        const oModel = this.getView()?.getModel("maintenanceModel") as JSONModel;
        const aOrders = oModel.getProperty("/maintenanceOrders") || [];
        
        console.log("📊 Calculando estadísticas para", aOrders.length, "órdenes");
        
        const stats = {
            total: aOrders.length,
            critical: aOrders.filter((o: any) => o.priority === "Critical").length,
            high: aOrders.filter((o: any) => o.priority === "High").length,
            avgDuration: aOrders.length > 0 ? Math.round(
                aOrders.reduce((sum: number, o: any) => sum + o.duration, 0) / aOrders.length
            ) : 0
        };
        
        console.log("✅ Estadísticas calculadas:", stats);
        oModel.setProperty("/stats", stats);
    }

    private generateGanttChart(): void {
        const oModel = this.getView()?.getModel("maintenanceModel") as JSONModel;
        const aOrders = oModel.getProperty("/maintenanceOrders") || [];
        
        console.log("📋 Generando Gantt Chart para", aOrders.length, "órdenes");
        
        if (aOrders.length === 0) {
            console.warn("⚠️ No hay órdenes para mostrar en el Gantt");
            return;
        }

        // Find min and max dates
        const dates = aOrders.flatMap((o: any) => [new Date(o.startDate), new Date(o.endDate)]);
        const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
        const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
        
        // Generate date range for header
        const dateRange: Date[] = [];
        const currentDate = new Date(minDate);
        while (currentDate <= maxDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const dayWidth = 60; // pixels per day
        const rowHeight = 50; // pixels per row
        const labelWidth = 250; // pixels for label column
        const totalWidth = labelWidth + (dateRange.length * dayWidth);

        // Color mapping for priorities
        const priorityColors: Record<string, string> = {
            "Critical": "#bb0000",
            "High": "#e78c07",
            "Medium": "#2b7c2b",
            "Low": "#427cac"
        };

        // Generate HTML for Gantt chart
        let html = `
            <div style="position: relative; width: ${totalWidth}px;">
                <!-- Header with dates -->
                <div style="display: flex; border-bottom: 2px solid #333; background: #f5f5f5; position: sticky; top: 0; z-index: 10;">
                    <div style="width: ${labelWidth}px; padding: 10px; font-weight: bold; border-right: 1px solid #ddd;">
                        Orden / Equipo
                    </div>
                    <div style="display: flex; flex: 1;">
                        ${dateRange.map(date => `
                            <div style="width: ${dayWidth}px; text-align: center; padding: 5px; border-right: 1px solid #eee; font-size: 11px;">
                                <div style="font-weight: bold;">${date.getDate()}</div>
                                <div style="font-size: 9px; color: #666;">${date.toLocaleDateString('es-ES', { weekday: 'short' })}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Gantt rows -->
                ${aOrders.map((order: any, index: number) => {
                    const startDate = new Date(order.startDate);
                    const endDate = new Date(order.endDate);
                    const startOffset = Math.floor((startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
                    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    const barWidth = duration * dayWidth;
                    const barLeft = startOffset * dayWidth;
                    const bgColor = index % 2 === 0 ? '#fafafa' : '#ffffff';
                    
                    return `
                        <div style="display: flex; border-bottom: 1px solid #eee; background: ${bgColor}; min-height: ${rowHeight}px;">
                            <!-- Label column -->
                            <div style="width: ${labelWidth}px; padding: 8px; border-right: 1px solid #ddd; display: flex; flex-direction: column; justify-content: center;">
                                <div style="font-weight: bold; font-size: 12px; margin-bottom: 2px;">${order.id}</div>
                                <div style="font-size: 11px; color: #666;">${order.equipment}</div>
                            </div>
                            
                            <!-- Timeline column -->
                            <div style="position: relative; flex: 1; padding: 8px 0;">
                                <!-- Grid lines -->
                                ${dateRange.map((_, idx) => `
                                    <div style="position: absolute; left: ${idx * dayWidth}px; top: 0; bottom: 0; border-right: 1px solid #f0f0f0; width: ${dayWidth}px;"></div>
                                `).join('')}
                                
                                <!-- Gantt bar -->
                                <div style="
                                    position: absolute;
                                    left: ${barLeft}px;
                                    width: ${barWidth}px;
                                    height: 30px;
                                    background: ${priorityColors[order.priority] || '#666'};
                                    border-radius: 4px;
                                    display: flex;
                                    align-items: center;
                                    padding: 0 8px;
                                    color: white;
                                    font-size: 11px;
                                    font-weight: 500;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                    cursor: pointer;
                                    transition: all 0.2s;
                                    overflow: hidden;
                                    white-space: nowrap;
                                "
                                onmouseover="this.style.transform='scale(1.05)'; this.style.zIndex='5';"
                                onmouseout="this.style.transform='scale(1)'; this.style.zIndex='1';"
                                title="${order.description} (${order.duration} días)">
                                    <span style="overflow: hidden; text-overflow: ellipsis;">
                                        ${order.description.substring(0, 30)}${order.description.length > 30 ? '...' : ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
                
                <!-- Legend -->
                <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;">
                    <div style="font-weight: bold; margin-bottom: 10px;">Leyenda de Prioridades:</div>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        ${Object.entries(priorityColors).map(([priority, color]) => `
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="width: 20px; height: 20px; background: ${color}; border-radius: 3px;"></div>
                                <span style="font-size: 13px;">${priority}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        oModel.setProperty("/ganttHTML", html);
    }

    public onSearch(oEvent: any): void {
        const sQuery = oEvent.getParameter("query");
        const oTable = this.byId("ordersTable");
        const oBinding = oTable?.getBinding("items");
        
        if (!oBinding) {
            return;
        }

        const aFilters: Filter[] = [];
        if (sQuery) {
            aFilters.push(new Filter({
                filters: [
                    new Filter("equipment", FilterOperator.Contains, sQuery),
                    new Filter("description", FilterOperator.Contains, sQuery),
                    new Filter("id", FilterOperator.Contains, sQuery)
                ],
                and: false
            }));
        }

        oBinding.filter(aFilters);
    }

    public onFilterChange(oEvent: any): void {
        const sKey = oEvent.getParameter("selectedItem").getKey();
        const oTable = this.byId("ordersTable");
        const oBinding = oTable?.getBinding("items");
        
        if (!oBinding) {
            return;
        }

        const aFilters: Filter[] = [];
        if (sKey !== "All") {
            aFilters.push(new Filter("priority", FilterOperator.EQ, sKey));
        }

        oBinding.filter(aFilters);
    }

    public onOrderPress(oEvent: any): void {
        const oItem = oEvent.getSource();
        const oContext = oItem.getBindingContext("maintenanceModel");
        const oOrder = oContext?.getObject();

        if (oOrder) {
            MessageBox.information(
                `<strong>ID:</strong> ${oOrder.id}<br/>
                <strong>Equipo:</strong> ${oOrder.equipment}<br/>
                <strong>Descripción:</strong> ${oOrder.description}<br/>
                <strong>Prioridad:</strong> ${oOrder.priority}<br/>
                <strong>Fecha Inicio:</strong> ${new Date(oOrder.startDate).toLocaleDateString('es-ES')}<br/>
                <strong>Fecha Fin:</strong> ${new Date(oOrder.endDate).toLocaleDateString('es-ES')}<br/>
                <strong>Duración:</strong> ${oOrder.duration} días<br/>
                <strong>Responsable:</strong> ${oOrder.responsible}<br/>
                <strong>Departamento:</strong> ${oOrder.department}`,
                {
                    title: "Detalle de Orden de Mantenimiento"
                }
            );
        }
    }
}
