import {
  ADD_INTERVIEW_TIME,
  ADD_INTERVIEW_TIME_SUCCESS,
  ADD_INTERVIEW_TIME_FAILD,
} from "../../constant/cartableActionTypes";
import { api } from "../../httpServices/service";
import { IAddIntervewerTime } from "../../shared/ulitities/Model/interviewerTime";
import { fetchInterviewTimingList } from "../actions";
import { toast } from "react-toastify";

export const createAddTime = (
  addTime: IAddIntervewerTime,
  successFunction: () => void,
  successClear: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_INTERVIEW_TIME,
    });
    const { data } = await api.post(`/interview/time`, addTime);
    dispatch(fetchInterviewTimingList(data?.Result));
    dispatch({
      type: ADD_INTERVIEW_TIME_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("زمان مصاحبه با موفقیت ایجاد گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (data.IsSucceed === false) {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction();
    successClear();
  } catch (error: any) {
    dispatch({
      type: ADD_INTERVIEW_TIME_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
