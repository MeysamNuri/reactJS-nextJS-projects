import {
  UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const uploadlegalWorkExperienceCertificate = (
  legalDraftId: number,
  experienceTempId: string,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  try {
    dispatch({
      type: UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${legalDraftId}/legal/work-experience/${experienceTempId}/certificate`,
      formData
    );
    successFunction();
    dispatch({
      type: UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    toast.success("فایل سوابق کاری با موفقیت بارگذاری گردید", {
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
      type: UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadlegalWorkExperienceCertificateEdit = (
  gotIdForMainEdit: number,
  experienceTempId: string,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  try {
    dispatch({
      type: UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant/work-experience/${experienceTempId}/certificate?id=${gotIdForMainEdit}`,
      formData
    );
    successFunction();
    dispatch({
      type: UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    toast.success("فایل سوابق کاری با موفقیت بارگذاری گردید", {
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
      type: UPLOAD_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
