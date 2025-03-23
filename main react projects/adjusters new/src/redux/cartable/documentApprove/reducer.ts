import {
  DOCUMENT_APPROVE,
  DOCUMENT_APPROVE_SUCCESS,
  DOCUMENT_APPROVE_FAILD,
} from "../../../constant/cartableActionTypes";
  
  const INIT_STATE = {
    loading: false,
    listDocumentApprove: null,
  }; 
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case DOCUMENT_APPROVE:
        return { ...state, loading: true };
      case  DOCUMENT_APPROVE_SUCCESS:
        return { ...state, loading: false, listDocumentApprove: action.payload };
      case DOCUMENT_APPROVE_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  