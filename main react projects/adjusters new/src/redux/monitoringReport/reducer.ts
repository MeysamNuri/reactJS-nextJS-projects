import {
    VIEW_MONITORING_REPORT,
    VIEW_MONITORING_REPORT_SUCCESS,
    VIEW_MONITORING_REPORT_FAILD,
  } from "../../constant/desktop";
  
  const INIT_STATE = {

    loadingViewMonitoringReport: false,
    viewMonitoring: null,
  };
export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case VIEW_MONITORING_REPORT:
            return { ...state, loadingViewMonitoringReport: true };
          case VIEW_MONITORING_REPORT_SUCCESS:
            return {
              ...state,
              loadingViewMonitoringReport: false,
              viewMonitoring: action.payload,
            };
          case VIEW_MONITORING_REPORT_FAILD:
            return {
              ...state,
              loadingViewMonitoringReport: false,
              error: action.payload,
            };
            default:
                return { ...state };
            }
    }