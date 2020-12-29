import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  sliderStartDate: "",
  sliderEndDate: "",
  newValue:[],
  pageNumber: 1,
  walletAmount: 0,
  walletTransaction:[]
};

/* eslint-disable default-case, no-param-reassign */
const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SLIDER_START_DATE":
      return {
        ...state,
        sliderStartDate: action.sliderStartDate,
      };
      break;
      
    case "SET_WALLET_TRANSACTION":
      return {
        ...state,
        walletTransaction: action.walletTransaction,
      };
      break;
    case "SET_SLIDER_END_DATE":
      return {
        ...state,
        sliderEndDate: action.sliderEndDate,
      };
      break;
    case "SET_SLIDER_NEW_VALUE":
      return {
        ...state,
        newValue: action.newValue,
      };
      break;
    case "SET_PAGE_NUMBER":
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
      break;
    case "SET_WALLET_AMOUNT":
      return {
        ...state,
        walletAmount: action.walletAmount,
      };
      break;
    case DEFAULT_ACTION:
      break;
    default:
      return state;
  }
};
export default walletReducer;
