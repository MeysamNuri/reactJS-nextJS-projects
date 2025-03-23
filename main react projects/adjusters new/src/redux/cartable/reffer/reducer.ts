import {
  CARTABLE_REFER,
  CARTABLE_REFER_SUCCESS,
  CARTABLE_REFER_FAILD,
} from "../../../constant/cartableActionTypes";
  
  const INIT_STATE = {
    loading: false,
    listReffer: null,
  }; 
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case CARTABLE_REFER:
        return { ...state, loading: true };
      case  CARTABLE_REFER_SUCCESS:
        return { ...state, loading: false, listReffer: action.payload };
      case CARTABLE_REFER_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  