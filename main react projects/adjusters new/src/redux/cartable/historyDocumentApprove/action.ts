import {
  HISTORY_DOCUMENT,
  HISTORY_DOCUMENT_SUCCESS,
  HISTORY_DOCUMENT_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";

export const fetchHistorydocument = (documentId?:string,applicantId?: number,typeHistory?:number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: HISTORY_DOCUMENT,
    });
    const { data } = await api.get(
      `document/${documentId}/type/${typeHistory}/approval-history/applicant/${applicantId}`
    );
    dispatch({
      type: HISTORY_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: HISTORY_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
