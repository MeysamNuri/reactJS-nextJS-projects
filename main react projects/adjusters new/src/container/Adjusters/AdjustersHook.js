import { useQuery, useMutation, queryCache } from "react-query";
import { messageSuccess, messageError } from "../../utils/utils";
import * as api from "./AdjustersServices";
/**
 *  Interview
 */

//get all Interviewer
const useAllInterviewer = () => {
  return useQuery("getAllInterviewer", api.getAllInterviewer, {
    staleTime: 1000 * 2 * 60,
  });
};

//Create Interviewr
const useCreateInterviewer = () => {
  return useMutation(api.createInterviewer, {
    onSuccess: (response) => {
      queryCache.refetchQueries("projectsInterview");
      if (response.IsSucceed === true) {
        messageSuccess(". مصاحبه‌کننده به درستی افزوده شد");
      } else {
        messageError("خطا در اضافه کردن  زمان مصاحبه");
      }
    },
    onError: () => {
      messageError("خطایی رخ داده است");
    },
  });
};

//delet Interviewer
const useDeletInterviewer = () => {
  return useMutation(api.deleteInterviewer, {
    onSuccess: (response) => {
      queryCache.refetchQueries(["projectsInterview"]);
      if (response.IsSucceed === true) {
        messageSuccess(". مصاحبه کننده به درستی حذف گردید ");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(". حذف مصاحبه‌کننده با خطا مواجه گردید");
    },
  });
};

//update InterViewer
const useUpdateInterviewer = () => {
  return useMutation(api.updateInterviewer, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        /* queryCache.removeQueries("projectsInterview"); */
        queryCache.invalidateQueries("projectsInterview");
       /*  queryCache.refetchQueries("projectsInterview", {
          staleTime: 1000 * 2 * 60,
        }); */
        messageSuccess(".مصاحبه کننده به درستی ویرایش شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(". خطایی در ویرایش مصاحبه کننده رخ داده است");
    },
  });
};

/**
 * COURSE
 */

//All  AdjusterType
const useAllAdjusterType = () => {
  return useQuery("adjusterType", api.getAdjusterType, {
    staleTime: 1000 * 2 * 60,
  });
};

//All Seasons
const useAllSeasons = () => {
  return useQuery("seasons", api.getSeason, { staleTime: 1000 * 2 * 60 });
};

//create Course
const useCreateCourse = () => {
  return useMutation(api.createCourse, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("projectsCourse");
        queryCache.refetchQueries("courseAvailable");
        messageSuccess(".دوره به درستی افزوده شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError("خطایی رخ داده است");
    },
  });
};

//update Course
const useUpdateCourse = () => {
  return useMutation(api.updateCourse, {
    onSuccess: (response, { id }) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("projectsCourse");
        // queryCache.refetchQueries(["CourseId", id]);
        messageSuccess(".دوره به درستی ویرایش شد ");
      } else if (response.IsSucceed === false && response.ErrorType === -4) {
        messageError("تاریخ شروع نمی تواند بعد از تاریخ پایان باشد");
      } else {
        messageError("خطایی رخ داده است");
      }
    },
    onError: () => {
      messageError("خطایی در ویرایش دوره رخ داده است.");
    },
  });
};

