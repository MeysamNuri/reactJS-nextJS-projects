import {
  DELETE_NATURAL_SUB_FIELD_INFO_EDIT,
  DELETE_NATURAL_SUB_FIELD_INFO_EDIT_SUCCESS,
  DELETE_NATURAL_SUB_FIELD_INFO_EDIT_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import {messageError,messageSuccess} from '../../../utils/utils'

export const deleteNaturalSubFieldInfoEdit = (
  editId: number,
  subFieldId: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_NATURAL_SUB_FIELD_INFO_EDIT });

    const { data } = await apiRegistrationToken.delete(
      `applicant-sub-field-info?id=${editId}&subFieldId=${subFieldId}`
    );

    dispatch({
      type: DELETE_NATURAL_SUB_FIELD_INFO_EDIT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("زیر رشته تخصصی به درستی حذف شد");
      successFunction();
    }
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: DELETE_NATURAL_SUB_FIELD_INFO_EDIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
