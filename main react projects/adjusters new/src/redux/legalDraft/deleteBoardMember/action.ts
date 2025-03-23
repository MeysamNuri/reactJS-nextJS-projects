import {
  DELETE_LEGAL_DRAFT_BOARD_MEMBER,
  DELETE_LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
  DELETE_LEGAL_DRAFT_BOARD_MEMBER_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteLegalDraftCardBoardMemberAction = (
  legalDraftId: number,
  boardMemberTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_BOARD_MEMBER,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${legalDraftId}/legal/board-member/${boardMemberTempId}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("سابقه کار به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      success();
    }
  } catch (error: any) {
    dispatch({
      type: DELETE_LEGAL_DRAFT_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLegalCardBoardMemberActionEdit = (
  gotIdForMainEdit: number,
  boardMemberTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_BOARD_MEMBER,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/${gotIdForMainEdit}/legal/board-member/${boardMemberTempId}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("سابقه کار به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      success();
    } else {
      toast.error("خطا در حذف سابقه کار ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: DELETE_LEGAL_DRAFT_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
