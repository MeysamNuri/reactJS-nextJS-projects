import {
  PERSONAL_INFO,
  PERSONAL_INFO_FAILD,
  PERSONAL_INFO_SUCCESS,
} from "../../../constant/legalActionTypes";
import { api } from "../../../httpServices/service";

export const fetchPersonalInfo = (legalId:number) => async (dispatch: any) => {
  try {
    dispatch({
      type: PERSONAL_INFO,
    });

    const { data } = await api.get(
      `/applicant/${legalId}/personal-info`
    );
    dispatch({
      type: PERSONAL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: PERSONAL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
