import {
  USER_DESKTOP,
  USER_DESKTOP_SUCCESS,
  USER_DESKTOP_FAILD,

} from "../../../constant/desktop";


const INIT_STATE = {
  loadingUserDesktop: false,
  userDesktop:null
 
  
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case USER_DESKTOP:
      return { ...state, loadingUserDesktop: true };
    case USER_DESKTOP_SUCCESS:
      return { ...state, loadingUserDesktop: false, userDesktop: action.payload };
    case USER_DESKTOP_FAILD:
      return { ...state, loadingUserDesktop: false, error: action.payload };


    default:
      return { ...state };
  }
};
