import {
    NOTIFICATIONS_LIST,
    NOTIFICATIONS_LIST_SUCCESS,
    NOTIFICATIONS_LIST_FAILD,
    SUBMIT_NOTIFICATIONS,
    SUBMIT_NOTIFICATIONS_SUCCESS,
    SUBMIT_NOTIFICATIONS_FAILD,
    NOTIFICATIONS_DETAILS,
    NOTIFICATIONS_DETAILS_SUCCESS,
    NOTIFICATIONS_DETAILS_FAILD
  } from "../../../constant/desktop";
  import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";

//دریافت لیست اعلامیه ها برای میز کار
export const fetchAllNotifications = (requestBody: any) => async (
    dispatch: any
  ) => {
    try {
      dispatch({
        type: NOTIFICATIONS_LIST,
      });
      const { data } = await api.post(
        `/Notice/GetAllActiveForGrid`,
        requestBody
      );
  
      dispatch({
        type: NOTIFICATIONS_LIST_SUCCESS,
        payload: data,
      });
      if (data.IsSucceed) {
      } else {
        messageError(data.Message);
      }
    } catch (error:any) {
      messageError("خطایی در سرور رخ داده است");
      dispatch({
        type: NOTIFICATIONS_LIST_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  //دریافت لیست اعلامیه ها برای سامانه اصلی
export const fetchGetForGridNotifications = (requestBody: any) => async (
    dispatch: any
  ) => {
    try {
      dispatch({
        type: NOTIFICATIONS_LIST,
      });
      const { data } = await api.post(
        `/Notice/GetForGrid`,
        requestBody
      );
  
      dispatch({
        type: NOTIFICATIONS_LIST_SUCCESS,
        payload: data,
      });
      if (data.IsSucceed) {
      } else {
        messageError(data.Message);
      }
    } catch (error:any) {
      messageError("خطایی در سرور رخ داده است");
      dispatch({
        type: NOTIFICATIONS_LIST_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  //ارسال لیست اعلامیه ها 
export const submitNotifications = (requestBody: any,close:any,modelRequest:any) => async (
    dispatch: any
  ) => {
    try {
      dispatch({
        type: SUBMIT_NOTIFICATIONS,
      });
      const { data } = await api.post(
        `/Notice`,
        requestBody
      );
  
      dispatch({
        type: SUBMIT_NOTIFICATIONS_SUCCESS,
        payload: data,
      });
      if (data.IsSucceed) {
        close()
        dispatch(fetchGetForGridNotifications(modelRequest))
        messageSuccess("با موفقیت ثبت شد")
     
      } else {
        messageError(data.Message);
      }
    } catch (error:any) {
      messageError("خطایی در سرور رخ داده است");
      dispatch({
        type: SUBMIT_NOTIFICATIONS_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // ویرایش
export const editNotifications = (requestBody: any,close:any,modelRequest:any) => async (
    dispatch: any
  ) => {
    try {
      dispatch({
        type: SUBMIT_NOTIFICATIONS,
      });
      const { data } = await api.put(
        `/Notice`,
        requestBody
      );
  
      dispatch({
        type: SUBMIT_NOTIFICATIONS_SUCCESS,
        payload: data,
      });
      if (data.IsSucceed) {
        close()
        dispatch(fetchGetForGridNotifications(modelRequest))
        messageSuccess("با موفقیت ثبت شد")
     
      } else {
        messageError(data.Message);
      }
    } catch (error:any) {
      messageError("خطایی در سرور رخ داده است");
      dispatch({
        type: SUBMIT_NOTIFICATIONS_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  //دریافت اطلاعات اعلامیه ها 
export const getNotificationDetails = (id:number) => async (
    dispatch: any
  ) => {
    try {
      dispatch({
        type: NOTIFICATIONS_DETAILS,
      });
      const { data } = await api.get(
        `/Notice/${id}`,
      
      );
  
      dispatch({
        type: NOTIFICATIONS_DETAILS_SUCCESS,
        payload: data,
      });
      if (data.IsSucceed) {
   
     
      } else {
        messageError(data.Message);
      }
    } catch (error:any) {
      messageError("خطایی در سرور رخ داده است");
      dispatch({
        type: NOTIFICATIONS_DETAILS_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const removeNotificationDetails=()=>(dispatch:any)=>{
    dispatch({
      type:"REMOVE_NOTIFICTION",
   
    });
  }