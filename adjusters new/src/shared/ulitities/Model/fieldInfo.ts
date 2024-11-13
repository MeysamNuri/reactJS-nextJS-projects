export interface IFieldInfo {
  AdjustmentField: number;
  ContentType: string;
  Course80HourCertificate: string;
  FileExtension: string;
  IsExamNotNeeded: boolean;
  IsInquired: true;
  Score: null;
  SubFields: ISubFieldInfo[];
  Title: string;
  TypeId: string;
}

export interface ISubFieldInfo {
  Certificate: string
  ContentType: string
  FieldId: number;
  FileExtension:string;
  IsFirstLicence:boolean;
  IsInquired:boolean;
  Title: string;
  TypeId:string;
}
