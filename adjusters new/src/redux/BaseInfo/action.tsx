import {
  BASE_INFO,
  BASE_INFO_SUCCESS,
  BASE_INFO_FAILD,
} from "../../constant/actionTypes";
import { apiWithoutToken } from "../../httpServices/service";

export const getBaseInfo = () => async (dispatch: any) => {
  try {
    dispatch({
      type: BASE_INFO,
    });

    const { data } = await apiWithoutToken.get(
      `/registration/natural/base-info`
    );
    dispatch({
      type: BASE_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BASE_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


