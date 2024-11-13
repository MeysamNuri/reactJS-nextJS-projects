import {
  LIST_INTERVIEW_TIME,
  LIST_INTERVIEW_TIME_SUCCESS,
  LIST_INTERVIEW_TIME_FAILD,
  LIST_SEASON_INTERVIEW_TIMING_SUCCESS,
  REMOVE_SEASON_INTERVIEW_TIMING_SUCCESS,
} from "../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  interviewTimingList: {} as any,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LIST_INTERVIEW_TIME:
      return { ...state, loading: true };
    case LIST_INTERVIEW_TIME_SUCCESS:
      if (state.interviewTimingList.Result) {
        return {
          ...state,
          interviewTimingList: {
            Result: [
              ...state.interviewTimingList?.Result,
              ...action.payload.Result,
            ],
          },
        };
      } else {
        return {
          ...state,
          interviewTimingList: { Result: [...action.payload.Result] },
        };
      }
    case LIST_SEASON_INTERVIEW_TIMING_SUCCESS:
      return {
        ...state,
        interviewTimingList: { Result: [...action.payload.Result] },
      };
    case LIST_INTERVIEW_TIME_FAILD:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_SEASON_INTERVIEW_TIMING_SUCCESS:
      return {
        ...state,
        loading: false,
        interviewTimingList: {
          Result: state.interviewTimingList.Result.filter(
            (el: any) => el.Id !== action.payload
          ),
        },
      };
    default:
      return { ...state };
  }
};
