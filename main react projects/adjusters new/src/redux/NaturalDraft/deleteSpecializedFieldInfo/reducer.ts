import {
  DELETE_NATURAL_SPECIALIZED_FIELD_INFO,
  DELETE_NATURAL_SPECIALIZED_FIELD_INFO_SUCCESS,
  DELETE_NATURAL_SPECIALIZED_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  specializedFieldInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DELETE_NATURAL_SPECIALIZED_FIELD_INFO:
      return { ...state, loading: true };
    case DELETE_NATURAL_SPECIALIZED_FIELD_INFO_SUCCESS:
      return { ...state, loading: false, specializedFieldInfo: action.payload };
    case DELETE_NATURAL_SPECIALIZED_FIELD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
