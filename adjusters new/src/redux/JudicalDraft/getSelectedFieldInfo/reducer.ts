import {
  GET_SELECTED_FIELD_INFO_NATURAL,
  GET_SELECTED_FIELD_INFO_NATURAL_SUCCESS,
  GET_SELECTED_FIELD_INFO_NATURAL_FAILED,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_SELECTED_FIELD_INFO_NATURAL:
      return { ...state, loading: true };
    case GET_SELECTED_FIELD_INFO_NATURAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_SELECTED_FIELD_INFO_NATURAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
