import {
  DOCUMENT_LIST,
  DOCUMENT_LIST_SUCCESS,
  DOCUMENT_LIST_FAILD,
  // UPLOAD_DOCUMENT,
  // UPLOAD_DOCUMENT_SUCCESS,
  // UPLOAD_DOCUMENT_FAILD,
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILD,
  DL_DOCUMENT,
  DL_DOCUMENT_SUCCESS,
  DL_DOCUMENT_FAILD,
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { toast } from "react-toastify";

//لیست اسناد
export const fetchDocuments = (requestTypeId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOCUMENT_LIST,
    });
    const { data } = await api.get(
      `/document-request/${requestTypeId}/content-list`
    );
    dispatch({
      type: DOCUMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOCUMENT_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//اضافه کردن سند
export const addDocument = (document: any) => async (dispatch: any) => {
  let upload = new FormData();
  upload.append("Id", document.id);
  upload.append("DocumentRequestTypeId", document.DocumentRequestTypeId);
  upload.append("file", document.file);
  upload.append("Description", "");

  try {
    dispatch({
      type: ADD_DOCUMENT,
    });
    const { data } = await api.post(`/document-request`, upload);
    if (data.IsSucceed === true) {
      toast.success("ارسال فایل با موفقیت انجام شد ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      type: ADD_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ADD_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//دانلود اسناد
export const downLoaderDocument = (documentId: string) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DL_DOCUMENT,
    });
    const { data } = await api.get(`/document-request/${documentId}/content`);
    if (data.IsSucceed === true) {
      toast.success("عملیات دانلود با موفقیت انجام شد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const linkSource = `data:image${data?.Result?.FileExtension};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
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
      type: DL_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    toast.error(" خطا در مشاهده فایل  ارسالی", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: DL_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
