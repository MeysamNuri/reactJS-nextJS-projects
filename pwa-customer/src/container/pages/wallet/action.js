import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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

export function getSliderNewValue(newValue) {
  return {
    type: "SET_SLIDER_NEW_VALUE",
    newValue
  };
}
export function setPageNumber(pageNumber) {
  return {
    type: "SET_PAGE_NUMBER",
    pageNumber
  };
}
export function setWalletAmount(walletAmount) {
  return {
    type: "SET_WALLET_AMOUNT",
    walletAmount
  };
}
export function setWalletTransaction(walletTransaction) {
  return {
    type: "SET_WALLET_TRANSACTION",
    walletTransaction
  };
}
