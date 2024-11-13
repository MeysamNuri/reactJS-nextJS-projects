import { REGISTRATION_COMPONENT_UNMOUNT } from "../../constant/commonTypes";

export const registrationComponentUnmount = () => (dispatch: any) => {
  dispatch({
    type: REGISTRATION_COMPONENT_UNMOUNT,
  });
};
