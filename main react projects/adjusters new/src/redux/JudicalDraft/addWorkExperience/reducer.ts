import {
  JUDICAL_DRAFT_ADD_WORK_EXPERIENCE,
  JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_SUCCESS,
  JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_FAILD
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  judicalWorkExperience: null,
};
 
export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICAL_DRAFT_ADD_WORK_EXPERIENCE:
      return { ...state, loading: true };
    case JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_SUCCESS:
      return { ...state, loading: false, judicalWorkExperience: action.payload };
    case JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
