import {
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const fechAllNDraftWorkExperienceCertificate = (
  draftId: number,
  guid: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/work-experience/${guid}/certificate-info-list`
    );
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
