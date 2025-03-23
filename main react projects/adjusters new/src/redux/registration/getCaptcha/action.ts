import {
  GET_CAPTCHA,
  GET_CAPTCHA_SUCCESS,
  GET_CAPTCHA_FAILED,
} from "../../../constant/actionTypes";

import { apiWithoutToken } from "../../../httpServices/service";

export const getCaptcha = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_CAPTCHA,
    });
    const { data } = await apiWithoutToken.get(`registration/captcha`);

    if (data?.IsSucceed) {
      dispatch({
        type: GET_CAPTCHA_SUCCESS,
        payload: data,
      });
    }
  } catch (error: any) {
    dispatch({
      type: GET_CAPTCHA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
