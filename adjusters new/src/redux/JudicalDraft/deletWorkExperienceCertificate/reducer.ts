import {
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/judicalActionTypes";
 
const INIT_STATE = {
  loading: false,
  removeJudicalDraftWorkExpCertificate: ""
}; 

export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE:
      return { ...state, loading: true };
    case DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS:
      return { ...state, loading: false, removeJudicalDraftWorkExpCertificate: action.payload };
    case DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
