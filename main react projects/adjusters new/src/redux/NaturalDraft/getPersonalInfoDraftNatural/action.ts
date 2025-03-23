//redux
import {
  NATURAL_DRAFT_PERSONAL_INFO_GET,
  NATURAL_DRAFT_PERSONAL_INFO_GET_SUCCESS,
  NATURAL_DRAFT_PERSONAL_INFO_GET_FAILD,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getPersonalInfoNaturalDraft = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: NATURAL_DRAFT_PERSONAL_INFO_GET });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/personal-info/`
    );
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO_GET_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO_GET_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPersonalInfoNaturalEdit = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: NATURAL_DRAFT_PERSONAL_INFO_GET });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/natural/personal-info/`
    );
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO_GET_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO_GET_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
