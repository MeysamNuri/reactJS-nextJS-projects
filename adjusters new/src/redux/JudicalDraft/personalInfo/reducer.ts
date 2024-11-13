import {
  JUDICAL_DRAFT_PERSONAL_INFO,
  JUDICAL_DRAFT_PERSONAL_INFO_SUCCESS,
  JUDICAL_DRAFT_PERSONAL_INFO_FAILD,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  judicalPesonalInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICAL_DRAFT_PERSONAL_INFO:
      return { ...state, loading: true };
    case JUDICAL_DRAFT_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        judicalPesonalInfo: action.payload,
      };
    case JUDICAL_DRAFT_PERSONAL_INFO_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
