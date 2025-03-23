import {
  APPLICANT_REJECT_REASON,
  APPLICANT_REJECT_REASON_SUCCESS,
  APPLICANT_REJECT_REASON_FAILED,
} from "../../../../constant/actionTypes";

const INIT_STATE = {
  loadingRejectReason: false,
  rejectReason: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case APPLICANT_REJECT_REASON:
      return { ...state, loadingRejectReason: true };
    case APPLICANT_REJECT_REASON_SUCCESS:
      return {
        ...state,
        loadingRejectReason: false,
        rejectReason: action.payload,
      };
    case APPLICANT_REJECT_REASON_FAILED:
      return { ...state, loadingRejectReason: false, error: action.payload };
    default:
      return { ...state };
  }
};
