//libraries
import { combineReducers } from "redux";


//action type
import { REGISTRATION_COMPONENT_UNMOUNT } from "../constant/commonTypes";
import daysHolidays from "./holiday/reducer";
import userLogin from "./authentication/reducer";
import naturaljudicalPersonalList from "./adjuster/reducer";
import staffType from "./staffType/reducer";
import inquire from "./inquire/reducer";
 
//common reducers
import baseInfo from "./BaseInfo/reducer";
import forbiddenInfo from './forbidden/reducer'
import listDenominationReligionId from "./denominationReligionId/reducer";
import NewDraftId from "./newDraftId/reducer";
import newJudicalDraftId from "./JudicalDraft/newJudicalId/reducer";
import newDraftLegalId from "./newLegalId/reducer";
import resProfilePic from "./getProfilePic/reducer";
import getCourseType from "./getCourseType/reducer";
import getValidCourses from "./getValidCourses/reducer";
import checkPhoneNumber from "./registration/checkPhoneNumber/reducer";
import registrationLogin from "./registration/login/reducer";
import allAdjusterType from "./registration/getAllAdjusterType/reducer";
import applicantRejectReasons from "./registration/getRejectReasonList/applicantRejectReason/reducer";
import workExperienceRejectReasons from "./registration/getRejectReasonList/workExperience/reducer";
import documentRejectReasons from "./registration/getRejectReasonList/applicantDocument/reducer";
import captchaImage from "./registration/getCaptcha/reducer";
import lastStatusOfApplicantInAllStates from "./registration/getApplicantLastStatus/reducer";
import requestDocumentsType from "./requestDocumentsType/reducer";

//applicant G4B details
import G4BDetails from './applicantG4B/reducer'
//fieldInfos
import getFieldInfoData from "./fieldInfo/getFieldInfo/reducer";
import postFieldInfoData from "./fieldInfo/postFieldInfo/reducer";
import isExamNotNeededPostSubFieldDraft from "./fieldInfo/postIsExamNotNeeded/reducer";
import inquireFieldInfoDraft from "./fieldInfo/inquireFieldInfo/reducer";
import inquireSubFieldInfoDraft from "./fieldInfo/inquireSubFieldInfo/reducer";

