
import {
  GET_HOLIDAY_LIST,
  GET_HOLIDAY_LIST_SUCCESS,
  GET_HOLIDAY_LIST_FAILD
} from "../../constant/commonTypes";
import { toast } from "react-toastify";
import { api } from "../../httpServices/service";

const INIT_STATE = {
  loading: false,
  daysHoliday:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_HOLIDAY_LIST:
      return { ...state, loading: true };
    case GET_HOLIDAY_LIST_SUCCESS:
      return { ...state, loading: false, daysHoliday: action.payload };
    case GET_HOLIDAY_LIST_FAILD:
      return { ...state, loading: false, error: action.payload };
   

    default:
      return { ...state };
  }
};
