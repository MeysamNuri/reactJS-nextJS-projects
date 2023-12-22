import React, { useState, FC } from "react";
import {
  Row,
  Col,
  Modal,
  ConfigProvider,
  Tooltip,
  Button,
  Popover,
} from "antd";
import {EditOutlined,MessageOutlined ,ProfileOutlined ,DashboardOutlined  }  from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { FindAccess } from "sanhab-components-library";
import {
  downloadAdjusterLicence,
  downloadChargonLetter,
  informationFileAction,
  fetchListLegalCartable,
  licenseIssuOperation,
  fechLicenseIssuer,
  fetchLegalCompanyBaseInfo
} from "../../../redux/actions";
import AdjusterInfoDetail from "./InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";
import {
  findAccessGetLicense,
  findchargoonLetter,
  findIssueRegistrationCode,
} from "../../../utils/utils";
import SendSmsPanel from "../sendSmsPanel/SendSmsPanel";
import Indicator from "../Indicator";
import EditCompanyBaseInfo from "./InformationAdjuster/EditCompanyBaseInfo";
import { ReactComponent as FormBlue } from "../../../assets/images/formBlue.svg";
import { ReactComponent as EmailB } from "../../../assets/images/email-blue.svg";
import { ReactComponent as Certificate } from "../../../assets/images/web-certificate-blue.svg";
import { ReactComponent as CodeAdjuster } from "../../../assets/images/codeAdjuster.svg";
import { ReactComponent as Notification } from "../../../assets/images/notification.svg";
// import Message from "../../../assets/images/icons8newmessage.png";
// import Detail from "../../../assets/images/icons8moredetails48.png";
// import IndicatorImg from "../../../assets/images/indicator.png";

interface ILegalCardProps {
  oneAdjusterList: IAneAdjusterList;
  admissionType: string;
  activeTabInbox?: string;
}

