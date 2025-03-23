import {
  STATUS_LIST,
  STATUS_LIST_SUCCESS,
  STATUS_LIST_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  statusList: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case STATUS_LIST:
      return { ...state, loading: true };
    case STATUS_LIST_SUCCESS:
      return { ...state, loading: false, statusList: action.payload };
    case STATUS_LIST_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
