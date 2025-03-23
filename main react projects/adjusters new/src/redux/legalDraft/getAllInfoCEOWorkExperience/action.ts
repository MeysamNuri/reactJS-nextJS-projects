//redux
import {
  LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO,
  LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_SUCCESS,
  LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_FAILD,
} from "../../../constant/legalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getAllInfoCEOWorkExperienceLegal = (
  legalDraftId: number,
  experienceTempId: any
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/work-experience/${experienceTempId}`
    );

    //console.log("experienceTempId MJ", experienceTempId);
    dispatch({
      type: LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllInfoCEOWorkExperienceLegalEdit = (
  gotIdForMainEdit: number,
  experienceTempId: any
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/legal/work-experience/${experienceTempId}`
    );

    //console.log("experienceTempId MJ", experienceTempId);
    dispatch({
      type: LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_CEO_WORK_EXPERIENCE_GET_ALL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