const LegalCard: FC<ILegalCardProps> = ({
  oneAdjusterList,
  admissionType,
  activeTabInbox,
}) => {
  const dispatch = useDispatch();
  const [visibleFile, setVisibleFile] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [visibleSendSMSPanel, setVisibleSendSMSPanel] = useState(false);
  const {loadingFetchBaseInfo } = useSelector((state: any) => state?.companyBaseInfo);
  const { ModelLegalCartable, modelFilterLegalCartable } = useSelector(
    (state: any) => state.listLegalCartable
  );
  const { loadingAdjusterLicense } = useSelector(
    (state: any) => state.licenseAdjuster
  );
  const { loadingChargonLetter, loadingLicenseIssu } = useSelector(
    (state: any) => state.chargonLetter
  );
  const { loading } = useSelector((state: any) => state.informationFile);
  const { licenseIssuer } = useSelector((state: any) => state.licenseissuer);
  const [editCompanyBaseInfo, setEditCompanyBaseInfo] = useState(false);

  //نشان دادن مدال جزییات ارزیاب
  const fileDetailVisibleHandler = () => {
    setVisibleFile(true);
  };

  const sendSmsPanelVisibleHandler = () => {
    setVisibleSendSMSPanel(true);
  };

  //دانلود پروانه ارزیاب
  const dlLicenenceAdjusterHandler = () => {
    dispatch(downloadAdjusterLicence(oneAdjusterList.ApplicantId));
  };
  //دانلود نامه چارگون
  const dlLetterChargoonHandler = () => {
    dispatch(downloadChargonLetter(oneAdjusterList.ApplicantId));
  };

  //دانلود اطلاعات پروانه
  const downloadInformationFile = () => {
    dispatch(
      informationFileAction(adjusterType.legal, oneAdjusterList.ApplicantId)
    );
  };

  //صدور پروانه و نامه چارگون
  const licenseIssuHandler = () => {
    dispatch(
      licenseIssuOperation(
        //adjusterType.legal,
        oneAdjusterList.ApplicantId,
        () => {
          dispatch(fetchListLegalCartable(ModelLegalCartable));
        },
        () => dispatch(fechLicenseIssuer(oneAdjusterList.ApplicantId))
      )
    );
    dispatch(fechLicenseIssuer(oneAdjusterList.ApplicantId));
  };

  const indicatorHandler = () => {
    setIndicator(true);
  };

  //ویرایش اطلاعات حقوقی
  const editBaseInfoHandler = () => {
    dispatch(fetchLegalCompanyBaseInfo(oneAdjusterList.ApplicantId,()=>setEditCompanyBaseInfo(true)))
  };

  return (
    <div className="cardCartable">
      <div className="titleCard">
        <div className="titleCartable">
          <div className="trackingCode">
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
        </div>
        <div>
          {oneAdjusterList.ApplicantForbiddens.length !== 0 && (
            <Tooltip placement="topLeft" title="شاخص">
              <Button
                type="text"
                onClick={indicatorHandler}
                icon={<DashboardOutlined style={{fontSize:'24px',color:"#495579"}} />}
              />
            </Tooltip>
          )}
          {FindAccess(userAccessList.Adjusters_DocumentDetail) && (
            <Tooltip placement="topLeft" title="جزئیات پرونده ارزیاب">
              <Button
                type="text"
                onClick={fileDetailVisibleHandler}
                icon={<ProfileOutlined style={{fontSize:'24px',color:"#495579"}}  />}
              />
            </Tooltip>
          )}
          {FindAccess(userAccessList.Adjusters_SendSms) && (
            <Tooltip placement="topLeft" title="ارسال پیامک">
              <Button
                type="text"
                onClick={sendSmsPanelVisibleHandler}
                icon={<MessageOutlined  style={{fontSize:'24px',color:"#495579"}} />}
              />
            </Tooltip>
          )}
          {activeTabInbox == "1" && (
            <Tooltip placement="topLeft" title="ویرایش اطلاعات حقوقی">
              <Button
                type="text"
                onClick={editBaseInfoHandler}
                icon={<EditOutlined  style={{fontSize:'24px',color:"#495579"}} />}
                loading={oneAdjusterList.ApplicantId===loadingFetchBaseInfo}
              />
            </Tooltip>
          )}
        </div>
      </div>

      <div className="content">
        <Row>
          <Col xs={8} sm={6} md={5} lg={4} xl={3}>
            <h5 className="titleGray">کدملی</h5>
            <span>{oneAdjusterList.NationalCode}</span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={4} xl={3}>
            <h5 className="titleGray">نام شرکت</h5>
            <span>{oneAdjusterList?.CompanyName}</span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={4} xl={3}>
            <h5 className="titleGray">وضعیت</h5>
            <span>{oneAdjusterList.StateTitle}</span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={3} xl={3}>
            <h5 className="titleGray">تلفن همراه</h5>
            <span>{oneAdjusterList.Mobile}</span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={4} xl={4}>
            <h5 className="titleGray">دوره</h5>
            <span>{oneAdjusterList.CourseTitle} </span>
          </Col>
          {/* <Col xs={8} sm={6} md={5} lg={4} xl={3}>
            <h5 className="titleGray"> رشته تخصصی</h5>
            <span>------------- </span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={4} xl={3}>
            <h5 className="titleGray"> زیر رشته تخصصی</h5>
            <span>--------- </span>
          </Col> */}

          <Col xs={8} sm={6} md={5} lg={4} xl={3}>
            <h5 className="titleGray">کد ارزیاب</h5>
            <span>
              {oneAdjusterList.AdjusterCode == null
                ? "-----"
                : oneAdjusterList.AdjusterCode}
            </span>
          </Col>
          {/* <Col xs={8} sm={6} md={5} lg={4} xl={5}>
            <Button
              type="primary"
              onClick={fileDetailVisibleHandler}
              style={{ marginBottom: "5px" }}
            >
              جزئیات پرونده
            </Button>
            <Button type="primary" onClick={sendSmsPanelVisibleHandler}>
              ارسال پیامک
            </Button>
          </Col> */}
        </Row>
      </div>
      <div className="footer">
        <Row>
          <Col xs={24} sm={24} md={24} lg={8} xl={6}>
            <Row>
              <Col
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
              </Col>
              <Col
                xs={10}
                sm={8}
                md={6}
                lg={8}
                xl={8}
                className="paddingColTitle"
              >
                <h5 className="titleGray"> مدارک</h5>
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

          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div className="viewDocument">
              {FindAccess(userAccessList.Adjusters_DocumentInformation) && (
                <Col span={9} className="colCenter">
                  <h5 className="titleGray">اطلاعات پرونده</h5>
                  <Tooltip placement="topLeft" title="اطلاعات پرونده">
                    <Button
                      type="text"
                      icon={<FormBlue />}
                      onClick={downloadInformationFile}
                      loading={loading === oneAdjusterList.ApplicantId}
                    ></Button>
                  </Tooltip>
                </Col>
              )}
              {findAccessGetLicense(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_ViewLicense) && (
                  <Col span={9} className="colCenter">
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
              {findchargoonLetter(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_ViewChargoonLetter) && (
                  <Col span={12} className="colCenter">
                    <h5 className="titleGray">دریافت نامه چارگون</h5>
                    <Tooltip placement="topLeft" title="دریافت نامه چارگون">
                      <Button
                        type="text"
                        onClick={dlLetterChargoonHandler}
                        icon={<EmailB />}
                        loading={
                          oneAdjusterList.ApplicantId === loadingChargonLetter
                        }
                      ></Button>
                    </Tooltip>
                  </Col>
                )}
              {findIssueRegistrationCode(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_LicenseIssue) && (
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} className="colCenter">
                    <h5 className="titleGray">صدور کد ارزیابی</h5>
                    {oneAdjusterList.AdjusterCode === null ? (
                      <Tooltip placement="topLeft" title="صدور کد ارزیابی">
                        <Button
                          type="text"
                          onClick={licenseIssuHandler}
                          disabled={activeTabInbox === "1" ? false : true}
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
                        trigger="click"
                      >
                        <Button
                          type="text"
                          onClick={licenseIssuHandler}
                          disabled={activeTabInbox === "1" ? false : true}
                          // disabled={oneAdjusterList.AdjusterCode !== null}
                          loading={
                            loadingLicenseIssu === oneAdjusterList.ApplicantId
                          }
                          icon={<CodeAdjuster />}
                        ></Button>
                      </Popover>
                    )}
                  </Col>
                )}
            </div>
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
              fetchListLegalCartable(
                modelFilterLegalCartable == null
                  ? ModelLegalCartable
                  : modelFilterLegalCartable
              )
            );
          }}
          width={1000}
          centered
          destroyOnClose={visibleFile}
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
              isFromCartable={true}
              //applicantId props will be filled from more detail button in report table.
              //we are sending applicantID = 0 because there is no information for this item from here.
              // applicantId={0}
              admissionType={admissionType}
              isEvaluatorDesktopInformation={GetWay.admission}
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

export default LegalCard;
