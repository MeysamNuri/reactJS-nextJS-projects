import {
  REGISTRATION_LOGIN,
  REGISTRATION_LOGIN_SUCCESS,
  REGISTRATION_LOGIN_FAILED,
} from "../../../constant/actionTypes";

import { toast } from "react-toastify";

import { apiRegistrationToken } from "../../../httpServices/service";

export const registrationLogin = (
  natioCodePhoneNumberCodeValidationCode: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REGISTRATION_LOGIN,
    });
    const { data } = await apiRegistrationToken.post(
      `login`,
      natioCodePhoneNumberCodeValidationCode
    );
    if (data.IsSucceed) {
      dispatch({
        type: REGISTRATION_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("registrationToken", data.Result.Token);
      successFunction();
    } else {
      toast.error(`${data.Message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: REGISTRATION_LOGIN_FAILED,
        payload: data.Message,
      });
    }
  } catch (error: any) {
    dispatch({
      type: REGISTRATION_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
