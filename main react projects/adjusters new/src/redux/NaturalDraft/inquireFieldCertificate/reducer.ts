import {
  NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE,
  NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
  NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  feildCertificate: null,
  loadingInqiury:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE:
      return { ...state, loadingInqiury: action.payload };
    case NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS:
      return { ...state, loadingInqiury: null, certificate: action.payload };
    case NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD:
      return { ...state, loadingInqiury: null, error: action.payload };

    default:
      return { ...state };
  }
};
