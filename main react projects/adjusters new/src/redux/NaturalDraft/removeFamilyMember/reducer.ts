import {
    DELET_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
    DELET_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
    DELET_DRAFT_NATURAL_FAMILY_MEMBER,
  } from "../../../constant/actionTypes";
  
  const INIT_STATE = {
    loading: false,
    removeFamily: null,
  };
   
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case DELET_DRAFT_NATURAL_FAMILY_MEMBER:
        return { ...state, loading: true };
      case DELET_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS:
        return { ...state, loading: false, removeFamily: action.payload };
      case DELET_DRAFT_NATURAL_FAMILY_MEMBER__FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  