import {
  DOWNLOAD_DOCUMENT_NATURAL,
  DOWNLOAD_DOCUMENT_NATURAL_SUCCESS,
  DOWNLOAD_DOCUMENT_NATURAL_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const downloadDocumentDraft = (draftId: number, id: string) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOWNLOAD_DOCUMENT_NATURAL,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/document/${id}/content`
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
      type: DOWNLOAD_DOCUMENT_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_DOCUMENT_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downloadDocumentEdit = (
  gotIdForMainEdit: number,
  id: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DOWNLOAD_DOCUMENT_NATURAL,
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
      type: DOWNLOAD_DOCUMENT_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_DOCUMENT_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
