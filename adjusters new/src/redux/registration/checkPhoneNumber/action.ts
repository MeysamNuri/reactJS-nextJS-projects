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

import { toast } from "react-toastify";
import { apiRegistrationToken } from "../../../httpServices/service";
import { IRegistration } from "../../../shared/ulitities/Model/login";

export const checkPhoneNumber = (
  mobileAndCaptcha: any,
  successFunction: () => void
) => async (dispatch: any) => { 
  try {
    dispatch({
      type: CHECK_PHONE_NUMBER,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/check-phone-number`,
      mobileAndCaptcha
    );
    if (data.IsSucceed) {
      successFunction();
    } else {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: CHECK_PHONE_NUMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: CHECK_PHONE_NUMBER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registrationHandler = (
  register: IRegistration,
  successFunction: () => void
  // successFunction2: () => void,
  // successFunction3: () => void,
  //  closeModal:()=>void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REGISTRATION,
    });
    const { data } = await apiRegistrationToken.post(`/registration`, register);
    if (data.IsSucceed) {
      localStorage.setItem("registrationToken", data.Result.Token);
      successFunction();
      // successFunction();
      // successFunction2();
      // successFunction3()
    } else {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    toast.error(" لاگین موفقیت آمیز نبود", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: REGISTRATION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// smart window login
export const smartWindowLogin = (
  requestBody:any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REGISTRATION,
    });
    const { data } = await apiRegistrationToken.post(
      `/SmartWindowLogin`,requestBody);
    if (data.IsSucceed) {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: data,
      });

      localStorage.setItem("registrationToken", data.Result.Token);
      successFunction()
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
        type: REGISTRATION_FAILED,
        payload: data.Message,
      });
    }
  } catch (error: any) {
    dispatch({
      type: REGISTRATION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//فراموشی رمز عبور
export const forgetRegistrationCode = (
  mobile: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: FORGET_REGISTRATION,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/tracking-code-recovery`,
      mobile
    );
    if (data.IsSucceed) {
      toast.success(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    } else {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: FORGRT_REGISTRATION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    toast.error("خطایی رخ داه است", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: FORGET_REGISTRATION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
