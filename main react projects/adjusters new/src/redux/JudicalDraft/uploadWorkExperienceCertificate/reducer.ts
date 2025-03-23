import {
  UPLOAD_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  UPLOAD_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  UPLOAD_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD
} from "../../../constant/judicalActionTypes";


const INIT_STATE = {
  loading: false,
  listWorkExperienceCertificate: null,
}; 

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE:
      return { ...state, loading: true };
    case UPLOAD_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS:
      return { ...state, loading: false, listWorkExperienceCertificate: action.payload };
    case UPLOAD_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
