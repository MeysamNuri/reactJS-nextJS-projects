import {
  CHANGE_STATUS_REASON,
  CHANGE_STATUS_REASON_SUCCESS,
  CHANGE_STATUS_REASON_FAILD,
  GET_NEXT_STATUSES,
  GET_NEXT_STATUSES_SUCCESS,
  GET_NEXT_STATUSES_FAILD,
  SAVE_CHANGE_STATUSES,
  SAVE_CHANGE_STATUSES_SUCCESS,
  SAVE_CHANGE_STATUSES_FAILD,
  STATUSES_HISTORY,
  STATUSES_HISTORY_SUCCESS,
  STATUSES_HISTORY_FAILD,
  GET_APPLICANT_STATUS,
  GET_APPLICANT_STATUS_SUCCESS,
  GET_APPLICANT_STATUS_FAILD
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from '../../../utils/utils';
import { ISaveChangeStatus } from '../../../shared/ulitities/Model/desktop/status';



//دلایل تغییر وضعیت
export const fetchAllChangeStatusReason = () => async (dispatch: any) => {
  try {
    dispatch({
      type: CHANGE_STATUS_REASON,
    });
    const { data } = await api.get(`ChangeStatusReason/All`);
    if (data.IsSucceed) {
      dispatch({
        type: CHANGE_STATUS_REASON_SUCCESS,
        payload: data,
      });
    }
    else{
      messageError(data.Message)
    }
  } catch (error:any) {
    dispatch({
      type: CHANGE_STATUS_REASON_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//وضعیت های جدید
export const fetchAllNextStatuses = (status: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: GET_NEXT_STATUSES,
    });
    const { data } = await api.get(
      `/Desktop/get-next-statuses?applicantStatuses=${status}`
    );
    if (data.IsSucceed) {
      dispatch({
        type: GET_NEXT_STATUSES_SUCCESS,
        payload: data,
      });
    }
    else{
      messageError(data.Message)
    }
  } catch (error:any) {
    dispatch({
      type: GET_NEXT_STATUSES_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//ذخیره تغییر وضعیت
export const saveChangeStatuse = (
  changeStatus: ISaveChangeStatus,
  fetchMangment: any,
  closeModal: ()=>void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: SAVE_CHANGE_STATUSES,
    });
    const { data } = await api.post(
      `/Desktop/save-change-status`,
      changeStatus
    );
    if (data.IsSucceed) {
      fetchMangment();
      closeModal();
      messageSuccess("دلایل تغییر وضعیت با موفقیت ذخیره  گردید")
    }else{
      messageError(data.Message)
    }
    dispatch({
      type: SAVE_CHANGE_STATUSES_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError("خطای سمت سرور")
    dispatch({
      type: SAVE_CHANGE_STATUSES_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//تاریخچه تغییر وضعیت
export const fetchHistoryStatuses = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: STATUSES_HISTORY,
    });
    const { data } = await api.get(
      `/Desktop/get-applicant-statuses-history?applicantId=${applicantId}`
    );
    if (data.IsSucceed) { 
      dispatch({
        type: STATUSES_HISTORY_SUCCESS,
        payload: data,
      });
    }
    else{
      messageError(data.Message)
      dispatch({
        type: STATUSES_HISTORY_FAILD,
        payload:null
      });
    }
  } catch (error:any) {
    dispatch({
      type: STATUSES_HISTORY_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//لیست وضعیت ها
export const fetchAllStatuses = () => async (
  dispatch: any 
) => {
  try {
    dispatch({
      type:GET_APPLICANT_STATUS,
    });
    const { data } = await api.get(
      `/Desktop/GetAllApplicantStatus`
    );
    if (data.IsSucceed) {
      dispatch({
        type:GET_APPLICANT_STATUS_SUCCESS,
        payload: data,
      });
    }
    else{
      messageError(data.Message)
    }
  } catch (error:any) {
    dispatch({
      type: GET_APPLICANT_STATUS_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};