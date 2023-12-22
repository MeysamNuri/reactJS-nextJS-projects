import {
  SEND_NAT_AND_REG_CODES,
  SEND_NAT_AND_REG_CODES_SUCCESS,
  SEND_NAT_AND_REG_CODES_FAILED,
} from "../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  response: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SEND_NAT_AND_REG_CODES:
      return { ...state, loading: true };
    case SEND_NAT_AND_REG_CODES_SUCCESS:
      return { ...state, loading: false, response: action.payload };
    case SEND_NAT_AND_REG_CODES_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
