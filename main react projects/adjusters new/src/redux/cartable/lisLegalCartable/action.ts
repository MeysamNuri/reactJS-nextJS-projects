import {
  LIST_LEGAL_CARTABLE,
  LIST_LEGAL_CARTABLE_SUCCESS,
  LIST_LEGAL_CARTABLE_FAILD,
  PERSONAL_INFO_LEGAL_DETAIL,
  PERSONAL_INFO_LEGAL_DETAIL_SUCCESS,
  PERSONAL_INFO_LEGAL_DETAIL_FAILD
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageError} from "../../../utils/utils";

export const fetchListLegalCartable = (dataLegalCartable: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_CARTABLE,
    });
    const { data } = await api.post(`/inbox-list`, dataLegalCartable);
    if (data.IsSucceed === false) {
      messageError(data.Message) ;
    }
    dispatch({
      type: LIST_LEGAL_CARTABLE_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: LIST_LEGAL_CARTABLE_FAILD,
      payload: error.response && error.response.data.Error.Message
    });
  }
};



//جزییات پرونده کارتابل حقوقی
export const fetchPersonalInfoLegalDetailCartable = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: PERSONAL_INFO_LEGAL_DETAIL,
    });
    const { data } = await api.get(
      `/admission/cartable/legal-personal-info-detail?applicntId=${applicantId}`
    );

    dispatch({
      type: PERSONAL_INFO_LEGAL_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: PERSONAL_INFO_LEGAL_DETAIL_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