// Natural draft
import nationalIdentify from "./NaturalDraft/nationalityIdentify/reducer";
import familyMembers from "./NaturalDraft/familyMember/reducer";
import allFamilyMembers from "./NaturalDraft/allFamilyMember/reducer";
import removeFamily from "./NaturalDraft/removeFamilyMember/reducer";
import personInfo from "./NaturalDraft/personalInformation/reducer";
import feildInfo from "./NaturalDraft/feildInfo/reducer";
import specializedField from "./NaturalDraft/getAllFieldInfo/reducer";
import certifacte80Hour from "./NaturalDraft/inquire80hoursCertifacate/reducer";
import feildCertifacte from "./NaturalDraft/inquireFieldCertificate/reducer";
import workPlaces from "./NaturalDraft/workPlace/reducer";
import naturalRemoveDocs from "./NaturalDraft/removeDocument/reducer";
import workExperience from "./NaturalDraft/workExperience/reducer";
import listWorkExperienceId from "./NaturalDraft/listWorkExperinceGuid/reducer";
import uploadWorkExperienceCertificate from "./NaturalDraft/uploadWorkExperienceCertificate/reducer";
import listNDraftWorkExCertificate from "./NaturalDraft/listWorkExperienceCertificate/reducer";
import removeNDraftWorkExperience from "./NaturalDraft/deletWorkExperience/reducer";
import removeNDraftWorkExperienceCertificate from "./NaturalDraft/downloadWorkExperienceCertificate/reducer";
import profilePic from "./NaturalDraft/uploadProfilePic/reducer";
import getWorkLocationInfoDraftNatural from "./NaturalDraft/getWorkLocationInfoDraftNatural/reducer";
import getPersonalInfoDraftNatural from "./NaturalDraft/getPersonalInfoDraftNatural/reducer";
import disableNextButtonNaturalWorkExperience from "./NaturalDraft/disableNextButtonNaturalWorkExperience/reducer";
import sendReferNatural from "./NaturalDraft/sendRefer/reducer";
import noInquireCertificateUpload from "./NaturalDraft/noInquireCertificateUpload/reducer";
import downloadCertificate from "./NaturalDraft/downloadCertificate/reducer";
import getListDocumentsNatural from "./NaturalDraft/getListDocumentsNatural/reducer";
import uploadDocumentNatural from "./NaturalDraft/uploadDocument/reducer";
import getCertificateInfoListWorkExperience from "./NaturalDraft/getCertificateInfoListWorkExperience/reducer";
import registrationFinalize from "./NaturalDraft/registrationFinalize/reducer";
import getAllInfoForFinalApprovalDraft from "./NaturalDraft/getAllInfoFinalApproval/reducer";
import getBirthCityProvinceIdNatural from "./NaturalDraft/getBirthCityProvinceId/reducer";
import getResidenceCityProvinceIdNatural from "./NaturalDraft/getResidenceCityProvinceId/reducer";
import getWorkCityProvinceIdNatural from "./NaturalDraft/getWorkCityProvinceId/reducer";
import isExamNotNeededNatural from "./NaturalDraft/isExamNotNeeded/reducer";
import getSubFieldBasedOnFieldNatural from "./NaturalDraft/getSubFieldBasedOnField/reducer";
import disableNextButtonFieldInfoNatural from "./NaturalDraft/disableNextButtonFieldInfo/reducer";
import subFieldInfoInquiredsNatural from "./NaturalDraft/subFieldInfoInquireds/reducer";
import downloadRawFormEditNatural from "./NaturalDraft/downloadRawForm/reducer";
import noInquireSubFieldCertificateResultPostUploadEdit from "./NaturalDraft/noInquireSubFieldCertificateUpload/reducer";
import naturalPersonalAll from "./NaturalDraft/naturalPersonalAll/reducer";
 
//judical draft
import judicalPersonalInfo from "./JudicalDraft/personalInfo/reducer";
import judicalNationalIdentify from "./JudicalDraft/nationalityIdentify/reducer";
import judicalAddFamilyMember from "./JudicalDraft/addFamilyMember/reducer";
import judicalAllFamilyMember from "./JudicalDraft/allFamilyMember/reducer";
import judicalRemoveFamily from "./JudicalDraft/removeFamilyMember/reducer";
import judicalFeildInfo from "./JudicalDraft/feildInfo/reducer";
import judicalWorkPlaces from "./JudicalDraft/workPlace/reducer";
import judicalAddWorkExperience from "./JudicalDraft/addWorkExperience/reducer";
import judicalListWorkExperience from "./JudicalDraft/listWorkExperince/reducer";
import judicalUploadWorkExperience from "./JudicalDraft/uploadWorkExperienceCertificate/reducer";
import judicalDeletWorkExperienceCertificate from "./JudicalDraft/deletWorkExperienceCertificate/reducer";
import judicalProfilePic from "./JudicalDraft/uploadProfilePic/reducer";
import judicalNewId from "./JudicalDraft/newJudicalId/reducer";
import judicalCertificate80Hour from "./JudicalDraft/inquire80hoursCertifacate/reducer";
import judicalGetWorkLocationInfoDraft from "./JudicalDraft/getWorkLocationInfoDraftJudical/reducer";
import judicalGetPersonalInfoDraft from "./JudicalDraft/getPersonalInfoDraftJudicial/reducer";
import showJudicalProfilePic from "./JudicalDraft/getProfilePic/reducer";
import judicialDisableNextButtonWorkExperience from "./JudicalDraft/disableNextButtonJudicialWorkExperience/reducer";
import judicialNoInquireCertificateJudicialUpload from "./JudicalDraft/noInquireCertificateUpload/reducer";
import judicialGetListDocuments from "./JudicalDraft/getListDocuments/reducer";
import judicialDeleteDocument from "./JudicalDraft/deleteDocument/reducer";
import judicialUploadDocument from "./JudicalDraft/uploadDocument/reducer";
import judicialGetBirthCityProvinceId from "./JudicalDraft/getBirthCityProvinceId/reducer";
import judicialGetResidenceCityProvinceId from "./JudicalDraft/getResidenceCityProvinceId/reducer";
import judicialGetWorkCityProvinceId from "./JudicalDraft/getWorkCityProvince/reducer";
import judicialGetSubFieldBasedOnFieldJudicial from "./JudicalDraft/getSubFieldbasedOnFieldJudicial/reducer";
import isExamNotNeededJudicial from "./JudicalDraft/isExamNotNeeded/reducer";
import judicialSubFieldInfoInquireds from "./JudicalDraft/subFieldInfoInquireds/reducer";
import judicialGetSelectedFieldInfo from "./JudicalDraft/getSelectedFieldInfo/reducer";
import judicialPostIsExamNotNeeded from "./JudicalDraft/postIsExamNotNeededJudicial/reducer";
import judicialGetSubFieldInfoData from "./JudicalDraft/getSubFieldInfoJudicialEdit/reducer";
import judicialNoInquireFieldCertificateUploadEdit from "./JudicalDraft/noInquireFieldCertificateUploadEdit/reducer";

