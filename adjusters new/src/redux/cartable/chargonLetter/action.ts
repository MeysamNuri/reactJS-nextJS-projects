import {
  CHARGON_LETTER,
  CHARGON_LETTER_SUCCESS,
  CHARGON_LETTER_FAILD,
  SUBMIT_CHARGON,
  SUBMIT_CHARGON_SUCCESS,
  SUBMIT_CHARGON_FAILD,
  LICENCE_ISSU,
  LICENCE_ISSU_SUCCESS,
  LICENCE_ISSU_FAILD,
  EXTEND_CHARGON_LETTER,
  EXTEND_CHARGON_LETTER_SUCCESS,
  EXTEND_CHARGON_LETTER_FAILD,
  CONFIRM_CHARGON_LETTER,
  CONFIRM_CHARGON_LETTER_SUCCESS,
  CONFIRM_CHARGON_LETTER_FAILD
  
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageSuccess, messageError } from "../../../utils/utils";

//دانلود نامه چارگون
export const downloadChargonLetter = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: CHARGON_LETTER,
      payload: applicantId,
    });
    const { data } = await api.get(
      `/license/${applicantId}/ChargonLetter/content`
    );
    if (data.IsSucceed === true) {
      messageSuccess("دانلود نامه چارگون با موفقیت انجام شد");
      const linkSource = `data:${data.Result?.ContentType};base64,${data.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data.Result?.Title}.${data.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: CHARGON_LETTER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: CHARGON_LETTER_FAILD,
      payload: error.response && error.response.data.Error.Message
        
    });
  }
};


//دانلود تمدید نامه
export const downloadExtendChargonLetter = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: EXTEND_CHARGON_LETTER,
      payload: applicantId,
    });
    const { data } = await api.get(
      `/chargoon-extend/applicant/${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("دانلود تمدید نامه با موفقیت انجام شد");
      const linkSource = `data:${data.Result?.ContentType};base64,${data.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data.Result?.Title}.${data.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: EXTEND_CHARGON_LETTER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: EXTEND_CHARGON_LETTER_FAILD,
      payload: error.response && error.response.data.Error.Message
        
    });
  }
};


//ثبت چارگون
export const submitChargonOperation = (applicantId?: number,fetchList?:any,closePopConfirm?:any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: SUBMIT_CHARGON,
    });
    const { data } = await api.get(`/chargoon/applicant/${applicantId}`);
    
    if (data.IsSucceed === true) {
      messageSuccess("ثبت چارگون با موفقیت انجام شد");
      fetchList()
      closePopConfirm()
    } else {
      messageError(data.Message);
      fetchList()
    }
    dispatch({
      type: SUBMIT_CHARGON_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: SUBMIT_CHARGON_FAILD,
      payload:  error.response && error.response.data.Error.Message
  
    });
  }
};

//تایید چارگون
export const confirmChargonLetter = (id:any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: CONFIRM_CHARGON_LETTER,
    });
    const { data } = await api.get(`/chargoon-extend/ConfirmExtendedLetter/${id}`);
    dispatch({
      type: CONFIRM_CHARGON_LETTER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("تأیید چارگون با موفقیت انجام شد");
    
    } else {
      messageError(data.Message);
   
    }
  
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: CONFIRM_CHARGON_LETTER_FAILD,
      payload:  error.response && error.response.data.Error.Message
  
    });
  }
};

//صدور کد ارزیابی
export const licenseIssuOperation = (
  //adjusterTypeId: number,
  applicantId: number,
  successFunction: () => void,
  successFunction2: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LICENCE_ISSU,
      payload: applicantId,
    });
    const { data } = await api.get(
      `license/issu/${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("کد ارزیابی با موفقیت صادر گردید");
      successFunction();
      successFunction2()
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: LICENCE_ISSU_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: LICENCE_ISSU_FAILD,
      payload:  error.response && error.response.data.Error.Message
  
    });
  }
};

//دانلود نامه چارگون میزکار ارزیاب
export const downloadAdjusterDesktopChargonLetter = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: CHARGON_LETTER,
      payload: applicantId,
    });
    const { data } = await api.get(
      `/AdjusterDesktop/ChargonLetter`
    );
    if (data.IsSucceed === true) {
      messageSuccess("دانلود نامه چارگون با موفقیت انجام شد");
      const linkSource = `data:${data.Result?.ContentType};base64,${data.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data.Result?.Title}.${data.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: CHARGON_LETTER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: CHARGON_LETTER_FAILD,
      payload: error.response && error.response.data.Error.Message
        
    });
  }
};