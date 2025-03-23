/*
 *
 * Main actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getDialog(dialog) {
  return {
    type: "SAVE_Dialog",
    dialog,
  };
}
export function getChangeCatDialog(catMsgDialog) {
  return {
    type: "CAT_MSG_DIALOG",
    catMsgDialog,
  };
}
export function setCategoryTitle(catTitle) {
  return {
    type: "CAT_TITLE",
    catTitle,
  };
}
export const setShowNotifications = (showNotification) => {
  return {
    type: "SET_SHOW_NOTIFICATIONS",
    showNotification: showNotification,
  };
};

export const setLatLng = (latlng) => {
  return {
    type: "SET_LATLNG",
    latlng: latlng,
  };
};
