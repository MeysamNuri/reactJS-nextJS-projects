import {
  UPLOAD_DOCUMENTS_JUDICIAL,
  UPLOAD_DOCUMENTS_JUDICIAL_SUCCESS,
  UPLOAD_DOCUMENTS_JUDICIAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  uploadDocumentJudicial: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_DOCUMENTS_JUDICIAL:
      return { ...state, loading: true };
    case UPLOAD_DOCUMENTS_JUDICIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadDocumentJudicial: action.payload,
      };
    case UPLOAD_DOCUMENTS_JUDICIAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
