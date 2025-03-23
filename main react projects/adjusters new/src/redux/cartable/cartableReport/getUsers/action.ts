import {
  GET_USERS_FOR_CARTABLE_REPORT,
  GET_USERS_FOR_CARTABLE_REPORT_SUCCESS,
  GET_USERS_FOR_CARTABLE_REPORT_FAILED,
} from "../../../../constant/cartableActionTypes";
import { messageError, messageSuccess } from "../../../../utils/utils";

import { api } from "../../../../httpServices/service";

export const getUsersForCartableReport = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_USERS_FOR_CARTABLE_REPORT });

    const { data } = await api.get(`/user-list`);

    if (data.IsSucceed === true) {
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: GET_USERS_FOR_CARTABLE_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_USERS_FOR_CARTABLE_REPORT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
