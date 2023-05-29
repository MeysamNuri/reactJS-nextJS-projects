import {
  ADD_STATICAL_REPORT,
  ADD_STATICAL_REPORT_SUCCESS,
  ADD_STATICAL_REPORT_FAILD,
  DETAIL_STATICAL_REPORT,
  DETAIL_STATICAL_REPORT_SUCCESS,
  DETAIL_STATICAL_REPORT_FAILD,
  DETAIL_STATICAL_REPORT_FAILD_INFO
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  statisticalReports: null,
  loadingOneDetail: null,
  listDetailStaticalReport: null,
  fetchDetailStaticalReportInfo:null
 
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ADD_STATICAL_REPORT:
      return { ...state, loading: true };
    case ADD_STATICAL_REPORT_SUCCESS:
      return { ...state, loading: false, statisticalReports: action.payload };
    case ADD_STATICAL_REPORT_FAILD:
      return { ...state, loading: false, error: action.payload };
      case DETAIL_STATICAL_REPORT:
        return {...state, loadingOneDetail: action.payload };
      case DETAIL_STATICAL_REPORT_SUCCESS:
        return { ...state, loadingOneDetail: null, listDetailStaticalReport: action.payload };
      case DETAIL_STATICAL_REPORT_FAILD:
        return { ...state, loadingOneDetail: null, error: action.payload };
        case DETAIL_STATICAL_REPORT_FAILD_INFO:
          return {...state, fetchDetailStaticalReportInfo: action.payload };
   
    default:
      return { ...state };
  }
};
