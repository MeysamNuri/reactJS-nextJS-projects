import {
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageSuccess, messageError } from "../../../utils/utils";

export const uploadDocument = (
  adjusterTypeId: any,
  documentTypeId: string,
  file: any,
  applicantId: number
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  formData.append("adjusterTypeId", adjusterTypeId);
  formData.append("documentTypeId", documentTypeId);
  formData.append("description", " ");
  try {
    dispatch({
      type: UPLOAD_DOCUMENT,
    });
    const { data } = await api.post(`/document?id=${applicantId}`, formData);
    dispatch({
      type: UPLOAD_DOCUMENT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("ارسال مدارک با موفقیت  انجام شد");
    } else {
      messageError(data.Message);
    }
  } catch (error: any) {
    messageError("ارسال مدارک با خطا مواجه گردید");

    dispatch({
      type: UPLOAD_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const selectDocuments=(dispatch:any,payload:any)=>{
  dispatch({
    type: "SELECT_DOCUMENTS",
    payload
  })
}
