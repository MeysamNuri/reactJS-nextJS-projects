import {
  JUDICAL_DRAFT_DELET_FAMILY_MEMBER,
  JUDICAL_DRAFT_DELET_FAMILY_MEMBER_SUCCESS,
  JUDICAL_DRAFT_DELET_FAMILY_MEMBER_FAILD,
} from "../../../constant/judicalActionTypes";
  
  const INIT_STATE = {
    loading: false,
    judicalRemoveFamily: null,
  };
   
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case JUDICAL_DRAFT_DELET_FAMILY_MEMBER:
        return { ...state, loading: true };
      case JUDICAL_DRAFT_DELET_FAMILY_MEMBER_SUCCESS:
        return { ...state, loading: false, judicalRemoveFamily: action.payload };
      case JUDICAL_DRAFT_DELET_FAMILY_MEMBER_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  