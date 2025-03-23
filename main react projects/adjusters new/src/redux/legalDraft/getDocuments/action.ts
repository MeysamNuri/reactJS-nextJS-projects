//libraries
import { toast } from "react-toastify";

//redux
import {
  GET_DOCUMENTS_LEGAL,
  GET_DOCUMENTS_LEGAL_SUCCESS,
  GET_DOCUMENTS_LEGAL_FAILED,
} from "../../../constant/legalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const fetchDocumentsDraftLegal = (legalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_DOCUMENTS_LEGAL });
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${legalDraftId}/legal/document-list`
    );

    dispatch({
      type: GET_DOCUMENTS_LEGAL_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      toast.error("خطا در فراخوانی اطلاعات", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: GET_DOCUMENTS_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchDocumentsEditLegal = (selectableDocument: any) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_DOCUMENTS_LEGAL });
    const { data } = await apiRegistrationToken.post(
      `/document/list`,
      selectableDocument
    );

    dispatch({
      type: GET_DOCUMENTS_LEGAL_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      toast.error("خطا در بازخوانی اطلاعات", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: GET_DOCUMENTS_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
