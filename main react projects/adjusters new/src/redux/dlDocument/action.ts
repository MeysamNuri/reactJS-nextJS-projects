import {
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FAILD,
  REMOVE_DOCUMENT,
  REMOVE_DOCUMENT_SUCCESS,
  REMOVE_DOCUMENT_FAILD
} from "../../constant/cartableActionTypes";
import { api } from "../../httpServices/service";
import { messageSuccess, messageError } from "../../utils/utils";

export const handleRemoveShowPic=()=>(dispatch:any)=>{
  dispatch({
    type:"REMOVE_SHOW_PIC"
  })
}
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

export const removeUploadedCartableDocuments = (
  applicantId?: number,
  documentId?: string,
  getDocs?:any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_DOCUMENT,
    });
    const { data } = await api.delete(
      `/applicant/RemoveDocument/${documentId}/${applicantId}` 
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات حذف با موفقیت انجام شد");
      getDocs()
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: REMOVE_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
