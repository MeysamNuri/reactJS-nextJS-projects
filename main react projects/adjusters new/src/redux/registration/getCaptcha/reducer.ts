import {
  GET_CAPTCHA,
  GET_CAPTCHA_SUCCESS,
  GET_CAPTCHA_FAILED,
} from "../../../constant/actionTypes";
const INIT_STATE = {
  loading: false,
  captchaData: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_CAPTCHA:
      return { ...state, loading: true };
    case GET_CAPTCHA_SUCCESS:
      return { ...state, loading: false, captchaData: action.payload };
    case GET_CAPTCHA_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
