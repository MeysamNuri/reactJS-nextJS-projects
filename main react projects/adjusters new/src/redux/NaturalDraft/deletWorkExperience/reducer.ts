import {
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE,
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE_FAILD
} from "../../../constant/actionTypes";
 
const INIT_STATE = {
  loading: false,
  removeNaturalDraftWorkExperience: "",
  deleteCartableWorkExperinceLoading:false,
  deleteCartableWorkExperienceInfo:null
};
 
export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case DELET_NATURAL_DRAFT_WORK_EXPERIENCE:
      return { ...state, loading: true };
    case DELET_NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS:
      return { ...state, loading: false, removeNaturalDraftWorkExperience: action.payload };
    case DELET_NATURAL_DRAFT_WORK_EXPERIENCE_FAILD:
      return { ...state, loading: false, error: action.payload };
    case "DELETE_CARTABLE_WORK_EXPERINCE":
      return { ...state, deleteCartableWorkExperinceLoading:true };
    case "DELETE_CARTABLE_WORK_EXPERINCE_SUCCESS":
      return { ...state, deleteCartableWorkExperinceLoading:false,deleteCartableWorkExperienceInfo:action.payload };
    case "DELETE_CARTABLE_WORK_EXPERINCE_FAILD":
      return { ...state, deleteCartableWorkExperinceLoading:false };

    default:
      return { ...state };
  }
};
