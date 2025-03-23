
import {
    ACTIVE_ADJUSTERS,
    ACTIVE_ADJUSTERS_SUCCESS,
    ACTIVE_ADJUSTERS_FAILD,
    ACTIVE_ADJUSTER_EXCEL,
    ACTIVE_ADJUSTER_EXCEL_SUCCESS,
    ACTIVE_ADJUSTER_EXCEL_FAILED
} from "../../constant/actionTypes";

const INIT_STATE = {
    activeAdjustersLoading: false,
    activeAdjusterLists: null,
    applicantWorklocationLoading: false,
    applicantWorkLocationExcle: null,
    monitoringReportLoading: false,
    monitoringReportExcle: null
};

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ACTIVE_ADJUSTERS:
            return { ...state, activeAdjustersLoading: true };
        case ACTIVE_ADJUSTERS_SUCCESS:
            return { ...state, activeAdjustersLoading: false, activeAdjusterLists: action.payload };
        case ACTIVE_ADJUSTERS_FAILD:
            return { ...state, activeAdjustersLoading: false, error: action.payload, activeAdjusterLists: null };
        case 'APPLICANT_WORK_LOCATION_EXCEL_INFO':
            return { ...state, applicantWorklocationLoading: true };
        case 'APPLICANT_WORK_LOCATION_EXCEL_INFO_SUCCES':
            return { ...state, applicantWorklocationLoading: false, applicantWorkLocationExcle: action.payload };
        case 'APPLICANT_WORK_LOCATION_EXCEL_INFO_FAILED':
            return { ...state, applicantWorklocationLoading: false, applicantWorkLocationExcle: null, error: action.payload };
        case 'MONITORING_REPORT_EXCEL_INFO':
            return { ...state, monitoringReportLoading: true };
        case 'MONITORING_REPORT_EXCEL_INFO_SUCCES':
            return { ...state, monitoringReportLoading: false, monitoringReportExcle: action.payload };
        case 'MONITORING_REPORT_EXCEL_INFO_FAILED':
            return { ...state, monitoringReportLoading: false, monitoringReportExcle: null, error: action.payload };

        default:
            return { ...state };
    }
};