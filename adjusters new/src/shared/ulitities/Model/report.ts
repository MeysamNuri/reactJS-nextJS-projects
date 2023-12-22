export interface IReport {
  AdjusterCode: string;
  AdjustmentFieldId: number;
  AdjustmentFieldTitle: string;
  ApplicantId: number;
  CartableId:number;
  Average: number;
  CityId: number;
  CityTitle: string;
  CourseId: number;
  CourseTitle: string;
  ExpirationDate: string;
  FamilyName: string;
  FatherFamilyName: null;
  FatherFirstName: null;
  FirstName: string;
  InterviewTime: string;
  Mobile: string;
  NationalCode: string;
  ProvinceId: number;
  ProvinceTitle: string;
  RegistrationCode: string;
  SeasonId: number;
  SeasonTitle: string;
  User: IuserName;
  UserId: number | null;
  CompanyName?: string;
  CompanyTypeDescription:string;
  StatusTitle: string;
  StatusId: number;
  StateId: number;
  StateTitle: string;
  LicenseTypeTitle: string;
  LicenseType: number;
  AccessList:any;
  EffectiveDate?:string;
  HasExtendedChargoonLetter:boolean;
  LiceseCreationDate:string,
  ExpireLicenseFlag:boolean,
  FarwellFlag:boolean,
  RedundanceFlag:boolean,
  UserName:string,
  ForbiddenFiles:any
}

export interface IuserName {
  CompanyId: number;
  Deleted: boolean;
  EncId: string;
  FullName: string;
  IsActive: boolean;
  IsServiceUser: boolean;
  Person:IPerson
  PersonId: number
  Username: string
}
export interface IPerson {
  BirthDate: string
  Email:string
  FatherName: string
  FirstName: string
  Gender: boolean
  Id: number
  IdentificationNumber: string
  IdentificationSerial: string
  IdentificationSeries: string
  IsAlive: boolean
  LastName: string
  NationalCode: string
  PhoneNumber: string
  
}
