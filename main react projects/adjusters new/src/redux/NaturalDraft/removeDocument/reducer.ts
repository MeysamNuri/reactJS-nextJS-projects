import {
  REMOVE_DOCUMENTS_NATURAL,
  REMOVE_DOCUMENTS_NATURAL_SUCCESS,
  REMOVE_DOCUMENTS_NATURAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  deleteDocumentNatural: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REMOVE_DOCUMENTS_NATURAL:
      return { ...state, loading: true };
    case REMOVE_DOCUMENTS_NATURAL_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteDocumentNatural: action.payload,
      };
    case REMOVE_DOCUMENTS_NATURAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
