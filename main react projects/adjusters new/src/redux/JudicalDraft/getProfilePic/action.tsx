import {
  GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
  GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const getJudicalProfilePicDraft = (draftId?: Number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
    });

    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/judicial/profile-pic`
    );
    dispatch({
      type: GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getJudicalProfilePicEdit = (draftId?: Number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
    });

    const { data } = await apiRegistrationToken.get(
      `/registration/${draftId}/judicial/profile-pic`
    );
    dispatch({
      type: GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
