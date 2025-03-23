import {
  GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT,
  GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_SUCCESS,
  GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_FAILED,
} from "../../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  rejectReasonListApplicantDocument: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT:
      return { ...state, loading: true };
    case GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        rejectReasonListApplicantDocument: action.payload,
      };
    case GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
