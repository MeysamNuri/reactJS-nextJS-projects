
import {
    FORBIDDEN_POSITION_INFO,
    FORBIDDEN_POSITION_INFO_SUCCESS,
    FORBIDDEN_POSITION_INFO_FAILED,
    FORBIDDEN_SOURCE_POSITION_INFO,
    FORBIDDEN_SOURCE_POSITION_INFO_SUCCESS,
    FORBIDDEN_SOURCE_POSITION_INFO_FAILED,
    FORBIDDEN_SUBMIT_BASE_INFO,
    FORBIDDEN_SUBMIT_BASE_INFO_SUCCESS,
    FORBIDDEN_SUBMIT_BASE_INFO_FAILED,
    FORBIDDEN_BASE_INFO_LIST,
    FORBIDDEN_BASE_INFO_LIST_SUCCESS,
    FORBIDDEN_BASE_INFO_LIST_FAILED,
    APPLICANT_FORBIDDEN_REPORT,
    APPLICANT_FORBIDDEN_REPORT_SUCCESS,
    APPLICANT_FORBIDDEN_REPORT_FAILED
  } from "../../constant/cartableActionTypes";
import { api } from "../../httpServices/service";
import { messageError, messageSuccess } from "../../utils/utils";

//سرویس سمت شاخص ها
export const applicantForbiddnPosition = (

  ) => async (dispatch: any) => {
    try {
      dispatch({
        type: FORBIDDEN_POSITION_INFO,
      });
      const { data } = await api.get(
        `/Forbidden/Position`
      );
  
      if (data.IsSucceed === true) {
      } else {
        messageError(data.Message);
      }
      dispatch({
        type: FORBIDDEN_POSITION_INFO_SUCCESS,
        payload: data,
      });
    } catch (error:any) {
  
      messageError(error.response?.data.Error.Message);
      dispatch({
        type: FORBIDDEN_POSITION_INFO_FAILED,
        payload: error.response?.data.Error.Message,
      });
    }
  };
  //گزارش شاخص ها
export const fetchApplicantForbiddenReport = (
  year: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_FORBIDDEN_REPORT,
    });
    const { data } = await api.get(
      `/ApplicantForbidden/Report/${year}`
    );

    if (data.IsSucceed === true) {
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: APPLICANT_FORBIDDEN_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error:any) {

    messageError(error.response?.data.Error.Message);
    dispatch({
      type: APPLICANT_FORBIDDEN_REPORT_FAILED,
      payload: error.response?.data.Error.Message,
    });
  }
};
//سرویس منبع شاخص ها
export const applicantForbiddnSourcePosition = (

  ) => async (dispatch: any) => {
    try {
      dispatch({
        type: FORBIDDEN_SOURCE_POSITION_INFO,
      });
      const { data } = await api.get(
        `/Forbidden/SourcePosition`
      );
  
      if (data.IsSucceed === true) {
    
      } else {
        messageError(data.Message);
      }
      dispatch({
        type: FORBIDDEN_SOURCE_POSITION_INFO_SUCCESS,
        payload: data,
      });
    } catch (error:any) {
  
      messageError(error.response?.data.Error.Message);
      dispatch({
        type: FORBIDDEN_SOURCE_POSITION_INFO_FAILED,
        payload: error.response?.data.Error.Message,
      });
    }
  };


  //ثبت اطلاعات پایه شاخص ها
export const forbiddenBaseInfo = (
    reauestBody:any
  ) => async (dispatch: any) => {
    try {
      dispatch({
        type: FORBIDDEN_SUBMIT_BASE_INFO,
      });
      const { data } = await api.post(
        `/Forbidden`,
        reauestBody
      );
  
      if (data.IsSucceed === true) {
        messageSuccess("اطلاعات پایه شاخص ها با موفقیت ثبت شد")
      } else {
        messageError(data.Message);
      }
      dispatch({
        type: FORBIDDEN_SUBMIT_BASE_INFO_SUCCESS,
        payload: data,
      });
    } catch (error:any) {
  
      messageError(error.response?.data.Error.Message);
      dispatch({
        type: FORBIDDEN_SUBMIT_BASE_INFO_FAILED,
        payload: error.response?.data.Error.Message,
      });
    }
  };

    //ویرایش اطلاعات پایه شاخص ها
export const editForbiddenBaseInfo = (
  reauestBody:any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: FORBIDDEN_SUBMIT_BASE_INFO,
    });
    const { data } = await api.put(
      `/Forbidden`,
      reauestBody
    );

    if (data.IsSucceed === true) {
      messageSuccess("اطلاعات پایه شاخص ها با موفقیت ویرایش شد")
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: FORBIDDEN_SUBMIT_BASE_INFO_SUCCESS,
      payload: data,
    });
  } catch (error:any) {

    messageError(error.response?.data.Error.Message);
    dispatch({
      type: FORBIDDEN_SUBMIT_BASE_INFO_FAILED,
      payload: error.response?.data.Error.Message,
    });
  }
};
  //لیست اطلاعات پایه شاخص ها
export const forbiddenBaseInfoList = (
    reauestBody:any
  ) => async (dispatch: any) => {
    try {
      dispatch({
        type: FORBIDDEN_BASE_INFO_LIST,
      });
      const { data } = await api.post(
        `/Forbidden/GetForGrid`,
        reauestBody
      );
  
      if (data.IsSucceed === true) {
     
      } else {
        messageError(data.Message);
      }
      dispatch({
        type: FORBIDDEN_BASE_INFO_LIST_SUCCESS,
        payload: data,
      });
    } catch (error:any) {
  
      messageError(error.response?.data.Error.Message);
      dispatch({
        type: FORBIDDEN_BASE_INFO_LIST_FAILED,
        payload: error.response?.data.Error.Message,
      });
    }
  };

    //حذف اطلاعات پایه شاخص ها
export const deleteforbiddenBaseInfo = (
  id:number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: "DELETE_FORBIDDEN_INFO",
    });
    const { data } = await api.delete(
      `/Forbidden/${id}`
    );

    if (data.IsSucceed === true) {
      messageSuccess("اطلاعات پایه شاخص ها با موفقیت حذف شد")
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: "DELETE_FORBIDDEN_INFO_SUCCESS",
      payload: data,
    });
  } catch (error:any) {

    messageError(error.response?.data.Error.Message);
    dispatch({
      type: "DELETE_FORBIDDEN_INFO_FAILED",
      payload: error.response?.data.Error.Message,
    });
  }
};

    //دریافت اطلاعات پایه شاخص ها
    export const getForbiddenBaseInfoDetails = (
      id:number
    ) => async (dispatch: any) => {
      try {
        dispatch({
          type: "GET_FORBIDDEN_INFO_DETAILS",
        });
        const { data } = await api.get(
          `/Forbidden/${id}`
        );
    
        if (data.IsSucceed === true) {
     
        } else {
          messageError(data.Message);
        }
        dispatch({
          type: "GET_FORBIDDEN_INFO_DETAILS-SUCCESS",
          payload: data,
        });
      } catch (error:any) {
    
        messageError(error.response?.data.Error.Message);
        dispatch({
          type: "GET_FORBIDDEN_INFO_DETAILS-FAILED",
          payload: error.response?.data.Error.Message,
        });
      }
    };