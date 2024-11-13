import {
  GET_HOLIDAY_LIST,
  GET_HOLIDAY_LIST_SUCCESS,
  GET_HOLIDAY_LIST_FAILD,
} from "../../constant/commonTypes";

import { api } from "../../httpServices/service";

export const getListHoliday = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_HOLIDAY_LIST,
    });
    const { data } = await api.get(`/holiday/list`);
    dispatch({
      type: GET_HOLIDAY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_HOLIDAY_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
