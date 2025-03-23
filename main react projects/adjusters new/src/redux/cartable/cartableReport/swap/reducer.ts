import {
  SWAP_USERS_FROM_REPORT_TABLE,
  SWAP_USERS_FROM_REPORT_TABLE_SUCCESS,
  SWAP_USERS_FROM_REPORT_TABLE_FAILED,
} from "../../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  swap: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SWAP_USERS_FROM_REPORT_TABLE:
      return { ...state, loading: true };
    case SWAP_USERS_FROM_REPORT_TABLE_SUCCESS:
      return { ...state, loading: false, swap: action.payload };
    case SWAP_USERS_FROM_REPORT_TABLE_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
