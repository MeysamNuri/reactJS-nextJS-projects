import {
  DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL,
  DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_SUCCESS,
  DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_FAILED,
  DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL,
  DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_SUCCESS,
  DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const downloadRawFormCriminal = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL,
    });
    const { data } = await apiRegistrationToken.get(
      `raw-form/${gotIdForMainEdit}/criminal-record-content`
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
      toast.error(data?.Message, {
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
      type: DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downloadRawFormNonAddiction = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL,
    });
    const { data } = await apiRegistrationToken.get(
      `raw-form/${gotIdForMainEdit}/non-addiction-content`
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
      toast.error(data?.Message, {
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
      type: DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
