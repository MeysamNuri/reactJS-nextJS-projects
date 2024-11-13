import {
  LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE,
  LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_SUCCESS,
  LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  relatedCEOWorkExperienceInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE:
      return { ...state, loading: true };
    case LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        relatedCEOWorkExperienceInfo: action.payload,
      };
    case LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};