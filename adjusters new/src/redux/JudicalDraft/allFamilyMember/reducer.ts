import { 
  ALL_JUDICAL_DRAFT_FAMILY_MEMBER,
  ALL_JUDICAL_DRAFT_FAMILY_MEMBER_SUCCESS,
  ALL_JUDICAL_DRAFT_FAMILY_MEMBER_FAILD,
} from "../../../constant/judicalActionTypes";
 
const INIT_STATE = {
  loading: false,
  judicalAllFamilyMember: [],
};
 
export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case ALL_JUDICAL_DRAFT_FAMILY_MEMBER:
      return { ...state, loading: true };
    case ALL_JUDICAL_DRAFT_FAMILY_MEMBER_SUCCESS:
      return { ...state, loading: false, judicalAllFamilyMember: action.payload };
    case ALL_JUDICAL_DRAFT_FAMILY_MEMBER_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
