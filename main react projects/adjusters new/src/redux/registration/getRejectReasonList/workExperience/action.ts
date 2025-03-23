//redux
import {
  WORK_EXPERIENCE_REJECT_REASON,
  WORK_EXPERIENCE_REJECT_REASON_SUCCESS,
  WORK_EXPERIENCE_REJECT_REASON_FAILED,
} from "../../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../../httpServices/service";

export const getWorkExperienceRejectReason = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: WORK_EXPERIENCE_REJECT_REASON });
    const { data } = await apiRegistrationToken.get(
      `applicant/${applicantId}/work-experience/reject-reason-list`
    );
    dispatch({
      type: WORK_EXPERIENCE_REJECT_REASON_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: WORK_EXPERIENCE_REJECT_REASON_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
