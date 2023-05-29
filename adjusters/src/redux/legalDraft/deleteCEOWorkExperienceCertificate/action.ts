import {
  DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteLegalDraftWorkExpCertificateAction = (
  legalDraftId: number,
  workExperienceTempId: string,
  certificateTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${legalDraftId}/legal/work-experience/${workExperienceTempId}/certificate/${certificateTempId}/content`
    );
    successFunction();
    dispatch({
      type: DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("فایل سابقه کار به درستی حذف گردید", {
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
      type: DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLegalDraftWorkExpCertificateActionEdit = (
  gotIdForMainEdit: number,
  workExperienceTempId: string,
  certificateTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.delete(
      `applicant/work-experience/certificate/${certificateTempId}?id=${gotIdForMainEdit}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("فایل سابقه کار به درستی حذف گردید", {
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
      toast.error(`${data.Message} `, {
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
      type: DELETE_LEGAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
