import {
  GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL,
  GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_SUCCESS,
  GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  getCertificateInfoListWorkExperienceNatural: null,
  workId: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL:
      return { ...state, loading: true };
    case GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getCertificateInfoListWorkExperienceNatural: action.payload,
        workId: action.workId,
      };
    case GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
