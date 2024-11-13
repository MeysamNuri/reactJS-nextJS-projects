import {
  JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO,
  JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS,
  JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  subFields: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO:
      return { ...state, loading: true };
    case JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS:
      return { ...state, loading: false, subFields: action.payload };
    case JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
