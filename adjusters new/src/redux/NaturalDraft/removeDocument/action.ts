//libraries
import { toast } from "react-toastify";

//redux
import {
  REMOVE_DOCUMENTS_NATURAL,
  REMOVE_DOCUMENTS_NATURAL_SUCCESS,
  REMOVE_DOCUMENTS_NATURAL_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const removeDocumentTypeIdDraft = (
  draftId: number,
  documentTypeId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: REMOVE_DOCUMENTS_NATURAL });
    const { data } = await apiRegistrationToken.delete(
      `registration/draft/${draftId}/natural/document/${documentTypeId}`
    );
    if (data.IsSucceed === true) {
      toast.success("سند با موفقیت حذف گردید", {
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
    successFunction();
    dispatch({
      type: REMOVE_DOCUMENTS_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_DOCUMENTS_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeDocumentTypeIdEdit = (
  gotIdForMainEdit: number,
  documentTypeId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: REMOVE_DOCUMENTS_NATURAL });
    const { data } = await apiRegistrationToken.delete(
      `/document/${documentTypeId}?id=${gotIdForMainEdit}`
    );
    if (data.IsSucceed === true) {
      toast.success("سند با موفقیت حذف گردید", {
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
    successFunction();
    dispatch({
      type: REMOVE_DOCUMENTS_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_DOCUMENTS_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
