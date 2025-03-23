import {
  NATURAL_DRAFT_PERSONAL_INFO_GET,
  NATURAL_DRAFT_PERSONAL_INFO_GET_SUCCESS,
  NATURAL_DRAFT_PERSONAL_INFO_GET_FAILD,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  naturalDraftPersonalInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_PERSONAL_INFO_GET:
      return { ...state, loading: true };
    case NATURAL_DRAFT_PERSONAL_INFO_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        naturalDraftPersonalInfo: action.payload,
      };
    case NATURAL_DRAFT_PERSONAL_INFO_GET_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
