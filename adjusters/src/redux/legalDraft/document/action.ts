//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_DOCUMENT,
  LEGAL_DRAFT_DOCUMENT_SUCCESS,
  LEGAL_DRAFT_DOCUMENT_FAILD,
} from "../../../constant/legalActionTypes";

import { IDocument } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const sendDocument = (
  draftId: number,
  document: IDocument,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_DOCUMENT });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/Document`,
      document
    );
    successFunction();
    dispatch({
      type: LEGAL_DRAFT_DOCUMENT_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات اضافه گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
