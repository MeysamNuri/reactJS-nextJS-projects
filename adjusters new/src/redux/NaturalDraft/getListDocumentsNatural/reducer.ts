import {
  GET_LIST_DOCUMENTS_NATURAL,
  GET_LIST_DOCUMENTS_NATURAL_SUCCESS,
  GET_LIST_DOCUMENTS_NATURAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  getListDocumentNatural: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_LIST_DOCUMENTS_NATURAL:
      return { ...state, loading: true };
    case GET_LIST_DOCUMENTS_NATURAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getListDocumentNatural: action.payload,
      };
    case GET_LIST_DOCUMENTS_NATURAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
