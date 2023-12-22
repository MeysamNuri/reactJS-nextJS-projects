import {
  DRAFT_PERSONAL_INFO,
  DRAFT_PERSONAL_INFO_SUCCESS,
  DRAFT_PERSONAL_INFO__FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const getNewDraftId = () => async (
  dispatch: any,
  draftId: number,
  personalInfo: any
) => {
  try {
    dispatch({
      type: DRAFT_PERSONAL_INFO,
      payload: { draftId, personalInfo },
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/personal-info`,
      personalInfo
    );
    dispatch({
      type: DRAFT_PERSONAL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DRAFT_PERSONAL_INFO__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
