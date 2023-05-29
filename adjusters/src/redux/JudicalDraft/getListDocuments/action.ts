//redux
import {
  GET_LIST_DOCUMENTS_JUDICIAL,
  GET_LIST_DOCUMENTS_JUDICIAL_SUCCESS,
  GET_LIST_DOCUMENTS_JUDICIAL_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const judicialGetListDocumentsDraft = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_LIST_DOCUMENTS_JUDICIAL });
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/judicial/document-list`
    );
    dispatch({
      type: GET_LIST_DOCUMENTS_JUDICIAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_LIST_DOCUMENTS_JUDICIAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const judicialGetListDocumentsEdit = (
  gotIdForMainEdit: number
) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_LIST_DOCUMENTS_JUDICIAL });
    let selectableDocument = {
      applicantId: gotIdForMainEdit,
      adjusterType: 3,
      category: 0,
    };
    const { data } = await apiRegistrationToken.post(
      `/document/list`,
      selectableDocument
    );
    dispatch({
      type: GET_LIST_DOCUMENTS_JUDICIAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_LIST_DOCUMENTS_JUDICIAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
