import {
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";
 
const INIT_STATE = {
  loading: false,
  listNaturalDraftWorkExpCertificate: [],
};

export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE:
      return { ...state, loading: true };
    case LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS:
      return { ...state, loading: false, listNaturalDraftWorkExpCertificate: action.payload };
    case LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
