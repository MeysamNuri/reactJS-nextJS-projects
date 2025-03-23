export enum applicantRequestTypeStatuses {
  Draft = 0, // پیش نویس
  Waiting = 1, //در انتظار بررسی
  RejectByExpert = 2, //رد کارشناس
  AcceptByExpert = 3, //تایید کارشناس
  RejectByGeneralManager = 4, //رد مدیر
  AcceptByGeneralManager = 5, //تایید مدیر
}
