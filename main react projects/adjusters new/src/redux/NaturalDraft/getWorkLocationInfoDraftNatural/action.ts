//redux
import {
  NATURAL_DRAFT_WORK_LOCATION_GET,
  NATURAL_DRAFT_WORK_LOCATION_GET_SUCCESS,
  NATURAL_DRAFT_WORK_LOCATION_GET_FAILD,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getWorkLocationInfoNaturalDraft = (
  draftId: number,
  successFunction: (i: number) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: NATURAL_DRAFT_WORK_LOCATION_GET });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/work-location/`
    );
    if (data?.IsSucceed === true) {
      successFunction(data?.Result?.ProvinceId);
    }
    dispatch({
      type: NATURAL_DRAFT_WORK_LOCATION_GET_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_WORK_LOCATION_GET_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWorkLocationInfoNaturalEdit = (
  gotIdForMainEdit: number,
  successFunction: (i: any) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: NATURAL_DRAFT_WORK_LOCATION_GET });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/natural/work-location/`
    );
    if (data.IsSucceed === true) {
      successFunction(data.Result.ProvinceId);
    }
    dispatch({
      type: NATURAL_DRAFT_WORK_LOCATION_GET_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_WORK_LOCATION_GET_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
