import {
  APPLICANT_INTERVIEW_TIME,
  APPLICANT_INTERVIEW_TIME_SUCCESS,
  APPLICANT_INTERVIEW_TIME_FAILD,
  FETCH_INTERVIEWTIMING_APPLICANTID,
  FETCH_INTERVIEWTIMING_APPLICANTID_SUCCESS,
  FETCH_INTERVIEWTIMING_APPLICANTID_FAILD,
  REMOVE_INTERVIEWTIMING_APPLICANTID,
  REMOVE_INTERVIEWTIMING_APPLICANTID_SUCCESS,
  REMOVE_INTERVIEWTIMING_APPLICANTID_FAILD
} from "../../../constant/cartableActionTypes";
import { IInterviewSession } from "../../../shared/ulitities/Model/interviewSession";
import {messageError,messageSuccess} from "../../../utils/utils"
import { api } from "../../../httpServices/service";


//ثبت زمان مصاحبه
export const sendInterviewSession = (
  interviewSession?: IInterviewSession,
  fetchInterviewTiming?:any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_INTERVIEW_TIME,
    });
    const { data } = await api.post(
      `/admission/cartable/applicant-interview-session`,
      interviewSession
    ); if (data.IsSucceed === true) {
      fetchInterviewTiming()
      messageSuccess("زمان مصاحبه با موفقیت تعیین گردید")
    }  else {
      messageError(data.Message)
    }

    dispatch({
      type: APPLICANT_INTERVIEW_TIME_SUCCESS,
      payload: data,
    });
   

  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: APPLICANT_INTERVIEW_TIME_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//گرفتن زمان مصاحبه هر applicantId
export const fetchInterviewTimingApplicantId = ( applicantId?: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: FETCH_INTERVIEWTIMING_APPLICANTID,
    });
    const { data } = await api.get(
      `/admission/cartable/interviewtiming/${applicantId}`,
    ); if (data.IsSucceed === true) {
      // messageSuccess("زمان مصاحبه با موفقیت تعیین گردید")
    }  else {
      messageError(data.Message)
    }

    dispatch({
      type: FETCH_INTERVIEWTIMING_APPLICANTID_SUCCESS,
      payload: data,
    });
   

  } catch (error: any) {
    dispatch({
      type: FETCH_INTERVIEWTIMING_APPLICANTID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//حذف زمان مصاحبه
export const removeInterviewTimingApplicantId = ( applicantId?: number,fetchList?:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_INTERVIEWTIMING_APPLICANTID,
    });
    const { data } = await api.delete(
      `admission/cartable/interviewtiming/remove/${applicantId}`,
    ); if (data.IsSucceed === true) {
       messageSuccess("زمان مصاحبه با موفقیت حذف گردید")
       fetchList()
    }  else {
      messageError(data.Message)
    }

    dispatch({
      type: REMOVE_INTERVIEWTIMING_APPLICANTID_SUCCESS,
      payload: data,
    });
   

  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: REMOVE_INTERVIEWTIMING_APPLICANTID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
