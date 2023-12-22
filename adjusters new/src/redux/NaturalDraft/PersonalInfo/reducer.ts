import {
  DRAFT_PERSONAL_INFO,
  DRAFT_PERSONAL_INFO_SUCCESS,
  DRAFT_PERSONAL_INFO__FAILD,
} from "../../../constant/actionTypes";
 
const INIT_STATE = {
  loading: false,
  pesonalInfo: null,
};

export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case DRAFT_PERSONAL_INFO:
      return { ...state, loading: true };
    case DRAFT_PERSONAL_INFO_SUCCESS:
      return { ...state, loading: false, pesonalInfo: action.payload };
    case DRAFT_PERSONAL_INFO__FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
