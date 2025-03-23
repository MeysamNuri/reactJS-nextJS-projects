import {
  NATURAL_DRAFT_FEILD_INFO,
  NATURAL_DRAFT_FEILD_INFO_SUCCESS,
  NATURAL_DRAFT_FEILD_INFO_FAILD,
  NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO,
  NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_SUCCESS,
  NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_FAILED,
  NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO,
  NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS,
  NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED,
  GET_NATURAL_DRAFT_FIELD_INFO,
  GET_NATURAL_DRAFT_FIELD_INFO_SUCCESS,
  GET_NATURAL_DRAFT_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  feildInfo: null,
  subFieldInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_FEILD_INFO:
      return { ...state, loading: true };
    case NATURAL_DRAFT_FEILD_INFO_SUCCESS:
      return { ...state, loading: false, feildInfo: action.payload };
    case NATURAL_DRAFT_FEILD_INFO_FAILD:
      return { ...state, loading: false, error: action.payload };
    case NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO:
      return { ...state, loading: true };
    case NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_SUCCESS:
      return { ...state, loading: false, feildInfo: action.payload };
    case NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };
    case NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO:
      return { ...state, loading: true };
    case NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS:
      return { ...state, loading: false, subFieldInfo: action.payload };
    case NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_NATURAL_DRAFT_FIELD_INFO:
      return { ...state, loading: true };
    case GET_NATURAL_DRAFT_FIELD_INFO_SUCCESS:
      return { ...state, loading: false, fieldInfoDataDraft: action.payload };
    case GET_NATURAL_DRAFT_FIELD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
