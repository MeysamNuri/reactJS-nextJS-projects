import {
  STATUS_LIST,
  STATUS_LIST_SUCCESS,
  STATUS_LIST_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";

//لیست وضعیت ها
export const fetchStatusLst = () => async (dispatch: any) => {
  try {
    dispatch({
      type: STATUS_LIST,
    });
    const { data } = await api.get(`/applicant-state/list`);
    dispatch({
      type: STATUS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: STATUS_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
