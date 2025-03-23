import {
  ALL_JUDICAL_DRAFT_FAMILY_MEMBER,
  ALL_JUDICAL_DRAFT_FAMILY_MEMBER_SUCCESS,
  ALL_JUDICAL_DRAFT_FAMILY_MEMBER_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const fetchJudicalFamilyMemberDraft = (judicalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ALL_JUDICAL_DRAFT_FAMILY_MEMBER,
    });

    const { data } = await apiRegistrationToken.get(
      `registration/draft/${judicalDraftId}/judicial/family-member`
    );

    dispatch({
      type: ALL_JUDICAL_DRAFT_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ALL_JUDICAL_DRAFT_FAMILY_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchJudicalFamilyMemberEdit = (
  gotIdForMainEdit: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ALL_JUDICAL_DRAFT_FAMILY_MEMBER,
    });

    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/judicial/family-member`
    );

    dispatch({
      type: ALL_JUDICAL_DRAFT_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ALL_JUDICAL_DRAFT_FAMILY_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
