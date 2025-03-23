import {
  LEGAL_DRAFT_COMPANY_INFO,
  LEGAL_DRAFT_COMPANY_INFO_SUCCESS,
  LEGAL_DRAFT_COMPANY_INFO_FAILD,
  LEGAL_DRAFT_COMPANY_INFO_GET_SUCCESS,
  LEGAL_COMPANY_TYPES,
  LEGAL_COMPANY_TYPES_SUCCESS,
  LEGAL_COMPANY_TYPES_FAILD
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  companyInfo: null,
  comnayTypesInfo:null,
  loadingCompanyTypes:false,
  companyTyesDetails:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_DRAFT_COMPANY_INFO:
      return { ...state, loading: true };
    case LEGAL_DRAFT_COMPANY_INFO_SUCCESS:
      return { ...state, loading: false, companyInfo: action.payload };
    case LEGAL_DRAFT_COMPANY_INFO_GET_SUCCESS:
      return { ...state, loading: false, companyInfo: action.payload };
    case LEGAL_DRAFT_COMPANY_INFO_FAILD:
      return { ...state, loading: false, error: action.payload };
      case LEGAL_COMPANY_TYPES:
        return { ...state, loadingCompanyTypes: true };
      case LEGAL_COMPANY_TYPES_SUCCESS:
        return { ...state, loadingCompanyTypes: false ,comnayTypesInfo:action.payload};
      case LEGAL_COMPANY_TYPES_FAILD:
        return { ...state, loadingCompanyTypes: false, error: action.payload };
      case "COMPANY_TYPE_DETAILS":
        return { ...state,companyTyesDetails: action.payload };
    default:
      return { ...state };
  }
};
