import {
  INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT,
  INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_SUCCESS,
  INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  data: null,
  loadingInqureDraft:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT:
      return { ...state, loadingInqureDraft: action.payload };
    case INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_SUCCESS:
      return { ...state, loadingInqureDraft: null, data: action.payload };
    case INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_FAILED:
      return { ...state, loadingInqureDraft: null, error: action.payload };

    default:
      return { ...state };
  }
};
