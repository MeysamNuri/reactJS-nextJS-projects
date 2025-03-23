export interface INaturalDraftPersonalInfo {
  birthProvinceId: Number;
  birthCityId: Number;
  issueCityId: Number;
  hasAdjusterCode: boolean;
  nationalityId: Number;
  religionId: Number;
  denominationId: Number;
  maritalStatusId: Number;
  spouseName: string;
  spouseJob: string;
  academicDegreeId: Number;
  militaryStatusId: Number;
  AcademicFieldId: Number;
  university: string;
  graduationDate: any;
  SubAcademicField: string;
  provinceId: Number;
  cityId: Number;
  address: string;
  postalCode: string;
  telephone: string;
  mobile: string;
  email: string;
}

export interface IFamilyMember {
  relationId: Number;
  identityInfo: {
    nationalCode: Number;
    birthDate: string;
  };
}

export interface INationalIdentity {
  nationalCode: Number;
  birthDate: string;
}

export interface IWorkLocations {
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

export interface IUploadedCEOWorkHistory {
  startDate: string;
  endDate: string;
  position: string;
  companyId: number;
}

export interface IWorkExperience {
  startDate: string;
  endDate: string | null;
  position: string;
  companyId: number;
}
