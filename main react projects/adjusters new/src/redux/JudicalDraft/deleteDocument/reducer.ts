import {
  REMOVE_DOCUMENTS_JUDICIAL,
  REMOVE_DOCUMENTS_JUDICIAL_SUCCESS,
  REMOVE_DOCUMENTS_JUDICIAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  deleteDocumentJudicial: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REMOVE_DOCUMENTS_JUDICIAL:
      return { ...state, loading: true };
    case REMOVE_DOCUMENTS_JUDICIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteDocumentJudicial: action.payload,
      };
    case REMOVE_DOCUMENTS_JUDICIAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
