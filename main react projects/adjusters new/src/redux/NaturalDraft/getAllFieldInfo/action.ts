//redux
import {
  GET_ADJUSTMENT_FIELD_INFO_NATURAL,
  GET_ADJUSTMENT_FIELD_INFO_NATURAL_SUCCESS,
  GET_ADJUSTMENT_FIELD_INFO_NATURAL_FAILED,
  ADJUSTMENT_FIELD_PARENT_LIST,
  ADJUSTMENT_FIELD_PARENT_LIST_SUCCESS,
  ADJUSTMENT_FIELD_PARENT_LIST_FAILD
} from "../../../constant/actionTypes";
import { apiRegistrationToken,api } from "../../../httpServices/service";



export const getAllFieldInfoNatural = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_ADJUSTMENT_FIELD_INFO_NATURAL });
    const { data } = await api.get(
      `adjustment-field/all/tree`
    );

    dispatch({
      type: GET_ADJUSTMENT_FIELD_INFO_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_ADJUSTMENT_FIELD_INFO_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//لیست رشته های تخصصی
export const fetchAllAdjustmentField = (adjustmentField:any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADJUSTMENT_FIELD_PARENT_LIST });
    const { data } = await api.post(
      `/adjustment-field/parent-list`,adjustmentField
    );

    dispatch({
      type: ADJUSTMENT_FIELD_PARENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ADJUSTMENT_FIELD_PARENT_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
