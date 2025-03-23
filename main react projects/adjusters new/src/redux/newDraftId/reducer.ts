import {
  DRAFT_NEWID,
  DRAFT_NEWID_SUCCESS,
  DRAFT_NEWID_FAILD,
} from "../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  newId: "",
  error: "",
  mobile: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DRAFT_NEWID:
      return { ...state, loading: true, mobile: action.mobileNumber };
    case DRAFT_NEWID_SUCCESS:
      return {
        ...state,
        loading: false,
        newId: action.payload,
        mobile: action.mobileNumber,
      };
    case DRAFT_NEWID_FAILD:
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