//legal draft
import workLocationDraftLegal from "./legalDraft/workLocation/reducer";
import boadMemberAddToListLoadingStatelegal from "./legalDraft/boardMember/reducer";
import boadMemberDeleteFromListLoadingStatelegal from "./legalDraft/deleteBoardMember/reducer";
import listDraftWorkExperienceLegal from "./legalDraft/listWorkExperience/reducer";
import listDraftCEOWorkExperienceLegal from "./legalDraft/listDraftCEOWorkExperienceLegal/reducer";
import stockholderDraftLegal from "./legalDraft/stockholder/reducer";
import employeeDraftLegal from "./legalDraft/employee/reducer";
import listDraftStockholderLegal from "./legalDraft/listDraftStockholderLegal/reducer";
import listEmployeeLegal from "./legalDraft/listEmployee/reducer";
import deleteLegalDraftCardBoardMemberAction from "./legalDraft/deleteBoardMember/reducer";
import sendWorkExperienceStateLegal from "./legalDraft/workExperience/reducer";
import receiveWorkExperienceStateLegal from "./legalDraft/listDraftCEOWorkExperienceLegal/reducer";
import deleteCEOWorkExperienceDraftLegal from "./legalDraft/deleteCEOWorkExperience/reducer";
import deleteCEOWorkExperienceCertificateDraftLegal from "./legalDraft/deleteCEOWorkExperienceCertificate/reducer";
import disableNextButtonStateDraftLegal from "./legalDraft/nextButtonWorkExperience/reducer";
import getCompanyInfoDraftLegal from "./legalDraft/companyInfo/reducer";
import getCompanyInfoLegalEdit from "./legalDraft/companyInfo/reducer";
import getWorkLocationDraftLegal from "./legalDraft/workLocationGet/reducer";
import getAllInfoBoardMemberWorkExperience from "./legalDraft/getAllInfoBoardMemberWorkExperience/reducer";
import getAllInfoCEOWorkExperienceLegal from "./legalDraft/getAllInfoCEOWorkExperience/reducer";
import getAllInfoStockholderLegal from "./legalDraft/getAllInfoStockholderLegal/reducer";
import getAllInfoEmployeeLegal from "./legalDraft/getAllInfoEmployeeLegal/reducer";
import sendReferLegal from "./legalDraft/sendReferLegal/reducer";
import registrationFinalizeLegal from "./legalDraft/registrationFinalize/reducer";
import getAllInfoFinalApprovalLegal from "./legalDraft/getAllInfoFinalApproval/reducer";
import getDocumentsLegal from "./legalDraft/getDocuments/reducer";
import deleteDocumentLegal from "./legalDraft/deleteDocument/reducer";
import getWorkCityProvinceLegal from "./legalDraft/getWorkCityProvinceId/reducer";
import getBirthCityProvinceLegal from "./legalDraft/getBirthCityProvinceId/reducer";
import isAddMemberClickedLegal from "./legalDraft/addMemberClicked/reducer";
import personalInfo from "./legalDraft/personalInfo/reducer";

