import {
  INQUIRE_FIELD_INFO_DRAFT,
  INQUIRE_FIELD_INFO_DRAFT_SUCCESS,
  INQUIRE_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case INQUIRE_FIELD_INFO_DRAFT:
      return { ...state, loading: true };
    case INQUIRE_FIELD_INFO_DRAFT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case INQUIRE_FIELD_INFO_DRAFT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
