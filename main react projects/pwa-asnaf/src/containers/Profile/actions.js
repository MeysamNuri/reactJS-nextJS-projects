import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getSignoutDialog(signoutDialog) {
  return {
    type: 'GET_SIGNOUT_Dialog',
    signoutDialog,
  };
}
