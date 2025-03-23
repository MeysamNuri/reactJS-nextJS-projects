import {
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
  DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deletJudicialDraftWorkExpCertificateAction = (
  judicialDraftId: number,
  workExperienceTempId: string,
  certificateTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${judicialDraftId}/judicial/work-experience/${workExperienceTempId}/certificate/${certificateTempId}/content`
    );
    successFunction();
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("فایل سابقه کار با موفقیت حذف گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("حذف فایل سابقه کار با خطا مواجه گردید", {
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
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletJudicialEditWorkExpCertificateAction = (
  gotIdForMainEdit: number,
  workExperienceTempId: string,
  certificateTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.delete(
      `applicant/work-experience/certificate/${certificateTempId}?id=${gotIdForMainEdit}`
    );

    dispatch({
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_SUCCESS,
      payload: data,
    });

    if (data?.IsSucceed === true) {
      toast.success("فایل سابقه کار با موفقیت حذف گردید", {
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
      toast.error(`${data?.Message} `, {
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
      type: DELET_JUDICAL_DRAFT_WORK_EXPERIENCE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
