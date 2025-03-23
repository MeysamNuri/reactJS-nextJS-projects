import React, { useState, FC } from "react";
import {
  Row,
  Col,
  Modal,
  ConfigProvider,
  Tooltip,
  Button,
  Menu,
  Popover,
  Typography
} from "antd";
import { MessageOutlined, ProfileOutlined, DashboardOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { FindAccess } from "sanhab-components-library";
import Indicator from "../Indicator";
import {
  downloadAdjusterLicence,
  downloadChargonLetter,
  informationFileAction,
  fetchListJudicalCartable,
  licenseIssuOperation,
  fechLicenseIssuer,
  fetchNaturalCompanyInfo,
  G4BSendMessage,
  G4BCheckRegistration,
  G4BDocumentApproved
} from "../../../redux/actions";
import AdjusterInfoDetail from "./InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import {
  findAccessGetLicense,
  findchargoonLetter,
  findIssueRegistrationCode,
  g4bSendMessage,
  g4bCheckRegisteration,
  g4bDocumentApprove
} from "../../../utils/utils";
import SendSmsPanel from "../sendSmsPanel/SendSmsPanel";
import EditCompanyInfo from '../Natural/InformationAdjuster/EditCompanyInfo'
import SubMenu from "antd/lib/menu/SubMenu";
import { ReactComponent as FormBlue } from "../../../assets/images/formBlue.svg";
import { ReactComponent as Sms } from "../../../assets/images/smsBlue.svg";
import { ReactComponent as SubmitChargon } from "../../../assets/images/submitChargon.svg";
import { ReactComponent as ReLicensedBlue } from "../../../assets/images/reLicensedBlue.svg";
import { ReactComponent as EmailB } from "../../../assets/images/email-blue.svg";
import { ReactComponent as Certificate } from "../../../assets/images/web-certificate-blue.svg";
import { ReactComponent as CodeAdjuster } from "../../../assets/images/codeAdjuster.svg";
import { ReactComponent as Notification } from "../../../assets/images/notification.svg";
// import Message from "../../../assets/images/icons8newmessage.png";
// import Detail from "../../../assets/images/icons8moredetails48.png";
// import IndicatorImg from "../../../assets/images/indicator.png";

interface IJudicalCardProps {
  oneAdjusterList: IAneAdjusterList;
  activeTabInbox?: string;
}

