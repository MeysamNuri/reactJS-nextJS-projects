import {
  UPLOAD_DRAFT_PERSONAL_INFO_PIC,
  UPLOAD_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  UPLOAD_DRAFT_PERSONAL_INFO_PIC__FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";
import { api } from "../../../httpServices/service";

export const uploadProfilePicDraft = (
  draftId: number,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("profilePic", file);
  try {
    dispatch({
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/profile-pic`,
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
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadProfilePicEdit = (
  gotIdForMainEdit: number,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("profilePic", file);
  try {
    dispatch({
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/${gotIdForMainEdit}/natural/profile-pic`,
      formData
    );
    dispatch({
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
    successFunction();
  } catch (error:any) {
    dispatch({
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadProfilePicEditCartable = (
  gotIdForMainEdit?: number,
  file?: any,
  successFunction?: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("profilePic", file);
  try {
    dispatch({
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC,
    });
    const { data } = await api.post(
      `/registration/${gotIdForMainEdit}/natural/profile-pic`,
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
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: UPLOAD_DRAFT_PERSONAL_INFO_PIC__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
