import {
  GET_FIELD_INFO_DRAFT,
  GET_FIELD_INFO_DRAFT_SUCCESS,
  GET_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  data: null,
}; 

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_FIELD_INFO_DRAFT:
      return { ...state, loading: true };
    case GET_FIELD_INFO_DRAFT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_FIELD_INFO_DRAFT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
