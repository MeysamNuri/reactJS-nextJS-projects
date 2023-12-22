export interface IIntervewerTime{
    Id: number,
    Time: string,
    Duration: number,
    CourseTitle: string,
    Used:boolean

}

export interface IAddIntervewerTime{
    startTime: string,
    endTime: string,
    courseId: number,
    duration: number,
    startHour: string,
    endHour: string
}

export interface IInterviewTiming{
    EndHour: string
    Id: number
    InterviewTimeId: number
    StartHour: string
    Used: boolean
}