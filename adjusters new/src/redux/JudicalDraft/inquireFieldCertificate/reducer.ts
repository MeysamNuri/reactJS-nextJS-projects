import {
  JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE,
  JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
  JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE:
      return { ...state, loading: true };
    case JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
