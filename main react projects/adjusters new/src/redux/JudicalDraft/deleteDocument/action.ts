//libraries
import { toast } from "react-toastify";

//redux
import {
  REMOVE_DOCUMENTS_JUDICIAL,
  REMOVE_DOCUMENTS_JUDICIAL_SUCCESS,
  REMOVE_DOCUMENTS_JUDICIAL_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const judicialDeleteDocumentTypeIdDraft = (
  judicalDraftId: number,
  documentTypeId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: REMOVE_DOCUMENTS_JUDICIAL });
    const { data } = await apiRegistrationToken.delete(
      `registration/draft/${judicalDraftId}/judicial/document/${documentTypeId}`
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
      type: REMOVE_DOCUMENTS_JUDICIAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_DOCUMENTS_JUDICIAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const JudicialDeleteDocumentTypeIdEdit = (
  gotIdForMainEdit: number,
  documentTypeId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: REMOVE_DOCUMENTS_JUDICIAL });
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
      successFunction();
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
      type: REMOVE_DOCUMENTS_JUDICIAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_DOCUMENTS_JUDICIAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
