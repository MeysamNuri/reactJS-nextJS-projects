import {
  INTERVIEW_SESSION,
  INTERVIEW_SESSION_SUCCESS,
  INTERVIEW_SESSION_FAILD,
  CALCULATE_SCORE,
  CALCULATE_SCORE_SUCCESS,
  CALCULATE_SCORE_FAILD,
  ADD_FIELD_INTERVIEWER,
  ADD_FIELD_INTERVIEWER_SUCCESS,
  ADD_FIELD_INTERVIEWER_FAILD,
  COURS80_SCORE,
  COURS80_SCORE_SUCCESS,
  COURS80_SCORE_FAILD,
  INTERVIEW_MINUTES,
  INTERVIEW_MINUTES_SUCCESS,
  INTERVIEW_MINUTES_FAILD,
  CARTABLE_ABSENCE,
  CARTABLE_ABSENCE_SUCCESS,
  CARTABLE_ABSENCE_FAILD,
  INVITATION_INTERVIEW,
  INVITATION_INTERVIEW_SUCCESS,
  INVITATION_INTERVIEW_FAILD,
  FIELD_INTERVIEWER,
  FIELD_INTERVIEWER_SUCCESS,
  FIELD_INTERVIEWER_FAILD,
  INTERVIEW_MINUTES_DOCUMENT_FILE,
  INTERVIEW_MINUTES_DOCUMENT_FILE_SUCCESS,
  INTERVIEW_MINUTES_DOCUMENT_FILE_FAILD
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  interviewSession: null,
  resAverageScore: null,
  fieldInterviewer: null,
  course80Score: null,
  loadingAverageScore: false,
  loadingFeildInterviewer: false,
  loading80Score: null,
  questionsScore: null,
  loadingInterviewerMinutes: false,
  interviewerMinutes: null,
  loadingAbsense: false,
  absence: null,
  loadingInvitionInterview: false,
  invitionInterview: null,
  resFieldInterviewer: null,
  loadingResFieldInterviewer: false,
  documentFileInterviewId:null,
  loadingDocumentFileInterview:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case INTERVIEW_SESSION:
      return { ...state, loading: true };
    case INTERVIEW_SESSION_SUCCESS:
      return { ...state, loading: false, interviewSession: action.payload };
    case INTERVIEW_SESSION_FAILD:
      return { ...state, loading: false, error: action.payload };
    case CALCULATE_SCORE:
      return { ...state, loadingAverageScore: true };
    case CALCULATE_SCORE_SUCCESS:
      return {
        ...state,
        loadingAverageScore: false,
        resAverageScore: action.payload,
      };
    case CALCULATE_SCORE_FAILD:
      return { ...state, loadingAverageScore: false, error: action.payload };
    case ADD_FIELD_INTERVIEWER:
      return { ...state, loadingFeildInterviewer: true };
    case ADD_FIELD_INTERVIEWER_SUCCESS:
      return {
        ...state,
        loadingFeildInterviewer: false,
        fieldInterviewer: action.payload,
      };
    case ADD_FIELD_INTERVIEWER_FAILD:
      return {
        ...state,
        loadingFeildInterviewer: false,
        error: action.payload,
      };
    case COURS80_SCORE:
      return { ...state, loading80Score: true };
    case COURS80_SCORE_SUCCESS:
      return {
        ...state,
        loading80Score: false,
        course80Score: action.payload,
      };
    case COURS80_SCORE_FAILD:
      return {
        ...state,
        loading80Score: false,
        error: action.payload,
      };

    case INTERVIEW_MINUTES:
      return { ...state, loadingInterviewerMinutes: true };
    case INTERVIEW_MINUTES_SUCCESS:
      return {
        ...state,
        loadingInterviewerMinutes: false,
        interviewerMinutes: action.payload,
      };
    case INTERVIEW_MINUTES_FAILD:
      return {
        ...state,
        loadingInterviewerMinutes: false,
        error: action.payload,
      };
    case CARTABLE_ABSENCE:
      return { ...state, loadingAbsense: true };
    case CARTABLE_ABSENCE_SUCCESS:
      return {
        ...state,
        loadingAbsense: false,
        absence: action.payload,
      };
    case CARTABLE_ABSENCE_FAILD:
      return {
        ...state,
        loadingAbsense: false,
        error: action.payload,
      };
    case INVITATION_INTERVIEW:
      return { ...state, loadingInvitionInterview: true };
    case INVITATION_INTERVIEW_SUCCESS:
      return {
        ...state,
        loadingInvitionInterview: false,
        invitionInterview: action.payload,
      };
    case INVITATION_INTERVIEW_FAILD:
      return {
        ...state,
        loadingInvitionInterview: false,
        error: action.payload,
      };
    case FIELD_INTERVIEWER:
      return { ...state, loadingResFieldInterviewer: true };
    case FIELD_INTERVIEWER_SUCCESS:
      return {
        ...state,
        loadingResFieldInterviewer: false,
        resFieldInterviewer: action.payload,
      };
    case FIELD_INTERVIEWER_FAILD:
      return {
        ...state,
        loadingResFieldInterviewer: false,
        error: action.payload,
      };



       case INTERVIEW_MINUTES_DOCUMENT_FILE:
      return { ...state, loadingDocumentFileInterview: true };
    case INTERVIEW_MINUTES_DOCUMENT_FILE_SUCCESS:
      return {
        ...state,
        loadingDocumentFileInterview: false,
        documentFileInterviewId: action.payload,
      };
    case INTERVIEW_MINUTES_DOCUMENT_FILE_FAILD:
      return {
        ...state,
        loadingDocumentFileInterview: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
