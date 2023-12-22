import {
  ADD_STATICAL_REPORT,
  ADD_STATICAL_REPORT_SUCCESS,
  ADD_STATICAL_REPORT_FAILD,
  DETAIL_STATICAL_REPORT,
  DETAIL_STATICAL_REPORT_SUCCESS,
  DETAIL_STATICAL_REPORT_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageError} from "../../../utils/utils"

//لیست گزارشات آماری
export const fetchStatisticalReport = (dataReport:any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ADD_STATICAL_REPORT,
    });
    const { data } = await api.post(`/report/group-by-applicant-status`,dataReport);
    if (data.IsSucceed === true) {
      // s1()
      //closeModalFilter()
     
    }else{
      messageError(data.Message) 
    }
    dispatch({
      type: ADD_STATICAL_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message) 
    dispatch({
      type: ADD_STATICAL_REPORT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//جزییات کزارش اماری ارزیابان
export const fetchDetailstaticalReport = (
  detailstaticalReport: any,
  statusId: number
) => async (dispatch: any,getState:any) => {
  
  try {
    dispatch({
      type: DETAIL_STATICAL_REPORT,
      payload: statusId,  
    });
    const { data } = await api.post(
      `/report/group-by-applicant-status/${statusId}/details`,
      detailstaticalReport
    );
    if (data.IsSucceed === true) {
      //closeModalFilter()
    } else {
      messageError("خطا  در نمایش لیست ارزیابان");
    }
    dispatch({
      type: DETAIL_STATICAL_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError("خطا  در نمایش لیست ارزیابان");
    dispatch({
      type: DETAIL_STATICAL_REPORT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




