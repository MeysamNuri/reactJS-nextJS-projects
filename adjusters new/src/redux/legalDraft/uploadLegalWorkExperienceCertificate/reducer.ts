import {
  UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  listWorkExperienceCertificate: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE:
      return { ...state, loading: true };
    case UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        listWorkExperienceCertificate: action.payload,
      };
    case UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
