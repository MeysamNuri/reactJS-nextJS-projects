import {
  GET_ALL_ADJUSTER_TYPE,
  GET_ALL_ADJUSTER_TYPE_SUCCESS,
  GET_ALL_ADJUSTER_TYPE_FAILED,
} from "../../../constant/actionTypes";

import { toast } from "react-toastify";

import { apiWithoutToken } from "../../../httpServices/service";

export const getAllAdjusterType = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_ALL_ADJUSTER_TYPE,
    });
    const { data } = await apiWithoutToken.get(`adjuster-type/all`);
    if (data.IsSucceed) {
      dispatch({
        type: GET_ALL_ADJUSTER_TYPE_SUCCESS,
        payload: data,
      });
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
        type: GET_ALL_ADJUSTER_TYPE_FAILED,
        payload: data.Message,
      });
    }
  } catch (error: any) {
    dispatch({
      type: GET_ALL_ADJUSTER_TYPE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
