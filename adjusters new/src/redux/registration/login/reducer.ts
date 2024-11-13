import {
  REGISTRATION_LOGIN,
  REGISTRATION_LOGIN_SUCCESS,
  REGISTRATION_LOGIN_FAILED,
} from "../../../constant/actionTypes";
const INIT_STATE = {
  loading: false,
  registrationLogin: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REGISTRATION_LOGIN:
      return { ...state, loading: true };
    case REGISTRATION_LOGIN_SUCCESS:
      return { ...state, loading: false, registrationLogin: action.payload };
    case REGISTRATION_LOGIN_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
