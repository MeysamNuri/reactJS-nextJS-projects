/*
 *
 * Wallet actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getWalletAndPointsAmountDialog(walletAndPointsAmountDialog) {
  return {
    type: 'GET_INCREASE_Dialog',
    walletAndPointsAmountDialog,
  };
}
export function getFirstTransactionDate(firstTransactionDate) {
  return {
    type: 'GET_FIRST_TRANSACTION_DATE',
    firstTransactionDate,
  };
}

export function getSliderNewValue(newValue) {
  return {
    type: "SET_SLIDER_NEW_VALUE",
    newValue
  };
}
export function getSliderStartDate(sliderStartDate) {
  return {
    type: "SET_SLIDER_START_DATE",
    sliderStartDate
  };
}
export function getSliderEndDate(sliderEndDate) {
  return {
    type: "SET_SLIDER_END_DATE",
    sliderEndDate
  };
}
export const setLoadMore = (loadMore) => {
  return {
    type: "SET_LOADS_MORE",
    loadMore,
  };
};