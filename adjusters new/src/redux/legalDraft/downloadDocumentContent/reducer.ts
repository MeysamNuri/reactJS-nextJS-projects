import {
  DOWNLOAD_DOCUMENT_LEGAL,
  DOWNLOAD_DOCUMENT_LEGAL_SUCCESS,
  DOWNLOAD_DOCUMENT_LEGAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  downloadDocument: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DOWNLOAD_DOCUMENT_LEGAL:
      return { ...state, loading: true };
    case DOWNLOAD_DOCUMENT_LEGAL_SUCCESS:
      return { ...state, loading: false, downloadDocument: action.payload };
    case DOWNLOAD_DOCUMENT_LEGAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};