//cartable
import interviewTime from "./cartable/applicantInterviewTime/reducer";
import selectedDocumentList from "./cartable/uploadDocuments/reducer";
import documentApprove from "./cartable/documentApprove/reducer";
import reffer from "./cartable/reffer/reducer";
import listNaturalCartable from "./cartable/listNaturalCartable/reducer";
import listJudicalCartable from "./cartable/lisJudicalCartable/reducer";
import listLegalCartable from "./cartable/lisLegalCartable/reducer";
import licenseAdjuster from "./cartable/adjusterLicence/reducer";
import chargonLetter from "./cartable/chargonLetter/reducer";
import attachment from "./cartable/attacment/reducer";
import note from "./cartable/note/reducer";
import score from "./cartable/Score/reducer";
import fetchScore from "./cartable/Score/getInterviewerScore/reducer";
import updateScore from "./cartable/Score/updateInterviewerScore/reducer";
import addScore from "./cartable/Score/addInterviewerScore/reducer";
import listInterviewerScore from "./cartable/Score/fetchInterviewer/reducer";
import listBoardMember from "./cartable/boardMember/reducer";
import uploadDocument from "./cartable/uploadDocuments/reducer"; 
import removeDocument from "./cartable/updateDocument/reducer";
import informationFile from "./cartable/informationFile/reducer";
import cartableReportAllInfo from "./cartable/cartableReport/allInfo/reducer";
import cartableReportFilter from "./cartable/cartableReport/filters/reducer";
import getBoardMemberListRequest from "./cartable/cartableReport/getBoardMemberList/reducer";
import usersForCartable from "./cartable/cartableReport/getUsers/reducer";
import dlWorkExperience from "./dlWorkExperience/reducer";
import dlDocument from "./dlDocument/reducer";
import fileAssiner from "./cartable/FileAssigner/reducer";
import admisionExpert from "./cartable/admisonExpert/reducer";
import workExperienceApprove from "./cartable/workExperienceApprove/reducer";
import statusList from "./cartable/statusList/reducer";
import excelCartable from "./cartable/dlExcelCartable/reducer";
import historyDocument from "./cartable/historyDocumentApprove/reducer";
import subField from "./cartable/feildInfo/reducer";
import licenseissuer from "./cartable/licenseIssuer/reducer";
import smsOutBoxList from "./cartable/smsOutBox/reducer";
import smsBatchSend from "./cartable/smsBatchSend/reducer";
import allCourse from "./cartable/allCourse/reducer";
import statisticalReports from "./cartable/statisticalReport/reducer";
import fieldInterviewerDetailData from "./cartable/fieldInfoDetail/reducer";
import subFieldList from "./cartable/boardMemberNaturalSubFeild/reducer";
import swap from "./cartable/cartableReport/swap/reducer";
import listArchive from "./cartable/listArchive/reducer";
import inquiry from "./cartable/inquiry/reducer";
import companyBaseInfo from "./cartable/companyBaseInfoLegal/reducer";

//common registration edit
import userEdit from "./userEdit/reducer";
import isComeFromRegistration from "./isComeFromRegistration/reducer";
import sendNatAndRegCodes from "./sendNatAndRegCodes/reducer";
import resCreateTime from "./addInterviewtime/reducer";
import timingList from "./listInterviewTiming/reducer";
import interviewerPicture from "./interviewerPicture/reducer";
import registerationRefer from "./registration/refer/reducer";
import isLoggedInOrInquiredResult from "./registration/isLoggedInOrInquired/reducer";

