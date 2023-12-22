import {
  UPLOAD_DOCUMENT_LEGAL,
  UPLOAD_DOCUMENT_LEGAL_SUCCESS,
  UPLOAD_DOCUMENT_LEGAL_FAILED,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const uploadDocumentLegalDraft = (
  legalDraftId: number,
  file: any,
  documentTypeId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  try {
    dispatch({
      type: UPLOAD_DOCUMENT_LEGAL,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${legalDraftId}/legal/document/${documentTypeId}`,
      formData
    );
    successFunction();
    dispatch({
      type: UPLOAD_DOCUMENT_LEGAL_SUCCESS,
      payload: data,
    });
    toast.success("فایل با موفقیت بارگذاری گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_DOCUMENT_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadDocumentLegalEdit = (
  gotIdForMainEdit: number,
  file: any,
  documentTypeId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  formData.append("adjusterTypeId", "2");
  formData.append("documentTypeId", documentTypeId);
  formData.append("description", "");
  try {
    dispatch({
      type: UPLOAD_DOCUMENT_LEGAL,
    });

    const { data } = await apiRegistrationToken.post(
      `/document?id=${gotIdForMainEdit}`,
      formData
    );
    successFunction();
    dispatch({
      type: UPLOAD_DOCUMENT_LEGAL_SUCCESS,
      payload: data,
    });
    toast.success("فایل با موفقیت بارگذاری گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_DOCUMENT_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
