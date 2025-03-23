import { DEFAULT_ACTION } from './constant';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function setPhoneNumber(phoneNumber) {
  return {
    type: "SET_PHONE_NUMBER",
    phoneNumber,
  };
}