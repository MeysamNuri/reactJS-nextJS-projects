import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  signoutDialog: false,
};

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case 'GET_SIGNOUT_Dialog':
        return {
          ...state,
          signoutDialog: action.signoutDialog,
        };
      case DEFAULT_ACTION:
        break;
    }
  });

export default profileReducer;
