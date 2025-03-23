import {
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageSuccess, messageError } from "../../../utils/utils";



/**
 * 
 * @param { Todo:  method post for update is change} param0  
 */

export const updateDocument = (
  applicantId?: number,
  documentTypeId?: string,
  file?: any
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentFile", file);
  documentTypeId!==undefined && formData.append("documentTypeId", documentTypeId);

  try {
    dispatch({
      type: UPDATE_DOCUMENT,
    });
    const { data } = await api.post(
      `document/${documentTypeId}/${applicantId}/update`,formData
    );
    if (data.IsSucceed === true) {
      messageSuccess("بارگذاری فایل با موفقیت انجام شد");
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: UPDATE_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("بارگذاری فایل با خطا مواجه گردید");
    dispatch({
      type: UPDATE_DOCUMENT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
