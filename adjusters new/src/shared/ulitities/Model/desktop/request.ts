export interface IAddRequstType {
  applicantId: number;
  requestTypeId: number;
  description: string;
  files: any;
  DocumentRequestTypeId: number;
}

export interface IAddEstablishmentBranch {
  beforWorkLocationInfoId: number|null,
  postalCode: string;
  telephone: string;
  email: string;
  description: string;
  provinceId: number,
  cityId: number,
  address: string,
  placeUsage: number,
  fax: string,
  website: string,

}

export interface IAddChangeWorkLocation {
  beforWorkLocationInfoId: number|null,
  postalCode: string;
  telephone: string;
  email: string;
  description: string;
  provinceId: number,
  cityId: number,
  address: string,
  placeUsage: number,
  fax: string,
  website: string,
}

export interface IChangeWorkLocation {
  Address: string;
  CityId: number;
  Email: string;
  Fax: string;
  Id: number;
  PlaceUsage: number;
  PostalCode: string;
  ProvinceId: number;
  Telephone: string;
}
export interface IListRequest {
  ApplicantId: number;
  BoardMember: any;
  CEO: any;
  CapitalIncrease: any;
  ContractEvaluation: any;
  CreationDate: string;
  ExpirationDate: string;
  Description: string;
  Employee: any;
  ExpertId: number;
  FileDescriptionId: number | null;
  Id: number;
  RequestType: number;
  RequestTypeDescription: string;
  Response: string;
  StackAssignment: any;
  Status: Number;
  Title: string | null;
  WorkLocation: any;
  WriterId: number;
  ApplicantPersonalInfo: any;
  StatusDescription: string;
  BossId: null;
  EffectiveDate: null;
  EvaluationStatus: number;
  EvaluationStatusDescription: string;
  Files: any;
  Boss: any,
  Expert: any
}


