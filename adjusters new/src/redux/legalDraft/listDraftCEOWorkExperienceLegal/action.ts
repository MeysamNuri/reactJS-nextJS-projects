//libraries
import { toast } from "react-toastify";

//redux
import {
  LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE,
  LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_SUCCESS,
  LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const fetchCEOWorkExperienceLegal = (legalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/work-experience-list`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      toast.error("خطا در خواندن سوابق کاری", {
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
      type: LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchCEOWorkExperienceLegalEdit = (
  gotIdForMainEdit: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.get(
      `applicant/work-experience-list?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      toast.error("خطا در خواندن سوابق کاری", {
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
      type: LIST_LEGAL_DRAFT_CEO_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
