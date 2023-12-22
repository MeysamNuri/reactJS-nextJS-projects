import { api } from "../../httpServices/service";
import { messageSuccess, messageError } from "../../utils/utils";
import {ACTIVE_ADJUSTERS,ACTIVE_ADJUSTERS_SUCCESS,ACTIVE_ADJUSTERS_FAILD,
  ACTIVE_ADJUSTER_EXCEL,
  ACTIVE_ADJUSTER_EXCEL_SUCCESS,
  ACTIVE_ADJUSTER_EXCEL_FAILED
} from "../../constant/actionTypes";

export const fetchActiveAdjuster=(requestBody:any)=>async (dispatch:any)=>{
   try{
    dispatch({
        type:ACTIVE_ADJUSTERS
    })
    const {data}=await api.post(`/report/GetActiveAdjuterForGrid`,requestBody)
    dispatch({
        type: ACTIVE_ADJUSTERS_SUCCESS,
        payload: data,
      });
   }catch(error:any){
    dispatch({
        type: ACTIVE_ADJUSTERS_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      }); 
   }
}
export const exportToExcelActiveAdjusters = (
  cartableManagement: any,
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ACTIVE_ADJUSTER_EXCEL,
    });

    const { data } = await api.post(
      `/report/GetActiveAdjuterForGrid/ExportToExcel`,
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
      type: ACTIVE_ADJUSTER_EXCEL_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: ACTIVE_ADJUSTER_EXCEL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// خروجی اکسل کارتابل شعب
export const exportToExcelApplicantWorkLocation = (
  requestBody: any,
) => async (dispatch: any) => {
  try {
    dispatch({
      type: "APPLICANT_WORK_LOCATION_EXCEL_INFO",
    });

    const { data } = await api.post(
      `/report/ApplicantWorkLocationInfo-Reports/export-to-excel`,
      requestBody
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
      type: "APPLICANT_WORK_LOCATION_EXCEL_INFO_SUCCES",
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: "APPLICANT_WORK_LOCATION_EXCEL_INFO_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// خروجی اکسل کارتابل گزارشات+
export const exportToExcelMonitoringReports= (
  requestBody: any,
) => async (dispatch: any) => {
  try {
    dispatch({
      type: "MONITORING_REPORT_EXCEL_INFO",
    });

    const { data } = await api.post(
      `/report/monitoring-Reports/export-to-excel`,
      requestBody
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
      type: "MONITORING_REPORT_EXCEL_INFO_SUCCES",
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: "MONITORING_REPORT_EXCEL_INFO_FAILED",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
