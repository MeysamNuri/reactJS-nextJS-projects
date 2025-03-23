import {
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  removeDoc: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_DOCUMENT:
      return { ...state, loading: true };
    case UPDATE_DOCUMENT_SUCCESS:
      return { ...state, loading: false, removeDoc: action.payload };
    case UPDATE_DOCUMENT_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
