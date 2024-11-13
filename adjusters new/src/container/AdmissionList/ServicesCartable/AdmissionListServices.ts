import { api } from "../../../httpServices/service";
import { IInterviewSessionInterviewer } from "../../../shared/ulitities/Model/interviewSeccionInterviwrs";
import { IAddDocumentApprove } from "../../../shared/ulitities/Model/documentApprove";
import { IAddWorkExperienceApprove } from "../../../shared/ulitities/Model/workExperienceApprove";

//Get Personal Info Detail
const getPersonalInfoDetail = async (applicantId?: number) => {
  const { data } = await api.get(
    `/admission/cartable/personal-info-detail?applicntId=${applicantId}`
  );
  return data;
};
//Get document info
const getDocumentInfo = async (applicantId?: number) => {
  const { data } = await api.get(
    `/admission/cartable/legal-personal-info-detail/show?applicantId=${applicantId}`
  );
  return data;
};

//Get  Adjuster Desktop Personal Info Detail
const getAdjusterDesktopPersonalInfoDetail = async () => {
  const { data } = await api.get(`/AdjusterDesktop/PersonalInfoDetail`);
  return data;
};

//Get Legal  Personal Info Detail
const getLegalPersonalInfoDetail = async (applicantId?: number) => {
  const { data } = await api.get(
    `/admission/cartable/legal-personal-info-detail?applicntId=${applicantId}`
  );
  return data;
};

/**
 * Natural Cartable
 */

//send Interviewers
const sendInterviewers = async (
  dataInterview: IInterviewSessionInterviewer
) => {
  const { data } = await api.post(
    `/admission/cartable/interview-session-interviewer`,
    dataInterview
  );
  return data;
};

//filter Interviewers
const filterInterviewers = async (datafilter: any) => {
  const { data } = await api.post(`/interviewer/filter`, datafilter);
  return data;
};

//fetch Interviewers
const fetchInterviewers = async () => {
  const { data } = await api.get(`/interviewer/all`);
  return data;
};

//all timeList
const getTimesList = async () => {
  const { data } = await api.get(`/interview/time-list`);
  return data;
};

//data timing
const sendDataTiming = async (betweenInterviewTime: any) => {
  const { data } = await api.post(
    `/interview-timing/between`,
    betweenInterviewTime
  );
  return data;
};

//all documnets
const getDocumentsList = async (applicantId?: number) => {
  const { data } = await api.get(
    `/admission/cartable/document-approve?applicntId=${applicantId}`
  );
  return data;
};

/**
 *
 * @param { Todo:  method post for update is change} param0
 */

//send Document
const senDocumentsList = async (
  documentList: IAddDocumentApprove,
  applicantId?: number
) => {
  const { data } = await api.post(
    `/admission/cartable/document-approve/${applicantId}/update`,
    documentList
  );
  return data;
};

//all WorkExperience
const getWorkExperienceList = async (applicantId?: number) => {
  const { data } = await api.get(
    `/admission/cartable/work-experience-approve?applicntId=${applicantId}`
  );
  return data;
};

//Work ExperienceApprove
const getWorkExperienceApprove = async (applicantId: number) => {
  const { data } = await api.get(
    `/admission/cartable/work-experience-approve?applicntId=${applicantId}`
  );
  return data;
};

/**
 *
 * @param { Todo:  method post for update is change} param0
 */

//send WorkExperience
const sendWrokExperienceList = async (
  workExperienceList: IAddWorkExperienceApprove,
  applicantId?: number
) => {
  const { data } = await api.post(
    `/admission/cartable/work-experience-approve/${applicantId}/update`,
    workExperienceList
  );
  return data;
};

// fetch Detail Report List
const fetchDetailReportList = (detailstaticalReport: any, statusId: number) => {
  return api.post(
    `/report/group-by-applicant-status/${statusId}/details`,
    detailstaticalReport
  );
};

// fetch Interviewer List
const fetchInterviewerListApplicantId = (applicantId?: number) => {
  return api.get(`/admission/cartable/interviewer-list/${applicantId}`);
};

// remove Interviewer List
const removeInterviewerList = (removeData: any) => {
  return api.delete(`/admission/cartable/interview-session-interviewer`, {
    data: removeData,
  });
};

export {
  getPersonalInfoDetail,
  sendInterviewers,
  getWorkExperienceApprove,
  getTimesList,
  getDocumentsList,
  senDocumentsList,
  getWorkExperienceList,
  sendDataTiming,
  sendWrokExperienceList,
  getLegalPersonalInfoDetail,
  fetchInterviewers,
  fetchDetailReportList,
  filterInterviewers,
  fetchInterviewerListApplicantId,
  removeInterviewerList,
  getAdjusterDesktopPersonalInfoDetail,
  getDocumentInfo
};
