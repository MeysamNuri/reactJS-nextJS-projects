import {
  POST_APPLICANT_FIELD_INFO_FIELD_INFO,
  POST_APPLICANT_FIELD_INFO_FIELD_INFO_SUCCESS,
  POST_APPLICANT_FIELD_INFO_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  specializedFieldInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case POST_APPLICANT_FIELD_INFO_FIELD_INFO:
      return { ...state, loading: true };
    case POST_APPLICANT_FIELD_INFO_FIELD_INFO_SUCCESS:
      return { ...state, loading: false, specializedFieldInfo: action.payload };
    case POST_APPLICANT_FIELD_INFO_FIELD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
