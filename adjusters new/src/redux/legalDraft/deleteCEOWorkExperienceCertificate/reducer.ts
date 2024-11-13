import {
  DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  removeLegalDraftWorkExpCertificate: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE:
      return { ...state, loading: true };
    case DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        removeJudicalDraftWorkExpCertificate: action.payload,
      };
    case DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
