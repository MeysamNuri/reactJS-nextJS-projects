import {
  DELETE_NATURAL_SUB_FIELD_INFO_EDIT,
  DELETE_NATURAL_SUB_FIELD_INFO_EDIT_SUCCESS,
  DELETE_NATURAL_SUB_FIELD_INFO_EDIT_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DELETE_NATURAL_SUB_FIELD_INFO_EDIT:
      return { ...state, loading: true };
    case DELETE_NATURAL_SUB_FIELD_INFO_EDIT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DELETE_NATURAL_SUB_FIELD_INFO_EDIT_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
