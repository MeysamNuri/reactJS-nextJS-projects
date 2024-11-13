export interface IPersonalInfoDetail {
  Address: string;
  AdjustmentFieldTitle: string;
  BirthCityId: number;
  BirthDate: string;
  BirthProvinceId: number;
  BirthProvinceTitle: string;
  CityId: number;
  CityTitle: string;
  BirthCityTitle: string;
  DenominationId: number;
  DenominationTitle: string;
  Email: string;
  FamilyName: string;
  FirstName: string;
  GraduationDate: string;
  MaritalStatusId: number;
  MaritalStatusTitle: string;
  MilitaryStatusId: number;
  MilitaryStatusTitle: string;
  Mobile: string;
  NationalCode: string;
  PostalCode: string;
  ProfilePic: string;
  ProvinceId:number;
  ProvinceTitle: string;
  RegistrationCode: string;
  ReligionId: number;
  ReligionTitle: string;
  SpouseJob: null;
  Telephone: string;
  University: string;
  FamilyMembers: any;
  AcademicDegreeTitle: string;
  AccessList: string[];
  HasExtendedChargoonLetter:boolean,
  CompanyTypeDescription:string,
  CompanyName:string
}

export interface IFamilyMember {
  BirthDate: string;
  FamilyName: string;
  FirstName: string;
  Gender: number;
  GenderTitle: string;
  Id: number;
  NationalCode: string;
  RelationId: number;
}
