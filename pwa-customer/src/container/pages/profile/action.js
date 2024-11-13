import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProfileDialog(profileDialog) {
   return {
     type: "SET_PROFILE_DIALOG",
     profileDialog,
   };
 }
export function setChangeProfile(changeProfile) {
   return {
     type: "SAVE_CHANGE_PROFILE",
     changeProfile,
   };
 }