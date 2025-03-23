import {
  SUB_FIELD,
  SUB_FIELD_SUCCESS,
  SUB_FIELD_FAILD,
} from "../../../constant/cartableActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import {messageError} from "../../../utils/utils"

export const fetchSubField = (
  gotIdForMainEdit?: number,
  successFunction?: (e: any) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: SUB_FIELD });
    const { data } = await apiRegistrationToken.get(
      `/applicant-sub-field-info?id=${gotIdForMainEdit}`
    ); 
    dispatch({
      type: SUB_FIELD_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      const subFieldsArray = data?.Result?.map(
        (subField: { SubFieldId: number; SubFieldTitle: string }) =>
          subField.SubFieldId
      );

      successFunction && successFunction(subFieldsArray);
    } else {
     // messageError(data.Message)
    }
  } catch (error: any) {
    dispatch({
      type: SUB_FIELD_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

