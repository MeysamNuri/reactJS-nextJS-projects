import {
  ALL_DRAFT_NATURAL_FAMILY_MEMBER,
  ALL_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
  ALL_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const getAllFamilyMember = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ALL_DRAFT_NATURAL_FAMILY_MEMBER,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/family-member`
    );
    dispatch({
      type: ALL_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ALL_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllFamilyMemberEdit = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ALL_DRAFT_NATURAL_FAMILY_MEMBER,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/natural/family-member`
    );
    dispatch({
      type: ALL_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ALL_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
