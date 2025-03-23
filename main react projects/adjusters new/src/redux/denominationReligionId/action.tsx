import {
  DENOMINATION_RELIGION_ID,
  DENOMINATION_RELIGION_ID_SUCCESS,
  DENOMINATION_RELIGION_ID_FAILD,
} from "../../constant/actionTypes";
import { apiRegistrationToken } from "../../httpServices/service";

export const getDenomtionReligionId = (religionId: Number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DENOMINATION_RELIGION_ID,
    });

    const { data } = await apiRegistrationToken.get(
      `/registration/natural/base-info/denomination/${religionId}`
    );
    dispatch({
      type: DENOMINATION_RELIGION_ID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DENOMINATION_RELIGION_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
