import {
  ADD_INTERVIEW_TIME,
  ADD_INTERVIEW_TIME_SUCCESS,
  ADD_INTERVIEW_TIME_FAILD,
} from "../../constant/cartableActionTypes";
  
  const INIT_STATE = {
    loading: false,
    interviewTime: null,
  }; 
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case ADD_INTERVIEW_TIME:
        return { ...state, loading: true };
      case  ADD_INTERVIEW_TIME_SUCCESS:
        return { ...state, loading: false, interviewTime: action.payload };
      case ADD_INTERVIEW_TIME_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  