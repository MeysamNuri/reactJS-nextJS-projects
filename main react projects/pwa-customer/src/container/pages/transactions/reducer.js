import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  transactiondialog: false,
  tick: 0,
  id: 0,
  similarDialog: false,
  addCardDialog: false
};
/* eslint-disable default-case, no-param-reassign */
const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SIMILAR_DIALOG":
      return {
        ...state,
        similarDialog: action.similarDialog
      };
    case "SET_ADD_CARD_DIALOG":
      return {
        ...state,
        addCardDialog: action.addCardDialog
      };
    case "SET_TRANSACTION_DIALOG":
      return {
        ...state,
        transactiondialog: action.transactiondialog
      };
    case "SET_TRANSACTION_DIALOG_TICK":
      return {
        ...state,
        tick: action.id
      };
    case "SAVE_Card_Id":
      return {
        ...state,
        id: action.id
      };
    case DEFAULT_ACTION:
      break;
    default:
      return state;
  }
};
export default transactionsReducer;
