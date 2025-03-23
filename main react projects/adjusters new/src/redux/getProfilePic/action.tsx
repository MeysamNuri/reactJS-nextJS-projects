import {
  GET_DRAFT_PERSONAL_INFO_PIC,
  GET_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  GET_DRAFT_PERSONAL_INFO_PIC_FAILD,
} from "../../constant/actionTypes";
import { apiRegistrationToken } from "../../httpServices/service";

export const getProfilePicDraftNatural = (draftId?: Number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: GET_DRAFT_PERSONAL_INFO_PIC,
    });

    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/natural/profile-pic`
    );
    dispatch({
      type: GET_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_DRAFT_PERSONAL_INFO_PIC_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProfilePicEditNatural = (gotIdForMainEdit?: Number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: GET_DRAFT_PERSONAL_INFO_PIC,
    });

    const { data } = await apiRegistrationToken.get(
      `/registration/${gotIdForMainEdit}/natural/profile-pic`
    );
    dispatch({
      type: GET_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_DRAFT_PERSONAL_INFO_PIC_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
