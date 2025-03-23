import {
  USER_EDIT_SET_TRUE,
  USER_EDIT_SET_FALSE,
} from "../../constant/commonTypes";

export const userEdit = (isEdit: boolean) => (dispatch: any) => {
  if (isEdit) {
    dispatch({
      type: USER_EDIT_SET_TRUE,
    });
  } else {
    dispatch({
      type: USER_EDIT_SET_FALSE,
    });
  }
};
