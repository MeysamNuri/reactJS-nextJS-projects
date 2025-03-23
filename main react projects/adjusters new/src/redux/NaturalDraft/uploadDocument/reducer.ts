import {
  UPLOAD_DOCUMENTS_NATURAL,
  UPLOAD_DOCUMENTS_NATURAL_SUCCESS,
  UPLOAD_DOCUMENTS_NATURAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  uploadDocumentNatural: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_DOCUMENTS_NATURAL:
      return { ...state, loading: true };
    case UPLOAD_DOCUMENTS_NATURAL_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadDocumentNatural: action.payload,
      };
    case UPLOAD_DOCUMENTS_NATURAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
