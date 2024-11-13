import {
  IS_ADD_MEMBER_CLICKED_TRUE,
  IS_ADD_MEMBER_CLICKED_FALSE,
} from "../../../constant/legalActionTypes";

export const isAddMemberClicked = (is: boolean) => (dispatch: any) => {
  if (is) {
    dispatch({
      type: IS_ADD_MEMBER_CLICKED_TRUE,
    });
  } else {
    dispatch({
      type: IS_ADD_MEMBER_CLICKED_FALSE,
    });
  }
};
