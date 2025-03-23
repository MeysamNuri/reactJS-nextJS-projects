import {
  FETCH_COMPANY_BASE_INFO_LEGAL,
  FETCH_COMPANY_BASE_INFO_LEGAL_SUCCESS,
  FETCH_COMPANY_BASE_INFO_LEGAL_FAILED,
  EDIT_COMPANY_BASE_INFO_LEGAL,
  EDIT_COMPANY_BASE_INFO_LEGAL_SUCCESS,
  EDIT_COMPANY_BASE_INFO_LEGAL_FAILED,
  FETCH_ADJUSTER_COMPANY_INFO_LEGAL,
  FETCH_ADJUSTER_COMPANY_INFO_LEGAL_SUCCESS,
  FETCH_ADJUSTER_COMPANY_INFO_LEGAL_FAILED
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loadingFetchBaseInfo: false,
  legalFetchBaseInfoCartable: null,
  loadingEditBaseInfo: false,
  legalEditBaseInfoCartable:null,
  adjusterCompanyInfoDetails:null,
  adjusterCompanyInfoLoading:false,
  changePasswordLoading:false
};
 
export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case FETCH_COMPANY_BASE_INFO_LEGAL:
      return { ...state, loadingFetchBaseInfo: true};
    case FETCH_COMPANY_BASE_INFO_LEGAL_SUCCESS:
      return { ...state, loadingFetchBaseInfo: false, legalFetchBaseInfoCartable: action.payload };
    case FETCH_COMPANY_BASE_INFO_LEGAL_FAILED:
      return {legalFetchBaseInfoCartable:null, loadingFetchBaseInfo: false, error: action.payload };
      case FETCH_ADJUSTER_COMPANY_INFO_LEGAL:
        return { ...state, adjusterCompanyInfoLoading: true};
      case FETCH_ADJUSTER_COMPANY_INFO_LEGAL_SUCCESS:
        return { ...state, adjusterCompanyInfoLoading: false,adjusterCompanyInfoDetails:action.payload};
      case FETCH_ADJUSTER_COMPANY_INFO_LEGAL_FAILED:
        return { ...state, adjusterCompanyInfoLoading: false,adjusterCompanyInfoDetails:null, error: action.payload};
    case EDIT_COMPANY_BASE_INFO_LEGAL:
      return { ...state, loadingEditBaseInfo: true};
    case EDIT_COMPANY_BASE_INFO_LEGAL_SUCCESS:
      return {
        ...state,
        loadingEditBaseInfo: false,
        legalEditBaseInfoCartable: action.payload,
      };
      case EDIT_COMPANY_BASE_INFO_LEGAL_FAILED:
        return { ...state, legalEditBaseInfoCartable: false };
    
      case "CAHNGE_PASSWORD_API":
        return { ...state, changePasswordLoading: true };
    
      case "CAHNGE_PASSWORD_API":
        return { ...state, changePasswordLoading: true };
    
      case "CAHNGE_PASSWORD_API_SUCCESS":
        return { ...state, changePasswordLoading: false };
    
      case "CAHNGE_PASSWORD_API_FAILED":
        return { ...state, changePasswordLoading: false };
    

    default:
      return { ...state };
  }
};
