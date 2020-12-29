import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  categorydialog: false,
  tick: 0,
  count: 0,
};

/* eslint-disable default-case, no-param-reassign */
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_Dialog":
      return {
        ...state,
        categorydialog: action.categorydialog,
      };
      break;
    case "SAVE_Dialog_Tick":
      return {
        ...state,
        tick: action.id,
      };
      break;
    case "SAVE_Items_Count":
      return {
        ...state,
        count: action.count,
      };
      break;
    case DEFAULT_ACTION:
      break;
    default:
      return state;
  }
};
export default categoriesReducer;
