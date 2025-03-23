import {
  GET_LIST_DOCUMENTS_JUDICIAL,
  GET_LIST_DOCUMENTS_JUDICIAL_SUCCESS,
  GET_LIST_DOCUMENTS_JUDICIAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  getListDocumentJudicial: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_LIST_DOCUMENTS_JUDICIAL:
      return { ...state, loading: true };
    case GET_LIST_DOCUMENTS_JUDICIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getListDocumentJudicial: action.payload,
      };
    case GET_LIST_DOCUMENTS_JUDICIAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
