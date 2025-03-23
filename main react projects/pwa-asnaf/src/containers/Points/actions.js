/*
 *
 * Points actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getPointFirstTransactionDate(pointFirstTransactionDate) {
  return {
    type: 'GET_POINT_FIRST_TRANSACTION_DATE',
    pointFirstTransactionDate,
  };
}
export function getPointSliderNewValue(pointNewValue) {
  return {
    type: "SET_POINT_SLIDER_NEW_VALUE",
    pointNewValue
  };
}
export function getPointSliderStartDate(pointSliderStartDate) {
  return {
    type: "SET_POINT_SLIDER_START_DATE",
    pointSliderStartDate
  };
}
export function getPointSliderEndDate(pointSliderEndDate) {
  return {
    type: "SET_POINT_SLIDER_END_DATE",
    pointSliderEndDate
  };
}
export const setLoadMore = (loadMore) => {
  return {
    type: "SET_LOADS_MORE",
    loadMore,
  };
};