import moment from "moment-jalaali";
import { toast } from "react-toastify";
import { accessList } from "../shared/ulitities/Enums/accesslist";

export function getWeekends(date: Date): Date[] {
  let m = moment(date);
  m = m.startOf("jMonth");
  const month = m.jMonth(),
    weekends = [];

  // date.setDate(1);

  // Get the first Monday in the month

  while (m.weekday() !== 4) {
    m.add(1, "days");
  }

  // Get all the other Mondays in the month
  while (m.jMonth() === month) {
    weekends.push(m.toDate());
    m.add(7, "days");
  }

  return weekends;
}

//دسترسی پروانه ارزیاب
export const findAccessGetLicense = (arrayList: any) =>
  arrayList && arrayList?.some((item: any) => item === accessList.GetLicense);

// دسترسی نامه چارگون
export const findchargoonLetter = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.ChargoonLetter);

// ارسال پیامک درگاه ملی
export const g4bSendMessage = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.G4BSendMessage);
// بررسی ثبت نام درگاه ملی
export const g4bCheckRegisteration = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.G4BCheckRegisteration);
// تایید مدارک
export const g4bDocumentApprove = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.G4BDocumentApprove);

// صدور کد ارزیابی
export const findIssueRegistrationCode = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.IssueRegistrationCode);

 //رد نهایی
export const findRejectedInInterview = (arrayList: any) =>
arrayList &&
arrayList?.some((item: any) => item === accessList.RejectedInInterview);

//ثبت  چارگون
export const findChargoonRegistration = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.ChargoonRegistration);

//زمان مصاحیه
export const findInterviewTime = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.InterviewTime);

  //دعوت به مصاحیه
export const findInterviewInvitation = (arrayList?: any) =>

arrayList &&
arrayList?.some((item: any) => item === accessList.InterviewInvitation);

  //ثبت نمره
  export const findRegisterationScore = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.RegisterScore);

  //ثبت رشته
  export const findRegisterationField = (arrayList: any) =>
  arrayList &&
  arrayList?.some((item: any) => item === accessList.RegisterField);



  // const GetCookie = (name: string): string | undefined => {
  //   const nameEQ = name + "=";
  //   const allCookie = document.cookie.split(";");
  //   for (var i = 0; i < allCookie.length; i++) {
  //     var c = allCookie[i];
  //     while (c.charAt(0) === " ") c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  //   }
  //   return undefined;
  // };



//پیام موفقیت آمیز
export const messageSuccess = (success: string) =>
  toast.success(success, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

//پیام خطا
export const messageError = (error: string) =>
  toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

// پیام هشدار
export const messageWarning = (warning: string) =>
  toast.warning(warning, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
 