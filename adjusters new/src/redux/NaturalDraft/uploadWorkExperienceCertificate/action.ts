import {
  UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const uploadWorkExperienceCertificateDraft = (
  draftId: number,
  workExperienceTempId: string,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  try {
    dispatch({
      type: UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/work-experience/${workExperienceTempId}/certificate`,
      formData
    );
    successFunction();
    dispatch({
      type: UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    toast.success("فایل سوابق کاری به درستی بارگذاری گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadWorkExperienceCertificateEdit = (
  gotIdForMainEdit: number,
  experienceTempId: string,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  try {
    dispatch({
      type: UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant/work-experience/${experienceTempId}/certificate?id=${gotIdForMainEdit}`,
      formData
    );
    successFunction();
    dispatch({
      type: UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    toast.success("فایل سوابق کاری به درستی بارگذاری گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_NATURAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
