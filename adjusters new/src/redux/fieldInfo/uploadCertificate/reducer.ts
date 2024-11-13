import {
  UPLOAD_FIELD_INFO_CERTIFICATE_DRAFT,
  UPLOAD_FIELD_INFO_CERTIFICATE_DRAFT_SUCCESS,
  UPLOAD_FIELD_INFO_CERTIFICATE_DRAFT_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_FIELD_INFO_CERTIFICATE_DRAFT:
      return { ...state, loading: true };
    case UPLOAD_FIELD_INFO_CERTIFICATE_DRAFT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case UPLOAD_FIELD_INFO_CERTIFICATE_DRAFT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
