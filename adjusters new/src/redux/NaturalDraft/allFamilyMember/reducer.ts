import { 
  ALL_DRAFT_NATURAL_FAMILY_MEMBER,
  ALL_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
  ALL_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
} from "../../../constant/actionTypes";
 
const INIT_STATE = {
  loading: false,
  allFamilyMember: [],
};
 
export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case ALL_DRAFT_NATURAL_FAMILY_MEMBER:
      return { ...state, loading: true };
    case ALL_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS:
      return { ...state, loading: false, allFamilyMember: action.payload };
    case ALL_DRAFT_NATURAL_FAMILY_MEMBER__FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
