import {
  DOWNLOAD_DOCUMENT_LEGAL,
  DOWNLOAD_DOCUMENT_LEGAL_SUCCESS,
  DOWNLOAD_DOCUMENT_LEGAL_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const downloadDocumentLegalDraft = (
  draftId: number,
  id: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DOWNLOAD_DOCUMENT_LEGAL,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/legal/document/${id}/content`
    );
    if (data.IsSucceed === true) {
      const url = `data:image/${data?.Result?.FileExtension};base64,${data?.Result?.Content}`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${data?.Result?.Title}.${data?.Result?.FileExtension}`
      );
      document.body.appendChild(link);
      link.click();
    }
    dispatch({
      type: DOWNLOAD_DOCUMENT_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_DOCUMENT_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downloadDocumentLegalEdit = (
  gotIdForMainEdit: number,
  id: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DOWNLOAD_DOCUMENT_LEGAL,
    });
    const { data } = await apiRegistrationToken.get(
      `/document/${id}/content?id=${gotIdForMainEdit}`
    );
    if (data.IsSucceed === true) {
      const url = `data:image/${data?.Result?.FileExtension};base64,${data?.Result?.Content}`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${data?.Result?.Title}.${data?.Result?.FileExtension}`
      );
      document.body.appendChild(link);
      link.click();
    }

    dispatch({
      type: DOWNLOAD_DOCUMENT_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_DOCUMENT_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
