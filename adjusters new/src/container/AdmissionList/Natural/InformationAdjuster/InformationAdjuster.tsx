import React, { FC, useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ConfigProvider,
  Skeleton,
  Tooltip,
  Popover,
  Input,
  Popconfirm,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import EditCompanyInfo from './EditCompanyInfo'
import { FormOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import FeildInterviewer from "../InformationAdjuster/AdjusterInfoDetail/FeildInfoInterviewer/FieldInterviewer";
import RejectDetemineStatus from "./AdjusterInfoDetail/DetermineStatus/RejectDetemineStatus";
import DateInterviewAndInterviewers from "../../Interview/DateInterviewAndInterviewer";
import Score from "./AdjusterInfoDetail/FeildInfoInterviewer/Score/Score";
import { IPersonalInfoDetail } from "../../../../shared/ulitities/Model/personalInfoDetail";
import { IAneAdjusterList } from "../../../../shared/ulitities/Model/oneAdjuster";
import { IReffer } from "../../../../shared/ulitities/Model/reffer";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { userAccessList } from "../../../../shared/ulitities/Enums/userAccessList";
import {
  findChargoonRegistration,
  findInterviewTime,
  findInterviewInvitation,
  findRegisterationField,
  findRegisterationScore,
  findRejectedInInterview,
} from "../../../../utils/utils";
import {
  sendReasonReffer,
  submitChargonOperation,
  fetchListNaturalCartable,
  dlIntervieweMinutes,
  fetchDocumentApprove,
  fechListWorkExperienceApprove,
  invitionInterviewOperation,
  fetchInterviewerScore,
  uploadProfilePicEditCartable,
  getProfilePicEditNatural,
  informationFileAction,
  downloadAdjusterLicence,
  downloadChargonLetter,
  cartableReportAllInfo,
  informationFileAdjusterDesktopAction,
  downloadAdjusterDesktopLicence,
  downloadAdjusterDesktopChargonLetter,
  downloadExtendChargonLetter,
  fetchCompanyInfoFromAdjusterDesktop,
  fetchNaturalCompanyInfo
} from "../../../../redux/actions";
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";
import { GetWay } from "../../../../shared/ulitities/Enums/getWay";
import Upload from "../../../../assets/images/upload.svg";
import { ReactComponent as ScoreBoard } from "../../../../assets/images/scoreboard-tied-blue.svg";
import { ReactComponent as SubmitChargon } from "../../../../assets/images/submitChargon.svg";
import { ReactComponent as Archive } from "../../../../assets/images/archive.svg";
import { ReactComponent as Marjo } from "../../../../assets/images/marjo.svg";
import Refer from "../../../../assets/images/refer.svg";
import { ReactComponent as AddUser } from "../../../../assets/images/add-user-blue.svg";
import { ReactComponent as Node } from "../../../../assets/images/node.svg";
import { ReactComponent as Certificate } from "../../../../assets/images/web-certificate-blue.svg";
import { ReactComponent as FormBlue } from "../../../../assets/images/formBlue.svg";
import { ReactComponent as EmailB } from "../../../../assets/images/email-blue.svg";
import "./InformationAdjuster.css";

interface IInformationAdjusterProps {
  oneAdjusterList?: IAneAdjusterList;
  closeFileDetail?: () => void;
  personalInfoDetail: IPersonalInfoDetail;
  isFromReportTable?: boolean;
  activeTabInbox?: string;
  isInterviewInvitation?: boolean;
  modelReport?: any;
  isEvaluatorDesktopInformation?: number;
  recordReport?: any
}

const { TextArea } = Input;

const InformationAdjuster: FC<IInformationAdjusterProps> = ({
  oneAdjusterList,
  closeFileDetail, 
  personalInfoDetail,
  isFromReportTable,
  activeTabInbox,
  isInterviewInvitation,
  modelReport,
  isEvaluatorDesktopInformation,
  recordReport
}) => {
  const dispatch = useDispatch();
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleScore, setVisibleScore] = useState(false);
  const [visiblleInterview, setVisibleInterview] = useState(false);
  const [showEditFieldInfoModal, setShowEditFieldInfoModal] = useState(false)
  const [activeArchive, setActiveArchive] = useState(false);
  const [activeReffer, setActiveReffer] = useState(false);
  const [fields, setFields] = useState(false);
  const [visibleEditInfoModal, setVisibleEditInfoModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [popVisible, setPopVisible] = useState(false);
  const [description, setDescription] = useState("");
  const { loadingInvitionInterview, loadingInterviewerMinutes } = useSelector(
    (state: any) => state.score
  );
  const { userLogin } = useSelector((state: any) => state.userLogin);
  const { loading: loadingInfo } = useSelector(
    (state: any) => state.informationFile
  );
  const { modelCartable } = useSelector(
    (state: any) => state.listNaturalCartable
  );

  const { loading } = useSelector((state: any) => state.reffer);
  const { loadingAdjusterLicense } = useSelector(
    (state: any) => state.licenseAdjuster
  );

  const {
    loadingChargonLetter,
    loading: loadingSubmitChargoon,
    loadingExtendChargonLetter,
  } = useSelector((state: any) => state.chargonLetter);

  const docsApprove = useSelector(
    (state: any) => state.documentApprove.listDocumentApprove?.Result
  );
  const workExperiencesApprove = useSelector(
    (state: any) => state.workExperienceApprove.workExperienceApprove?.Result
  );

  let findDoc = docsApprove?.find((item: any) => item?.IsApproved === false);

  let findWorkExperince = workExperiencesApprove?.find(
    (item: any) => item?.IsApproved === false
  );
  const resultProfile = useSelector(
    (state: any) => state?.resProfilePic?.showProfilePic?.Result?.Content
  );

  const [upload, setUpload] = useState(false);
  //متغیر ارجاع
  let reasonReffer: IReffer = {
    adjusterTypeId: adjusterType.natural,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Accept",
    // message: null,
    id: oneAdjusterList?.CartableId,
    description: description,
  };

  //متغیر مرجوع
  let reasonReject: IReffer = {
    adjusterTypeId: adjusterType.natural,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Reject",
    //message: null,
    id: oneAdjusterList?.CartableId,
  };

  //مدال نمره
  const submitScoreHandler = () => {
    setVisibleScore(true);
    closeFileDetail && closeFileDetail();
    dispatch(fetchInterviewerScore(oneAdjusterList?.ApplicantId));
  };

  //مرجوع
  const marjoHandler = () => {
    setVisibleStatus(true);
    closeFileDetail && closeFileDetail();
  };

  //ثبت چارگون
  const submitChargonHandler = () => {
    dispatch(
      submitChargonOperation(
        oneAdjusterList?.ApplicantId,
        () => {
          dispatch(fetchListNaturalCartable(modelCartable, () => { }));
        },
        () => {
          setPopVisible(false);
          dispatch(fetchListNaturalCartable(modelCartable, () => { }));//add by morsa
        }
      )
    );
  };

  const showPopconfirm = () => {
    setPopVisible(true);
  };
  const handleCancel = () => {
    setPopVisible(false);
  };

  // ارجاع
  const refferHandler = () => {
    // setInvitionInterviwer(false);
    setActiveArchive(false);
    setActiveReffer(true);
    isInterviewInvitation
      ? dispatch(
        sendReasonReffer(reasonReffer, () => {
          dispatch(
            cartableReportAllInfo(modelReport, adjusterType.natural, () => { })
          );
        })
      )
      : dispatch(
        sendReasonReffer(reasonReffer, () => {
          dispatch(fetchListNaturalCartable(modelCartable, () => { }));
        })
      );
  };

  //بایگانی
  const archiveHandler = () => {
    setActiveArchive(true);
    setActiveReffer(false);
    dispatch(
      sendReasonReffer(reasonReject, () => {
        dispatch(fetchListNaturalCartable(modelCartable, () => { }));
      })
    );
  };

  const rejectedInInterviewHandler = () => {
    setActiveArchive(false);
    setActiveReffer(true);
    dispatch(
      sendReasonReffer(reasonReject, () => {

        dispatch(
          cartableReportAllInfo(modelReport, adjusterType.natural, () => { })

        );

      })
    );
  };

  // مدال مصاحبه کننده
  const addUserHandler = () => {
    setVisibleInterview(true);
  };

  //دانلود فرم صورتجلسه مصاحبه
  const interviewerMintusHandler = () => {
    dispatch(dlIntervieweMinutes(oneAdjusterList?.ApplicantId));
  };

  //دعوت به مصاحبه
  const invitationInterviewHandler = () => {
    dispatch(
      invitionInterviewOperation(reasonReffer, () => {
        dispatch(fetchListNaturalCartable(modelCartable, () => { }));

      })
    );
  };

  useEffect(() => {
    // isEvaluatorDesktopInformation === GetWay.desktop
    //   ? dispatch(fetchDocumentApprove(userLogin?.Result?.ApplicantId))
    isEvaluatorDesktopInformation !== GetWay.desktop &&
      dispatch(fetchDocumentApprove(oneAdjusterList?.ApplicantId));
  }, [oneAdjusterList?.ApplicantId]);

  useEffect(() => {
    isEvaluatorDesktopInformation !== GetWay.desktop &&
      // ? dispatch(fechListWorkExperienceApprove(userLogin?.Result?.ApplicantId))
      dispatch(fechListWorkExperienceApprove(oneAdjusterList?.ApplicantId));
  }, [oneAdjusterList?.ApplicantId]);

  useEffect(() => {
    setUpload(false);
  }, []);

  const handleUpload = (e: any) => {
    setUpload(true);
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];
    dispatch(
      uploadProfilePicEditCartable(oneAdjusterList?.ApplicantId, file, () => {
        dispatch(getProfilePicEditNatural(oneAdjusterList?.ApplicantId));
      })
    );
  };

  //نشان دادن مدال رمینه تخصصی
  const fieldHandler = () => {
    setFields(true);
    closeFileDetail && closeFileDetail();
  };

  //دانلود  اطلاعات پروانه
  const downloadInformationFile = () => {
    isEvaluatorDesktopInformation === GetWay.desktop
      ? dispatch(
        informationFileAdjusterDesktopAction(
          adjusterType.natural,
          userLogin?.Result?.ApplicantId
        )
      )
      : dispatch(
        informationFileAction(
          adjusterType.natural,
          oneAdjusterList?.ApplicantId
        )
      );
  };
  //دانلود پروانه ارزیاب
  const dlLicenenceAdjusterHandler = () => {
    isEvaluatorDesktopInformation === GetWay.desktop
      ? dispatch(downloadAdjusterDesktopLicence(userLogin?.Result?.ApplicantId))
      : dispatch(downloadAdjusterLicence(oneAdjusterList?.ApplicantId));
  };
  //دانلود نامه چارگون
  const dlLetterChargoonHandler = () => {
    isEvaluatorDesktopInformation === GetWay.desktop
      ? dispatch(
        downloadAdjusterDesktopChargonLetter(userLogin?.Result?.ApplicantId)
      )
      : dispatch(downloadChargonLetter(oneAdjusterList?.ApplicantId));
  };

  //دانلود تمدید نامه
  const downloadExtendChargonLetterHandler = () => {
    dispatch(downloadExtendChargonLetter(userLogin?.Result?.ApplicantId));
  };
  //مدال ویرایش شخص 

  const editCompanyInfo = () => {
    if (!isFromReportTable) {
      dispatch(fetchCompanyInfoFromAdjusterDesktop(() => setVisibleEditInfoModal(true)))
    }
    else {
      dispatch(fetchNaturalCompanyInfo(oneAdjusterList?.ApplicantId, () => setVisibleEditInfoModal(true)))

    }
  }
  const handleFiledInfoModal = () => {
    setShowEditFieldInfoModal(true)
  }
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  let content = (
    <>
      <TextArea
        onChange={(e: any) => setDescription(e.target.value)}
        autoSize
        allowClear
      />
      <div className="submit">
        <Button
          onClick={refferHandler}
          loading={loading && activeReffer ? true : false}
          type="primary"
          style={{ marginTop: "15px" }}
        >
          {" "}
          ارجاع
        </Button>
      </div>
    </>
  );

  return (
    <div className="informationAdjuester">
      <div className="titleInfoAdjuster">
        {!isFromReportTable &&
          isEvaluatorDesktopInformation !== GetWay.desktop && (
            <div>
              <div>
                <span className="titleInfo">فرستنده: </span>
                <span className="contentInfo">
                  {oneAdjusterList?.SenderUser}
                </span>
              </div>
              <div>
                <span className="titleInfo">گیرنده: </span>
                <span className="contentInfo">
                  {oneAdjusterList?.ReceiverUser}
                </span>
              </div>
            </div>
          )}
        {!isFromReportTable &&
          activeTabInbox !== "2" &&
          isEvaluatorDesktopInformation !== GetWay.desktop && (
            <div className="btnDetermineStatus">
              {findDoc === undefined &&
                findWorkExperince === undefined &&
                findInterviewInvitation(oneAdjusterList?.AccessList) &&
                oneAdjusterList?.Interviewers &&
                oneAdjusterList?.Interviewers?.length > 0 ? (
                  <Button
                    type="primary"
                    onClick={invitationInterviewHandler}
                    className="buttonImageCenter"
                    loading={loadingInvitionInterview}
                  >
                    دعوت به مصاحبه
                  </Button>
                ) : null}
              {oneAdjusterList?.LetterNumber !== "NotSureSendingL"
                ? findChargoonRegistration(oneAdjusterList?.AccessList) &&
                FindAccess(userAccessList.Adjusters_SendChargoonLetter) && (
                  <Button
                    type="primary"
                    ghost
                    onClick={submitChargonHandler}
                    className="buttonImageCenter"
                    loading={loadingSubmitChargoon}
                    icon={<SubmitChargon />}
                  >
                    ثبت چارگون
                  </Button>
                )
                : null}

              {findChargoonRegistration(oneAdjusterList?.AccessList) &&
                FindAccess(userAccessList.Adjusters_SendChargoonLetter) &&
                oneAdjusterList?.LetterNumber === "NotSureSendingL" ? (
                  <ConfigProvider direction="rtl">
                    <Popconfirm
                      title={`وضعیت ارسال نامه مشخص نمی باشد، لطفا ابتدا دیدگاه را بررسی نمایید در صورتی که نامه ارسال نشده بود دکمه تایید را بزنید که مجدد نامه ارسال گردد`}
                      onConfirm={submitChargonHandler}
                      okButtonProps={{ loading: loadingSubmitChargoon }}
                      okText="تایید"
                      cancelText="انصراف"
                      visible={popVisible}
                      onCancel={handleCancel}
                    >
                      <Button danger
                        type="primary"
                        ghost
                        className="buttonImageCenter"
                        icon={<SubmitChargon />}
                        onClick={showPopconfirm}
                      >
                        ثبت چارگون
                    </Button>
                    </Popconfirm>
                  </ConfigProvider>
                ) : null}

              <Button
                type="primary"
                ghost
                onClick={marjoHandler}
                className="buttonImageCenter"
                icon={<Marjo />}
              >
                مرجوع
              </Button>
              <Button
                type="primary"
                ghost
                onClick={archiveHandler}
                className="buttonImageCenter"
                loading={loading && activeArchive}
                icon={<Archive />}
              >
                بایگانی
              </Button>

              {findRejectedInInterview(oneAdjusterList?.AccessList) ? (
                <Button
                  onClick={rejectedInInterviewHandler}
                  type="primary"
                  danger
                  loading={loading && activeReffer ? true : false}
                >
                  مردود در مصاحبه
                </Button>
              ) : findChargoonRegistration(oneAdjusterList?.AccessList) &&
                oneAdjusterList?.StateId === workTaskFlowId.GeneralManager ? (
                    <Button
                      type="primary"
                      onClick={refferHandler}
                      className="buttonImageCenter"
                      loading={loading && activeReffer}
                      icon={<img src={Refer} alt="refer" />}
                    >
                      ثبت نهایی
                    </Button>
                  ) : (
                    <Popover
                      content={content}
                      title="دلیل ارجاع"
                      trigger="click"
                      visible={visible}
                      onVisibleChange={handleVisibleChange}
                      placement="bottom"
                    >
                      <Button
                        type="primary"
                        // onClick={refferHandler}
                        className="buttonImageCenter"
                        //loading={loading && activeReffer}
                        icon={<img src={Refer} alt="refer" />}
                      >
                        ارجاع
                  </Button>
                    </Popover>
                  )}
            </div>
          )}
      </div>
      <Row>
        <Col xs={6} sm={5} md={4} lg={4} xl={4} className="person  uploader">
          {personalInfoDetail?.ProfilePic !== undefined && upload == false ? (
            <img
              src={"data:image/png;base64," + personalInfoDetail?.ProfilePic}
              alt="ProfilePic"
              className="ProfilePic"
            />
          ) : resultProfile && upload == true ? (
            <img
              src={"data:image/png;base64," + resultProfile}
              alt="ProfilePic"
              className="ProfilePic"
            />
          ) : (
                <Skeleton.Avatar active shape="square" size={100} />
              )}
          {!isFromReportTable &&
            activeTabInbox !== "2" &&
            isEvaluatorDesktopInformation !== GetWay.desktop && (
              <Tooltip placement="bottom" title="بارگذاری فایل">
                <label className="customFileUpload customWidthFile ">
                  <img src={Upload} alt="upload" className="upload" />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => handleUpload(e)}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </label>
              </Tooltip>
            )}
        </Col>

        <Col xs={18} sm={19} md={20} lg={10} xl={10} className="adjuster-info-holder">
          <Row>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <h5 className="titleCol">نام و نام خانوادگی:</h5>
              {personalInfoDetail?.FirstName !== undefined ? (
                <span className="fontStyle">
                  {personalInfoDetail?.FirstName}{" "}
                  {personalInfoDetail?.FamilyName}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <h5 className="titleCol">تاریخ تولد:</h5>
              {personalInfoDetail?.BirthDate !== undefined ? (
                <span className="fontStyle">
                  {moment(personalInfoDetail?.BirthDate?.split("T")[0]).format(
                    "jYYYY-jM-jD"
                  )}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <h5 className="titleCol">کد ملی:</h5>
              {personalInfoDetail?.NationalCode !== undefined ? (
                <span className="fontStyle">
                  {" "}
                  {personalInfoDetail?.NationalCode}{" "}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
            <Col xs={8} sm={12} md={8} lg={8} xl={8}>
              <h5 className="titleCol"> کد رهگیری:</h5>
              {personalInfoDetail?.RegistrationCode !== undefined ? (
                <span>{personalInfoDetail?.RegistrationCode} </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>

            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <h5 className="titleCol">شهر محل تولد:</h5>
              {personalInfoDetail?.BirthDate !== undefined ? (
                <span className="fontStyle">
                  {" "}
                  {personalInfoDetail?.BirthCityTitle}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
          </Row>

        </Col>

        <Col xs={24} sm={24} md={24} lg={10} xl={10} >

          {isFromReportTable ||
            activeTabInbox == "2" ||
            isEvaluatorDesktopInformation === GetWay.desktop ? (
              <Row>
                <Col xs={8} sm={8} md={6} lg={8} xl={6} className="colCenter">
                  <h5 className="titleGray">ویرایش اطلاعات شخص</h5>
                  <Tooltip placement="topLeft" title=" ویرایش اطلاعات شخص">
                    <Button
                      type="text"
                      onClick={() => editCompanyInfo()}
                      icon={<FormBlue />}
 
                    ></Button>
                  </Tooltip>
                </Col>
                <Col xs={8} sm={8} md={6} lg={8} xl={6} className="colCenter">
                  <>
                    <h5 className="titleGray">اطلاعات پرونده</h5>
                    <Tooltip placement="topLeft" title="اطلاعات پرونده">
                      <Button
                        type="text"
                        onClick={downloadInformationFile}
                        icon={<FormBlue />}
                        loading={
                          isEvaluatorDesktopInformation !== GetWay.desktop
                            ? loadingInfo === oneAdjusterList?.ApplicantId
                            : loadingInfo === userLogin?.Result?.ApplicantId
                        }
                      ></Button>
                    </Tooltip>
                  </>
                </Col>
                <Col xs={8} sm={8} md={6} lg={8} xl={6} className="colCenter">
                  <h5 className="titleGray"> پروانه ارزیاب</h5>
                  <Tooltip placement="topLeft" title=" پروانه ارزیاب">
                    <Button
                      type="text"
                      onClick={dlLicenenceAdjusterHandler}
                      icon={<Certificate />}
                      loading={
                        isEvaluatorDesktopInformation !== GetWay.desktop
                          ? loadingAdjusterLicense ===
                          oneAdjusterList?.ApplicantId
                          : loadingAdjusterLicense ===
                          userLogin?.Result?.ApplicantId
                      }
                    ></Button>
                  </Tooltip>
                </Col>
                <Col xs={8} sm={8} md={6} lg={8} xl={6} className="colCenter">
                  <h5 className="titleGray">نامه چارگون</h5>
                  <Tooltip placement="topLeft" title=" نامه چارگون">
                    <Button
                      type="text"
                      onClick={() => dlLetterChargoonHandler()}
                      icon={<EmailB />}
                      loading={
                        isEvaluatorDesktopInformation !== GetWay.desktop
                          ? loadingChargonLetter === oneAdjusterList?.ApplicantId
                          : loadingChargonLetter ===
                          userLogin?.Result?.ApplicantId
                      }
                    ></Button>
                  </Tooltip>
                </Col>
                {
                  isFromReportTable &&
                  <Button type="primary" onClick={handleFiledInfoModal}>ویرایش رشته تخصصی</Button>

                }
                {isEvaluatorDesktopInformation == GetWay.desktop &&
                  personalInfoDetail?.HasExtendedChargoonLetter && (
                    <Col xs={8} sm={8} md={6} lg={8} xl={6} className="colCenter">
                      <h5 className="titleGray"> نامه تمدید</h5>
                      <Tooltip placement="topLeft" title="دریافت نامه تمدید">
                        <Button
                          type="text"
                          onClick={() => downloadExtendChargonLetterHandler()}
                          icon={<EmailB />}
                          loading={
                            loadingExtendChargonLetter ===
                            userLogin?.Result?.ApplicantId
                          }
                        ></Button>
                      </Tooltip>
                    </Col>
                  )}

              </Row>
            ) : (
              <Row>
                {/* {oneAdjusterList.StatusId === 1 &&
              findDoc === undefined &&
              findWorkExperince == undefined ? ( */}
                {findInterviewTime(oneAdjusterList?.AccessList) && (
                  <Col span={8} className="colCenter">
                    <h5>زمان/مصاحبه کننده</h5>
                    <Button
                      type="text"
                      onClick={addUserHandler}
                      icon={<AddUser />}
                    ></Button>
                  </Col>
                )}
                {/* ) : null} */}
                {/* {oneAdjusterList?.Interviewers?.length > 0 && */}
                {isInterviewInvitation === true ||
                  // oneAdjusterList.StatusId !== 1 &&
                  // oneAdjusterList.StatusId !== 10 &&
                  // oneAdjusterList.StatusId !== 11 &&
                  findRegisterationScore(oneAdjusterList?.AccessList) ? (
                    <>
                      {FindAccess(userAccessList.Adjusters_CreateInterviewScore) &&
                        FindAccess(userAccessList.Adjusters_EditInterviewScore) && (
                          <Col span={4} className="colCenter">
                            <h5>ثبت نمره</h5>
                            <Button
                              type="text"
                              onClick={submitScoreHandler}
                              icon={<ScoreBoard />}
                            ></Button>
                          </Col>
                        )}
                      {FindAccess(userAccessList.Adjusters_InterviewMinutes) && (
                        <Col span={8} className="colCenter">
                          <h5> صورتجلسه مصاحبه</h5>
                          <Button
                            type="text"
                            onClick={interviewerMintusHandler}
                            icon={<FormOutlined style={{ color: "#3499FF" }} />}
                            loading={loadingInterviewerMinutes}
                          ></Button>
                        </Col>
                      )}
                    </>
                  ) : null}
                {(FindAccess(
                  userAccessList.Adjusters_EditApplicantAdjustmentField
                ) &&
                  findRegisterationField(oneAdjusterList?.AccessList)) ||
                  isInterviewInvitation == true ? (
                    <Col span={4} className="colCenter">
                      <h5>ثبت رشته</h5>
                      <Button
                        type="text"
                        onClick={fieldHandler}
                        icon={<Node />}
                      ></Button>
                    </Col>
                  ) : null}
              </Row>
            )}
        </Col>

      </Row>
      <ConfigProvider direction="rtl">
        <Modal
          title="دلیل رد"
          visible={visibleStatus}
          footer={null}
          onOk={() => setVisibleStatus(false)}
          onCancel={() => setVisibleStatus(false)}
          width={600}
          centered
        >
          {visibleStatus && (
            <RejectDetemineStatus
              closeModal={() => setVisibleStatus(false)}
              oneAdjusterList={oneAdjusterList}
            />
          )}
        </Modal>

        <Modal
          title={`ثبت نمره ${oneAdjusterList?.FirstName} ${oneAdjusterList?.FamilyName}`}
          visible={visibleScore}
          footer={null}
          onOk={() => setVisibleScore(false)}
          onCancel={() => {
            setVisibleScore(false);
            // isInterviewInvitation == true
            //   ? dispatch(
            //       cartableReportAllInfo(
            //         modelReport,
            //         adjusterType.natural,
            //         () => {}
            //       )
            //     )
            //   : dispatch(fetchListNaturalCartable(modelCartable, () => {}));
          }}
          width={900}
          destroyOnClose={true}
        >
          <Score
            closeModal={() => setVisibleScore(false)}
            oneAdjusterList={oneAdjusterList}
            isInterviewInvitation={isInterviewInvitation}
            modelReport={modelReport}
          />
        </Modal>

        <Modal
          title="تاریخ و زمان مصاحبه"
          visible={visiblleInterview}
          footer={null}
          onOk={() => setVisibleInterview(false)}
          onCancel={() => {
            setVisibleInterview(false);
            // isInterviewInvitation == true
            //   ? dispatch(
            //       cartableReportAllInfo(
            //         modelReport,
            //         adjusterType.natural,
            //         () => {}
            //       )
            //     )
            //   : dispatch(fetchListNaturalCartable(modelCartable, () => {}));
          }}
          width={700}
          centered
        >
          {visiblleInterview && (
            <DateInterviewAndInterviewers
              closeModal={closeFileDetail}
              oneAdjusterList={oneAdjusterList}
              closeModalInterview={() => setVisibleInterview(false)}
              isInterviewInvitation={isInterviewInvitation}
              modelReport={modelReport}
            />
          )}
        </Modal>
        <Modal
          title="اطلاعات رشته و زیررشته تخصصی"
          visible={fields}
          footer={null}
          onOk={() => setFields(false)}
          onCancel={() => setFields(false)}
          width={900}
          centered
          destroyOnClose={true}
        >
          {fields && (
            <FeildInterviewer
              oneAdjusterList={oneAdjusterList}
              closeModal={() => setFields(false)}
              isInterviewInvitation={isInterviewInvitation}
              modelReport={modelReport}
            />
          )}
        </Modal>

        <Modal
          title="اطلاعات رشته و زیررشته تخصصی"
          visible={showEditFieldInfoModal}
          footer={null}
          onOk={() => setShowEditFieldInfoModal(false)}
          onCancel={() => setShowEditFieldInfoModal(false)}
          width={900}
          centered
          destroyOnClose={true}
        >

          {showEditFieldInfoModal && (
            <FeildInterviewer 
              oneAdjusterList={oneAdjusterList}
              closeModal={() => setShowEditFieldInfoModal(false)}
              isInterviewInvitation={isInterviewInvitation}
              recordReport={recordReport}

            />
          )}
        </Modal>
        <Modal
          title={`ویرایش اطلاعات ${personalInfoDetail?.FirstName} ${personalInfoDetail?.FamilyName}`}
          visible={visibleEditInfoModal}
          footer={null}
          onCancel={() => setVisibleEditInfoModal(false)}
          centered
          width={700}
        >
          <EditCompanyInfo
            oneAdjusterList={oneAdjusterList}
            isFromReportTable={isFromReportTable}
            userLogin={userLogin?.Result}
            closeModal={() => setVisibleEditInfoModal(false)}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default InformationAdjuster;
