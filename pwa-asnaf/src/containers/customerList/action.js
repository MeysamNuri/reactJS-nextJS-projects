
export function getCustomerFirstTransactionDate(customerFirstTransactionDate) {
  return {
    type: 'GET_CUSTOMER_FIRST_TRANSACTION_DATE',
    customerFirstTransactionDate,
  };
}
export function getCustomerSliderNewValue(customerNewValue) {
  return {
    type: "SET_CUSTOMER_SLIDER_NEW_VALUE",
    customerNewValue
  };
}
export function getCustomerSliderStartDate(customerSliderStartDate) {
  return {
    type: "SET_CUSTOMER_SLIDER_START_DATE",
    customerSliderStartDate
  };
}
export function getCustomerSliderEndDate(customerSliderEndDate) {
  return {
    type: "SET_CUSTOMER_SLIDER_END_DATE",
    customerSliderEndDate
  };
}
export const setCustomerLoadMore = (customerLoadMore) => {
  return {
    type: "SET_CUSTOMER_LOADS_MORE",
    customerLoadMore,
  };
};