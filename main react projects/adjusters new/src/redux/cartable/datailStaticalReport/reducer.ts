import {
  DETAIL_STATICAL_REPORT,
  DETAIL_STATICAL_REPORT_SUCCESS,
  DETAIL_STATICAL_REPORT_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loadingOneDetail: null,
  listDetailStaticalReport: null,
 
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DETAIL_STATICAL_REPORT:
      return {listDetailStaticalReport:null, loadingOneDetail: action.payload };
    case DETAIL_STATICAL_REPORT_SUCCESS:
      return { ...state, loadingOneDetail: null, listDetailStaticalReport: action.payload };
    case DETAIL_STATICAL_REPORT_FAILD:
      return { ...state, loadingOneDetail: null, error: action.payload };
    default:
      return { ...state };
  }
}; 
