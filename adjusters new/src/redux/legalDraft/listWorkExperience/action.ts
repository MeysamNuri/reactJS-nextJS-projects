//libraries
import { toast } from "react-toastify";

//redux
import {
  LIST_LEGAL_DRAFT_WORK_EXPERIENCE,
  LIST_LEGAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  LIST_LEGAL_DRAFT_WORK_EXPERIENCE_FAILD,
} from "../../../constant/legalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const fetchBoarMemberListLegalDraft = (
  legalDraftId: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/board-member-list`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      successFunction();
    } else {
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
  } catch (error: any) {
    dispatch({
      type: LIST_LEGAL_DRAFT_WORK_EXPERIENCE_FAILD,
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

export const fetchBoardMemberListLegalEdit = (
  gotIdForMainEdit: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/legal/board-member-list`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      toast.error("خطا در خواندن اطلاعات", {
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
      type: LIST_LEGAL_DRAFT_WORK_EXPERIENCE_FAILD,
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
