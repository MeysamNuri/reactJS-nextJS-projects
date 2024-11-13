import {
  NATURAL_DRAFT_WORK_EXPERIENCE,
  NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  NATURAL_DRAFT_WORK_EXPERIENCE_FAILD
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  workExperience: null,
};
 
export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_WORK_EXPERIENCE:
      return { ...state, loading: true };
    case NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS:
      return { ...state, loading: false, workExperience: action.payload };
    case NATURAL_DRAFT_WORK_EXPERIENCE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
