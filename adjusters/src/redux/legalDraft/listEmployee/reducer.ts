import {
    LIST_LEGAL_DRAFT_EMPLOYEE,
    LIST_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
    LIST_LEGAL_DRAFT_EMPLOYEE_FAILD,
  } from "../../../constant/legalActionTypes";
  
  const INIT_STATE = {
    loading: false,
    listEmploeeLegal: [],
  };
  
  export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
      case LIST_LEGAL_DRAFT_EMPLOYEE:
        return { ...state, loading: true };
      case LIST_LEGAL_DRAFT_EMPLOYEE_SUCCESS:
        return { ...state, loading: false, listEmploeeLegal: action.payload };
      case LIST_LEGAL_DRAFT_EMPLOYEE_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  