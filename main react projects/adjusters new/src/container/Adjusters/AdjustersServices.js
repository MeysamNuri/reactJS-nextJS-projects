import { api } from "../../httpServices/service";

/**
 *  interviewer
 */

//getAllInterviewer
const getAllInterviewer = async () => {
  const { data } = await api.get(
    "/interviewer/all/paged?pageSize=10000&pageNo=1"
  );
  return data;
};

//delete Interviewer
const deleteInterviewer = async (id) => {
  const { data } = await api.delete(`/Interviewer/${id}`);
  return data;
};

//InterviewerId
const fetchInterviewerId = async () => {
  const { data } = await api.post(`/interviewer`);
  return data;
};
//create Interviewer
const createInterviewer = async ({
  firstName,
  familyName,
  nationalCode,
  degreeId,
  bankId,
  phone,
  sheba,
  file,
  AdjustmentFieldId,
  CompanyId,
}) => {
  let interviewer = new FormData();
  interviewer.append("FirstName", firstName);
  interviewer.append("FamilyName", familyName);
  interviewer.append("NationalCode", nationalCode);
  interviewer.append("DegreeId", degreeId);
  interviewer.append("BankId", bankId);
  interviewer.append("Phone", phone);
  interviewer.append("Sheba", sheba);
  interviewer.append("file", file);
  interviewer.append("AdjustmentFieldId", AdjustmentFieldId);
  interviewer.append("CompanyId", CompanyId);
  const { data } = await api.post(`/interviewer`, interviewer);
  return data;
};

/**
 * 
 * @param { method post is change} param0 
 */
//update Interviewer
const updateInterviewer = async ({
  Id,
  firstName,
  familyName,
  nationalCode,
  degreeId,
  bankId,
  phone,
  sheba,
  file,
  AdjustmentFieldId,
  CompanyId,
}) => {
  let interviewer = new FormData();
  interviewer.append("FirstName", firstName);
  interviewer.append("FamilyName", familyName);
  interviewer.append("NationalCode", nationalCode);
  interviewer.append("DegreeId", degreeId);
  interviewer.append("BankId", bankId);
  interviewer.append("Phone", phone);
  interviewer.append("Sheba", sheba);
  interviewer.append("file", file);
  interviewer.append("Id", Id);
  interviewer.append("AdjustmentFieldId", AdjustmentFieldId);
  interviewer.append("CompanyId", CompanyId);
  const { data } = await api.post(`/interviewer/update`, interviewer);
  return data;
};

/**
 * course
 */

//All AdjustersType
const getAdjusterType = async () => {
  const { data } = await api.get(`/adjuster-type/all`);
  return data;
};

//All Season
const getSeason = async () => {
  const { data } = await api.get(`/season/all`);
  return data;
};

//create Course
const createCourse = async (newCourse) => {
  const { data } = await api.post(`/Course`, newCourse);
  return data;
};


/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

//Update Course
const updateCourse = async ({ courseId, ...updateCourse }) => {
  const { data } = await api.post(`/Course/${courseId}/update`, updateCourse);
  return data;
};

//delete Course
const deleteCourse = async (id) => {
  const { data } = await api.delete(`/Course/${id}`);
  return data;
};

//get Course
const getCourse = async (_, id) => {
  const { data } = await api.get(`/Course/${id}`);
  return data;
};

//interviewerTime
const getInterviewTime = async (key, fromDate, toDate) => {
  const { data } = await api.get(
    `interview/time/filter?fromDate=${fromDate}&toDate=${toDate}`
  );
  return data;
};

// get Course Available
const getCourseAvailable = async () => {
  const { data } = await api.get(`/course/natural/available`);
  return data;
};

//create InterviewTime
const createInterviewTime = async (newTimeInterviewTime) => {
  const { data } = await api.post(`/interview/time`, newTimeInterviewTime);
  return data;
};

//delet InterviewTime
const deletInterviewTime = async (id) => {
  const { data } = await api.delete(`/interview/time/${id}`);
  return data;
};

//get InterviewTimeId
const getInterviewTimeId = async (id) => {
  const { data } = await api.get(`/interview/time/${id}`);
  return data;
};


/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */


//update InterviewTime
const putInterviewTime = async (id) => {
  const { data } = await api.post(`/interview/time/${id}/update`);
  return data;
};

/**
 * document
 */

//get AllDocument
const getAllDocument = async () => {
  const { data } = await api.get(`/document-type/all`);
  return data;
};

