export interface IWorkExperienceApprove {
  CompanyId: number;
  CompanyName: string;
  EndDate: string;
  Id: string;
  IsApproved: false;
  Position: string;
  RejectReasonTitle: string;
  StartDate: string;
  StillWorking: boolean;
  CertificateId:string
}

export interface IAddWorkExperienceApprove {
  id: string,
  isApproved: boolean,
  rejectReasonTitle: string,
  certificateId:string
}
