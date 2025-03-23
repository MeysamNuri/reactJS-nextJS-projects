
export interface ICourse {
  CourseId: number;
  CourseTitle:string,
  CourseType: ICourseType;
  CourseTypeId: number;
  CreationDate: string;
  InterviewDate: string;
  RegisterCloseDate: string;
  RegisterOpenDate: string;
  Season: ISeason;
  SeasonId: number;
  Title: string;
  Year: number;
}

export interface ICourseType {
  Id:number;
  Title:string

}

export interface ISeason {
  Id:number;
  Title:string

}
