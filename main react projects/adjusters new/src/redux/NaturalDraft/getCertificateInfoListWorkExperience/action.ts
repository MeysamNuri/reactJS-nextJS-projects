//redux
import {
  GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL,
  GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_SUCCESS,
  GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getCertificateInfoListDraft = (
  draftId: number,
  workId: string
) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/work-experience/${workId}/certificate-info-list`
    );

    dispatch({
      type: GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_SUCCESS,
      payload: data,
      workId: workId,
    });
  } catch (error: any) {
    dispatch({
      type: GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCertificateInfoListEdit = (
  gotIdForMainEdit: number,
  workId: string
) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL });
    const { data } = await apiRegistrationToken.get(
      `applicant/work-experience/${workId}/certificate-info-list?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_SUCCESS,
      payload: data,
      workId: workId,
    });
  } catch (error: any) {
    dispatch({
      type: GET_CERTIFICATE_INFO_LIST_WORK_EXPERIENCE_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
