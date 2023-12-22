export interface IReffer {
  id?: number;
  adjusterTypeId: number|null;
  applicantId?: number|null;
  answer: string;
  //message?: string | null;
  rejectReasonIds?: number[] | null;
  description?:string

}
export interface IRejectReasonReffer {
  id?: number;
  adjusterTypeId: number|null;
  applicantId?: number;
  answer: string;
  message: string | null;
  rejectReasonIds: number[];
  description?:string
}
