
interface courseTypeProps {
  Id: number;
  Title: string;
}
interface seasonProps {
  Id: number;
  Title: string;
}

export  interface IItemCourse {
    CourseId: number;
    Title: string;
    Year: number;
    interviewDate: string;
    RegisterCloseDate: string;
    RegisterOpenDate: string;
    CourseType: courseTypeProps ;
    Season: seasonProps;
    EditDeadline:string
  }

export interface courseInfoProps {
  itemCourse: IItemCourse   | null;
  addForm: boolean;
  closeModal: () => void;
}
