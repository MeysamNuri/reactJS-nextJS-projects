//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_BOARD_MEMBER,
  LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
  LEGAL_DRAFT_BOARD_MEMBER_FAILD,
} from "../../../constant/legalActionTypes";

import { IBoardMember } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const sendBoardMemberDraft = (
  draftId: number,
  boardMember: IBoardMember,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_BOARD_MEMBER });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/board-member`,
      boardMember
    );
    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === false) {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setTimeout(() => {
      success();
    }, 10);
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(`خطای ${error?.response?.status} در اضافه کردن اطلاعات`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const sendBoardMemberEdit = (
  gotIdForMainEdit: number,
  boardMember: IBoardMember,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_BOARD_MEMBER });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/legal/board-member`,
      boardMember
    );
    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === false) {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setTimeout(() => {
      success();
    }, 10);
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(`خطای ${error?.response?.status} در اضافه کردن اطلاعات`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
