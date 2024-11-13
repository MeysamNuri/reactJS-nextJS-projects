import {
    LEGAL_DRAFT_DOCUMENT,
    LEGAL_DRAFT_DOCUMENT_SUCCESS,
    LEGAL_DRAFT_DOCUMENT_FAILD,
  } from "../../../constant/legalActionTypes";
   
  const INIT_STATE = {
    loading: false,
    workPlaces: null,
  };
  
  export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
      case LEGAL_DRAFT_DOCUMENT:
        return { ...state, loading: true };
      case LEGAL_DRAFT_DOCUMENT_SUCCESS:
        return { ...state, loading: false, workPlaces: action.payload };
      case LEGAL_DRAFT_DOCUMENT_FAILD:
        return { ...state, loading: false, error: action.payload };
      default:
        return { ...state };
    }
  };
  