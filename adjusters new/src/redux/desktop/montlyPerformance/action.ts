import {
  ADD_MONTHLY_PERFORMANCE,
  ADD_MONTHLY_PERFORMANCE_SUCCESS,
  ADD_MONTHLY_PERFORMANCE_FAILD,
  VIEW_MONTHLY_PERFORMANCE,
  VIEW_MONTHLY_PERFORMANCE_SUCCESS,
  VIEW_MONTHLY_PERFORMANCE_FAILD,
  MONTHLY_PERFORMANCE_ID,
  MONTHLY_PERFORMANCE_ID_SUCCESS,
  MONTHLY_PERFORMANCE_ID_FAILD,
  EDIT_MONTHLY_PERFORMANCE,
  EDIT_MONTHLY_PERFORMANCE_SUCCESS,
  EDIT_MONTHLY_PERFORMANCE_FAILD,
  VIEW_MY_MONTHLY_PERFORMANCE,
  VIEW_MY_MONTHLY_PERFORMANCE_SUCCESS,
  VIEW_MY_MONTHLY_PERFORMANCE_FAILD,
  Remove_MONTHLY_PERFORMANCE,
  Remove_MONTHLY_PERFORMANCE_SUCCESS,
  Remove_MONTHLY_PERFORMANCE_FAILD,
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";
import { IAddMonthlyPerformance } from "../../../shared/ulitities/Model/desktop/monthlyPerformance";

//ایجاد عملکرد
export const addMonthlyPerformance = (
  monthlyPerformance: IAddMonthlyPerformance,
  closeModal: () => void,
  modelMonthlePerformance: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_MONTHLY_PERFORMANCE,
    });
    const { data } = await api.post(`/MonthlyPerformance`, monthlyPerformance);

    dispatch({
      type: ADD_MONTHLY_PERFORMANCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("عملکرد با موفقیت ثبت گردید.");
      closeModal();
      dispatch(fetchMyMonthlyPerformance(modelMonthlePerformance));
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: ADD_MONTHLY_PERFORMANCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//مشاهده لیست عملکرد
export const fetchMonthlyPerformance = (ModelMonthlyPerformance: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: VIEW_MONTHLY_PERFORMANCE,
    });
    const { data } = await api.post(
      `/MonthlyPerformance/GetForGrid`,
      ModelMonthlyPerformance
    );

    dispatch({
      type: VIEW_MONTHLY_PERFORMANCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: VIEW_MONTHLY_PERFORMANCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//مشاهده لیست عملکردهای من
export const fetchMyMonthlyPerformance = (
  ModelMonthlyPerformance: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: VIEW_MY_MONTHLY_PERFORMANCE,
    });
    const { data } = await api.post(
      `/MonthlyPerformance/GetMyMonthlyPerformanceForGrid`,
      ModelMonthlyPerformance
    );

    dispatch({
      type: VIEW_MY_MONTHLY_PERFORMANCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      messageError(data.Message);
    }
  } catch (error:any){
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: VIEW_MY_MONTHLY_PERFORMANCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//هر عملکرد ثبت شده
export const fetchMonthlyPerformanceId = (id: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: MONTHLY_PERFORMANCE_ID,
      payload: id,
    });
    const { data } = await api.get(`/MonthlyPerformance/${id}`);

    dispatch({
      type: MONTHLY_PERFORMANCE_ID_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      // messageSuccess("عملکرد با موفقیت ثبت گردید.")
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: MONTHLY_PERFORMANCE_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//ویرایش عملکرد
export const editMonthlyPerformance = (
  monthlyPerformance: IAddMonthlyPerformance,
  closeModal: () => void,
  modelMonthlyPerformance: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: EDIT_MONTHLY_PERFORMANCE,
    });
    const { data } = await api.post(`/MonthlyPerformance/Update`, monthlyPerformance);

    dispatch({
      type: EDIT_MONTHLY_PERFORMANCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("عملکرد با موفقیت ویرایش شد");
      closeModal();
      dispatch(fetchMyMonthlyPerformance(modelMonthlyPerformance));
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: EDIT_MONTHLY_PERFORMANCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//حذف عملکرد
export const removeMonthlyPerformance = (
id:any,

) => async (dispatch: any) => {
  try {
    dispatch({
      type: Remove_MONTHLY_PERFORMANCE,
    });
    const { data } = await api.post(`/MonthlyPerformance/Delete/${id}`);

    dispatch({
      type: Remove_MONTHLY_PERFORMANCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("عملکرد با موفقیت حذف شد");
     
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: Remove_MONTHLY_PERFORMANCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};