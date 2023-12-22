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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { FindAccess } from "sanhab-components-library";
import {
  sendReasonReffer,
  fetchListJudicalCartable,
  submitChargonOperation,
  uploadJudicalProfilePicEdit,
  getJudicalProfilePicEdit,
  informationFileAction,
  downloadAdjusterLicence,
  downloadChargonLetter,
  informationFileAdjusterDesktopAction,
  downloadAdjusterDesktopLicence,
  downloadAdjusterDesktopChargonLetter,
  downloadExtendChargonLetter,
  fetchCompanyInfoFromAdjusterDesktop,
  fetchNaturalCompanyInfo
} from "../../../../redux/actions";
import RejectDetemineStatus from "./AdjusterInfoDetail/DetermineStatus/RejectDetemineStatus";
import { IPersonalInfoDetail } from "../../../../shared/ulitities/Model/personalInfoDetail";
import EditCompanyInfo from '../../Natural/InformationAdjuster/EditCompanyInfo'
import { IAneAdjusterList } from "../../../../shared/ulitities/Model/oneAdjuster";
import { IReffer } from "../../../../shared/ulitities/Model/reffer";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";
import { userAccessList } from "../../../../shared/ulitities/Enums/userAccessList";
import { GetWay } from "../../../../shared/ulitities/Enums/getWay";
import { findChargoonRegistration } from "../../../../utils/utils";
import { ReactComponent as SubmitChargon } from "../../../../assets/images/submitChargon.svg";
import { ReactComponent as Archive } from "../../../../assets/images/archive.svg";
import { ReactComponent as Marjo } from "../../../../assets/images/marjo.svg";
import { ReactComponent as Refer } from "../../../../assets/images/refer.svg";
import { ReactComponent as Node } from "../../../../assets/images/node.svg";
import { ReactComponent as UpArrow } from "../../../../assets/images/upload.svg";
import { ReactComponent as Certificate } from "../../../../assets/images/web-certificate-blue.svg";
import { ReactComponent as FormBlue } from "../../../../assets/images/formBlue.svg";
import { ReactComponent as EmailB } from "../../../../assets/images/email-blue.svg";
import FeildInterviewer from "../../Natural/InformationAdjuster/AdjusterInfoDetail/FeildInfoInterviewer/FieldInterviewer";
import Field from "./AdjusterInfoDetail/Field";

interface IInformationAdjuster {
  oneAdjusterList?: IAneAdjusterList;
  closeFileDetail?: () => void;
  personalInfoDetail: IPersonalInfoDetail;
  isFromReportTable?: boolean;
  activeTabInbox?: string;
  isEvaluatorDesktopInformation?: number;
}
const { TextArea } = Input;

