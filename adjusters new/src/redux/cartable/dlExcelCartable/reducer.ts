import {
  EXCEL_OUTPUT_CARTABLE,
  EXCEL_OUTPUT_CARTABLE_SUCCESS,
  EXCEL_OUTPUT_CARTABLE_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loadingExcel: false,
  resExel: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case EXCEL_OUTPUT_CARTABLE:
      return { ...state, loadingExcel: true };
    case EXCEL_OUTPUT_CARTABLE_SUCCESS:
      return { ...state, loadingExcel: false, resExel: action.payload };
    case EXCEL_OUTPUT_CARTABLE_FAILD:
      return { ...state, loadingExcel: false, error: action.payload };
    default:
      return { ...state };
  }
};
