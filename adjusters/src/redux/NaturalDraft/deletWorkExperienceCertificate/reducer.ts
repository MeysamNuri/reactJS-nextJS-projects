import {
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";
 
const INIT_STATE = {
  loading: false,
  removeNaturalDraftWorkExpCertificate: ""
}; 

export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case DELET_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE:
      return { ...state, loading: true };
    case DELET_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS:
      return { ...state, loading: false, removeNaturalDraftWorkExpCertificate: action.payload };
    case DELET_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
