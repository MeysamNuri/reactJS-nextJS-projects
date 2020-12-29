/*
 *
 * Points reducer
 *
 */

import produce from "immer";
import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  pointNewValue: [],
  pointSliderStartDate: "",
  pointSliderEndDate: "",
  pointFirstTransactionDate: "",
  loadMore: false,
};

/* eslint-disable default-case, no-param-reassign */
const pointsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case "SET_POINT_SLIDER_NEW_VALUE":
        return {
          ...state,
          pointNewValue: action.pointNewValue,
        };
      case "SET_POINT_SLIDER_START_DATE":
        return {
          ...state,
          pointSliderStartDate: action.pointSliderStartDate,
        };
      case "SET_POINT_SLIDER_END_DATE":
        return {
          ...state,
          pointSliderEndDate: action.pointSliderEndDate,
        };
      case "GET_POINT_FIRST_TRANSACTION_DATE":
        return {
          ...state,
          pointFirstTransactionDate: action.pointFirstTransactionDate,
        };
      case "SET_LOADS_MORE":
        return {
          ...state,
          loadMore: action.loadMore,
        };
      case DEFAULT_ACTION:
        break;
    }
  });

export default pointsReducer;
