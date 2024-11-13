import {
    FORBIDDEN_POSITION_INFO,
    FORBIDDEN_POSITION_INFO_SUCCESS,
    FORBIDDEN_POSITION_INFO_FAILED,
    FORBIDDEN_SOURCE_POSITION_INFO,
    FORBIDDEN_SOURCE_POSITION_INFO_SUCCESS,
    FORBIDDEN_SOURCE_POSITION_INFO_FAILED,
    FORBIDDEN_SUBMIT_BASE_INFO,
    FORBIDDEN_SUBMIT_BASE_INFO_SUCCESS,
    FORBIDDEN_SUBMIT_BASE_INFO_FAILED,
    FORBIDDEN_BASE_INFO_LIST,
    FORBIDDEN_BASE_INFO_LIST_SUCCESS,
    FORBIDDEN_BASE_INFO_LIST_FAILED,
    APPLICANT_FORBIDDEN_REPORT,
    APPLICANT_FORBIDDEN_REPORT_SUCCESS,
    APPLICANT_FORBIDDEN_REPORT_FAILED
} from "../../constant/cartableActionTypes";

const INIT_STATE = {
    forbiddenPositionLoading: false,
    forbiddenPositionDetails: null,
    forbiddenSourcePostitionLoading: false,
    forbiddenSourcePostitionDetails: null,
    forbiddenSubmitLoading: false,
    forbiddenSubmitDetails: null,
    forbiddenListLoading: false,
    forbiddenListDetails: null,
    deleteForbiddenLoading: false,
    deleteForbiddenDetails: null,
    getForbiddenDetails: null,
    getForbiddenDetailsLoading: false,
    forbiddenReportDetails: null,
    forbiddenReportLoading: false,

};

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case FORBIDDEN_POSITION_INFO:
            return { ...state, forbiddenPositionLoading: true };
        case FORBIDDEN_POSITION_INFO_SUCCESS:
            return { ...state, forbiddenPositionLoading: false, forbiddenPositionDetails: action.payload };
        case FORBIDDEN_POSITION_INFO_FAILED:
            return { ...state, forbiddenPositionLoading: false, forbiddenPositionDetails: null, error: action.payload };
        case FORBIDDEN_SOURCE_POSITION_INFO:
            return { ...state, forbiddenSourcePostitionLoading: true };
        case FORBIDDEN_SOURCE_POSITION_INFO_SUCCESS:
            return { ...state, forbiddenSourcePostitionLoading: false, forbiddenSourcePostitionDetails: action.payload };
        case FORBIDDEN_SOURCE_POSITION_INFO_FAILED:
            return { ...state, forbiddenSourcePostitionLoading: false, forbiddenSourcePostitionDetails: null, error: action.payload };
        case FORBIDDEN_SUBMIT_BASE_INFO:
            return { ...state, forbiddenSubmitLoading: true };
        case FORBIDDEN_SUBMIT_BASE_INFO_SUCCESS:
            return { ...state, forbiddenSubmitLoading: false, forbiddenSubmitDetails: action.payload };
        case FORBIDDEN_SUBMIT_BASE_INFO_FAILED:
            return { ...state, forbiddenSubmitLoading: false, forbiddenSubmitDetails: null, error: action.payload };
        case FORBIDDEN_BASE_INFO_LIST:
            return { ...state, forbiddenListLoading: true };
        case FORBIDDEN_BASE_INFO_LIST_SUCCESS:
            return { ...state, forbiddenListLoading: false, forbiddenListDetails: action.payload };
        case FORBIDDEN_BASE_INFO_LIST_FAILED:
            return { ...state, forbiddenListLoading: false, forbiddenListDetails: null, error: action.payload };
        case "DELETE-FORBIDDEN-INFO":
            return { ...state, deleteForbiddenLoading: true, };
        case "DELETE-FORBIDDEN-INFO-SUCCESS":
            return { ...state, deleteForbiddenLoading: false, deleteForbiddenDetails: action.payload };
        case "DELETE-FORBIDDEN-INFO-FAILED":
            return { ...state, deleteForbiddenLoading: false, deleteForbiddenDetails: null, error: action.payload };
        case "GET_FORBIDDEN_INFO_DETAILS":
            return { ...state, getForbiddenDetailsLoading: true, };
        case "GET_FORBIDDEN_INFO_DETAILS-SUCCESS":
            return { ...state, getForbiddenDetailsLoading: false, getForbiddenDetails: action.payload };
        case "GET_FORBIDDEN_INFO_DETAILS-FAILED":
            return { ...state, getForbiddenDetailsLoading: false, getForbiddenDetails: null, error: action.payload };
            case APPLICANT_FORBIDDEN_REPORT:
                return { ...state, forbiddenReportLoading: true };
              case APPLICANT_FORBIDDEN_REPORT_SUCCESS:
                return { ...state, forbiddenReportLoading: false, forbiddenReportDetails: action.payload };
              case APPLICANT_FORBIDDEN_REPORT_FAILED:
                return { ...state, forbiddenReportLoading: false, forbiddenReportDetails: null, error: action.payload, };
          
            default:
            return { ...state };
    }
};
