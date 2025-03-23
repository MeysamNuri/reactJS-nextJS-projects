import {
  SEND_REFER_NATURAL,
  SEND_REFER_NATURAL_SUCCESS,
  SEND_REFER_NATURAL__FAILD,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  refer: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SEND_REFER_NATURAL:
      return { ...state, loading: true };
    case SEND_REFER_NATURAL_SUCCESS:
      return { ...state, loading: false, refer: action.payload };
    case SEND_REFER_NATURAL__FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
