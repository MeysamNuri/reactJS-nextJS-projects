import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_Loading":
      return {
        ...state,
        loading: action.loading,
      };
      break;
    case DEFAULT_ACTION:
      break;
    default:
      return state;
  }
};
export default loadingReducer;
