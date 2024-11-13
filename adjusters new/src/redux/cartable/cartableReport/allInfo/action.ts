import {
  CARTABLE_REPORT_ALL_INFO,
  CARTABLE_REPORT_ALL_INFO_SUCCESS,
  CARTABLE_REPORT_ALL_INFO_FAILED,
  CARTABLE_REPORT_ALL_INFO_EXCEL,
  CARTABLE_REPORT_ALL_INFO_EXCEL_SUCCESS,
  CARTABLE_MANAGEMENT_EXCEL,
  CARTABLE_MANAGEMENT_EXCEL_SUCCESS,
  CARTABLE_MANAGEMENT_EXCEL_FAILED,
  CARTABLE_REPORT_ALL_INFO_EXCEL_FAILED,
  REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR,
  REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_SUCCESS,
  REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_FAILED,
  REPORT_LEGAL_EXISTING_EVALUATOR,
  REPORT_LEGAL_EXISTING_EVALUATOR_SUCCESS,
  REPORT_LEGAL_EXISTING_EVALUATOR_FAILED,
  STATISTIC_REPORT_ALL_INFO,
  STATISTIC_REPORT_ALL_INFO_SUCCESS,
  STATISTIC_REPORT_ALL_INFO_FAILED,
  APPLICANT_FORBIDDEN_CARTABLE_INFO,
  APPLICANT_FORBIDDEN_CARTABLE_INFO_SUCCESS,
  APPLICANT_FORBIDDEN_CARTABLE_INFO_FAILED,
 
} from "../../../../constant/cartableActionTypes";
import { api } from "../../../../httpServices/service";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { messageError, messageSuccess } from "../../../../utils/utils";

//گزارشات کارتابل
export const cartableReportAllInfo = ( 
  cartableReport: any,
  adjType: number,
  closeModal: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: CARTABLE_REPORT_ALL_INFO,
    });

    let data: any;
    if (adjType === adjusterType.legal) {
      data = await api.post(`/report/legal`, cartableReport);
    } else {
      data = await api.post(
        `/report/natural-judicial/${adjType}`,
        cartableReport
      );
    }

    if (data.data.IsSucceed === true) {
      closeModal();
    } else {
      messageError(data.data.Message);
    }
    dispatch({
      type: CARTABLE_REPORT_ALL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: CARTABLE_REPORT_ALL_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// دانلوداکسل گزارشات
export const dlcartableReportExcel = (
  cartableReport: any,
  adjType: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: CARTABLE_REPORT_ALL_INFO_EXCEL,
    });

    const { data } = await api.post(
      `/report/natural-judicial/${adjType}/export-to-excel`,
      cartableReport
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:${data?.Result?.Content};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: CARTABLE_REPORT_ALL_INFO_EXCEL_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: CARTABLE_REPORT_ALL_INFO_EXCEL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  دانلوداکسل گزارشات آماری
export const statisticReportExcel = (
  modelReport: any,
) => async (dispatch: any) => {
  try {
    dispatch({
      type: STATISTIC_REPORT_ALL_INFO,
    });

    const { data } = await api.post(
      `/report/Statisical-Reports/export-to-excel`,
      modelReport
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:${data?.Result?.Content};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: STATISTIC_REPORT_ALL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: STATISTIC_REPORT_ALL_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// cartable management excel download=====================

export const cartableMangementExcelDownload = (
  cartableManagement: any,
  adjType: string
) => async (dispatch: any) => {
  try {
    dispatch({
      type: CARTABLE_MANAGEMENT_EXCEL,
    });

    const { data } = await api.post(
      `/report/natural-judicial-for-existing-evaluator/${adjType}/export-to-excel`,
      cartableManagement
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:${data?.Result?.Content};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: CARTABLE_MANAGEMENT_EXCEL_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: CARTABLE_MANAGEMENT_EXCEL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//end========

//کارتابل شاخص ها
export const fetchApplicantForbiddneInfo = (
  cartableReport: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_FORBIDDEN_CARTABLE_INFO,
    });
    const { data } = await api.post(
      `/ApplicantForbidden/GetForGrid`,
      cartableReport
    );

    if (data.IsSucceed === true) {
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: APPLICANT_FORBIDDEN_CARTABLE_INFO_SUCCESS,
      payload: data,
    });
  } catch (error:any) {

    messageError(error.response?.data.Error.Message);
    dispatch({
      type: APPLICANT_FORBIDDEN_CARTABLE_INFO_FAILED,
      payload: error.response?.data.Error.Message,
    });
  }
};

//کارتابل مدیریت حقیقی و دادگستری
export const fetchNaturalJudicalExistingEvaluator = (
  cartableReport: any,
  adjType: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR,
    });

    let data: any;
    if (adjType === adjusterType.legal) {
      data = await api.post(`/report/legal`, cartableReport);
    } else {
      data = await api.post(
        `/report/natural-judicial-for-existing-evaluator/${adjType}`,
        cartableReport
      );
    }

    if (data.data.IsSucceed === true) {
    } else {
      messageError(data.data.Message);
    }
    dispatch({
      type: REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_FAILED,
      payload: error.response.data.Error.Message,
    });
  }
};

// کارتابل مدیریت حقوقی
export const fetchLegalExistingEvaluator = (cartableReport: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: REPORT_LEGAL_EXISTING_EVALUATOR,
    });
    const { data } = await api.post(
      `/report/legal-for-existing-evaluator`,cartableReport
    );
    dispatch({
      type: REPORT_LEGAL_EXISTING_EVALUATOR_SUCCESS,
      payload: data,
    
    });
  } catch (error: any) {
    dispatch({
      type: REPORT_LEGAL_EXISTING_EVALUATOR_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
