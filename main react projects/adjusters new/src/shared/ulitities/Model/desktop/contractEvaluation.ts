export interface IAddContractEvaluation {
  // applicantRequestId: number;
  contractEvaluationCode: string;
  contractStartDate: String;
  contractEndDate: string;
  contractingParty: string;
  companyId: number;
  insurerName: string;
  insurerId: string;
  calculationRemunerationMethod: string;
  reportingMethod: string;
  authorityLevel: string;
  terminatingCondition: string;
  resolutionDispute: boolean;
  systemCode: string;
  // description: string;
  registrationDate: string;
}

export interface IViewContractEvaluation {
  ApplicantId: number;
  ApplicantRequestId: null;
  AuthorityLevel: string;
  CalculationRemunerationMethod: string;
  CompanyId: number;
  ContractEndDate: string;
  ContractEvaluationCode: string;
  ContractStartDate: string;
  ContractingParty: string;
  Id: number;
  InsurerId: string;
  InsurerName: string;
  RegistrationDate: string;
  ReportingMethod: string;
  ResolutionDispute: boolean;
  SystemCode: string;
  TerminatingCondition: string;
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