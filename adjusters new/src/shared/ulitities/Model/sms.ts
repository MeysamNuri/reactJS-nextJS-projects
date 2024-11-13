export interface ISms {
    ApplicantId: number
    Body:string
    Id:number
    Reciver: string
    Subject:string
    SendDate: string
    SenderId: number
    TrackingCode: string
    ApplicantName:string
    SenderName:string
    SmsTypeEnum:number

}

export interface IOneBatchSmsSend {
    mobile: string,
    sbject: string,
    body: string,
    applicantId:number
}



// export interface IBatchSmsSend{

// }
