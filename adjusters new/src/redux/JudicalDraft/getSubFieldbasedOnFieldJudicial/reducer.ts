import {
  GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL,
  GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_SUCCESS,
  GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_FAILED,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  getSubFieldBasedOnFieldJudicial: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL:
      return { ...state, loading: true };
    case GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getSubFieldBasedOnFieldJudicial: action.payload,
      };
    case GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
