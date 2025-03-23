export interface IApplicantWarnings{
    Title:string,
    Description:string,
    EffectiveDate:string,
    SendSms:boolean,
    ApplicantPersonalInfo:IApplicantPersonalInfo
    Id:number
}
export interface IApplicantPersonalInfo{
    Applicant:any,
    Person:IPerson
}
export interface IPerson{
    FamilyName:string,
    FirstName:string,
    NationalCode:number
}