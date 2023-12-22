import {
  GET_DOCUMENTS_LEGAL,
  GET_DOCUMENTS_LEGAL_SUCCESS,
  GET_DOCUMENTS_LEGAL_FAILED,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  getDocuments: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_DOCUMENTS_LEGAL:
      return { ...state, loading: true };
    case GET_DOCUMENTS_LEGAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getDocuments: action.payload,
      };
    case GET_DOCUMENTS_LEGAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
