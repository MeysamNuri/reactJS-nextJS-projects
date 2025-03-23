
import produce from "immer";

export const initialState = {
  customerNewValue: [],
  customerSliderStartDate: "",
  customerSliderEndDate: "",
  customerFirstTransactionDate: "",
  customerLoadMore: false,
};

/* eslint-disable default-case, no-param-reassign */
const customerListReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case "SET_CUSTOMER_SLIDER_NEW_VALUE":
        return {
          ...state,
          customerNewValue: action.customerNewValue,
        };
      case "SET_CUSTOMER_SLIDER_START_DATE":
        return {
          ...state,
          customerSliderStartDate: action.customerSliderStartDate,
        };
      case "SET_CUSTOMER_SLIDER_END_DATE":
        return {
          ...state,
          customerSliderEndDate: action.customerSliderEndDate,
        };
      case "GET_CUSTOMER_FIRST_TRANSACTION_DATE":
        return {
          ...state,
          customerFirstTransactionDate: action.customerFirstTransactionDate,
        };
      case "SET_CUSTOMER_LOADS_MORE":
        return {
          ...state,
          customerLoadMore: action.customerLoadMore,
        };
      case 'DEFAULT_ACTION':
        break;
    }
  });

export default customerListReducer;
