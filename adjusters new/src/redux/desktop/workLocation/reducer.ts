
import {
  LIST_WORK_LOCATION_REQUEST,
  LIST_WORK_LOCATION_REQUEST_SUCCESS,
  LIST_WORK_LOCATION_REQUEST_FAILD
} from "../../../constant/desktop";

const INIT_STATE = {
  listWorkLocation: null,
  loading: false,
  
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LIST_WORK_LOCATION_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case LIST_WORK_LOCATION_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        listWorkLocation: action.payload,
      };
    case LIST_WORK_LOCATION_REQUEST_FAILD:
      return {
        ...state,
        loading: false,
        listWorkLocation: action.payload,
      };

   
    default:
      return { ...state };
  }
};
