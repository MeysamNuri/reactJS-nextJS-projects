//redux
import {
  LEGAL_DRAFT_WORK_LOCATION_GET_INFO,
  LEGAL_DRAFT_WORK_LOCATION_GET_INFO_SUCCESS,
  LEGAL_DRAFT_WORK_LOCATION_GET_INFO_FAILD,
} from "../../../constant/legalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getWorkLocationInfo = (legalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: LEGAL_DRAFT_WORK_LOCATION_GET_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/work-location`
    );

    dispatch({
      type: LEGAL_DRAFT_WORK_LOCATION_GET_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_WORK_LOCATION_GET_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWorkLocationInfoLegalEdit = (
  gotIdForMainEdit: number,
  successFunction: (i: any) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_WORK_LOCATION_GET_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/legal/work-location`
    );
    if (data?.IsSucceed === true) {
      successFunction(data?.Result[0]?.ProvinceId);
    }
    dispatch({
      type: LEGAL_DRAFT_WORK_LOCATION_GET_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_WORK_LOCATION_GET_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
