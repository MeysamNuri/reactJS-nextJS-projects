//redux
import {
  JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO,
  JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_SUCCESS,
  JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_FAILD,
} from "../../../constant/judicalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getWorkLocationInfoDraftJudical = (
  judicialDraftId: number
) => async (dispatch: any) => {
  try {
    dispatch({ type: JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${judicialDraftId}/judicial/work-location`
    );

    //console.log("experienceTempId MJ", experienceTempId);
    dispatch({
      type: JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWorkLocationInfoEditJudical = (
  gotIdForMainEdit: number,
  successFunction: (i: any) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/judicial/work-location`
    );
    if (data.IsSucceed === true) {
      successFunction(data.Result.ProvinceId);
    }
    dispatch({
      type: JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
