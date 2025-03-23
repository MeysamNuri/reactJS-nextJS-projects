import {
  FIELD_INFO_DETAIL,
  FIELD_INFO_DETAIL_SUCCESS,
  FIELD_INFO_DETAIL_FAILED,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case FIELD_INFO_DETAIL:
      return { ...state, loading: true };
    case FIELD_INFO_DETAIL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FIELD_INFO_DETAIL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
