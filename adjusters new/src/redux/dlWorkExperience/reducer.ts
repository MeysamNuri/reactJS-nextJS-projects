import {
  DOWNLOAD_WORK_EXPERIENCE,
  DOWNLOAD_WORK_EXPERIENCE_SUCCESS,
  DOWNLOAD_WORK_EXPERIENCE_FAILD,
} from "../../constant/cartableActionTypes";

  
  const INIT_STATE = {
    loading: false,
    dlWorkExperience: null,
  }; 
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case DOWNLOAD_WORK_EXPERIENCE:
        return { ...state, loading: true };
      case  DOWNLOAD_WORK_EXPERIENCE_SUCCESS:
        return { ...state, loading: false, dlWorkExperience: action.payload };
      case DOWNLOAD_WORK_EXPERIENCE_FAILD:
        return { ...state, loading: false, error: action.payload };
      default:
        return { ...state };
    }
  };
  