//delete Course
const useDeletCourse = () => {
  return useMutation(api.deleteCourse, {
    onSuccess: (response) => {
      if (response.IsSucceed === false && response.ErrorType === -35) {
        messageError("به دلیل استفاده امکان حذف وجود ندارد");
      } else if (response.IsSucceed === true) {
        messageSuccess("دوره به درستی حذف شد");
        queryCache.refetchQueries("projectsCourse");
      } else if (response.IsSucceed === false) {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError("خطایی در حذف دوره رخ داده است.");
    },
  });
};

//Get Course
const useGetCourseId = (CourseId) => {
  return useQuery(["CourseId", CourseId], api.getCourse, {
    staleTime: 1000 * 2 * 60,
  });
};

//interviewerTime
const useGetInterviewTime = (fromDate, endDate) => {
  return useQuery(["InterviewTime", fromDate, endDate], api.getInterviewTime, {
    staleTime: 1000 * 2 * 60,
  });
};

//remove InterviewTime
const useDeletInterviewTime = () => {
  return useMutation(api.deletInterviewTime, {
    onSuccess: (response, id) => {
      const InterviewTime = queryCache.getQueries(["InterviewTime"]);
      InterviewTime.forEach((q) => {
        const interview = queryCache.getQueryData(q.queryKey);
        const data = interview?.Result?.filter((item) => item.Id !== id);
        queryCache.setQueryData(q.queryKey, { Result: data });
      });
      if (response.IsSucceed === true) {
        messageSuccess(".زمان مصاحبه به درستی حذف شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(". خطایی در حذف زمان مصاحبه رخ داده است ");
    },
  });
};

//getAll courseType Available
const useAllCourseAvailable = () => {
  return useQuery("courseAvailable", api.getCourseAvailable);
};

//create Interview Time
const useCreateTimeInterview = () => {
  return useMutation(api.createInterviewTime, {
    onSuccess: (response) => {
      queryCache.refetchQueries("InterviewTime");
      if (response.IsSucceed === true) {
        messageSuccess("زمان مصاحبه با موفقیت اضافه گردید");
      } else if (response.IsSucceed === false && response.ErrorType === -3) {
        messageError("زمان مصاحبه نمیتواند قبل از زمان جاری باشد");
      } else {
        messageError("اضافه گردن زمان مصاحبه با خطا روبه رو گردید");
      }
    },
    onError: () => {
      messageError("اضافه گردن زمان مصاحبه با خطا روبه رو گردید");
    },
  });
};

/**
 * Document
 */

//get Document
const useAllDocument = () => {
  return useQuery("allDocument", api.getAllDocument, {
    staleTime: 1000 * 2 * 60,
  });
};

//create Document
const useCreateDocument = () => {
  return useMutation(api.createDocument, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allDocument");
        messageSuccess(".سند به درستی افزوده شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {},
  });
};

//filter Document
const useFilterDocument = () => {
  return useMutation(api.filterDocument, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allDocument");
        messageSuccess(".سند به درستی افزوده شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {},
  });
};

//delete Document
const useDeletDocument = () => {
  return useMutation(api.deletDocument, {
    onSuccess: (response, id) => {
      if (response.IsSucceed === true) {
        const Document = queryCache.getQueryData("allDocument");
        const data = Document?.Result?.filter((item) => item.Id !== id);
        queryCache.setQueryData("allDocument", { Result: data });
        messageSuccess(".سند به درستی حذف شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(".خطایی در حذف سند رخ داده است");
    },
  });
};

//update isActive
const useUpdateIsActive = () => {
  return useMutation(api.updateIsvisible, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allDocument");
        messageSuccess(".قابل رویت بودن به درستی ویرایش شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError("خطایی در ویرایش قابل رویت بودن رخ داده است.");
    },
  });
};

//update Adjuster Type Require
const useUpdateAdjusterTypeRequire = () => {
  return useMutation(api.adjusterTypeIsRequire, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allDocument");
        messageSuccess(".اجباری یا غیراجباری بودن به درستی ویرایش شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError("خطایی در ویرایش اجباری یا غیراجباری بودن رخ داده است.");
    },
  });
};

//update DocumentType situation
const useUpdateDocumentTypeSituation = () => {
  return useMutation(api.changeDocumentTypeSituation, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allDocument");
        messageSuccess(".نوع سند به درستی ویرایش شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError("خطایی در ویرایش نوع سند رخ داده است.");
    },
  });
};

/**
 * Specialized field
 */

//getSpecializedFeild
const useGetSpecializedFeild = () => {
  return useQuery("allFields", api.specializedField, {
    staleTime: 1000 * 2 * 60,
  });
};

//create SpecializedFeild
const useCreateSpecializedFeild = () => {
  return useMutation(api.createSpecilizedFeild, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allFields");
        messageSuccess(".رشته به درستی افزوده شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(".خطایی در افزودن رشته رخ داده است");
    },
  });
};

//get SpecialzedFeildId
const useGetSpecialzedFeildId = (id) => {
  return useQuery(["specializedFieldId", id], api.getSpecilizedFeildId, {
    staleTime: 1000 * 2 * 60,
  });
};

//update SpecialzedFeild
const useUpdateSpecialzedFeild = () => {
  return useMutation(api.updateSpecilizedFeild, {
    onSuccess: (response, { Encid }) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allFields");
        queryCache.refetchQueries(["specializedFieldId", Encid]);
        messageSuccess(".رشته تخصصی به درستی ویرایش شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(".خطایی در ویرایش رشته تخصصی رخ داده است");
    },
  });
};

//delet Feild
const useDeletFeild = () => {
  return useMutation(api.deletField, {
    onSuccess: (response, Id) => {
      if (response.IsSucceed === true) {
        const allFields = queryCache.getQueryData("allFields");
        // console.log(Id, "Idddddddddd");
        // console.log(allFields?.Result, "allFieldssssssssss");
        const data = allFields?.Result?.filter((item) => item.Id !== Id);
        // const data3 = allFields?.Result?.find((item) => item.Id !== Id);
        // console.log(data3,"data3");
        // const data2 = allFields?.Result?.forEach((item) =>
        // item?.SubFields?.filter((item) => item.Id !== Id)
        // );
        // console.log(data2, "data2222");
        queryCache.setQueryData("allFields", { Result: data });
        // queryCache.setQueryData("allFields", { Result: data2 });
        messageSuccess(".رشته با موفقیت حذف گردید");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(".حذف رشته با خطا روبه رو گردید");
    },
  });
};

/**
 *  get RejectAllBaseInfo
 */

//useRejectAllBaseInfo
const useRejectAllBaseInfo = () => {
  return useQuery("allRejectBaseinfo", api.getRejectAllBaseInfo, {
    staleTime: 1000 * 2 * 60,
  });
};

//delet Reject All BaseInfo
const useDeletRejectBaseInfo = () => {
  return useMutation(api.removeRejectBaseInfo, {
    onSuccess: (response, Id) => {
      if (response.IsSucceed === true) {
        const allReject = queryCache.getQueryData("allRejectBaseinfo");
        const data = allReject?.Result?.filter((item) => item.Id !== Id);
        queryCache.setQueryData("allRejectBaseinfo", { Result: data });
        messageSuccess("دلیل رد متقاضی به درستی حذف شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(".خطایی در حذف دلیل رد متقاضی رخ داده است");
    },
  });
};

//create RejectionInfoSeason
const useCreateRejectionSeason = () => {
  return useMutation(api.createRejectionBaseInfoSeason, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allRejectBaseinfo");
        messageSuccess(".دلیل رد متقاضی به درستی اضافه شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(".خطایی در افزودن دلیل دلیل رد متقاضی رخ داده است");
    },
  });
};

//update RejectionInfoSeason
const useUpdateRejectionInfoSeason = () => {
  return useMutation(api.updateRejectionBaseInfoSeason, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("allRejectBaseinfo");
        messageSuccess(".دلیل رد متقاضی به درستی ویرایش شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError("خطایی در ویرایش دلیل رد متقاضی رخ داده است.");
    },
  });
};

//create  changeStatusReason
const useChangeStatusReason = () => {
  return useMutation(api.createChangeStatusReason, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("statusReasons");
        messageSuccess(".دلیل تغییر وضعیت به درستی اضافه شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError(".خطایی در افزودن  دلیل تغییر وضعیت رخ داده است");
    },
  });
};

//update changeStatusReason
const useUpdateChangeStatusReason = () => {
  return useMutation(api.updateChangeStatusReason, {
    onSuccess: (response) => {
      if (response.IsSucceed === true) {
        queryCache.refetchQueries("statusReasons");
        messageSuccess(".دلیل تغییر وضعیت به درستی ویرایش شد");
      } else {
        messageError(response.Message);
      }
    },
    onError: () => {
      messageError("خطایی در ویرایش دلیل رد متقاضی رخ داده است.");
    },
  });
};

export {
  useCreateInterviewer,
  useDeletInterviewer,
  useUpdateInterviewer,
  useAllAdjusterType,
  useAllSeasons,
  useCreateCourse,
  useGetCourseId,
  useUpdateCourse,
  useDeletCourse,
  useGetInterviewTime,
  useAllCourseAvailable,
  useCreateTimeInterview,
  useAllDocument,
  useDeletDocument,
  useCreateDocument,
  useGetSpecializedFeild,
  useCreateSpecializedFeild,
  useGetSpecialzedFeildId,
  useDeletFeild,
  useDeletInterviewTime,
  useUpdateSpecialzedFeild,
  useRejectAllBaseInfo,
  useDeletRejectBaseInfo,
  useCreateRejectionSeason,
  useUpdateRejectionInfoSeason,
  useAllInterviewer,
  useChangeStatusReason,
  useUpdateChangeStatusReason,
  useUpdateIsActive,
  useUpdateAdjusterTypeRequire,
  useUpdateDocumentTypeSituation,
  useFilterDocument,
};