const JudicalCard: FC<IJudicalCardProps> = ({
  oneAdjusterList,
  activeTabInbox,
}) => {
  const dispatch = useDispatch();
  const [visibleEditInfoModal, setVisibleEditInfoModal] = useState(false);
  const [visibleFile, setVisibleFile] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [visibleSendSMSPanel, setVisibleSendSMSPanel] = useState(false);
  const { Text } = Typography
  const { loadingChargonLetter, loadingLicenseIssu } = useSelector(
    (state: any) => state.chargonLetter
  );
  const { loading } = useSelector((state: any) => state.informationFile);
  const { loadingAdjusterLicense } = useSelector(
    (state: any) => state.licenseAdjuster
  );
  const { ModelJudicalCartable, modelFilterJudicalCartable } = useSelector(
    (state: any) => state.listJudicalCartable
  );
  const { licenseIssuer } = useSelector((state: any) => state.licenseissuer);
  const { loadingFetchBaseInfo } = useSelector((state: any) => state?.companyBaseInfo);
  let subFeilds = oneAdjusterList?.SubFields.map((subField: any) => {
    let fieldObj = {
      Title: subField.Title,
      key: subField.SubFieldId,
    };

    return fieldObj;
  });

  //نشان دادن مدال جزییات ارزیاب
  const fileDetailVisibleHandler = () => {
    setVisibleFile(true);
  };
  //نشان دادن مدال پیامک
  const sendSmsPanelVisibleHandler = () => {
    setVisibleSendSMSPanel(true);
  };
  //نشان دادن مدال ویرایش اطلاعات شخص دادگستری
  const editBaseInfoHandler = () => {
    dispatch(fetchNaturalCompanyInfo(oneAdjusterList.ApplicantId, () => setVisibleEditInfoModal(true)))
  }
  //دانلود پروانه ارزیاب
  const dlLicenenceAdjusterHandler = () => {
    dispatch(downloadAdjusterLicence(oneAdjusterList.ApplicantId));
  };
  //دانلود نامه چارگون
  const dlLetterChargoonHandler = () => {
    dispatch(downloadChargonLetter(oneAdjusterList.ApplicantId));
  };

  //دانلود  اطلاعات پروانه
  const downloadInformationFile = () => {
    dispatch(
      informationFileAction(adjusterType.judical, oneAdjusterList.ApplicantId)
    );
  };
  // ارسال پیامک درگاه ملی
  const sendMessageG4B = () => {
    let sendMessage = {
      id: oneAdjusterList.ApplicantId
    }
    dispatch(G4BSendMessage(sendMessage))
  }
  // تایید مدارک
  const g4bApproveDocument = () => {
    let requestBody = {
      id: oneAdjusterList.ApplicantId
    }
    dispatch(G4BDocumentApproved(requestBody))
  }
  // بررسی ثبت نام
  const g4BCheckRegisteration = () => {
    let requestBody = {
      id: oneAdjusterList.ApplicantId
    }
    dispatch(G4BCheckRegistration(requestBody))
  }

  //صدور کد ارزیابی
  const licenseIssuHandler = () => {
    dispatch(
      licenseIssuOperation(
        oneAdjusterList.ApplicantId,
        () => {
          dispatch(fetchListJudicalCartable(ModelJudicalCartable));
        },
        () => {
          dispatch(fechLicenseIssuer(oneAdjusterList.ApplicantId));
        }
      )
    );
    dispatch(fechLicenseIssuer(oneAdjusterList.ApplicantId));
  };

  const indicatorHandler = () => {
    setIndicator(true);
  };

  return (
    <div className="cardCartable">
      <div
        className="titleCard"
        style={{
          backgroundColor:
            oneAdjusterList.ApplicantForbiddens.length > 0
              ? "#FF8B8B"
              : "#ffffff",
        }}
      >
        <div className="titleCartable">
          <div
            className={
              oneAdjusterList.ApplicantForbiddens.length > 0
                ? "trackingCodeIndicator"
                : "trackingCode"
            }
          >
            <p>
              کد رهگیری: <span>{oneAdjusterList.RegistrationCode}</span>
            </p>
          </div>
          {oneAdjusterList.Description !== "" && (
            <a className="notification">
              <Popover content={oneAdjusterList?.Description} title="توضیحات">
                <Notification />
                {oneAdjusterList?.Description !== "" ? (
                  <div className="badge"></div>
                ) : null}
              </Popover>
            </a>
          )}
          <span className="userName">
            {oneAdjusterList.FirstName} {oneAdjusterList.FamilyName}
          </span>
          {
            oneAdjusterList?.G4bStatus ?
              <>
                <span style={{ backgroundColor: "#f0f0f1", marginRight: "15px", padding: "5px" }}>

                  وضعیت در درگاه ملی مجوزها:

                     
                </span>
                <span style={{ backgroundColor: "greenyellow", padding: "5px", marginRight: "5px" }}>
                    {oneAdjusterList.G4bStatusDescription}
                  </span>
            </>:null
          }

        </div>
        <div>
          {oneAdjusterList.ApplicantForbiddens.length !== 0 && (
            <Tooltip placement="topLeft" title="شاخص">
              <Button
                type="text"
                onClick={indicatorHandler}
                icon={<DashboardOutlined style={{ fontSize: '24px', color: "#495579" }} />}
              />
            </Tooltip>
          )}
          {FindAccess(userAccessList.Adjusters_DocumentDetail) && (
            <Tooltip placement="topLeft" title="جزئیات پرونده ارزیاب">
              <Button
                type="text"
                onClick={fileDetailVisibleHandler}
                icon={<ProfileOutlined style={{ fontSize: '24px', color: "#495579" }} />}
              />
            </Tooltip>
          )}
          {FindAccess(userAccessList.Adjusters_SendSms) && (
            <Tooltip placement="topLeft" title="ارسال پیامک">
              <Button
                type="text"
                onClick={sendSmsPanelVisibleHandler}
                icon={<MessageOutlined style={{ fontSize: '24px', color: "#495579" }} />}
              />
            </Tooltip>
          )}
          <Tooltip placement="topLeft" title="ویرایش اطلاعات دادگستری">
            <Button
              type="text"
              onClick={editBaseInfoHandler}
              icon={<EditOutlined style={{ fontSize: '24px', color: "#495579" }} />}
              loading={oneAdjusterList.ApplicantId === loadingFetchBaseInfo}
            />
          </Tooltip>
        </div>
      </div>

      <div className="content">
        <Row>
          <Col xs={8} sm={6} md={5} lg={3} xl={3}>
            <h5 className="titleGray">کدملی:</h5>
            <span>{oneAdjusterList.NationalCode}</span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={3} xl={3}>
            <h5 className="titleGray">وضعیت</h5>
            <span>{oneAdjusterList.StateTitle}</span>
          </Col>

          <Col xs={8} sm={6} md={5} lg={3} xl={2}>
            <h5 className="titleGray">کد ارزیاب</h5>
            <span>
              {oneAdjusterList.AdjusterCode === null
                ? "-----"
                : oneAdjusterList.AdjusterCode}
            </span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={4} xl={4}>
            <h5 className="titleGray">رشته تخصصی</h5>
            <span>
              {oneAdjusterList.AdjustmentFieldTitle === null
                ? "ندارد"
                : oneAdjusterList.AdjustmentFieldTitle}
            </span>
          </Col>

          <Col xs={8} sm={6} md={5} lg={5} xl={3}>
            {subFeilds?.length === 0 ? (
              <>
                <h5 className="titleGray">زیر رشته تخصصی</h5>
                <span>------------------</span>
              </>
            ) : (
                <Menu
                  mode="horizontal"
                  style={{ color: "#7987a1", marginTop: "-13px" }}
                >
                  <SubMenu
                    title="زیر رشته تخصصی"
                    key={oneAdjusterList.ApplicantId}
                  >
                    {subFeilds?.map((item: any) => (
                      <Menu.Item key={item.key}>{item.Title}</Menu.Item>
                    ))}
                  </SubMenu>
                </Menu>
              )}
          </Col>

          <Col xs={8} sm={6} md={5} lg={3} xl={9}>
            <h5 className="titleGray"> دوره</h5>
            <span>{oneAdjusterList.CourseTitle} </span>
          </Col>
          {/*   <Col xs={8} sm={6} md={5} lg={3} xl={5}>
            <Button
              type="primary"
              onClick={fileDetailVisibleHandler}
              style={{ marginBottom: "5px" }}
            >
              جزئیات پرونده
            </Button>{" "}
            <Button type="primary" onClick={sendSmsPanelVisibleHandler}>
              ارسال پیامک
            </Button>
          </Col> */}
        </Row>
      </div>
      <div className="footer">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={4}>
            <Row>
              {/* <Col
                xs={10}
                sm={8}
                md={8}
                lg={8}
                xl={12}
                className="paddingColTitle"
              >
                <h5 className="titleGray"> سوابق</h5>
                {oneAdjusterList.IsWorkExperienceApproved === null ? (
                  <>
                    <span className="notCheked"></span>
                    <span>بررسی نشده</span>
                  </>
                ) : oneAdjusterList.IsWorkExperienceApproved === true ? (
                  <>
                    <span className="confirm"></span>
                    <span>تایید</span>
                  </>
                ) : (
                      <>
                        <span className="notConfirm"></span>
                        <span>عدم تایید</span>
                      </>
                    )}
              </Col> */}
              <Col span={24}>
                <h5 className="titleGray">مدارک</h5>
                {oneAdjusterList.IsCertificateApproved === null ? (
                  <>
                    <span className="notCheked"></span>
                    <span>بررسی نشده</span>
                  </>
                ) : oneAdjusterList.IsCertificateApproved === true ? (
                  <>
                    <span className="confirm"></span>
                    <span>تایید</span>
                  </>
                ) : (
                      <>
                        <span className="notConfirm"></span>
                        <span>عدم تایید</span>
                      </>
                    )}
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={20}>
            <Row>

              {findIssueRegistrationCode(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_LicenseIssue) && (
                  <Col xs={8} sm={8} md={6} lg={5} xl={3} className="colCenter">
                    <h5 className="titleGray">صدور کد ارزیابی</h5>
                    {oneAdjusterList.AdjusterCode === null ? (
                      <Tooltip placement="topLeft" title="صدور کد ارزیابی">
                        <Button
                          type="text"
                          onClick={licenseIssuHandler}
                          //disabled={oneAdjusterList.AdjusterCode !== null}
                          loading={
                            loadingLicenseIssu === oneAdjusterList.ApplicantId
                          }
                          icon={<CodeAdjuster />}
                        ></Button>
                      </Tooltip>
                    ) : (
                        <Popover
                          content={licenseIssuer?.IssuerName}
                          title="صادر کننده کد ارزیاب"
                          trigger="hover"
                        >
                          <Button
                            type="text"
                            onClick={licenseIssuHandler}
                            //disabled={oneAdjusterList.AdjusterCode !== null}
                            loading={
                              loadingLicenseIssu === oneAdjusterList.ApplicantId
                            }
                            icon={<CodeAdjuster />}
                          ></Button>
                        </Popover>
                      )}
                  </Col>
                )}
              {FindAccess(userAccessList.Adjusters_DocumentInformation) && (
                <Col xs={8} sm={8} md={6} lg={5} xl={4} className="colCenter">
                  <h5 className="titleGray">اطلاعات پرونده</h5>
                  <Tooltip placement="topLeft" title="اطلاعات پرونده">
                    <Button
                      type="text"
                      icon={<FormBlue />}
                      onClick={() => downloadInformationFile()}
                      loading={loading === oneAdjusterList.ApplicantId}
                    ></Button>
                  </Tooltip>
                </Col>
              )}
              {
                g4bCheckRegisteration(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_SendChargoonLetter) && (
                  <Col xs={8} sm={8} md={6} lg={5} xl={4} className="colCenter">
                    <h5 className="titleGray">بررسی ثبت نام درگاه ملی</h5>
                    <Tooltip placement="topLeft" title="بررسی ثبت نام درگاه ملی">
                      <Button
                        type="text"
                        icon={<SubmitChargon />}
                        onClick={() => g4BCheckRegisteration()}
                        loading={loading === oneAdjusterList.ApplicantId}
                      ></Button>
                    </Tooltip>
                  </Col>
                )}
              {
                g4bDocumentApprove(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_SendChargoonLetter) && (
                  <Col xs={8} sm={8} md={6} lg={5} xl={4} className="colCenter">
                    <h5 className="titleGray">تأیید مدارک در درگاه ملی</h5>
                    <Tooltip placement="topLeft" title="تأیید مدارک در درگاه ملی">
                      <Button
                        type="text"
                        icon={<ReLicensedBlue />}
                        onClick={() => g4bApproveDocument()}
                        loading={loading === oneAdjusterList.ApplicantId}
                      ></Button>
                    </Tooltip>
                  </Col>
                )}
              {
                g4bSendMessage(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_SendChargoonLetter) && (
                  <Col xs={8} sm={8} md={6} lg={5} xl={4} className="colCenter">
                    <h5 className="titleGray">ارسال پیامک درگاه ملی</h5>
                    <Tooltip placement="topLeft" title="ارسال پیامک جهت ثبت نام درگاه ملی">
                      <Button
                        type="text"
                        icon={<Sms width="20px" />}
                        onClick={() => sendMessageG4B()}
                        loading={loading === oneAdjusterList.ApplicantId}
                      ></Button>
                    </Tooltip>
                  </Col>
                )}


              {findchargoonLetter(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_ViewChargoonLetter) && (
                  <Col xs={8} sm={8} md={6} lg={5} xl={4} className="colCenter">
                    <h5 className="titleGray">دریافت نامه چارگون</h5>
                    <Tooltip placement="topLeft" title="دریافت نامه چارگون">
                      <Button
                        type="text"
                        onClick={dlLetterChargoonHandler}
                        loading={
                          oneAdjusterList.ApplicantId === loadingChargonLetter
                        }
                        icon={<EmailB />}
                      ></Button>
                    </Tooltip>
                  </Col>
                )}
              {findAccessGetLicense(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_ViewLicense) && (
                  <Col xs={8} sm={8} md={6} lg={5} xl={4} className="colCenter">
                    <h5 className="titleGray">دریافت پروانه ارزیاب</h5>
                    <Tooltip placement="topLeft" title="دریافت پروانه ارزیاب">
                      <Button
                        type="text"
                        onClick={dlLicenenceAdjusterHandler}
                        icon={<Certificate />}
                        loading={
                          oneAdjusterList.ApplicantId === loadingAdjusterLicense
                        }
                      ></Button>
                    </Tooltip>
                  </Col>
                )}
            </Row>
          </Col>
        </Row>
      </div>

      <ConfigProvider direction="rtl">
        <Modal
          title={`پرونده  ${oneAdjusterList.FirstName} ${oneAdjusterList.FamilyName}`}
          visible={visibleFile}
          footer={null}
          onOk={() => setVisibleFile(false)}
          onCancel={() => {
            setVisibleFile(false);
            dispatch(
              fetchListJudicalCartable(
                modelFilterJudicalCartable === null
                  ? ModelJudicalCartable
                  : modelFilterJudicalCartable
              )
            );
          }}
          width={1000}
          centered
          bodyStyle={{
            height: "660px",
            maxHeight: "660px",
            overflowY: "scroll",
          }}
        >
          {visibleFile && (
            <AdjusterInfoDetail
              oneAdjusterList={oneAdjusterList}
              closeFileDetail={() => setVisibleFile(false)}
              //isFromReportTable props will be set to true if we are using this component from the report table.
              //we are setting isFromReportTable = false because we are not going to this component from the report table.
              isFromReportTable={false}
              //applicantId props will be filled from more detail button in report table.
              //we are sending applicantID = 0 because there is no information for this item from here.
              // applicantId={0}
              activeTabInbox={activeTabInbox}
            />
          )}
        </Modal>
        <Modal
          title={`ارسال پیامک به  ${oneAdjusterList.FirstName} ${oneAdjusterList.FamilyName}`}
          visible={visibleSendSMSPanel}
          footer={null}
          onCancel={() => setVisibleSendSMSPanel(false)}
          centered
        >
          <SendSmsPanel
            oneAdjusterList={oneAdjusterList}
            closeModal={() => setVisibleSendSMSPanel(false)}
          />
        </Modal>
        <Modal
          title={`شاخص های  ${oneAdjusterList.FirstName} ${oneAdjusterList.FamilyName}`}
          visible={indicator}
          footer={null}
          onCancel={() => setIndicator(false)}
          centered
          width={700}
        >
          <Indicator
            oneAdjusterList={oneAdjusterList}
            closeModal={() => setIndicator(false)}
          />
        </Modal>
        <Modal
          title={`ویرایش اطلاعات ${oneAdjusterList.FirstName} ${oneAdjusterList.FamilyName}`}
          visible={visibleEditInfoModal}
          footer={null}
          onCancel={() => setVisibleEditInfoModal(false)}
          centered
          width={700}
        >
          <EditCompanyInfo
            oneAdjusterList={oneAdjusterList}
            closeModal={() => setVisibleEditInfoModal(false)}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default JudicalCard;
