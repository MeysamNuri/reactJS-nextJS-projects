import {
  DELETE_LEGAL_DOCUMENT,
  DELETE_LEGAL_DOCUMENT_SUCCESS,
  DELETE_LEGAL_DOCUMENT_FAILED,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const removeDocumentTypeIdDraftLegal = (
  legalDraftId: number,
  documentTypeId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DOCUMENT,
    });
    const { data } = await apiRegistrationToken.delete(
      `registration/draft/${legalDraftId}/legal/document/${documentTypeId}`
    );

    if (data.IsSucceed === true) {
      toast.success("سند به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      success();
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
      type: DELETE_LEGAL_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DELETE_LEGAL_DOCUMENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeDocumentTypeIdEditLegal = (
  gotIdForMainEdit: number,
  fileId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DOCUMENT,
    });
    const { data } = await apiRegistrationToken.delete(
      `document/${fileId}?id=${gotIdForMainEdit}`
    );

    dispatch({
      type: DELETE_LEGAL_DOCUMENT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("سند به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      success();
    } else {
      toast.error(`${data.Message} `, {
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
      type: DELETE_LEGAL_DOCUMENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
