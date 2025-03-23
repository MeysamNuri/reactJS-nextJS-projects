import {
  LIST_NATURAL_CARTABLE,
  LIST_NATURAL_CARTABLE_SUCCESS,
  LIST_NATURAL_CARTABLE_FAILD,
  PERSONAL_INFO_DETAIL,
  PERSONAL_INFO_DETAIL_SUCCESS,
  PERSONAL_INFO_DETAIL_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageError} from "../../../utils/utils"

//لیست کارتابل
export const fetchListNaturalCartable = (dataNaturalCartable: any,closeModalFilter:any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_NATURAL_CARTABLE,
    });
    const { data } = await api.post(`/inbox-list`, dataNaturalCartable);
    if (data.IsSucceed === true) {
         closeModalFilter()
    }else{
      messageError(data.Message) 
    }

    dispatch({
      type: LIST_NATURAL_CARTABLE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: LIST_NATURAL_CARTABLE_FAILD,
      payload:error.response && error.response.data.Error.Message
         
    });
  }
};



//جزییات پرونده کارتابل
export const fetchPersonalInfoDetailCartable = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: PERSONAL_INFO_DETAIL,
    });
    const { data } = await api.get(
      `/admission/cartable/personal-info-detail?applicntId=${applicantId}`
    );

    dispatch({
      type: PERSONAL_INFO_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: PERSONAL_INFO_DETAIL_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
