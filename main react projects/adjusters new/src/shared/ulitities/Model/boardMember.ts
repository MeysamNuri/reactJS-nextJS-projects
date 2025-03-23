export interface IBoardMember {
  AppointmentDate: string;
  Description: string;
  FullName: string;
  Id: string;
  NationalCode: string;
  PositionTitle: string;
  IdentityInfo: IIdentityInfo;
  CooperationEndDate:string
  PositionId:number,
  FounderId:number,
  AdjusterCode:string,
  SpecializedFieldTitle:string,
  Mobile:string,
}

export interface IIdentityInfo {
  Id: number;
  BirthDate: string;
  FullName: string;
  FirstName: string;
  FamilyName: string;
  NationalCodeOut: string;
  Gender: string;
}

export interface IDescriptionBoardMember {
  applicantId?: number;
  boardMemberId: string;
  description: string;
}

export interface ICurrentBoardMember {
  Id: string;
  FullName: string;
  NationalCode: string;
  BirthDate: string;
  PositionId: string;
  AppointmentDate: string;
  CooperationEndDate: string;
  AdjusterCode: string;
  AdjustmentField: null | string;
}
export interface IAdjusterList {
  ApplicantId: number;
  FullName: string;
  PersonId: number;
}
export interface IAddBoardMember {
  applicantId: number;
  startDate: string;
  postId: number;
  description: string;
  workLocationInfoId:number
}
export interface IBoardMemberIsView {
  RequestTypeId: number;
  BoardMemberId: string;
  FullName: string;
  NationalCode: string;
  CreationDate: string;
  Position: string;
  AcademicDegree: string;
  AdjustmentField: string;
  AppointmentDate: string;
  Description: null;
  Telephone: string;
  Mobile: string;
  Address: string;
  Email: string;
  ResponseUser: string;
  ResponseDate: string;
  Response: string;
  ApplicantRequestId: number;
}

export interface IPersonalInfo {
  AcademicDegreeId: number;
  AcademicDegreeTitle: string;
  AcademicFieldId: number;
  AcademicFieldTitle: string;
  Address: string;
  Applicant: IApplicant;
  BirthCityId: number;
  BirthCityTitle: string;
  BirthProvinceId: number;
  BirthProvinceTitle: string;
  CityId: number;
  CityTitle: string;
  ContentType: string;
  DenominationId: number;
  DenominationTitle: string;
  Email: string;
  FamilyMembers: null;
  FileExtension: string;
  GraduationDate: string;
  IssueCityId: number;
  IssueCityTitle: string;
  MaritalStatusId: number;
  MaritalStatusTitle: string;
  MilitaryStatusId: number;
  MilitaryStatusTitle: null;
  Mobile: string;
  NationalityId: number;
  NationalityTitle: string;
  Person: Iperson;
  PostalCode: string;
  ProfilePic: string;
  ProvinceId: number;
  ProvinceTitle: string;
  ReligionId: number;
  ReligionTitle: string;
  SubAcademicField: string;
  Telephone: string;
  Title: string;
  TypeId: string;
  University: string;
  BoardMember: IBoardMemberInfo;
}

export interface Iperson {
  BirthDate: string;
  FamilyName: string;
  FatherName: null;
  FirstName: string;
  FullName: string;
  Gender: number;
  Id: number;
  NationalCode: number;
  NationalCodeOut: string;
}
export interface IApplicant {
  ApplicantPersonalInfo: null;
  AssignTo: number;
  AssignToTitle: string;
  Course: ICourse;
  CourseId: number;
  DraftId: number;
  Id: number;
  LicenseType: number;
  RegisterDate: string;
  RegistrationCode: number;
  StatusId: number;
  StatusTitle: string;
}

export interface ICourse {
  CourseId: number;
  CourseType: ICourseType;
  CourseTypeId: ICourseType;
  CreationDate: string;
  RegisterCloseDate: string;
  RegisterOpenDate: string;
  Season: ISeason;
  SeasonId: number;
  Title: string;
  Year: number;
}

export interface IBoardMemberInfo {
  ApplicantId: number;
  ApplicantRequestId: null;
  AppointmentDate: string;
  CooperationEndDate: null;
  Description: null;
  FounderId: number;
  Id: string;
  IdentityInfo: null;
  PositionId: number;
  PositionTitle: string;
  WorkLocationInfoId: number;
}

export interface ICourseType {
  Id: number;
  Title: string | null;
}
export interface ISeason {
  Id: number;
  Title: string | null;
}
