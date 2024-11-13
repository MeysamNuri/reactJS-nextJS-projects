import {
  GET_ADJUSTMENT_FIELD_INFO_NATURAL,
  GET_ADJUSTMENT_FIELD_INFO_NATURAL_SUCCESS,
  GET_ADJUSTMENT_FIELD_INFO_NATURAL_FAILED,
  ADJUSTMENT_FIELD_PARENT_LIST,
  ADJUSTMENT_FIELD_PARENT_LIST_SUCCESS,
  ADJUSTMENT_FIELD_PARENT_LIST_FAILD
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  specializedField: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_ADJUSTMENT_FIELD_INFO_NATURAL:
      return { ...state, loading: true };
    case GET_ADJUSTMENT_FIELD_INFO_NATURAL_SUCCESS:
      return {
        ...state,
        loading: false,
        specializedField: action.payload,
      };
    case GET_ADJUSTMENT_FIELD_INFO_NATURAL_FAILED:
      return { ...state, loading: false, error: action.payload };
      

      case ADJUSTMENT_FIELD_PARENT_LIST:
        return { ...state, loading: true };
      case ADJUSTMENT_FIELD_PARENT_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          specializedField: action.payload,
        };
      case ADJUSTMENT_FIELD_PARENT_LIST_FAILD:
        return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
