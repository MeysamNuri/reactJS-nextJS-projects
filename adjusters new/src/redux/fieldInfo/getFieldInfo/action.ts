import {
  GET_FIELD_INFO_DRAFT,
  GET_FIELD_INFO_DRAFT_SUCCESS,
  GET_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";
 
export const getFieldInfoDraft = (
  adjType: number,
  draftId: number,
  successFunction: (e: number) => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_FIELD_INFO_DRAFT,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/adjusterType/${adjType}/adjustment-field-info`
    );
    if (data.IsSucceed === true) {
      successFunction(data?.Result?.AdjustmentFieldId);
    }
    dispatch({ 
      type: GET_FIELD_INFO_DRAFT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_FIELD_INFO_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
