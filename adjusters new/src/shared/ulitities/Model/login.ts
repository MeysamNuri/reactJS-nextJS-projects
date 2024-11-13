export interface IRegistration {
  code: string;
  validateCode: string;
}

export interface INaturalPersonalList {
  ApplicantId: number;
  FullName: string;
  PersonId: number;
}

export interface INewId {
  adjusterTypeId: number;
  applicantId: number;
  courseId: number;
  nationalCode: number;
  birthDate: string;
  mobile: number;
  licenseType:number
}
