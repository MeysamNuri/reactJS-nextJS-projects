import React, { FC, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ConfigProvider,
  Skeleton,
  Tooltip,
  Input,
  Popover,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { FindAccess } from "sanhab-components-library";
import EditCompanyBaseInfo from "../../Legal/InformationAdjuster/EditCompanyBaseInfo";
import RejectDetemineStatus from "./AdjusterInfoDetail/DetermineStatus/RejectDetemineStatus";
import { IReffer } from "../../../../shared/ulitities/Model/reffer";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { GetWay } from "../../../../shared/ulitities/Enums/getWay";
import { userAccessList } from "../../../../shared/ulitities/Enums/userAccessList";
import { IPersonalInfoDetail } from "../../../../shared/ulitities/Model/personalInfoDetail";
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";
import {
  sendReasonReffer,
  fetchListLegalCartable,
  submitChargonOperation,
  informationFileAction,
  downloadAdjusterLicence,
  downloadChargonLetter,
  downloadExtendChargonLetter,
  fetchCompanyInfoFromAdjusterDesktop,
  fetchLegalCompanyBaseInfo
} from "../../../../redux/actions";
import { findChargoonRegistration } from "../../../../utils/utils";
import { IAneAdjusterList } from "../../../../shared/ulitities/Model/oneAdjuster";
import { ReactComponent as SubmitChargon } from "../../../../assets/images/submitChargon.svg";
import { ReactComponent as Archive } from "../../../../assets/images/archive.svg";
import { ReactComponent as Marjo } from "../../../../assets/images/marjo.svg";
import { ReactComponent as Refer } from "../../../../assets/images/refer.svg";
import { ReactComponent as Certificate } from "../../../../assets/images/web-certificate-blue.svg";
import { ReactComponent as FormBlue } from "../../../../assets/images/formBlue.svg";
import { ReactComponent as EmailB } from "../../../../assets/images/email-blue.svg";

interface InformationAdjusterProps {
  oneAdjusterList?: IAneAdjusterList;
  closeFileDetail?: () => void;
  personalInfoDetail?: IPersonalInfoDetail;
  isFromReportTable?: boolean;
  activeTabInbox?: string;
  isEvaluatorDesktopInformation?: number
}

const { TextArea } = Input;

const InformationAdjuster: FC<InformationAdjusterProps> = ({
  oneAdjusterList,
  closeFileDetail,
  personalInfoDetail,
  isFromReportTable,
  activeTabInbox,
  isEvaluatorDesktopInformation
}) => {
  const dispatch = useDispatch();
  const [editCompanyBaseInfo, setEditCompanyBaseInfo] = useState(false);

  const [visibleStatus, setVisibleStatus] = useState(false);
  const [activeArchive, setActiveArchive] = useState(false);
  const [activeReffer, setActiveReffer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showWorkLcationModal, setShowWorkLocationModal] = useState(false);
  const [description, setDescription] = useState("");
  const [popVisible, setPopVisible] = useState(false);
  const { ModelLegalCartable } = useSelector(
    (state: any) => state.listLegalCartable
  );
  const { loading } = useSelector((state: any) => state.reffer);
  const { loading: loadingInfo } = useSelector(
    (state: any) => state.informationFile
  );

  let userIdRecognition = Number(localStorage.getItem("userRecognition"));
  const { loadingAdjusterLicense } = useSelector(
    (state: any) => state.licenseAdjuster
  );
  const { userLogin } = useSelector((state: any) => state.userLogin);
  const {
    loading: loadingSubmitChargoon,
    loadingChargonLetter,
    loadingLicenseIssu,
    loadingExtendChargonLetter
  } = useSelector((state: any) => state.chargonLetter);
  //متغیر ارجاع
  let reasonReffer: IReffer = {
    adjusterTypeId: adjusterType.legal,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Accept",
    //message: null,
    id: oneAdjusterList?.CartableId,
    description: description,
  };

  //متغیر بایگانی
  let reasonReject: IReffer = {
    adjusterTypeId: adjusterType.legal,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Reject",
    // message: null,
    id: oneAdjusterList?.CartableId,
  };

  const showPopconfirm = () => {
    setPopVisible(true);
  };
  const handleCancel = () => {
    setPopVisible(false);
  };

  //ارجاع
  const refferHandler = () => {
    setActiveArchive(false);
    setActiveReffer(true);
    dispatch(
      sendReasonReffer(reasonReffer, () => {
        dispatch(fetchListLegalCartable(ModelLegalCartable));
      })
    );
  };

  //مرجوع
  const marjoHandler = () => {
    setVisibleStatus(true);
    closeFileDetail !== undefined && closeFileDetail();
  };

  //دانلود تمدید نامه
  const downloadExtendChargonLetterHandler = () => {
    dispatch(downloadExtendChargonLetter(userLogin?.Result?.ApplicantId));
  };

  //بایگانی
  const archiveHandler = () => {
    setActiveArchive(true);
    setActiveReffer(false);
    dispatch(
      sendReasonReffer(reasonReject, () => {
        dispatch(fetchListLegalCartable(ModelLegalCartable));
      })
    );
  };
  //ثبت چارگون
  const submitChargonHandler = () => {
    dispatch(submitChargonOperation(oneAdjusterList?.ApplicantId ?? userIdRecognition));
  };

  //دانلود  اطلاعات پروانه
  const downloadInformationFile = () => {
    dispatch(
      informationFileAction(adjusterType.legal, oneAdjusterList?.ApplicantId)
    );
  };
  //دانلود پروانه ارزیاب
  const dlLicenenceAdjusterHandler = () => {
    dispatch(downloadAdjusterLicence(oneAdjusterList?.ApplicantId ?? userIdRecognition));
  };
  //دانلود نامه چارگون
  const dlLetterChargoonHandler = () => {
    dispatch(downloadChargonLetter(oneAdjusterList?.ApplicantId ?? userIdRecognition));
  };
 
  //مدال ویرایش شخص

  const editCompanyInfo = () => {
    if (!isFromReportTable) {
      dispatch(fetchCompanyInfoFromAdjusterDesktop(() => setEditCompanyBaseInfo(true)))
    }
    else {
      dispatch(fetchLegalCompanyBaseInfo(oneAdjusterList?.ApplicantId ?? userIdRecognition, () => setEditCompanyBaseInfo(true)))

    }
  }

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
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  return (
    <div
      className="informationAdjuester"
      style={{
        paddingRight:
          oneAdjusterList?.ApplicantId == undefined ? "50px" : "0px",
      }}
    >
      <div className="titleInfoAdjuster">
        {!isFromReportTable && oneAdjusterList?.ApplicantId !== undefined && (
          <div>
            <div>
              <span className="titles">فرستنده: </span>
              <span className="contentInfo">{oneAdjusterList?.SenderUser}</span>
            </div>
            <div>
              <span className="titles">گیرنده: </span>
              <span className="contentInfo">
                {oneAdjusterList?.ReceiverUser}
              </span>
            </div>
          </div>
        )}
        {!isFromReportTable &&
          oneAdjusterList?.ApplicantId !== undefined &&
          activeTabInbox !== "2" && (
            <div className="btnDetermineStatus">
              {oneAdjusterList.LetterNumber == null ? (
                findChargoonRegistration(oneAdjusterList.AccessList) &&
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
                      title={`برای این متقاضی قبلا نامه چارگون  به شماره  ${oneAdjusterList.LetterNumber} ارسال گردیده. آیا از ارسال مجدد  نامه چارگون مطمئن هستید؟`}
                      onConfirm={submitChargonHandler}
                      okButtonProps={{ loading: loadingSubmitChargoon }}
                      okText="بله"
                      cancelText="خیر"
                      visible={popVisible}
                      onCancel={handleCancel}
                    >
                      <Button
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
                loading={loading && activeArchive}
                icon={<Archive />}
              >
                بایگانی
              </Button>
              {oneAdjusterList.StateId === workTaskFlowId.GeneralManager ? (
                <Button
                  type="primary"
                  onClick={refferHandler}
                  className="buttonImageCenter"
                  loading={loading && activeReffer}
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
      {oneAdjusterList?.ApplicantId !== undefined && (
        <h2>مشخصات متقاضی آزمون ارزیابی</h2>
      )}
      <Row>
        {/* {adjusterTypeId !== 2 && adjusterTypeId!==undefined ?  ( 
          <Col xs={2} sm={4} md={6} lg={3} xl={3} className="person  uploader">
            {resultProfile ? (
              <img
                src={"data:image/png;base64," + resultProfile}
                alt="ProfilePic"
              />
            ) : personalInfoDetail?.ProfilePic !== undefined ? (
              <img
                src={"data:image/png;base64," + personalInfoDetail?.ProfilePic}
                alt="ProfilePic"
              />
            ) : (
              adjusterTypeId !== 2 ?<Skeleton.Avatar active shape="square" size={100} /> :null
            )}
          </Col>
        ):null} */}

        <Col xs={20} sm={16} md={12} lg={10} xl={12}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={8}>
              <h5 className="titles">نام و نام خانوادگی:</h5>
              {personalInfoDetail?.FirstName !== undefined ? (
                <span className="contentColumns">
                  {personalInfoDetail?.FirstName}{" "}
                  {personalInfoDetail?.FamilyName}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={8}>
              <h5 className="titles">کد ملی:</h5>
              {personalInfoDetail?.NationalCode !== undefined ? (
                <span className="contentColumns"> {personalInfoDetail?.NationalCode} </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
          </Row>
          <Row className="part2">
            <Col xs={12} sm={12} md={12} lg={12} xl={8}>
              <h5 className="titles"> کد رهگیری:</h5>
              {personalInfoDetail?.RegistrationCode !== undefined ? (
                <span className="contentColumns"> {personalInfoDetail?.RegistrationCode} </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={16}>
              <h5 className="titles">شهر محل تولد:</h5>
              {personalInfoDetail?.BirthCityTitle !== undefined ? (
                <span className="contentColumns"> {personalInfoDetail?.BirthCityTitle}</span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>
          </Row>
        </Col>
        <br />
        <Col xs={20} sm={16} md={12} lg={12} xl={11} offset={1}>

          {isFromReportTable || isEvaluatorDesktopInformation && (
            <div className="viewDocument">
              {
                isFromReportTable && (
                  <>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} className="colCenter">
                      <h5 className="titleGray">اطلاعات پرونده</h5>
                      <Tooltip placement="topLeft" title="اطلاعات پرونده">
                        <Button
                          type="text"
                          onClick={downloadInformationFile}
                          icon={<FormBlue />}
                          loading={loadingInfo === oneAdjusterList?.ApplicantId}
                        ></Button>
                      </Tooltip>

                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} className="colCenter">
                      <h5 className="titleGray">ویرایش</h5>
                      <Tooltip placement="topLeft" title=" ویرایش اطلاعات شخص">
                        <Button
                          type="text"
                          onClick={() => editCompanyInfo()}
                          icon={<FormBlue />}

                        ></Button>
                      </Tooltip>
                    </Col>
                  </>
                )
              }


              <Col xs={6} sm={6} md={6} lg={6} xl={6} className="colCenter">
                <h5 className="titleGray"> پروانه ارزیاب</h5>
                <Tooltip placement="topLeft" title="دریافت پروانه ارزیاب">
                  <Button
                    type="text"
                    onClick={dlLicenenceAdjusterHandler}
                    icon={<Certificate />}
                    loading={
                      oneAdjusterList?.ApplicantId === loadingAdjusterLicense
                    }
                  ></Button>
                </Tooltip>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6} className="colCenter">
                <h5 className="titleGray"> نامه چارگون</h5>
                <Tooltip placement="topLeft" title="دریافت نامه چارگون">
                  <Button
                    type="text"
                    onClick={() => dlLetterChargoonHandler()}
                    icon={<EmailB />}
                    loading={
                      oneAdjusterList?.ApplicantId === loadingChargonLetter
                    }
                  ></Button>
                </Tooltip>
              </Col>
          
              {isEvaluatorDesktopInformation == GetWay.desktop &&
                personalInfoDetail?.HasExtendedChargoonLetter && (
                  <Col xs={6} sm={6} md={6} lg={6} xl={6} className="colCenter">
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

            </div>
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
          title={`ویرایش اطلاعات ${personalInfoDetail?.FirstName} ${personalInfoDetail?.FamilyName}`}
          visible={editCompanyBaseInfo}
          footer={null}
          onCancel={() => setEditCompanyBaseInfo(false)}
          centered
          width={700}
        >
          <EditCompanyBaseInfo
            oneAdjusterList={oneAdjusterList}
            closeModal={() => setEditCompanyBaseInfo(false)}
          />
        </Modal>
      
      </ConfigProvider>
    </div>
  );
};

export default InformationAdjuster;
