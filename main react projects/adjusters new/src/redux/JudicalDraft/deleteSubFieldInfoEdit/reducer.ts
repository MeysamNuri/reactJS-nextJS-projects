import {
  DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT,
  DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_SUCCESS,
  DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT:
      return { ...state, loading: true };
    case DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
