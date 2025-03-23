import {
  ATTACHMENT,
  ATTACHMENT_SUCCESS,
  ATTACHMENT_FAILD,
  ATTACHMENT_LIST,
  ATTACHMENT_LIST_SUCCESS,
  ATTACHMENT_LIST_FAILD,
  ATTACHMENT_DOWNLOAD,
  ATTACHMENT_DOWNLOAD_SUCCESS,
  ATTACHMENT_DOWNLOAD_FAILD,
  ATTACHMENT_REMOVE,
  ATTACHMENT_REMOVE_SUCCESS,
  ATTACHMENT_REMOVE_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageSuccess,messageError} from "../../../utils/utils"

//اضافه کردن پیوست
export const addAttachment = (
  newAttachment: any,
  applicantId?: number,
  successFunction?: any
) => async (dispatch: any) => {
  let attachment = new FormData();
  attachment.append("AdjusterTypeId", newAttachment.adjusterTypeId);
  attachment.append("Description", newAttachment.description);
  attachment.append("file", newAttachment.file);

  try {
    dispatch({
      type: ATTACHMENT,
    });
    const { data } = await api.post(
      `/document/attachment?id=${applicantId}`,
      attachment
    );
    if (data.IsSucceed === true) {
      messageSuccess(".پیوست ها با موفقیت اضافه گردید")
      successFunction();
    }else{
      messageError(data.Message)
    }
    dispatch({
      type: ATTACHMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ATTACHMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// لیست پیوست ها
export const fetchAttachments = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ATTACHMENT_LIST,
    });
    const { data } = await api.post(
      `/document/attachment-list?applicantId=${applicantId}`
    );
    dispatch({
      type: ATTACHMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ATTACHMENT_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//دانلود پیوست ها
export const dlAttachment = (applicantId?: number, documentId?: string) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ATTACHMENT_DOWNLOAD,
    });
    const { data } = await api.get(
      `/document/${documentId}/attachment-content?id=${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess(".دانلود پیوست با موفقیت انجام شد")
      const linkSource = `data:${data?.Result?.Content};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message)
    }
    dispatch({
      type: ATTACHMENT_DOWNLOAD_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ATTACHMENT_DOWNLOAD_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//حذف پیوست
export const removeAttachment = (
  applicantId?: number,
  documentId?: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ATTACHMENT_REMOVE,
    });
    const { data } = await api.delete(
      `/document/${documentId}?id=${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess(".حذف پیوست با موفقیت انجام شد")
      dispatch({
        type: ATTACHMENT_REMOVE_SUCCESS,
        payload: documentId,
      });
    } else {
      messageError(data.Message)
    }
  } catch (error: any) {
    dispatch({
      type: ATTACHMENT_REMOVE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
