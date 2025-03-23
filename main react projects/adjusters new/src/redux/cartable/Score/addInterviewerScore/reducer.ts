import {
  ADD_INTERVIEWER_SCORE,
  ADD_INTERVIEWER_SCORE_SUCCESS,
  ADD_INTERVIEWER_SCORE_FAILD,
} from "../../../../constant/cartableActionTypes";

const addScoreReducerState: any = {
  addScoreLoading: false,
  datainterviewerScore: null,
  addError: null,
};

const addScoreReducer = (state = addScoreReducerState, action: any) => {
  switch (action.type) {
    case ADD_INTERVIEWER_SCORE:
      return {
        addScoreLoading: true,
        datainterviewerScore: null,
        updateError: null,
      };
    case ADD_INTERVIEWER_SCORE_SUCCESS:
      return {
        ...state,
        addScoreLoading: false,
        datainterviewerScore: action.payload,
      };
    case ADD_INTERVIEWER_SCORE_FAILD:
      return {
        ...state,
        addScoreLoading: false,
        addError: action.payload,
      };
    default:
      return state;
  }
};

export default addScoreReducer;
