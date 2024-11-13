//redux
import {
  GET_SELECTED_FIELD_INFO_NATURAL,
  GET_SELECTED_FIELD_INFO_NATURAL_SUCCESS,
  GET_SELECTED_FIELD_INFO_NATURAL_FAILED,
} from "../../../constant/judicalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getSelectedFieldInfoJudicial = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_SELECTED_FIELD_INFO_NATURAL });
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/judicial/adjustment-field-info`
    );

    dispatch({
      type: GET_SELECTED_FIELD_INFO_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_SELECTED_FIELD_INFO_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
