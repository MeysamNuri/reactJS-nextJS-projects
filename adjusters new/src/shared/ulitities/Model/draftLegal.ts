//The interfaces

//Company Information interface
export interface ICompanyInfo {
  nationalCode: Number;
  sharePercentage: Number;
  assets: Number;
  // licenseIssueDate: string;
  // provinceId: Number;
  website: string;
  companyName: string;
}

//Work Location Information Interface
export interface IWorkLocationInfo {
  provinceId: Number;
  cityId: Number;
  address: string;
  telephone: string;
  placeUsage: Number;
  postalCode: string;
  email: string;
  fax: string;
  website: string;
}

//Board of Directors Interface
export interface IBoardMember {
  // nationalCode: Number;
  // birthDate: string;
  // provinceId: Number;
  // cityId: Number;
  // university: string;
  // academicDegreeId: Number;
  // AcademicFieldId: Number;
  // SubAcademicField: string;
  // graduationDate: string;
  ApplicantId: Number;
  appointmentDate: string;
  positionId: Number;
  //adjusterCode: string;
  //email: string;
  //address: string;
  //mobile: string;
  //telephone: string;
  //postalCode: string;
}

//Work experience Interface
export interface IWorkExperience {
  id: string;
  startDate: string;
  endDate: string | null;
  position: string;
  companyId: Number| null;
  companyName: any;
  stillWorking: boolean;
}

//Shareholders Interface
export interface IStockholder {
  nationalCode: Number;
  birthDate: string;
  shareAmount: Number;
  joinDate: string;
}

//Staff Interface
export interface IEmployee {
  nationalCode: Number;
  birthDate: string;
  employmentDate: string;
  position: string;
  academicDegreeId: Number;
  AcademicFieldId: Number;
}

export interface IUploadedCEOWorkHistory {
  nationalIDNumber: Number;
}

//Document Interface
export interface IDocument {
  nationalIDNumber: Number;
}
