//redux
import {
  GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL,
  GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_SUCCESS,
  GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_FAILED,
} from "../../../constant/judicalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getSubFieldBasedOnFieldJudicial = (field: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL });
    const { data } = await apiRegistrationToken.get(
      `/adjustment-field/child/${field}`
    );
    dispatch({
      type: GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_SUB_FIELD_BASED_ON_FIELD_JUDICIAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
