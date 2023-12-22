import {
  SMS_OUT_BOX_LIST,
  SMS_OUT_BOX_LIST_SUCCESS,
  SMS_OUT_BOX_LIST_FAILD,
  SMS_OUT_BOX_LIST_APPLICANT_ID,
  SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS,
  SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD,
  SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID,
  SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS,
  SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD,
  SUPERVISION_SMS_OUT_BOX_LIST,
  SUPERVISION_SMS_OUT_BOX_LIST_SUCCESS,
  SUPERVISION_SMS_OUT_BOX_LIST_FAILD,
  SMS_SEND_SPECIFIC_TYPE,
  SMS_SEND_SPECIFIC_TYPE_SUCCESS,
  SMS_SEND_SPECIFIC_TYPE_FAILD

} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageError,messageSuccess } from "../../../utils/utils";

//لیست پیام های خروجی
export const fetchSmsOutBoxList = (smsOutBox: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: SMS_OUT_BOX_LIST,
    });
    const { data } = await api.post(`Supervision/sms-out-box-page-for-applicant`, smsOutBox);
    if (data.IsSucceed === false) {
      messageError(data.Message);
    }
    dispatch({
      type: SMS_OUT_BOX_LIST_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: SMS_OUT_BOX_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//پیامک گروهی انبوه
export const sendSmsSpecificType = (smsOutBox: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: SMS_SEND_SPECIFIC_TYPE,
    });
    const { data } = await api.post(`Supervision/sms-batch-send_SpecificType`, smsOutBox);
    dispatch({
      type: SMS_SEND_SPECIFIC_TYPE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("پیامک با موفقیت ارسال شد");
    }
    else{
      messageError(data.Message);
    }
   
  } catch (error:any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: SMS_SEND_SPECIFIC_TYPE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//لیست پیامهای خروجی هر ارزیاب
export const fetchSmsOutBoxListApplicantId = (smsBodyApplicant?: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: SMS_OUT_BOX_LIST_APPLICANT_ID,
    });
    const { data } = await api.post(
      `/sms-out-box-page-for-applicant`,
      smsBodyApplicant
    );
    dispatch({
      type: SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//لیست پیامک های کارتابل مدیریت
export const fetchSupervisionSmsOutBoxListApplicantId = (smsBodyApplicant?: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID,
    });
    const { data } = await api.post(
      `/Supervision/sms-out-box-page-for-applicant`,
      smsBodyApplicant
    );
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//لیست پیامک های نظارت
export const fetchSupervisionSmsOutBoxList = (smsBodyApplicant?: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST,
    });
    const { data } = await api.post(
      `/Supervision/sms-out-box-page`,
      smsBodyApplicant
    );
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//لیست پیامک های پذیرش
export const fetchAddmissionSmsOutBoxList = (smsBodyApplicant?: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST,
    });
    const { data } = await api.post(
      `/sms-out-box-page`,
      smsBodyApplicant
    );
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: SUPERVISION_SMS_OUT_BOX_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};