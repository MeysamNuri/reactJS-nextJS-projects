import {
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_SUCCESS,
  LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const fetchWorkExperienceDraft = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/work-experience-list`
    );
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchWorkExperienceEdit = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID,
    });
    const { data } = await apiRegistrationToken.get(
      `applicant/work-experience-list?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_NATURAL_DRAFT_WORK_EXPERIENCE_GUID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
