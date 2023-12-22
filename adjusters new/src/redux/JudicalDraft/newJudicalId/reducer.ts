import {
  JUDICAL_NEW_ID,
  JUDICAL_NEW_ID_SUCCESS,
  JUDICAL_NEW_ID_FAILD,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  newJudicalId: "",
  mobile: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICAL_NEW_ID:
      return { ...state, loading: true, mobile: action.mobileNumber };
    case JUDICAL_NEW_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        newJudicalId: action.payload,
        mobile: action.mobileNumber,
      };
    case JUDICAL_NEW_ID_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
        mobile: action.mobileNumber,
      };

    default:
      return { ...state };
  }
};
