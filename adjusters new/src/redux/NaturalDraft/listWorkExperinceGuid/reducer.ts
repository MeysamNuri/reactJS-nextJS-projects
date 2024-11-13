import {
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_SUCCESS,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_FAILD,
} from "../../../constant/actionTypes";
 
const INIT_STATE = {
  loading: false,
  listWorkExperienceGuid: [],
};

export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID:
      return { ...state, loading: true };
    case LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_SUCCESS:
      return { ...state, loading: false, listWorkExperienceGuid: action.payload };
    case LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
