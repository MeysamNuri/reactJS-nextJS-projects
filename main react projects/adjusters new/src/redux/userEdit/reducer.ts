import {
  USER_EDIT_SET_TRUE,
  USER_EDIT_SET_FALSE,
} from "../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  userEdit: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case USER_EDIT_SET_TRUE:
      return { ...state, userEdit: true };
    case USER_EDIT_SET_FALSE:
      return { ...state, userEdit: false };

    default:
      return { ...state };
  }
};
