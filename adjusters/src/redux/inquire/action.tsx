import {
  INQUIRE,
  INQUIRE_SUCCESS,
  INQUIRE_FAILD,
} from "../../constant/actionTypes";
import { api } from "../../httpServices/service";
import { messageError, messageSuccess } from '../../utils/utils';

export const postInquire = (inquire: any, resetField: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: INQUIRE,
    });

    const { data } = await api.post(`/inquire`, inquire);
    if (data.IsSucceed === true) {
      messageSuccess("استعلام موفقیت آمیز بود");
      resetField()
    }else{
      messageError(data.Message)
    }
    dispatch({
      type: INQUIRE_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: INQUIRE_FAILD,
      payload:
        error.response && error.response.data.Error.Message
    });
  }
};
export const removeInqiry=()=>(dispatch:any)=>{
  dispatch({
    type: INQUIRE_SUCCESS,
    payload: null,
  });
}
export const stockHolderLegalInquiry = (id:number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: INQUIRE,
    });

    const { data } = await api.get(`/LegalCompanyInfo/Inquiry/${id}`);
    if (data.IsSucceed === true) {
      messageSuccess("استعلام موفقیت آمیز بود");

    }else{
      messageError(data.Message)
    }
    dispatch({
      type: INQUIRE_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: INQUIRE_FAILD,
      payload:
        error.response && error.response.data.Error.Message
    });
  }
};
