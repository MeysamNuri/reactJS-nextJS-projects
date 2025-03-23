export interface IAneAdjusterList {
  AdjusterCode: string;
  AdjustmentFieldId: number;
  AdjustmentFieldTitle: string;
  ApplicantId: number;
  CartableId: number;
  StateId: number;
  //ApplicantStatusTitle: string;
  Average: number;
  CourseId: number;
  CourseTitle: string;
  FamilyName: string;
  FatherFamilyName: string;
  FatherFirstName: string;
  FirstName: string;
  InterviewTime: string;
  Interviewers?: string[];
  IsCertificateApproved: boolean;
  IsWorkExperienceApproved: boolean;
  NationalCode: string;
  ReceiverUser: string;
  RegistrationCode: string;
  SeasonId: number;
  SeasonTitle: string;
  SenderUser: string;
  // WorkFlow: null;
  // WorkFlowId: null;
  AcademicDegreeTitle: string;
  Mobile: string;
  SubFields: any;
  AccessList: string[];
  LicenseType:number;
  CompanyName:string;
  StateTitle:string;
  Description:string;
  LetterNumber:string;
  FatherName?:any;
  G4bStatusDescription:string;
  G4bStatus:any,
  ApplicantForbiddens:IApplicantForbiddens[]
}


export  interface IApplicantForbiddens{
  ApplicantId: number
  CreationDateTime: string
  Flag: boolean
  ForbiddenResult: string
  Id: number
}