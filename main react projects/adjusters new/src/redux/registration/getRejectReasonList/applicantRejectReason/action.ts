//redux
import {
  APPLICANT_REJECT_REASON,
  APPLICANT_REJECT_REASON_SUCCESS,
  APPLICANT_REJECT_REASON_FAILED,
} from "../../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../../httpServices/service";

export const getapplicantRejectReason = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: APPLICANT_REJECT_REASON });
    const { data } = await apiRegistrationToken.get(
      `applicant/${applicantId}/reject-reason-list`
    );
    dispatch({
      type: APPLICANT_REJECT_REASON_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_REJECT_REASON_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
