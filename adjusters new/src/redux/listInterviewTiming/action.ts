import {
  LIST_INTERVIEW_TIME,
  LIST_INTERVIEW_TIME_SUCCESS,
  LIST_INTERVIEW_TIME_FAILD,
  LIST_SEASON_INTERVIEW_TIMING,
  LIST_SEASON_INTERVIEW_TIMING_SUCCESS,
  LIST_SEASON_INTERVIEW_TIMING_FAILD,
  REMOVE_SEASON_INTERVIEW_TIMING,
  REMOVE_SEASON_INTERVIEW_TIMING_SUCCESS,
  REMOVE_SEASON_INTERVIEW_TIMING_FAILD,
} from "../../constant/cartableActionTypes";
import { api } from "../../httpServices/service";
import { toast } from "react-toastify";

export const fetchInterviewTimingList = (interviewTimeId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_INTERVIEW_TIME,
    });
    const { data } = await api.get(`/interview-timing/${interviewTimeId}/list`);
    dispatch({
      type: LIST_INTERVIEW_TIME_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_INTERVIEW_TIME_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchInterviewSeasonTimingList = (courseId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_SEASON_INTERVIEW_TIMING,
    });
    const { data } = await api.get(`/interview-timing/season/${courseId}`);
    dispatch({
      type: LIST_SEASON_INTERVIEW_TIMING_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_SEASON_INTERVIEW_TIMING_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeInterviewSeasonTimingList = (
  interviewTimingId: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_SEASON_INTERVIEW_TIMING,
    });
    const { data } = await api.delete(`/interview-timing/${interviewTimingId}`);
    //console.log(data,"dataaReome");
    if (data.IsSucceed) {
      dispatch({
        type: REMOVE_SEASON_INTERVIEW_TIMING_SUCCESS,
        payload: interviewTimingId,
      });
    }
  } catch (error: any) {
    dispatch({
      type: REMOVE_SEASON_INTERVIEW_TIMING_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
