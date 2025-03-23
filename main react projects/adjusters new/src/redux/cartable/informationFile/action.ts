import {
  INFORMATION_FILE,
  INFORMATION_FILE_SUCCESS,
  INFORMATION_FILE_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageError,messageSuccess} from "../../../utils/utils"

export const informationFileAction = (
  adjusterType: number,
  applicantId?: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: INFORMATION_FILE,
      payload: applicantId,
    });
    const { data } = await api.get(
      `/admission/cartable/${adjusterType}/information-file/${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("دانلود اطلاعات پرونده با موفقیت انجام شد")
      const linkSource = `data:${data.Result?.ContentType};base64,${data.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data.Result?.Title}.${data.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      setTimeout(() => {
        downloadLink.click();
      }, 2000);
    
    } else {
      messageError(data.Message)   
    }
    dispatch({
      type: INFORMATION_FILE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطایی در سمت سرور رخ داده است")   
    dispatch({
      type: INFORMATION_FILE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const informationFileAdjusterDesktopAction = (
  adjusterType: number,
  applicantId?: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: INFORMATION_FILE,
      payload: applicantId,
    });
    const { data } = await api.get(
      `/AdjusterDesktop/InformationFile/${adjusterType}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("دانلود اطلاعات پرونده با موفقیت انجام شد")
      const linkSource = `data:${data.Result?.ContentType};base64,${data.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data.Result?.Title}.${data.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      setTimeout(() => {
        downloadLink.click();
      }, 2000);
    
    } else {
      messageError(data.Message)   
    }
    dispatch({
      type: INFORMATION_FILE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطایی در سمت سرور رخ داده است")   
    dispatch({
      type: INFORMATION_FILE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};