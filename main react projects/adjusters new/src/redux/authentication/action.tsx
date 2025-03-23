import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILD,
} from "../../constant/cartableActionTypes";
import { api } from "../../httpServices/service";
import { toast } from "react-toastify";

export const getUserRecognition = (
  user: any,
  successFunction: () => void,
  failedFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_LOGIN,
    });
    const { data } = await api.post(`/user-recognition`, user);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    if (data?.IsSucceed === true) {
      localStorage.setItem("userRecognition",data.Result.ApplicantId)
      localStorage.setItem("userRecognitionAdjusterType",data.Result.AdjusterType)
      successFunction();
    } else if (data?.IsSucceed === false) {
      toast.error(" خطا در دریافت نام کاربری", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      failedFunction();
    }
  } catch (error: any) {
    failedFunction();
    toast.error(" خطا در دریافت نام کاربری", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: USER_LOGIN_FAILD,
      payload:
        error.response && error.response?.data.status
          ? error.response?.data.status
          : error.response?.data.status,
    });
  }
};
