import {
  CREATE_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILD,
  MESSAGE_GET_GRID,
  MESSAGE_GET_GRID_SUCCESS,
  MESSAGE_GET_GRID_FAILD,
  MY_MESSAGE_GET_GRID,
  MY_MESSAGE_GET_GRID_SUCCESS,
  MY_MESSAGE_GET_GRID_FAILD
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";


export const addcreateMessage = (message:any,s1:any,s2:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: CREATE_MESSAGE,
    });
    const { data } = await api.post(`/Message`,message);
    if (data.IsSucceed) {
      s1()
      s2()
      dispatch({
        type: CREATE_MESSAGE_SUCCESS,
        payload: data,
      });
    } 
  } catch (error: any) {
    dispatch({
      type: CREATE_MESSAGE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// لیست پیامها
export const fetchMessageGrid = (message:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: MESSAGE_GET_GRID,
    });
    const { data } = await api.post(`/Message/GetForGrid`,message);
    if (data.IsSucceed) {
      dispatch({
        type: MESSAGE_GET_GRID_SUCCESS,
        payload: data,
      });
    } 
  } catch (error: any) {
    dispatch({
      type: MESSAGE_GET_GRID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// لیست پیامهای من
export const fetchMyMessageGrid = (message:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: MY_MESSAGE_GET_GRID,
    });
    const { data } = await api.post(`/Message/GetMyMessageForGrid`,message);
    if (data.IsSucceed) {
      dispatch({
        type: MY_MESSAGE_GET_GRID_SUCCESS,
        payload: data,
      });
    } 
  } catch (error: any) {
    dispatch({
      type: MY_MESSAGE_GET_GRID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};