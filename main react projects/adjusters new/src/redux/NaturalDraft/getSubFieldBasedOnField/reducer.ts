import {
  GET_SUB_FIELD_BASED_ON_FIELD,
  GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS,
  GET_SUB_FIELD_BASED_ON_FIELD_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  getSubFieldBasedOnFieldNatural: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_SUB_FIELD_BASED_ON_FIELD:
      return { ...state, loading: true };
    case GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        getSubFieldBasedOnFieldNatural: action.payload,
      };
    case GET_SUB_FIELD_BASED_ON_FIELD_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
