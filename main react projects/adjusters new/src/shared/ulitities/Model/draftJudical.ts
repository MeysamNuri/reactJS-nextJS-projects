export interface IJudicalDraftPersonalInfo {
  fieldContainedInLicenseOfJudiciary: string;
  validityOfLicenseOfJudiciary: string;
  birthProvinceId: number;
  birthCityId: number;
  issueCityId: number;
  hasAdjusterCode: boolean;
  nationalityId: number;
  religionId: number;
  denominationId: number;
  maritalStatusId: number;
  spouseName: string;
  spouseJob: string;
  academicDegreeId: number;
  militaryStatusId: number;
  AcademicFieldId: number;
  university: string;
  graduationDate: any;
  SubAcademicField: string;
  provinceId: number;
  cityId: number;
  address: string;
  postalCode: string;
  telephone: string;
  mobile: string;
  email: string;
}

export interface IJudicalDraftFamilyMember {
  relationId: Number;
  identityInfo: IJudicalDraftJudicialIdentity;
}

export interface IJudicalDraftJudicialIdentity {
  nationalCode: Number;
  birthDate: string;
}

export interface IJudicalDraftWorkLocations {
  provinceId: Number;
  cityId: Number;
  address: string;
  telephone: string;
  placeUsage: number;
  postalCode: number;
  email: string;
  fax: string;
  website: string;
}

export interface IJudicalFieldInfo {
  adjustmentField: number;
  permitRequestDate: string;
}

export interface IJudicalFieldInfoEdit {
  oldAdjustmentField: number;
  adjustmentField: number;
  permitRequestDate: string;
}
// export interface IJudicalWorkExperience{
//   startDate:string,
//   endDate:string,
//   position:string,
//   companyId: number,
// }

export interface IJudicalWorkLocation {
  provinceId: Number;
  cityId: Number;
  address: string;
  telephone: string;
  placeUsage: number;
  postalCode: number;
  email: string;
  fax: string;
  website: string;
}

export interface IJudicalDraftWorkExperience {
  startDate: string;
  endDate: string | null;
  position: string;
  companyId: number;
  stillWorking: boolean;
  companyName: string | null;
}
