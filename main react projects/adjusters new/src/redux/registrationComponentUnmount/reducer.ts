import { REGISTRATION_COMPONENT_UNMOUNT } from "../../constant/commonTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REGISTRATION_COMPONENT_UNMOUNT:
      return null;
    default:
      return { ...state };
  }
};
