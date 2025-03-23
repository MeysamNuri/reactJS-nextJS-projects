import {
  DOCUMENT_APPROVE,
  DOCUMENT_APPROVE_SUCCESS,
  DOCUMENT_APPROVE_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";

export const fetchDocumentApprove = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DOCUMENT_APPROVE,
    });
    const { data } = await api.get(
      `/admission/cartable/document-approve?applicntId=${applicantId}`
    );
    dispatch({
      type: DOCUMENT_APPROVE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOCUMENT_APPROVE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
