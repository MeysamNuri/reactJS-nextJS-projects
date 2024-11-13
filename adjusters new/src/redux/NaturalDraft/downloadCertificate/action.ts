import {
  DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO,
  DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_SUCCESS,
  DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const downloadCertificateDraft = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/80hour-certificate-content`
    );
    if (data.IsSucceed === true) {
      const url = `data:image/${data?.Result?.FileExtension};base64,${data?.Result?.Content}`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${data?.Result?.Title}.${data?.Result?.FileExtension}`
      );
      document.body.appendChild(link);
      link.click();
    }
    dispatch({
      type: DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downloadCertificateEdit = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO,
    });
    const { data } = await apiRegistrationToken.get(
      `/applicant-field-info-specialized-content?id=${gotIdForMainEdit}`
    );
    if (data.IsSucceed === true) {
      const url = `data:image/${data?.Result?.FileExtension};base64,${data?.Result?.Content}`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${data?.Result?.Title}.${data?.Result?.FileExtension}`
      );
      document.body.appendChild(link);
      link.click();
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
      type: DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
