export interface IAddMonthlyPerformance {
  adjustmentFieldId: number;
  applicantId: number;
  description: string;
  documentCount: number;
  fileDescriptionId: number;
}

export interface IViewMonthlyPerformance {
  AdjustmentField: any;
  AdjustmentFieldId: number;
  ApplicantId: number;
  CreatedDate: string;
  Description: string;
  DocumentCount: number;
  FileDescriptionId: null;
  Id: number;
  LastUpdateDate: null; 
  ApplicantPersonalInfo:IApplicantPersonalInfo
}
export interface IApplicantPersonalInfo{
  Person:IPerson,
  Applicant:any
}
export interface IPerson{
  FirstName:string,
  FamilyName:string,
  NationalCode:string
}