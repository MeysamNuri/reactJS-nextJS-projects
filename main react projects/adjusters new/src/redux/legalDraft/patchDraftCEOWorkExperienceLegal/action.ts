//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE,
  LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_SUCCESS,
  LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_FAILD,
} from "../../../constant/legalActionTypes";

import { IWorkExperience } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";




/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const patchDraftCEOWorkExperienceLegal = (
  draftId: number,
  workExperience: IWorkExperience,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/work-experience/${tempId}/update`,
      workExperience
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_SUCCESS,
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
      type: LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_FAILD,
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

export const patchDraftCEOWorkExperienceLegalEdit = (
  gotIdForMainEdit: number,
  workExperience: IWorkExperience,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE });
    const { data } = await apiRegistrationToken.post(
      `applicant/work-experience/${tempId}?id=${gotIdForMainEdit}/update`,
      workExperience
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_SUCCESS,
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
      type: LEGAL_DRAFT_PATCH_CEO_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
