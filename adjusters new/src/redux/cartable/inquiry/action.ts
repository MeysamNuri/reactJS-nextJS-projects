import {
  INQUIRY_PAJOOHESHKADEH,
  INQUIRY_PAJOOHESHKADEH_SUCCESS,
  INQUIRY_PAJOOHESHKADEH_FAILD,
  INQUIRY_CERTIFICATIN_TRAINING,
  INQUIRY_CERTIFICATIN_TRAINING_SUCCESS,
  INQUIRY_CERTIFICATIN_TRAINING_FAILD,
  INQUIRY_LEAGACY,
  INQUIRY_LEAGACY_SUCCESS,
  INQUIRY_LEAGACY_FAILD,
  INQUIRU_LIST,
  INQUIRU_LIST_SUCCESS,
  INQUIRU_LIST_FAILD
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";

//استعلام پژوهشکده
export const fetchPajooheshkadeInquiry = (
  applicantId?:number,
  nationalCode?: string,
  certificateNo?: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: INQUIRY_PAJOOHESHKADEH,
    });
    const { data } = await api.get(
      `inquiry/pajooheshkadeh/applicant/${applicantId}/${nationalCode}/80hour/${certificateNo}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("استعلام موفقیت آمیز بود");
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: INQUIRY_PAJOOHESHKADEH_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: INQUIRY_PAJOOHESHKADEH_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//استعلام گواهینامه آموزشی
export const fetchCertificateInquiry = (applicantId?:number, certificateNo?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: INQUIRY_CERTIFICATIN_TRAINING,
    });
    const { data } = await api.get(`inquiry/applicant/${applicantId}/${certificateNo}`);
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:image${data?.Result?.FileExtension};base64,${data?.Result?.Image}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: INQUIRY_CERTIFICATIN_TRAINING_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: INQUIRY_CERTIFICATIN_TRAINING_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//استعلام سوابق کاری
export const fetchinquiryLegacy = (applicantId?:number,nationalCode?: string) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: INQUIRY_LEAGACY,
    });
    const { data } = await api.get(`/inquiry/applicant/${applicantId}/legacy/${nationalCode}`);
    if (data.IsSucceed === true) {
      // messageSuccess("استعلام موفقیت آمیز بود");
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: INQUIRY_LEAGACY_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: INQUIRY_LEAGACY_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//لیست سوابق استعلام
export const fetchinquiryList = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: INQUIRU_LIST,
    });
    const { data } = await api.get(`/inquiry/applicant/${applicantId}/list`);
    if (data.IsSucceed === true) {
      // messageSuccess("استعلام موفقیت آمیز بود");
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: INQUIRU_LIST_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError("خطای در سمت سرور رخ داده است");
    dispatch({
      type: INQUIRU_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
