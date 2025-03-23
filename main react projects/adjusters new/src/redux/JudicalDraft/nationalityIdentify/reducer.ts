import {
  JUDICAL_DRAFT_NATIONAL_IDENTIFY,
  JUDICAL_DRAFT_NATIONAL_IDENTIFY_SUCCESS,
  JUDICAL_DRAFT_NATIONAL_IDENTIFY_FAILD,
} from "../../../constant/judicalActionTypes";
   
  const INIT_STATE = {
    loading: false,
    judicalNationalityIdentity: null,
  };
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case JUDICAL_DRAFT_NATIONAL_IDENTIFY:
        return { ...state, loading: true };
      case JUDICAL_DRAFT_NATIONAL_IDENTIFY_SUCCESS:
        return { ...state, loading: false, judicalNationalityIdentity: action.payload };
      case JUDICAL_DRAFT_NATIONAL_IDENTIFY_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  