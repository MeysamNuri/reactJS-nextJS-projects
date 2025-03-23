import {
    DRAFT_NATIONAL_IDENTIFY,
    DRAFT_NATIONAL_IDENTIFY_SUCCESS,
    DRAFT_NATIONAL_IDENTFTY__FAILD,
  } from "../../../constant/actionTypes";
   
  const INIT_STATE = {
    loading: false,
    nationalityIdentity: null,
  };
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case DRAFT_NATIONAL_IDENTIFY:
        return { ...state, loading: true };
      case DRAFT_NATIONAL_IDENTIFY_SUCCESS:
        return { ...state, loading: false, nationalityIdentity: action.payload };
      case DRAFT_NATIONAL_IDENTFTY__FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  