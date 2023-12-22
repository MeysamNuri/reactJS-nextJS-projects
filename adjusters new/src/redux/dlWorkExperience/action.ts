import {
  DOWNLOAD_WORK_EXPERIENCE,
  DOWNLOAD_WORK_EXPERIENCE_SUCCESS,
  DOWNLOAD_WORK_EXPERIENCE_FAILD,
} from "../../constant/cartableActionTypes";
import { api } from "../../httpServices/service";
import { messageSuccess, messageError } from "../../utils/utils";

export const dlWorkExperienceHandler = (
  applicantId?: number,
  certificateId?: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DOWNLOAD_WORK_EXPERIENCE,
    });
    const { data } = await api.get(
      `/applicant/work-experience/certificate/${certificateId}/content?id=${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:${data?.Result?.Content};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: DOWNLOAD_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