//delet Document
const deletDocument = async (docId) => {
  const { data } = await api.delete(`/document-type?id=${docId}`);
  return data;
};


/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

//update isVisible
const updateIsvisible = async (docVisibility) => {
  const { data } = await api.post(`document-type-adjuster-type-visibility/update`,docVisibility);
  return data;
};


/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

//adjuster Type Require
const adjusterTypeIsRequire = async (adjusterTypeRequire) => {
  const { data } = await api.post(`document-type-adjuster-type-require/update`,adjusterTypeRequire);
  return data;
};


//adjuster documentType situtation
const  changeDocumentTypeSituation = async (documentTypeSituation) => {
  const { data } = await api.post(`document-type-adjuster-type-situation/update`,documentTypeSituation);
  return data;
};


//create Document
const createDocument = async (newDocument) => {
  const { data } = await api.post(`/document-type`, newDocument);
  return data;
};


//filter Document
const filterDocument = async (filterDocument) => {
  const { data } = await api.post(`/document-type/filter`, filterDocument);
  return data;
};

/**
 * Specialized field
 */

//get SpecializedField
const specializedField = async () => {
  const { data } = await api.get(`/adjustment-field/all/tree`);
  return data;
};

//delet Feild
const deletField = async (id) => {
  const { data } = await api.delete(`/adjustment-field/${id}?recursive=true`);
  return data;
};

//create SpecilizedFeild
const createSpecilizedFeild = async (newSpecializedField) => {
  const { data } = await api.post(`/adjustment-field`, newSpecializedField);
  return data;
};



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

//update SpecilizedFeild
const updateSpecilizedFeild = async ({ Encid, ...newSpecialzesField }) => {
  const { data } = await api.post(
    `/adjustment-field/update`,
    newSpecialzesField
  );
  return data;
};

//get SpecialedId
const getSpecilizedFeildId = async (_, id) => {
  const { data } = await api.get(`/adjustment-field/${id}`);
  return data;
};

/**
 * reject-reason
 */

//all RejectBaseInfo
const getRejectAllBaseInfo = async () => {
  const { data } = await api.get(`/base-info/reject-reason/all`);
  return data;
};
//remove RejectBaseInfoSeason
const removeRejectBaseInfo = async (id) => {
  const { data } = await api.delete(`/base-info/reject-reason/${id}`);
  return data;
};
//create RejectionBaseInfoSeason
const createRejectionBaseInfoSeason = async (newRejectionBaseInfoSeason) => {
  const { data } = await api.post(
    `/base-info/reject-reason`,
    newRejectionBaseInfoSeason
  );
  return data;
};


/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */


//update Rejection BaseInfo Season
const updateRejectionBaseInfoSeason = async ({ seasonId, ...updateSeason }) => {
  const { data } = await api.post(
    `/base-info/reject-reason/${seasonId}/update`,
    updateSeason
  );
  return data;
};

//create RejectionBaseInfoSeason
const createChangeStatusReason = async (newRejectionBaseInfoSeason) => {
  const { data } = await api.post(
    `/ChangeStatusReason`,
    newRejectionBaseInfoSeason
  );
  return data;
};


/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */


 
/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

//update Rejection BaseInfo Season
const updateChangeStatusReason = async ({ seasonId, ...updateSeason }) => {
  const { data } = await api.post(`ChangeStatusReason/update`, updateSeason);
  return data;
};

//all timing
const getAllTiming = async (courseId) => {
  const { data } = await api.get(`/interview-timing/season/${courseId}`);
  return data;
};

export {
  createInterviewer,
  deleteInterviewer,
  updateInterviewer,
  getAdjusterType,
  getSeason,
  createCourse,
  deleteCourse,
  updateCourse,
  getCourse,
  getInterviewTime,
  getCourseAvailable,
  createInterviewTime,
  getAllDocument,
  deletDocument,
  createDocument,
  specializedField,
  deletField,
  deletInterviewTime,
  createSpecilizedFeild,
  updateSpecilizedFeild,
  getSpecilizedFeildId,
  getInterviewTimeId,
  putInterviewTime,
  getRejectAllBaseInfo,
  removeRejectBaseInfo,
  createRejectionBaseInfoSeason,
  updateRejectionBaseInfoSeason,
  getAllInterviewer,
  getAllTiming,
  fetchInterviewerId,
  createChangeStatusReason,
  updateChangeStatusReason,
  updateIsvisible,
  adjusterTypeIsRequire,
  changeDocumentTypeSituation,
  filterDocument
};
