import {
  CHECK_PHONE_NUMBER,
  CHECK_PHONE_NUMBER_SUCCESS,
  CHECK_PHONE_NUMBER_FAILED,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  FORGET_REGISTRATION,
  FORGRT_REGISTRATION_SUCCESS,
  FORGET_REGISTRATION_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  checkPhoneNumber: "",
  register: "",
  loadingRegister: false,
  loadingForget:false,
  forgetPassWord: "",
}; 

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CHECK_PHONE_NUMBER:
      return { ...state, loading: true };
    case CHECK_PHONE_NUMBER_SUCCESS:
      return { ...state, loading: false, checkPhoneNumber: action.payload };
    case CHECK_PHONE_NUMBER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case REGISTRATION:
      return { ...state, loadingRegister: true };
    case REGISTRATION_SUCCESS:
      return { ...state, loadingRegister: false, register: action.payload };
    case REGISTRATION_FAILED:
      return { ...state, loadingRegister: false, error: action.payload };
    case FORGET_REGISTRATION:
      return { ...state, loadingForget: true };
    case FORGRT_REGISTRATION_SUCCESS:
      return { ...state, loadingForget: false, forgetPassWord: action.payload };
    case FORGET_REGISTRATION_FAILED:
      return { ...state, loadingForget: false, error: action.payload };

    default:
      return { ...state };
  }
};
