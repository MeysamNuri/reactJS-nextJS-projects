import {
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE,
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deletJudicalDraftWorkExperienceAction = (
  judicalDraftId: number,
  workExperienceTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${judicalDraftId}/judicial/work-experience/${workExperienceTempId}`
    );
    successFunction();
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
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
    }
  } catch (error: any) {
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletJudicalEditWorkExperienceAction = (
  gotIdForMainEdit: number,
  workExperienceTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.delete(
      `applicant/work-experience/${workExperienceTempId}?id=${gotIdForMainEdit}`
    );
    successFunction();
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
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
    }
  } catch (error: any) {
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