//desktop
import request from "./desktop/request/reducer";
import listRequestType from "./desktop/request/reducer";
import applicantRequestStatus from "./desktop/request/reducer";
import boardMember from "./desktop/boardMember/reducer";
import documentList from "./desktop/documents/reducer";
import uploadFile from "./desktop/uploadFile/reducer";
import workLocation from "./desktop/workLocation/reducer";
import allChangeStatusReason from "./desktop/getAllChangeStatusReason/reducer";
import message from "./desktop/message/reducer";
import userDesktop from "./desktop/userDesktop/reducer";
import monthlyPerformance from "./desktop/montlyPerformance/reducer";
import contractEvaluation from "./desktop/contractEvaluation/reducer";
import notifications from "./desktop/notification/reducer";
import employee from "./desktop/employee/reducer";
import monitoringReport from "./monitoringReport/reducer";
import applicantWarnings from "./desktop/applicantWarnings/reducer";

//reprt
import activeAdjusterLists from './report/reducer' 

const appReducer = combineReducers({
  activeAdjusterLists,
  getValidCourses,
  requestDocumentsType,
  userLogin,
  monitoringReport,
  naturaljudicalPersonalList,
  notifications,
  getCourseType,
  baseData: baseInfo,
  resProfilePic,
  NewDraftId,
  newJudicalDraftId,
  newDraftLegalId,
  sendNatAndRegCodes,
  applicantWarnings,
  userEdit,
  isComeFromRegistration,
  nationalIdentify,
  forbiddenInfo,
  familyMembers,
  allFamilyMembers,
  deletFamily: removeFamily,
  personInfo,
  checkPhoneNumber,
  feildInfo,
  specializedField,
  certifacte80Hour,
  noInquireCertificateUpload,
  downloadCertificate,
  workPlaces,
  feildCertifacte,
  workExperience,
  listWorkExperienceId,
  uploadWorkExperienceCertificate,
  listNDraftWorkExCertificate,
  removeNDraftWorkExperience,
  removeNDraftWorkExperienceCertificate,
  profilePic,
  getWorkLocationInfoDraftNatural,
  getPersonalInfoDraftNatural,
  disableNextButtonNaturalWorkExperience,
  sendReferNatural,
  getListDocumentsNatural,
  uploadDocumentNatural,
  disableNextButtonFieldInfoNatural,
  getBirthCityProvinceIdNatural,
  getResidenceCityProvinceIdNatural,
  getWorkCityProvinceIdNatural,
  getCertificateInfoListWorkExperience,
  registrationFinalize,
  getAllInfoForFinalApprovalDraft,
  isExamNotNeededNatural,
  noInquireSubFieldCertificateResultPostUploadEdit,
  lastStatusOfApplicantInAllStates,
  captchaImage,
  getSubFieldBasedOnFieldNatural,
  subFieldInfoInquiredsNatural,
  judicalPersonalInfo,
  judicalNationalIdentify,
  judicalAddFamilyMember,
  judicalAllFamilyMember,
  judicalRemoveFamily,
  judicalFeildInfo,
  judicialNoInquireCertificateJudicialUpload,
  judicalWorkPlaces,
  judicalAddWorkExperience,
  judicalListWorkExperience,
  judicalUploadWorkExperience,
  judicalDeletWorkExperienceCertificate,
  judicalNewId,
  judicialGetListDocuments,
  judicialDeleteDocument,
  judicialUploadDocument,
  judicialGetBirthCityProvinceId,
  judicialGetResidenceCityProvinceId,
  judicialGetWorkCityProvinceId,
  judicialGetSubFieldBasedOnFieldJudicial,
  judicialSubFieldInfoInquireds,
  judicialGetSelectedFieldInfo,
  judicialPostIsExamNotNeeded,
  judicialGetSubFieldInfoData,
  judicialNoInquireFieldCertificateUploadEdit,
  isExamNotNeededJudicial,
  fieldInterviewerDetailData,
  workLocationDraftLegal,
  stockholderDraftLegal,
  employeeDraftLegal,
  listDraftWorkExperienceLegal,
  listDraftCEOWorkExperienceLegal,
  listDraftStockholderLegal,
  listEmployeeLegal,
  deleteLegalDraftCardBoardMemberAction,
  boadMemberAddToListLoadingStatelegal,
  boadMemberDeleteFromListLoadingStatelegal,
  sendWorkExperienceStateLegal,
  receiveWorkExperienceStateLegal,
  deleteCEOWorkExperienceDraftLegal,
  deleteCEOWorkExperienceCertificateDraftLegal,
  disableNextButtonStateDraftLegal,
  getCompanyInfoDraftLegal,
  getWorkLocationDraftLegal,
  getAllInfoBoardMemberWorkExperience,
  getAllInfoCEOWorkExperienceLegal,
  getAllInfoStockholderLegal,
  getAllInfoEmployeeLegal,
  getDocumentsLegal,
  sendReferLegal,
  naturalRemoveDocs,
  registrationFinalizeLegal,
  getAllInfoFinalApprovalLegal,
  deleteDocumentLegal,
  getWorkCityProvinceLegal,
  getBirthCityProvinceLegal,
  isAddMemberClickedLegal,
  judicalGetPersonalInfoDraft,
  judicalGetWorkLocationInfoDraft,
  judicalProfilePic,
  judicalCertificate80Hour,
  getCompanyInfoLegalEdit,
  judicialDisableNextButtonWorkExperience,
  interviewTime,
  documentApprove,
  reffer,
  listDenominationReligionId,
  showJudicalProfilePic,
  listNaturalCartable,
  listJudicalCartable,
  listLegalCartable,
  resCreateTime,
  timingList,
  interviewerPicture,
  licenseAdjuster,
  chargonLetter,
  dlWorkExperience,
  dlDocument,
  attachment,
  note,
  score,
  fetchScore,
  updateScore,
  addScore,
  listInterviewerScore,
  daysHolidays,
  listBoardMember,
  informationFile,
  uploadDocument,
  removeDocument,
  cartableReportAllInfo,
  usersForCartable, 
  getBoardMemberListRequest,
  request,
  listRequestType,
  applicantRequestStatus,
  boardMember,
  documentList,
  cartableReportFilter,
  registrationLogin,
  allAdjusterType,
  workLocation,
  registerationRefer,
  fileAssiner,
  getFieldInfoData,
  postFieldInfoData,
  admisionExpert,
  isExamNotNeededPostSubFieldDraft,
  statusList,
  inquireFieldInfoDraft,
  inquireSubFieldInfoDraft,
  workExperienceApprove,
  downloadRawFormEditNatural,
  isLoggedInOrInquiredResult,
  applicantRejectReasons,
  workExperienceRejectReasons,
  documentRejectReasons,
  excelCartable,
  historyDocument,
  subField,
  licenseissuer,
  smsOutBoxList,
  smsBatchSend,
  allCourse,
  statisticalReports,
  naturalPersonalAll,
  subFieldList,
  uploadFile,
  personalInfo,
  allChangeStatusReason,
  message,
  userDesktop,
  swap,
  listArchive,
  inquiry,
  staffType,
  inquire,
  monthlyPerformance,
  contractEvaluation,
  employee,
  companyBaseInfo,
  selectedDocumentList,
  G4BDetails
});

const reducers = (state: any, action: any) => {
  if (
    action.type.slice(action.type.length - 6) === "FAILD" ||
    action.type.slice(action.type.length - 6) === "FAILED"
  ) {
    // toast.error("خطای سمت سرور", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }
  if (action.type === REGISTRATION_COMPONENT_UNMOUNT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default reducers;
