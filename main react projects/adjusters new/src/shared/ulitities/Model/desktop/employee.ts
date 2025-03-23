export interface IAddEmployee {
  workLocationInfoId: null,
  employmentDate: string,
  position: number,
  academicDegreeId: number,
  academicFieldId: number,
  identityInfo:IAddIdentityInfo,
  endDate:string|null

}


export interface IViewEmployee {
  AcademicDegree:  string,
  AcademicDegreeId :  number
  AcademicField: string
  AcademicFieldId :  number
  EmploymentDate :  string
  Id: string
  IdentityInfo: IIdentityInfo,
  BirthDate: string
  FamilyName: string
  FatherName: string
  FirstName :  string
  Gender:  number
  NationalCode:  number
  Position: number
  PositionDescription: string
  WorkLocationInfoId:  null
  EndDate:string,
  ApplicantPersonalInfo:IApplicantPersonalInfo
}
export interface IApplicantPersonalInfo{
  Person:IPerson,
  Applicant:any
}
export interface IPerson{
  FirstName:string,
  FamilyName:string,
  NationalCode:string
}
export interface IIdentityInfo {
  NationalCode: number,
  BirthDate: string,
  FirstName: string,
  FamilyName: string,
  FatherName: string,
  Gender: number
}

export interface IAddIdentityInfo {
  nationalCode: number,
  birthDate: string,
  firstName: string,
  familyName: string,
  fatherName: string,
  gender: number
}