//redux
import {
  GET_SUB_FIELD_BASED_ON_FIELD,
  GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS,
  GET_SUB_FIELD_BASED_ON_FIELD_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getSubFieldBasedOnFieldNatural = (field: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_SUB_FIELD_BASED_ON_FIELD });
    const { data } = await apiRegistrationToken.get(
      `/adjustment-field/child/${field}`
    );
    dispatch({
      type: GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_SUB_FIELD_BASED_ON_FIELD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
