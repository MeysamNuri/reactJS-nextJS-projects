import {
  GET_APPLICANT_LAST_STATUS,
  GET_APPLICANT_LAST_STATUS_SUCCESS,
  GET_APPLICANT_LAST_STATUS_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  lastStatusMessage: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_APPLICANT_LAST_STATUS:
      return { ...state, loading: true };
    case GET_APPLICANT_LAST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        lastStatusMessage: action.payload,
      };
    case GET_APPLICANT_LAST_STATUS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
