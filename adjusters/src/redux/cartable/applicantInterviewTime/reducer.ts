import {
  APPLICANT_INTERVIEW_TIME,
  APPLICANT_INTERVIEW_TIME_SUCCESS,
  APPLICANT_INTERVIEW_TIME_FAILD,
  FETCH_INTERVIEWTIMING_APPLICANTID,
  FETCH_INTERVIEWTIMING_APPLICANTID_SUCCESS,
  FETCH_INTERVIEWTIMING_APPLICANTID_FAILD,
  // REMOVE_INTERVIEWTIMING_APPLICANTID,
  // REMOVE_INTERVIEWTIMING_APPLICANTID_SUCCESS,
  // REMOVE_INTERVIEWTIMING_APPLICANTID_FAILD
} from "../../../constant/cartableActionTypes";
  
  const INIT_STATE = {
    interviewTimeIdloading: false,
    interviewTimeId: null,
    interviewTimingApplicant:null,
    loadingInterviewTiming:false,
    removeinterviewTimingApplicant:null,
    loadingRemoveInterviewTiming:false,
  }; 
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case APPLICANT_INTERVIEW_TIME:
        return { ...state, interviewTimeIdloading: true };
      case  APPLICANT_INTERVIEW_TIME_SUCCESS:
        return { ...state, interviewTimeIdloading: false, interviewTimeId: action.payload };
      case APPLICANT_INTERVIEW_TIME_FAILD:
        return { ...state, interviewTimeIdloading: false, error: action.payload };

        case FETCH_INTERVIEWTIMING_APPLICANTID:
          return { ...state, loadingInterviewTiming: true };
        case  FETCH_INTERVIEWTIMING_APPLICANTID_SUCCESS:
          return { ...state, loadingInterviewTiming: false, interviewTimingApplicant: action.payload };
        case FETCH_INTERVIEWTIMING_APPLICANTID_FAILD:
          return { ...state, loadingInterviewTiming: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  