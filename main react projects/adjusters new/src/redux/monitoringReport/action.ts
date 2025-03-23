import {
    VIEW_MONITORING_REPORT,
    VIEW_MONITORING_REPORT_SUCCESS,
    VIEW_MONITORING_REPORT_FAILD,

  } from "../../constant/desktop";
  import { api } from "../../httpServices/service";
  import { messageError, messageSuccess } from "../../utils/utils";
export const fetchMonitoringReportInfo = (requestBody: any) => async (
    dispatch: any
  ) => {
    try {
      dispatch({
        type: VIEW_MONITORING_REPORT,
      });
      const { data } = await api.post(
        `/report/ManagemenCartableReport`,
        requestBody
      );
  
      dispatch({
        type: VIEW_MONITORING_REPORT_SUCCESS,
        payload: data,
      });
      if (data.IsSucceed) {
      } else {
        messageError(data.Message);
      }
    } catch (error:any) {
      messageError("خطایی در سرور رخ داده است");
      dispatch({
        type: VIEW_MONITORING_REPORT_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };