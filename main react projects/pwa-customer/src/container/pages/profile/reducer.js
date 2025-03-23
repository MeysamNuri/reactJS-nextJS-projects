
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  profileDialog: false,
  changeProfile: false
};

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SET_PROFILE_DIALOG":
      return {
        ...state,
        profileDialog: action.profileDialog,
      };
      case "SAVE_CHANGE_PROFILE":
      return {
        ...state,
        changeProfile: action.changeProfile,
      };
      case DEFAULT_ACTION:
        break;
      default: return state;

   }
}
export default profileReducer;
