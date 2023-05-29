import {
  ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST,
  ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_SUCCESS,
  ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_FAILD,
} from "../../constant/actionTypes";

const INIT_STATE = {
  naturaljudicalPersonalList: null,
  loading: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST:
      return {
        ...state,
        loading: true,
        naturaljudicalPersonalList: action.payload,
      };
    case ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        naturaljudicalPersonalList: action.payload,
      };
    case ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_FAILD:
      return {
        ...state,
        loading: false,
        naturaljudicalPersonalList: action.payload,
      };

    default:
      return { ...state };
  }
};
