import {
  LIST_QUESTION,
  LIST_QUESTION_SUCCESS,
  LIST_QUESTION_FAILD,
} from "../../../../constant/cartableActionTypes";

const fetchInterviewerScoreReducerState: any = {
  interviewerLoading: false,
  interviewerList: null,
  interviewerListError: null,
};

const fetchInterviewerScore = (
  state = fetchInterviewerScoreReducerState,
  action: any
) => {
  switch (action.type) {
    case LIST_QUESTION:
      return {
        interviewerLoading: true,
        interviewerList: null,
        scoreError: null,
      };
    case LIST_QUESTION_SUCCESS:
      return {
        ...state,
        interviewerLoading: false,
        interviewerList: action.payload,
      };
    case LIST_QUESTION_FAILD:
      return {
        ...state,
        interviewerLoading: false,
        scoreError: action.payload,
      };
    default:
      return state;
  }
};

export default fetchInterviewerScore;
