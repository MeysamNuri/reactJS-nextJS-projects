import {
  GET_USERS_FOR_CARTABLE_REPORT,
  GET_USERS_FOR_CARTABLE_REPORT_SUCCESS,
  GET_USERS_FOR_CARTABLE_REPORT_FAILED,
} from "../../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  users: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_USERS_FOR_CARTABLE_REPORT:
      return { ...state, loading: true };
    case GET_USERS_FOR_CARTABLE_REPORT_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case GET_USERS_FOR_CARTABLE_REPORT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