const InformationAdjuster: FC<IInformationAdjuster> = ({
  oneAdjusterList,
  closeFileDetail,
  personalInfoDetail,
  isFromReportTable,
  activeTabInbox,
  isEvaluatorDesktopInformation,
}) => {
  const dispatch = useDispatch();
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleEditInfoModal, setVisibleEditInfoModal] = useState(false);
  const [fields, setFields] = useState(false);
  const loadingRefer = useSelector((state: any) => state.reffer.loading);
  const [activeArchive, setActiveArchive] = useState(false);
  const [activeReffer, setActiveReffer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [popVisible, setPopVisible] = useState(false);
  const [showEditFieldInfoModal, setShowEditFieldInfoModal] = useState(false)
  const dataJudicalModel = useSelector(
    (state: any) => state.listJudicalCartable.ModelJudicalCartable
  );
  const { userLogin } = useSelector((state: any) => state.userLogin);
  const [upload, setUpload] = useState(false);
  const resultProfile = useSelector(
    (state: any) =>
      state?.showJudicalProfilePic?.showjudicalProfilePic?.Result?.Content
  );
  const { loading: loadingInfo } = useSelector(
    (state: any) => state.informationFile
  );
  const { loadingAdjusterLicense } = useSelector(
    (state: any) => state.licenseAdjuster
  );
  const {
    loadingChargonLetter,
    loading: loadingSubmitChargoon,
    loadingExtendChargonLetter,
  } = useSelector((state: any) => state.chargonLetter);

  //متغیر ارجاع
  let reasonReffer: IReffer = {
    id: oneAdjusterList?.CartableId,
    adjusterTypeId: adjusterType.judical,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Accept",
    description: description,
  };

  //متغیر بایگانی
  let reasonReject: IReffer = {
    adjusterTypeId: adjusterType.judical,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Reject",
    id: oneAdjusterList?.CartableId,
  };
  const handleFiledInfoModal = () => {
    setShowEditFieldInfoModal(true)
  }
  //ارجاع
  const refferHandler = () => {
    setActiveArchive(false);
    setActiveReffer(true);
    setDescription("");
    dispatch(
      sendReasonReffer(reasonReffer, () => {
        dispatch(fetchListJudicalCartable(dataJudicalModel));
      })
    );
  };

  //بایگانی
  const archiveHandler = () => {
    setActiveArchive(true);
    setActiveReffer(false);
    dispatch(
      sendReasonReffer(reasonReject, () => {
        dispatch(fetchListJudicalCartable(dataJudicalModel));
      })
    );
  };

  const showPopconfirm = () => {
    setPopVisible(true);
  };
  const handleCancel = () => {
    setPopVisible(false);
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
          dispatch(fetchListJudicalCartable(dataJudicalModel));
        },
        () => {
          setPopVisible(false);
          dispatch(fetchListJudicalCartable(dataJudicalModel));//add by morsa
        }
      )
    );
  };

  //نشان دادن مدال رمینه تخصصی
  const fieldHandler = () => {
    setFields(true);
    closeFileDetail && closeFileDetail();
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
  const handleUpload = (e: any) => {
    setUpload(true);
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];
    dispatch(
      uploadJudicalProfilePicEdit(file, oneAdjusterList?.ApplicantId, () => {
        dispatch(getJudicalProfilePicEdit(oneAdjusterList?.ApplicantId));
      })
    );
  };

  useEffect(() => {
    setUpload(false);
  }, []);

  //دانلود اطلاعات پروانه
  const downloadInformationFile = () => {
    isEvaluatorDesktopInformation === GetWay.desktop
      ? dispatch(
        informationFileAdjusterDesktopAction(
          adjusterType.judical,
          userLogin?.Result?.ApplicantId
        )
      )
      : dispatch(
        informationFileAction(
          adjusterType.judical,
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
          loading={loadingRefer && activeReffer ? true : false}
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
              {oneAdjusterList?.LetterNumber !== "NotSureSendingL" ? (
                findChargoonRegistration(oneAdjusterList?.AccessList) &&
                FindAccess(userAccessList.Adjusters_SendChargoonLetter) && (
                  <Button
                    type="primary"
                    ghost
                    onClick={submitChargonHandler}
                    className="buttonImageCenter"
                    icon={<SubmitChargon />}
                    loading={loadingSubmitChargoon}
                  >
                    ثبت چارگون
                  </Button>
                )
              ) : (
                  <ConfigProvider direction="rtl">
                    <Popconfirm
                      title={`وضعیت ارسال نامه مشخص نمی باشد، لطفا ابتدا دیدگاه را بررسی نمایید در صورتی که نامه ارسال نشده بود دکمه تایید را بزنید که مجدد نامه ارسال گردد`}
                      onConfirm={submitChargonHandler}
                      okText="تایید"
                      cancelText="انصراف"
                      okButtonProps={{ loading: loadingSubmitChargoon }}
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
                )}
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
                loading={loadingRefer && activeArchive ? true : false}
                icon={<Archive />}
              >
                بایگانی
              </Button>
              {oneAdjusterList?.StateId === workTaskFlowId.GeneralManager ? (
                <Button
                  type="primary"
                  onClick={refferHandler}
                  className="buttonImageCenter"
                  loading={loadingRefer && activeReffer}
                  icon={<Refer />}
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
                      icon={<Refer />}
                    >
                      ارجاع
                  </Button>
                  </Popover>
                )}
            </div>
          )}
      </div>
      <h2>مشخصات متقاضی آزمون ارزیابی</h2>
      <Row>
        <Col xs={2} sm={4} md={6} lg={3} xl={3} className="person">
          {personalInfoDetail?.ProfilePic !== undefined && upload === false ? (
            <img
              src={"data:image/png;base64," + personalInfoDetail?.ProfilePic}
              alt="ProfilePic"
              className="ProfilePic"
            />
          ) : resultProfile && upload == true ? (
            <img
              src={"data:image/png;base64," + resultProfile}
              alt="ProfilePic"
            />
          ) : (
                <Skeleton.Avatar active shape="square" size={100} />
              )}
          {!isFromReportTable &&
            activeTabInbox !== "2" &&
            isEvaluatorDesktopInformation !== GetWay.desktop && (
              <Tooltip placement="bottom" title="بارگذاری فایل">
                <label className="customFileUpload customWidthFile ">
                  <UpArrow />
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

        <Col xs={20} sm={16} md={15} lg={9} xl={12}>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={8}>
              <h5 className="titleCol"> کد رهگیری:</h5>
              {personalInfoDetail?.RegistrationCode !== undefined ? (
                <span> {personalInfoDetail?.RegistrationCode} </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={16}>
              <h5 className="titleCol">نام و نام خانوادگی:</h5>
              {personalInfoDetail?.FirstName !== undefined ? (
                <span>
                  {personalInfoDetail?.FirstName}{" "}
                  {personalInfoDetail?.FamilyName}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
          </Row>
          <Row className="part2">
            <Col xs={2} sm={4} md={6} lg={8} xl={8}>
              <h5 className="titleCol">کد ملی:</h5>
              {personalInfoDetail?.NationalCode !== undefined ? (
                <span> {personalInfoDetail?.NationalCode} </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>
              <h5 className="titleCol">تاریخ تولد:</h5>
              {personalInfoDetail?.BirthDate !== undefined ? (
                <span>
                  {moment(personalInfoDetail?.BirthDate?.split("T")[0]).format(
                    "jYYYY-jM-jD"
                  )}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={8}>
              <h5 className="titleCol">شهر محل تولد:</h5>
              {personalInfoDetail?.BirthCityTitle !== undefined ? (
                <span> {personalInfoDetail?.BirthCityTitle}</span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
          </Row>
        </Col>
        <Col xs={2} sm={4} md={24} lg={12} xl={9}>
         
          {isFromReportTable ||
            isEvaluatorDesktopInformation === GetWay.desktop ? (
              <Row>
                 <Col xs={24} sm={24} md={8} lg={8} xl={6} className="colCenter">
                  <h5 className="titleGray">ویرایش</h5>
                  <Tooltip placement="topLeft" title=" ویرایش اطلاعات شخص">
                    <Button
                      type="text"
                      onClick={() => editCompanyInfo()}
                      icon={<FormBlue />}

                    ></Button>
                  </Tooltip>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={6} className="colCenter">
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
                <Col xs={24} sm={24} md={8} lg={8} xl={6} className="colCenter">
                  <h5 className="titleGray"> پروانه ارزیاب</h5>
                  <Tooltip placement="topLeft" title="دریافت پروانه ارزیاب">
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
                <Col xs={24} sm={24} md={8} lg={8} xl={6} className="colCenter">
                  <h5 className="titleGray"> نامه چارگون</h5>
                  <Tooltip placement="topLeft" title="دریافت نامه چارگون">
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

               
          
                {isEvaluatorDesktopInformation == GetWay.desktop &&
                  personalInfoDetail?.HasExtendedChargoonLetter && (
                    <Col xs={24} sm={24} md={8} lg={8} xl={6} className="colCenter">
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
              
             
             <Row>
             {
                  isFromReportTable &&
                  <Button type="primary" onClick={handleFiledInfoModal}>ویرایش رشته تخصصی</Button>

                }
             </Row>
              </Row>
            ) : (
              activeTabInbox !== "2" && (
                <Row justify="end">
                  <Col span={12} className="colCenter">
                    <h5>ثبت رشته</h5>
                    <Button
                      type="text"
                      icon={<Node />}
                      onClick={fieldHandler}
                    ></Button>
                  </Col>
                </Row>
              )
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
          width={700}
          centered
        >
          {visibleStatus && (
            <RejectDetemineStatus
              oneAdjusterList={oneAdjusterList}
              closeModal={() => setVisibleStatus(false)}
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
            <Field
              oneAdjusterList={oneAdjusterList}
              closeModal={() => setFields(false)}
              activeTabInbox={activeTabInbox}
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
            isFromReportTable={isFromReportTable}
            userLogin={userLogin?.Result}
            closeModal={() => setVisibleEditInfoModal(false)}
            oneAdjusterList={oneAdjusterList}
          />
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
              // isInterviewInvitation={isInterviewInvitation}
              // recordReport={recordReport}

            />
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default InformationAdjuster;
