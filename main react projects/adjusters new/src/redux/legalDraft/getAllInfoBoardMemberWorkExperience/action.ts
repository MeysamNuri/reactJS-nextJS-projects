//redux
import {
  LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO,
  LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO_SUCCESS,
  LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO_FAILD,
} from "../../../constant/legalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getAllInfoBoardMemberWorkExperienceLegal = (
  legalDraftId: number,
  id: any
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/board-member/${id}`
    );

    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllInfoBoardMemberWorkExperienceLegalEdit = (
  gotIdForMainEdit: number,
  id: any
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/legal/board-member/${id}`
    );

    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_GET_ALL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
