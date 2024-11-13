import {
  NATURAL_DRAFT_INQUIRE_CERTIFICATE_SUCCESS,
  NATURAL_DRAFT_INQUIRE_CERTIFICATE,
  NATURAL_DRAFT_INQUIRE_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  certificate: null,
};
 
export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_INQUIRE_CERTIFICATE:
      return { ...state, loading: true };
    case NATURAL_DRAFT_INQUIRE_CERTIFICATE_SUCCESS:
      return { ...state, loading: false, certificate: action.payload };
    case NATURAL_DRAFT_INQUIRE_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
