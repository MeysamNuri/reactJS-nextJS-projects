//redux
import {
  GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT,
  GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_SUCCESS,
  GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_FAILED,
} from "../../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../../httpServices/service";

export const getRejectReasonListApplicantDocument = (
  applicantId: number
) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT });
    const { data } = await apiRegistrationToken.get(
      `applicant-document/${applicantId}/reject-reason-list`
    );
    dispatch({
      type: GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: GET_REJECT_REASON_LIST_APPLICANT_DOCUMENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
