import {
   DRAFT_NATURAL_FAMILY_MEMBER,
    DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
    DRAFT_FAMILY_MEMBER__FAILD,
  } from "../../../constant/actionTypes";
  
  const INIT_STATE = {
    loading: false,
    naturalFamilyMember: null,
  }; 
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case DRAFT_NATURAL_FAMILY_MEMBER:
        return { ...state, loading: true };
      case DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS:
        return { ...state, loading: false, naturalFamilyMember: action.payload };
      case DRAFT_FAMILY_MEMBER__FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  