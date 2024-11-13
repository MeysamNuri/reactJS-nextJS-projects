import {
  HISTORY_DOCUMENT,
  HISTORY_DOCUMENT_SUCCESS,
  HISTORY_DOCUMENT_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  historyDocument: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case HISTORY_DOCUMENT:
      return { historyDocument:null, loading: true };
    case HISTORY_DOCUMENT_SUCCESS:
      return { ...state, loading: false, historyDocument: action.payload };
    case HISTORY_DOCUMENT_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
