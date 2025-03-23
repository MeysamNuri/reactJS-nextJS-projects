export interface IMessage {
  ApplicantId: number;
  ApplicantPersonalInfo: any;
  CreatedDate: string;
  Id: number;
  IsDraft: boolean;
  IsGroup: boolean;
  IsRead: boolean;
  SenderId: number;
  Text: string;
  Files:any[]
}

export interface IOneBatchSmsSend {
  mobile: string;
  sbject: string;
  body: string;
  applicantId: number;
}

// export interface IBatchSmsSend{

// }
