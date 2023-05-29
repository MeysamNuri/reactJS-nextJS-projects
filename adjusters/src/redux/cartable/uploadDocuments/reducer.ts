import {
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  uploadDoc: null,
  selectedDocumentList:[]
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT:
      return { ...state, loading: true };
    case UPLOAD_DOCUMENT_SUCCESS:
      return { ...state, loading: false, uploadDoc: action.payload };
    case UPLOAD_DOCUMENT_FAILD:
      return { ...state, loading: false, error: action.payload };
    case 'SELECT_DOCUMENTS':
      return { ...state, selectedDocumentList: action.payload };

    default:
      return { ...state };
  }
};
