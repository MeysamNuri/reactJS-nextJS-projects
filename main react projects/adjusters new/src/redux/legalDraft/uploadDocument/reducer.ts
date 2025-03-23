import {
  UPLOAD_DOCUMENT_LEGAL,
  UPLOAD_DOCUMENT_LEGAL_SUCCESS,
  UPLOAD_DOCUMENT_LEGAL_FAILED,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  uploadDocumenLegal: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT_LEGAL:
      return { ...state, loading: true };
    case UPLOAD_DOCUMENT_LEGAL_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadDocumenLegal: action.payload,
      };
    case UPLOAD_DOCUMENT_LEGAL_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
