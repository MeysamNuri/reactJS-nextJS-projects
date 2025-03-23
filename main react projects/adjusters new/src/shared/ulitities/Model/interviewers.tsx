export interface IIntervewers {
  Id: number;
  FirstName: string;
  FamilyName: string;
  NationalCode: string;
  Phone: string;
  DegreeTitle: string;
  DegreeId:number;
  BankTitle: string;
  BankId:number;
  Sheba: string;
  AdjustmentFieldId: number;
  AdjustmentFieldTitle: string;
  CompanyTitle: string;
  CompanyId: number;
  ProfilePic:string
}
export interface IRequestDocType {
  Id: number;
  key: number;
  DocumentTitle:string;
  RequestType:string;
  IsRequired:boolean;
  AdjusterType:string;
  RequestTypeDescription:string

}

export interface ISelectedIntervewers {
  Bank: IBank;
  Degree: IDegree;
  FamilyName: string;
  FirstName: string;
  Id: number;
  NationalCode: string;
  Phone: string;
  ProfilePic: string;
  Sheba: string;
}

export interface IBank {
  Id: number;
  Title: string;
}
export interface IDegree {
  Id: number;
  Title: string;
}
