import {
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FAILD,
} from "../../constant/cartableActionTypes";
import { api } from "../../httpServices/service";
import { messageSuccess, messageError } from "../../utils/utils";

export const dlDocumentHandler = (
  applicantId?: number,
  documentId?: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DOWNLOAD_DOCUMENT,
    });
    const { data } = await api.get(
      `/document/${documentId}/content?id=${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:image${data?.Result?.FileExtension};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: DOWNLOAD_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
