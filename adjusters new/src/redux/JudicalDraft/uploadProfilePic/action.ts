import {
  UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
  UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const uploadJudicalProfilePicDraft = (
  JudicalDraftId: number,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("profilePic", file);
  try {
    dispatch({
      type: UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${JudicalDraftId}/judicial/profile-pic`,
      formData
    );
    if (data.IsSucceed === true) {
      toast.success("عکس با موفقیت بارگذاری گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    } else {
      toast.error("بارگذاری عکس با خطا روبه رو گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    dispatch({
      type: UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
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

export const uploadJudicalProfilePicEdit = (
  file: any,
  gotIdForMainEdit?: number,
  successFunction?: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("profilePic", file);
  try {
    dispatch({
      type: UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/${gotIdForMainEdit}/judicial/profile-pic/update`,
      formData
    );
    if (data.IsSucceed === true) {
      toast.success("عکس با موفقیت بارگذاری گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction && successFunction();
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

    dispatch({
      type: UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
