/*
 *
 * Wallet reducer
 *
 */

import produce from "immer";
import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  walletAndPointsAmountDialog: false,
  firstTransactionDate: "",
  newValue: [],
  sliderStartDate: "",
  sliderEndDate: "",
  loadMore: false,
};

/* eslint-disable default-case, no-param-reassign */
const walletReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case "GET_INCREASE_Dialog":
      return {
        ...state,
        walletAndPointsAmountDialog: action.walletAndPointsAmountDialog,
      };
    case "GET_FIRST_TRANSACTION_DATE":
      return {
        ...state,
        firstTransactionDate: action.firstTransactionDate,
      };
    case "SET_SLIDER_NEW_VALUE":
      return {
        ...state,
        newValue: action.newValue,
      };
    case "SET_SLIDER_START_DATE":
      return {
        ...state,
        sliderStartDate: action.sliderStartDate,
      };
    case "SET_SLIDER_END_DATE":
      return {
        ...state,
        sliderEndDate: action.sliderEndDate,
      };
    case "SET_LOADS_MORE":
      return {
        ...state,
        loadMore: action.loadMore,
      };
    case DEFAULT_ACTION:
      break;
  }
}, initialState);

export default walletReducer;
