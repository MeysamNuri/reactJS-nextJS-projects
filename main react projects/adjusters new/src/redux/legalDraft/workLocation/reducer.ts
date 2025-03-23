import {
    LEGAL_DRAFT_WORK_LOCATION_INFO,
    LEGAL_DRAFT_WORK_LOCATION_INFO_SUCCESS,
    LEGAL_DRAFT_WORK_LOCATION_INFO_FAILD
  } from '../../../constant/legalActionTypes';
  
  const INIT_STATE = {
    loading: false,
    workLocation: null,
  };
 
  export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
      case LEGAL_DRAFT_WORK_LOCATION_INFO:
        return { ...state, loading: true };
      case LEGAL_DRAFT_WORK_LOCATION_INFO_SUCCESS:
        return { ...state, loading: false, workLocation: action.payload };
      case LEGAL_DRAFT_WORK_LOCATION_INFO_FAILD:
        return { ...state, loading: false, error: action.payload };
      default:
        return { ...state };
    }
  };