/*
 *
 * Points reducer
 *
 */

import produce from "immer";

export const initialState = {
  tripAmountDialog: false,
  selectedAmount: '',
  selectedPoint:'',
  counter: 0
};

/* eslint-disable default-case, no-param-reassign */
const tripReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case "SET_SHOW_TRIP_AMOUNT_DIALOG":
        return {
          ...state,
          tripAmountDialog: action.tripAmountDialog,
        };
      case "SET_SELECTED_AMOUNT":
        return {
          ...state,
          selectedAmount: action.selectedAmount,
        };
      case "SET_SELECTED_POINT":
        return {
          ...state,
          selectedPoint: action.selectedPoint,
        };
      case "DEFAULT_ACTION":
        break;
    }
  });

export default tripReducer;
