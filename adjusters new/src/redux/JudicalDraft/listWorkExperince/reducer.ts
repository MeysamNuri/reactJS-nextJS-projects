import {
  LIST_JUDICAL_DRAFT_WORK_EXPERIENCE,
  LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
} from "../../../constant/judicalActionTypes";
 
const INIT_STATE = {
  loading: false,
  listJudicalWorkExperienceGuid: [],
};

export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case LIST_JUDICAL_DRAFT_WORK_EXPERIENCE:
      return { ...state, loading: true };
    case LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS:
      return { ...state, loading: false, listJudicalWorkExperienceGuid: action.payload };
    case LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
