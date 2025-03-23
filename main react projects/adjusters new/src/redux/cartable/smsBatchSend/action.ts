import {
  SMS_BATCH_SEND,
  SMS_BATCH_SEND_SUCCESS,
  SMS_BATCH_SEND_FAILD,
  SMS_BATCH_SEND_REPORT_CARTABLE,
  SMS_BATCH_SEND_REPORT_CARTABLE_SUCCESS,
  SMS_BATCH_SEND_REPORT_CARTABLE_FAILD,
  SUPERVISION_SMS_BATCH_SEND,
  SUPERVISION_SMS_BATCH_SEND_SUCCESS,
  SUPERVISION_SMS_BATCH_SEND_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
// import { IOneBatchSmsSend } from "../../../shared/ulitities/Model/sms";
import { messageSuccess, messageError } from "../../../utils/utils";

//ارسال پیامک های گروهی
export const smsBatchsendAction = (
  sms: any,
  closeModal: any,
  removeSubject: any,
  removeBody: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: SMS_BATCH_SEND,
    });
    const { data } = await api.post(`/sms-batch-send`, sms);
    if (data.IsSucceed === true) {
      closeModal();
      removeSubject();
      removeBody();
      messageSuccess("پیامک با موفقیت ارسال گردید");
    } else {
      messageError("ارسال پیامک با خطا مواجه گردید");
    }

    dispatch({
      type: SMS_BATCH_SEND_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: SMS_BATCH_SEND_FAILD,
      payload: error.response && error.response.data.Error.Message,
    });
  }
};

// گزارش ارسال پیامک های گروهی
export const smsBatchsendReportAction = (
  sms: any,
  closeModal: any,
  removeSubject: any,
  removeBody: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: SMS_BATCH_SEND_REPORT_CARTABLE,
    });
    const { data } = await api.post(`/sms-batch-send-report-cartable`, sms);
    if (data.IsSucceed === true) {
      closeModal();
      removeSubject();
      removeBody();
      messageSuccess("پیام با موفقیت ارسال گردید");
    } else {
      messageError(data?.Message);
    }

    dispatch({
      type: SMS_BATCH_SEND_REPORT_CARTABLE_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: SMS_BATCH_SEND_REPORT_CARTABLE_FAILD,
      payload: error.response && error.response.data.Error.Message,
    });
  }
};

// ارسال پیامک گروهی در کارتابل مدیریت
export const supervisionSmsBatchSendAction = (
  sms: any,
  closeModal: any,
  removeSubject: any,
  removeBody: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: SUPERVISION_SMS_BATCH_SEND,
    });
    const { data } = await api.post(`/Supervision/sms-batch-send`, sms);
    if (data.IsSucceed === true) {
      closeModal();
      removeSubject();
      removeBody();
      messageSuccess("پیامک با موفقیت ارسال گردید");
    } else {
      messageError(data?.Message);
    }

    dispatch({
      type: SUPERVISION_SMS_BATCH_SEND_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: SUPERVISION_SMS_BATCH_SEND_FAILD,
      payload: error.response && error.response.data.Error.Message,
    });
  }
};
// ارسال پیام گروهی در کارتابل مدیریت
export const supervisionMessageGroupSendAction = (
  sms: any,
  closeModal: any,
  removeBody: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: SUPERVISION_SMS_BATCH_SEND,
    });
    const { data } = await api.post(`/Message/SendBatch`, sms);
    if (data.IsSucceed === true) {
      closeModal();
      removeBody();
      messageSuccess("پیامک با موفقیت ارسال گردید");
    } else {
      messageError(data?.Message);
    }

    dispatch({
      type: SUPERVISION_SMS_BATCH_SEND_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: SUPERVISION_SMS_BATCH_SEND_FAILD,
      payload: error.response && error.response.data.Error.Message,
    });
  }
};
// ارسال پیام انبوه در کارتابل مدیریت
export const sendBatchSpecificType = (
  sms: any,

) => async (dispatch: any) => {
  try {
    dispatch({
      type: "SEND_BATCH_SPECIFIC_TYPE",
    });
    const { data } = await api.post(`/Message/SendBatchSpecificType`, sms);
    if (data.IsSucceed === true) {
  
      messageSuccess("پیام با موفقیت ارسال گردید");
    } else {
      messageError(data?.Message);
    }

    dispatch({
      type: "SEND_BATCH_SPECIFIC_TYPE_SUCCESS",
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: "SEND_BATCH_SPECIFIC_TYPE_FAILD",
      payload: error.response && error.response.data.Error.Message,
    });
  }
};
