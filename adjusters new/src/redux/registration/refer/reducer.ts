import {
  REFERER_REGISTERION,
  REFERER_REGISTERION_SUCCESS,
  REFERER_REGISTERION_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  refer: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REFERER_REGISTERION:
      return { ...state, loading: true };
    case REFERER_REGISTERION_SUCCESS:
      return { ...state, loading: false, refer: action.payload };
    case REFERER_REGISTERION_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
