import {
  LEGAL_NEWID,
  LEGAL_NEWID_SUCCESS,
  LEGAL_NEWID_FAILD,
} from "../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  newLegalId: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_NEWID:
      return { ...state, loading: true };
    case LEGAL_NEWID_SUCCESS:
      return { ...state, loading: false, newLegalId: action.payload };
    case LEGAL_NEWID_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
