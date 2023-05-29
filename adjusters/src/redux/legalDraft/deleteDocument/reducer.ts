import {
  DELETE_LEGAL_DOCUMENT,
  DELETE_LEGAL_DOCUMENT_SUCCESS,
  DELETE_LEGAL_DOCUMENT_FAILED,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  deleteLegalDocument: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DELETE_LEGAL_DOCUMENT:
      return { ...state, loading: true };
    case DELETE_LEGAL_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteLegalDocument: action.payload,
      };
    case DELETE_LEGAL_DOCUMENT_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
