import {
  DOWNLOAD_LICENCE_ADJUSTER,
  DOWNLOAD_LICENCE_ADJUSTER_SUCCESS,
  DOWNLOAD_LICENCE_ADJUSTER_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageError,messageSuccess} from "../../../utils/utils"


export const downloadAdjusterLicence = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOWNLOAD_LICENCE_ADJUSTER,
      payload: applicantId,
    });

    const { data } = await api.get(`/license/${applicantId}/content`);
    if (data.IsSucceed === true) {
      messageSuccess("دانلود پروانه ارزیاب با موفقیت انجام شد")
      const linkSource = `data:${data.Result?.ContentType};base64,${data.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data.Result?.Title}.${data.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message)
    }
    dispatch({
      type: DOWNLOAD_LICENCE_ADJUSTER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: DOWNLOAD_LICENCE_ADJUSTER_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};



export const downloadAdjusterDesktopLicence = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOWNLOAD_LICENCE_ADJUSTER,
      payload: applicantId,
    });

    const { data } = await api.get(`/AdjusterDesktop/License`);
    if (data.IsSucceed === true) {
      messageSuccess("دانلود پروانه ارزیاب با موفقیت انجام شد")
      const linkSource = `data:${data.Result?.ContentType};base64,${data.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data.Result?.Title}.${data.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message)
    }
    dispatch({
      type: DOWNLOAD_LICENCE_ADJUSTER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: DOWNLOAD_LICENCE_ADJUSTER_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};
