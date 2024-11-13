import {
  SWAP_USERS_FROM_REPORT_TABLE,
  SWAP_USERS_FROM_REPORT_TABLE_SUCCESS,
  SWAP_USERS_FROM_REPORT_TABLE_FAILED,
} from "../../../../constant/cartableActionTypes";
import { messageError, messageSuccess } from "../../../../utils/utils";
import { api } from "../../../../httpServices/service";

export const postSwapUsers = (dataToPost: any, s1: any,s2:any) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: SWAP_USERS_FROM_REPORT_TABLE });
    const { data } = await api.post(`/admission/cartable/swap`, dataToPost);
    if (data.IsSucceed === true) {
      messageSuccess("عملیات ارجاع موفقیت آمیز بود");
      s1();
      s2()
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: SWAP_USERS_FROM_REPORT_TABLE_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: SWAP_USERS_FROM_REPORT_TABLE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
