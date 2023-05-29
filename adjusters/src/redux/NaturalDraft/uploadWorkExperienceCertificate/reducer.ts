import {
  UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  uploadWorkExperienceCertificate: [],
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE:
      return { ...state, loading: true };
    case UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadWorkExperienceCertificate: action.payload,
      };
    case UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
