import {
  JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE,
  JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
  JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  data: null,
  loadingInquireJudical:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE:
      return { ...state, loadingInquireJudical: action.payload };
    case JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_SUCCESS:
      return { ...state, loadingInquireJudical: null, data: action.payload };
    case JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_FAILED:
      return { ...state, loadingInquireJudical: null, error: action.payload };

    default:
      return { ...state };
  }
};
