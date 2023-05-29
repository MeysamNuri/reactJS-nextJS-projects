export interface IScore {
  applicantId: number;
  interviewTimeId: number;
  sessionStatusId: number;
}

export interface IQuestion {
  questionId: number;
  interviewerId: number;
  interviewSessionId: number;
  score: number;
}

export interface IIntervewersScore {
  cartableId?: number;
  applicantId?: number;
  // agentId: number;
  interviewerScores: IQuestion;
}

export interface ICalculateAverage {
  applicantId: number;
  interviewerScores: IQuestion;
}

export interface IFieldInterviewer {
 // applicantId: number;
  adjustmentFieldId: number;
  subFieldIds: number[];
}

export interface IAdmisionExpert {
  Aliass: string;
  StaffType: number;
  UserId: number;
  UserName: string;
}

export interface IFetchScore {
  Id: number;
  InterviewSessionId: number;
  InterviewTimeId: number;
  InterviewerId: number;
  Score: number;
}
