import {
  FETCH_INTERVIEWER_SCORE,
  FETCH_INTERVIEWER_SCORE_FAILD,
  FETCH_INTERVIEWER_SCORE_SUCCESS,
} from "../../../../constant/cartableActionTypes";

const fetchReducerState: any = {
  scoreLoading: false,
  scoreList: null,
  scoreError: null,
};

const fetchScore = (state = fetchReducerState, action: any) => {
  switch (action.type) {
    case FETCH_INTERVIEWER_SCORE:
      return {
        scoreLoading: true,
        scoreList: null,
        scoreError: null,
      };
    case FETCH_INTERVIEWER_SCORE_SUCCESS:
      return {
        ...state,
        scoreLoading: false,
        scoreList: action.payload,
      };
    case FETCH_INTERVIEWER_SCORE_FAILD:
      return {
        ...state,
        scoreLoading: false,
        scoreError: action.payload,
      };
    default:
      return state;
  }
};

export default fetchScore;
