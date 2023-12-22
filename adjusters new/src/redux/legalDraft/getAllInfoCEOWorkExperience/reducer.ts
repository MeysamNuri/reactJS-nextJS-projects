import {
  LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO,
  LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_SUCCESS,
  LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  CEOWorkExperienceRelatedInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO:
      return { ...state, loading: true };
    case LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        CEOWorkExperienceRelatedInfo: action.payload,
      };
    case LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
