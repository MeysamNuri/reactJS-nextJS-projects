import {
  FETCH_COMPANY_BASE_INFO_LEGAL,
  FETCH_COMPANY_BASE_INFO_LEGAL_SUCCESS,
  FETCH_COMPANY_BASE_INFO_LEGAL_FAILED,
  EDIT_COMPANY_BASE_INFO_LEGAL,
  EDIT_COMPANY_BASE_INFO_LEGAL_SUCCESS,
  EDIT_COMPANY_BASE_INFO_LEGAL_FAILED,
  FETCH_ADJUSTER_COMPANY_INFO_LEGAL,
  FETCH_ADJUSTER_COMPANY_INFO_LEGAL_SUCCESS,
  FETCH_ADJUSTER_COMPANY_INFO_LEGAL_FAILED
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from '../../../utils/utils';

export const fetchLegalCompanyBaseInfo = (applicantId: number | undefined, s1: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL,
      payload: applicantId,
    });
    const { data } = await api.get(`/admission/cartable/company-base-info/${applicantId}`);
    if (data.IsSucceed === false) {
      messageError(data.Message);
    } else {
      s1()
    }
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL_FAILED,
      payload: error.response && error.response.data.Error.Message
    });
  }
};
//دریافت اطلاعات حقیقی
export const fetchNaturalCompanyInfo = (applicantId: number | undefined, s1: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL,
      payload: applicantId,
    });
    const { data } = await api.get(`/applicant/BaseInfo/${applicantId}`);
    if (data.IsSucceed === false) {
      messageError(data.Message);
    } else {
      s1()
    }
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL_FAILED,
      payload: error.response && error.response.data.Error.Message
    });
  }
};
//دریافت اطلاعات حقیقی
export const changePasswordAPI = (id: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: "CAHNGE_PASSWORD_API",

    });
    const { data } = await api.get(`/user/ResetPassword/${id}`);
    if (data.IsSucceed) {
      dispatch({
        type: "CAHNGE_PASSWORD_API_SUCCESS",
        payload: data,
      });
      messageSuccess("رمز با موفقیت بازنشانی و پیامک گردید")
    }
    else if (data.IsSucceed === false) {
      messageError(data.Message);
      dispatch({
        type: "CAHNGE_PASSWORD_API_FAILED",
      
      });
    }

  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: "CAHNGE_PASSWORD_API_FAILED",
      payload: error.response && error.response.data.Error.Message
    });
  }
};
export const fetchCompanyInfoFromAdjusterDesktop = (s1: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL,

    });
    const { data } = await api.get(`/AdjusterDesktop/BaseInfo`);
    if (data.IsSucceed === false) {
      messageError(data.Message);
    } else {
      s1()
    }
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: FETCH_COMPANY_BASE_INFO_LEGAL_FAILED,
      payload: error.response && error.response?.data?.Error?.Message
    });
  }
};

// دریافت اطلاعات شرکت حقوقی
export const fetchAdjusterCompanyInfo = (id: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: FETCH_ADJUSTER_COMPANY_INFO_LEGAL,

    });
    const { data } = await api.get(`/AdjustmentCompanyInfo/GetByApplicantId/${id}`);
    if (data.IsSucceed === false) {
      messageError(data.Message);
    }
    dispatch({
      type: FETCH_ADJUSTER_COMPANY_INFO_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: FETCH_ADJUSTER_COMPANY_INFO_LEGAL_FAILED,
      payload: error.response && error.response?.data?.Error?.Message
    });
  }
};


 
//ویرایش اطلاعات حقوقی
export const editLegalCompanyBaseInfo = (dataInfo: any, closeModal: any, fetchList: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: EDIT_COMPANY_BASE_INFO_LEGAL,
    });
    const { data } = await api.post(
      `/admission/cartable/company-base-info`, dataInfo
    );
    if (data.IsSucceed == true) {
      messageSuccess("اطلاعات با موفقیت ویرایش گردید");
      closeModal()
      fetchList()

    } else {
      messageError(data.Message)
    }

    dispatch({
      type: EDIT_COMPANY_BASE_INFO_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطایی در سمت سرور رخ داده است")
    dispatch({
      type: EDIT_COMPANY_BASE_INFO_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//ویرایش اطلاعات حقیقی
export const editNaturalCompanyInfo = (dataInfo: any, closeModal: any, fetchList: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: EDIT_COMPANY_BASE_INFO_LEGAL,
    });
    const { data } = await api.post(
      `/applicant/BaseInfo`, dataInfo
    );
    if (data.IsSucceed == true) {
      messageSuccess("اطلاعات با موفقیت ویرایش گردید");
      closeModal()
      fetchList()

    } else {
      messageError(data.Message)
    }

    dispatch({
      type: EDIT_COMPANY_BASE_INFO_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطایی در سمت سرور رخ داده است")
    dispatch({
      type: EDIT_COMPANY_BASE_INFO_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
