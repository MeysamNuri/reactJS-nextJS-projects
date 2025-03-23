//libraries
import { toast } from "react-toastify";

//redux
import {
  UPLOAD_DOCUMENTS_NATURAL,
  UPLOAD_DOCUMENTS_NATURAL_SUCCESS,
  UPLOAD_DOCUMENTS_NATURAL_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const uploadDocumentNaturalDraft = (
  draftId: number,
  documentTypeId: string,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: UPLOAD_DOCUMENTS_NATURAL });
    let formData = new FormData();
    formData.append("DocumentFile", file);
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/document/${documentTypeId}`,
      formData
    );
    if (data.IsSucceed === true) {
      toast.success("سند با موفقیت بارگذاری گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`${data.Message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction();
    dispatch({
      type: UPLOAD_DOCUMENTS_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_DOCUMENTS_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadDocumentNaturalEdit = (
  gotIdForMainEdit: number,
  documentTypeId: string,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: UPLOAD_DOCUMENTS_NATURAL });
    let formData = new FormData();
    formData.append("DocumentFile", file);
    formData.append("adjusterTypeId", "1");
    formData.append("documentTypeId", documentTypeId);
    formData.append("description", "");
    const { data } = await apiRegistrationToken.post(
      `/document?id=${gotIdForMainEdit}`,
      formData
    );
    if (data.IsSucceed === true) {
      toast.success("سند با موفقیت بارگذاری گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("در بارگذاری سند خطایی ایجاد گردیده است", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction();
    dispatch({
      type: UPLOAD_DOCUMENTS_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_DOCUMENTS_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
