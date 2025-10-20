import { ValueState } from "sap/ui/core/library";

export default {
    formatPriorityState(sPriority: string): ValueState {
        const stateMap: Record<string, ValueState> = {
            "Critical": ValueState.Error,
            "High": ValueState.Warning,
            "Medium": ValueState.Success,
            "Low": ValueState.Information
        };
        return stateMap[sPriority] || ValueState.None;
    }
};
