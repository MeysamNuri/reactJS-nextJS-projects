//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_PATCH_BOARD_MEMBER,
  LEGAL_DRAFT_PATCH_BOARD_MEMBER_SUCCESS,
  LEGAL_DRAFT_PATCH_BOARD_MEMBER_FAILD,
} from "../../../constant/legalActionTypes";

import { IBoardMember } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const patchDraftBoardMemberLegal = (
  draftId: number,
  boardMember: IBoardMember,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_BOARD_MEMBER });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/board-member/${tempId}/update`,
      boardMember
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === false && data.ErrorType === -2) {
      toast.error("کد ملی با تاریخ تولد همخوانی ندارد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("اطلاعات به درستی ویرایش گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction();
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_PATCH_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const patchEditBoardMemberLegal = (
  gotIdForMainEdit: number,
  boardMember: IBoardMember,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_BOARD_MEMBER });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/legal/board-member/${tempId}/update`,
      boardMember
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === false && data.ErrorType === -2) {
      toast.error("کد ملی با تاریخ تولد همخوانی ندارد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("اطلاعات به درستی ویرایش گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction();
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_PATCH_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
