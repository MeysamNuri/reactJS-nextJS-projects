//redux
import {
  GET_LIST_DOCUMENTS_NATURAL,
  GET_LIST_DOCUMENTS_NATURAL_SUCCESS,
  GET_LIST_DOCUMENTS_NATURAL_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getListDocumentsDraft = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_LIST_DOCUMENTS_NATURAL });
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/natural/document-list`
    );
    dispatch({
      type: GET_LIST_DOCUMENTS_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_LIST_DOCUMENTS_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getListDocumentsEdit = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_LIST_DOCUMENTS_NATURAL });
    let selectableDocument = {
      applicantId: gotIdForMainEdit,
      adjusterType: 1,
      category: 0,
    };
    const { data } = await apiRegistrationToken.post(
      `/document/list`,
      selectableDocument
    );
    dispatch({
      type: GET_LIST_DOCUMENTS_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_LIST_DOCUMENTS_NATURAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
