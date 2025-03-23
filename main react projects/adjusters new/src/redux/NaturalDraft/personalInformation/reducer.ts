import {
  NATURAL_DRAFT_PERSONAL_INFO,
  NATURAL_DRAFT_PERSONAL_INFO_SUCCESS,
  NATURAL_DRAFT_PERSONAL_INFO_FAILD,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  persoanlInfo: null,
}; 

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_PERSONAL_INFO:
      return { ...state, loading: true };
    case NATURAL_DRAFT_PERSONAL_INFO_SUCCESS:
      return { ...state, loading: false, persoanlInfo: action.payload };
    case NATURAL_DRAFT_PERSONAL_INFO_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
