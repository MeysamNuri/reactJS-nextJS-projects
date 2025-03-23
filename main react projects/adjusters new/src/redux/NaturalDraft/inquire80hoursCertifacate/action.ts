import {
  NATURAL_DRAFT_INQUIRE_CERTIFICATE_SUCCESS,
  NATURAL_DRAFT_INQUIRE_CERTIFICATE,
  NATURAL_DRAFT_INQUIRE_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const inquireCertificateDraft = (
  draftId: number,
  fieldId: number,
  certificateNo: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_INQUIRE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/inquire-field-certificate?fieldId=${fieldId}&certificateNo=${certificateNo}`
    );
    dispatch({
      type: NATURAL_DRAFT_INQUIRE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    toast.success("استعلام موفقیت آمیز گواهینامه", {
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
      type: NATURAL_DRAFT_INQUIRE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const inquireCertificateEdit = (
  gotIdForMainEdit: number,
  certificateNo: string,
  fieldId: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_INQUIRE_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant-inquire?id=${gotIdForMainEdit}&fieldId=${fieldId}&certificateNo=${certificateNo}`
    );
    dispatch({
      type: NATURAL_DRAFT_INQUIRE_CERTIFICATE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("استعلام موفقیت آمیز گواهینامه", {
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
      toast.error(`${data?.Message}`, {
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
      type: NATURAL_DRAFT_INQUIRE_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
