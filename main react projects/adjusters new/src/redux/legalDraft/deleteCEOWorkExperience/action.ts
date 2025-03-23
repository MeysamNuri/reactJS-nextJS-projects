import {
  DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY,
  DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY_SUCCESS,
  DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteLegalDraftCardCEOWorkExperienceAction = (
  legalDraftId: number,
  workExperienceTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${legalDraftId}/legal/work-experience/${workExperienceTempId}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY_SUCCESS,
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
      type: DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLegalEditCardCEOWorkExperienceAction = (
  gotIdForMainEdit: number,
  workExperienceTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY,
    });
    const { data } = await apiRegistrationToken.delete(
      `applicant/work-experience/${workExperienceTempId}?id=${gotIdForMainEdit}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY_SUCCESS,
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
      type: DELETE_LEGAL_DRAFT_CEO_WORK_HISTORY_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
