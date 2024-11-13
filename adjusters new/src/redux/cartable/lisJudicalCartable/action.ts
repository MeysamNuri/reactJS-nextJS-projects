import {
  LIST_JUDICAL_CARTABLE,
  LIST_JUDICAL_CARTABLE_SUCCESS,
  LIST_JUDICAL_CARTABLE_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageError} from "../../../utils/utils"

export const fetchListJudicalCartable = (dataNaturalCartable: any) => async (
  dispatch: any
) => {
  try {
    dispatch({ 
      type: LIST_JUDICAL_CARTABLE,
    });
    const { data } = await api.post(`/inbox-list`, dataNaturalCartable);
    if (data.IsSucceed === false) {
      messageError(data.Message)   
    }
    dispatch({
      type: LIST_JUDICAL_CARTABLE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: LIST_JUDICAL_CARTABLE_FAILD,
      payload:
        error.response && error.response.data.Error.Message
    });
  }
};
