import {
  IS_ADD_MEMBER_CLICKED_TRUE,
  IS_ADD_MEMBER_CLICKED_FALSE,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  isClicked: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case IS_ADD_MEMBER_CLICKED_TRUE:
      return { ...state, isClicked: true };
    case IS_ADD_MEMBER_CLICKED_FALSE:
      return { ...state, isClicked: false };

    default:
      return { ...state };
  }
};
