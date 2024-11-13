//Company Information interface
export interface IDocumentApprove {
  Description: null;
  DocumentTypeTitle: string;
  Id: string;
  IsApproved: boolean;
  RejectReasonTitle: null;
}

export interface IAddDocumentApprove {
  id: string;
  isApproved: boolean;
  description: string;
}

export interface IDocumentHistory {
  ApplicantId: number;
  ApprovalStatuses: number;
  CreationDate: string;
  Description:string;
  DocumentId: string;
  RejectReasonId: null;
  UserId:number;
  UserName: string;
  ApprovalStatusTitle:string
}
