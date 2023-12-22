import {
  UPDATE_INTERVIEWER_SCORE,
  UPDATE_INTERVIEWER_SCORE_SUCCESS,
  UPDATE_INTERVIEWER_SCORE_FAILD,
} from "../../../../constant/cartableActionTypes";

const updateScoreReducerState: any = {
  updateLoading: false,
  updateInterviewerScore: null,
  updateError: null,
};

const updateScoreReducer = (state = updateScoreReducerState, action: any) => {
  switch (action.type) {
    case UPDATE_INTERVIEWER_SCORE:
      return {
        updateLoading: true,
        updateInterviewerScore: null,
        updateError: null,
      };
    case UPDATE_INTERVIEWER_SCORE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateInterviewerScore: action.payload,
      };
    case UPDATE_INTERVIEWER_SCORE_FAILD:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
      };
    default:
      return state;
  }
};

export default updateScoreReducer;
