import {
  JUDICAL_DRAFT_ADD_WORK_EXPERIENCE,
  JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_SUCCESS,
  JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";
import { IJudicalDraftWorkExperience } from "../../../shared/ulitities/Model/draftJudical";

export const sendJudicalWorkExperienceDraft = (
  judicalDraftId: number,
  workExperience: IJudicalDraftWorkExperience,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_ADD_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${judicalDraftId}/judicial/work-experience`,
      workExperience
    );

    dispatch({
      type: JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات سوابق کاری اضافه گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    successFunction();
  } catch (error: any) {
    dispatch({
      type: JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendJudicalWorkExperienceEdit = (
  gotIdForMainEdit: number,
  workExperience: IJudicalDraftWorkExperience,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_ADD_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant/work-experience?id=${gotIdForMainEdit}`,
      workExperience
    );
    dispatch({
      type: JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات سوابق کاری ویرایش گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    successFunction();
  } catch (error: any) {
    dispatch({
      type: JUDICAL_DRAFT_ADD_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
