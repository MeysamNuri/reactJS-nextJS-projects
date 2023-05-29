import {
    LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE,
    LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_SUCCESS,
    LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_FAILD,
  } from "../../../constant/legalActionTypes";
   
  const INIT_STATE = {
    loading: false,
    listWorkExperienceLegal: [],
  };
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE:
        return { ...state, loading: true };
      case LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_SUCCESS:
        return { ...state, loading: false, listWorkExperienceLegal: action.payload };
      case LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  