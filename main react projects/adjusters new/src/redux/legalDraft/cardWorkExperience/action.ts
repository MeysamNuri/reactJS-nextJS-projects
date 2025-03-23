import {
  LEGAL_DRAFT_CARD_WORK_EXPERIENCE,
  LEGAL_DRAFT_CARD_WORK_EXPERIENCE_SUCCESS,
  LEGAL_DRAFT_CARD_WORK_EXPERIENCE_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const fetchCardWorkExperienceLegal = (legalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LEGAL_DRAFT_CARD_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/work-experience`
    );
    dispatch({
      type: LEGAL_DRAFT_CARD_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_CARD_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
