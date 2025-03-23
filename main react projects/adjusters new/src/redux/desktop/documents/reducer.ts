import { 
    DOCUMENT_LIST,
    DOCUMENT_LIST_SUCCESS,
    DOCUMENT_LIST_FAILD,
    // UPLOAD_DOCUMENT,
    // UPLOAD_DOCUMENT_SUCCESS,
    // UPLOAD_DOCUMENT_FAILD,
    SET_FILES
 } from "../../../constant/desktop";
  
  const INIT_STATE = {
    loading: false,
    documentList: null,
    listFiles:[]
  };
  
  export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
      case DOCUMENT_LIST:
        return { ...state, loading: true };
      case DOCUMENT_LIST_SUCCESS:
        return { ...state, loading: false, documentList: action.payload };
      case DOCUMENT_LIST_FAILD:
        return { ...state, loading: false, error: action.payload };
        case SET_FILES:
          return { ...state, loading: false, listFiles: action.payload };
  
      default:
        return { ...state };
    }
  };
  