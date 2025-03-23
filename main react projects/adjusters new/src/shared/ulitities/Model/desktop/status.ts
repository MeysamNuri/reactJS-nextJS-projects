export interface ISaveChangeStatus {
  applicantId: number;
  newStatus: number;
  changeStatusDate: string;
  fileDescriptionId: number;
  description: number;
  changeStatusReasonId: number;
  effectiveDate:string
}

export interface IHistoryChangeStatus {
  Applicant: any;
  ApplicantId: number;
  ChangeStatusDate: string;
  ChangeStatusReason: any;
  ChangeStatusReasonId: number;
  Description: string;
  FileDescription: null;
  FileDescriptionId: number;
  Id: number;
  NewStatus: number;
  OldStatus: number;
  NewStatusDescription:string;
  OldStatusDescription:string;
  Files:any,
  User:any


}
