import {
    APPLICANT_WARNINGS_LIST,
    APPLICANT_WARNINGS_LIST_SUCCESS,
    APPLICANT_WARNINGS_LIST_FAILD
} from "../../../constant/desktop";
const INIT_STATE ={
    loadingApllicantWarnings:false,
    applicantWarningsList:null
}
export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
      case APPLICANT_WARNINGS_LIST:
        return { ...state, loadingApllicantWarnings: true };
        case  APPLICANT_WARNINGS_LIST_SUCCESS:
            return {
              ...state,
              loadingApllicantWarnings: false,
              applicantWarningsList: action.payload,
            };
          case APPLICANT_WARNINGS_LIST_FAILD:
            return {
              ...state,
              loadingApllicantWarnings: false,
              error: action.payload,
            };
    
        default:
            return { ...state };
    }
}