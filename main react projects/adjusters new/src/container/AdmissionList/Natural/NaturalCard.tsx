import React, { useState, FC, useEffect } from "react";
import {
  Row,
  Col,
  Modal,
  ConfigProvider,
  Tooltip,
  Button,
  Menu,
  Popover,
} from "antd";
import {MessageOutlined ,ProfileOutlined ,DashboardOutlined,EditOutlined }  from '@ant-design/icons';
import SubMenu from "antd/lib/menu/SubMenu";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { FindAccess } from "sanhab-components-library";
import SendSmsPanel from "../sendSmsPanel/SendSmsPanel";
import Indicator from "../Indicator";
import AdjusterInfoDetail from "./InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import {
  downloadAdjusterLicence,
  downloadChargonLetter,
  informationFileAction,
  fetchListNaturalCartable,
  licenseIssuOperation,
  fechLicenseIssuer,
  fetchNaturalCompanyInfo,
} from "../../../redux/actions";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { licenseTypes } from "../../../shared/ulitities/Enums/licenseTypes ";
import {
  findAccessGetLicense,
  findchargoonLetter,
  findIssueRegistrationCode,
} from "../../../utils/utils";
import EditCompanyInfo from './InformationAdjuster/EditCompanyInfo'
import { ReactComponent as FormBlue } from "../../../assets/images/formBlue.svg";
import { ReactComponent as EmailB } from "../../../assets/images/email-blue.svg";
import { ReactComponent as Certificate } from "../../../assets/images/web-certificate-blue.svg";
import { ReactComponent as CodeAdjuster } from "../../../assets/images/codeAdjuster.svg";
import { ReactComponent as Notification } from "../../../assets/images/notification.svg";
import { SUBMIT_CHEKED } from "../../../constant/cartableActionTypes";
import Message from "../../../assets/images/icons8newmessage.png";
import Detail from "../../../assets/images/icons8moredetails48.png";
import IndicatorImg from "../../../assets/images/indicator.png";

interface INaturalCardProps {
  oneAdjusterList: IAneAdjusterList;
  activeTabInbox: string;
}

const NaturalCard: FC<INaturalCardProps> = ({
  oneAdjusterList,
  activeTabInbox,
}) => {
  const dispatch = useDispatch();
  const [visibleFile, setVisibleFile] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [visibleSendSMSPanel, setVisibleSendSMSPanel] = useState(false);
  const [visibleEditInfoModal, setVisibleEditInfoModal] = useState(false);
  const { loadingChargonLetter, loadingLicenseIssu } = useSelector(
    (state: any) => state.chargonLetter
  );
  const { licenseIssuer } = useSelector((state: any) => state?.licenseissuer);

  const {
    modelCartable,
    modelFilterNaturalCartable,
    modelFilterNaturalCartableOutBox,
    submitCheked,
  } = useSelector((state: any) => state.listNaturalCartable);
  const {loadingFetchBaseInfo } = useSelector((state: any) => state?.companyBaseInfo);
  const { loadingAdjusterLicense } = useSelector(
    (state: any) => state.licenseAdjuster
  );
  const { loading } = useSelector((state: any) => state.informationFile);

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
  //نشان دادن مدال ویرایش اطلاعات شخص حقیقی
  const editBaseInfoHandler=()=>{
    dispatch(fetchNaturalCompanyInfo(oneAdjusterList.ApplicantId,()=>setVisibleEditInfoModal(true)))
  }
  const sendSmsPanelVisibleHandler = () => {
    setVisibleSendSMSPanel(true);
  };
  //دانلود پروانه ارزیاب
  const dlLicenenceAdjusterHandler = () => {
    dispatch(downloadAdjusterLicence(oneAdjusterList.ApplicantId));
  };

  //دانلود نامه چارگون
  const dlLetterChargoonHandler = (oneAdjusterList: any) => {
    dispatch(downloadChargonLetter(oneAdjusterList.ApplicantId));
  };

  //دانلود  اطلاعات پروانه
  const downloadInformationFile = () => {
    dispatch(
      informationFileAction(adjusterType.natural, oneAdjusterList.ApplicantId)
    );
  };

  //صدور کد ارزیابی
  const licenseIssuHandler = () => {
    dispatch(
      licenseIssuOperation(
        // adjusterType.natural,
        oneAdjusterList.ApplicantId,
        () => {
          dispatch(fetchListNaturalCartable(modelCartable, () => {}));
        },
        () => dispatch(fechLicenseIssuer(oneAdjusterList.ApplicantId))
      )
    );
    dispatch(fechLicenseIssuer(oneAdjusterList.ApplicantId));
  };

  // //صادر کننده کد ارزیاب
  // useEffect(() => {
  //   dispatch(fechLicenseIssuer(oneAdjusterList.ApplicantId));
  // }, [oneAdjusterList.AdjusterCode]);

  useEffect(() => {
    dispatch({ type: SUBMIT_CHEKED, payload: false });
  }, []);

  const indicatorHandler = () => {
    setIndicator(true);
  };

  return (
    <div className="cardCartable">
      <div
        className="titleCard  titleNatural"
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
            <p >
              <span> کد رهگیری: </span>
              <span>{oneAdjusterList.RegistrationCode}</span>
            </p>
          </div>
          {oneAdjusterList.LicenseType === licenseTypes.SecondLicense && (
            <span className="licenseType">پروانه دوم</span>
          )}
          {oneAdjusterList.Description !== "" &&
            oneAdjusterList.Description !== null && (
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
                icon={<DashboardOutlined  style={{fontSize:'24px',color:"#495579"}} />}
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
           <Tooltip placement="topLeft" title="ویرایش اطلاعات حقیقی">
              <Button
                type="text"
                onClick={editBaseInfoHandler}
                icon={<EditOutlined  style={{fontSize:'24px',color:"#495579"}} />}
                loading={oneAdjusterList.ApplicantId===loadingFetchBaseInfo}
              />
            </Tooltip>
        </div>
      </div>

      <div className="content">
        <Row>
          <Col xs={8} sm={6} md={5} lg={3} xl={2}>
            <h5 className="titleGray">کدملی</h5>
            <span>{oneAdjusterList.NationalCode}</span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={3} xl={2}>
            <h5 className="titleGray">تلفن همراه</h5>
            <span>{oneAdjusterList.Mobile}</span>
          </Col>
          <Col xs={8} sm={6} md={5} lg={3} xl={2}>
            <h5 className="titleGray">وضعیت</h5>
            <span>{oneAdjusterList.StateTitle}</span>
          </Col>

          <Col xs={8} sm={6} md={5} lg={3} xl={4}>
            <h5 className="titleGray">رشته تخصصی</h5>
            <span>
              {oneAdjusterList.AdjustmentFieldTitle === null
                ? "ندارد"
                : oneAdjusterList.AdjustmentFieldTitle}
            </span>
          </Col>
          <Col xs={9} sm={7} md={6} lg={5} xl={3}>
            {subFeilds?.length === 0 ? (
              <>
                <h5 className="titleGray">زیر رشته تخصصی</h5>
                <span>------------------</span>
              </>
            ) : (
              <Menu
                mode="horizontal"
                style={{
                  color: "#7987a1",
                  marginTop: "-13px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  width: "140px",
                }}
              >
                <SubMenu
                  key={oneAdjusterList.ApplicantId}
                  title="زیر رشته تخصصی"
                >
                  {subFeilds?.map((item: any) => (
                    <Menu.Item key={item.key}>{item.Title}</Menu.Item>
                  ))}
                </SubMenu>
              </Menu>
            )}
          </Col>
          <Col xs={8} sm={6} md={5} lg={3} xl={2}>
            <h5 className="titleGray">کد ارزیاب</h5>
            <span>
              {oneAdjusterList.AdjusterCode == null
                ? "-----"
                : oneAdjusterList.AdjusterCode}
            </span>
          </Col>
          <Col xs={8} sm={8} md={8} lg={4} xl={8}>
            <h5 className="titleGray">دوره</h5>
            <span>{oneAdjusterList.CourseTitle} </span>
          </Col>
        </Row>
      </div>
      <div className="footer">
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <Row>
              <Col xs={10} sm={8} md={8} lg={8} xl={9}>
                <div className="text">
                  <h5 className="titleGray">زمان مصاحبه</h5>
                  <p>
                    {oneAdjusterList?.InterviewTime !== null
                      ? oneAdjusterList?.InterviewTime?.split("T")[1].split(
                          ":"
                        )[0] +
                        ":" +
                        oneAdjusterList?.InterviewTime?.split("T")[1].split(
                          ":"
                        )[1] +
                        "_" +
                        moment(
                          oneAdjusterList?.InterviewTime?.split("T")[0]
                        ).format("jYYYY-jMM-jDD")
                      : "-----"}
                  </p>
                </div>
              </Col>
              <Col xs={10} sm={8} md={6} lg={8} xl={3}>
                <div className="text">
                  <h5 className="titleGray">نمره</h5>
                  <p>
                    {oneAdjusterList?.Average === 0
                      ? "-----"
                      : oneAdjusterList?.Average?.toPrecision(4)}
                  </p>
                </div>
              </Col>
              <Col xs={10} sm={8} md={10} lg={8} xl={12}>
                {oneAdjusterList?.Interviewers?.length === 0 ? (
                  <>
                    <h5 className="titleGray">نمایش مصاحبه کنندگان</h5>
                    <span>------------------</span>
                  </>
                ) : (
                  <Menu
                    mode="horizontal"
                    style={{
                      color: "#7987a1",
                      fontSize: "12px",
                      lineHeight: "25px",
                      width: "200px",
                    }}
                  >
                    <SubMenu title="نمایش مصاحبه کنندگان" className="titleGray">
                      {oneAdjusterList?.Interviewers?.map(
                        (item: any, index: number) => (
                          <Menu.Item key={index}>{item}</Menu.Item>
                        )
                      )}
                    </SubMenu>
                  </Menu>
                )}
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={24} lg={8} xl={5}>
            <Row>
              <Col xs={10} sm={8} md={12} lg={11} xl={11}>
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
              <Col xs={10} sm={8} md={12} lg={8} xl={12}>
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

          <Col xs={8} sm={8} md={8} lg={8} xl={10}>
            <div className="viewDocument">
              {findAccessGetLicense(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_ViewLicense) && (
                  <Col xs={8} sm={8} md={8} lg={8} xl={6} className="colCenter">
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
              {findIssueRegistrationCode(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_LicenseIssue) && (
                  <Col xs={8} sm={8} md={8} lg={8} xl={5} className="colCenter">
                    <h5 className="titleGray">صدور کد ارزیابی</h5>
                    {oneAdjusterList.AdjusterCode == null ? (
                      <Tooltip placement="topLeft" title="صدور کد ارزیابی">
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

              {findchargoonLetter(oneAdjusterList.AccessList) &&
                FindAccess(userAccessList.Adjusters_ViewChargoonLetter) && (
                  <Col xs={8} sm={8} md={8} lg={8} xl={6} className="colCenter">
                    <h5 className="titleGray">دریافت نامه چارگون</h5>
                    <Tooltip placement="topLeft" title="دریافت نامه چارگون">
                      <Button
                        type="text"
                        onClick={() => dlLetterChargoonHandler(oneAdjusterList)}
                        icon={<EmailB />}
                        loading={
                          oneAdjusterList.ApplicantId === loadingChargonLetter
                        }
                      ></Button>
                    </Tooltip>
                  </Col>
                )}
              {FindAccess(userAccessList.Adjusters_DocumentInformation) && (
                <Col xs={24} sm={24} md={8} lg={8} xl={6} className="colCenter">
                  <h5 className="titleGray">اطلاعات پرونده</h5>
                  <Tooltip placement="topLeft" title="اطلاعات پرونده">
                    <Button
                      type="text"
                      onClick={downloadInformationFile}
                      icon={<FormBlue />}
                      loading={loading === oneAdjusterList.ApplicantId}
                    ></Button>
                  </Tooltip>
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
          onCancel={() => {
            setVisibleFile(false);
            submitCheked &&
              dispatch(
                fetchListNaturalCartable(
                  activeTabInbox === "1" && modelFilterNaturalCartable === null
                    ? modelCartable
                    : modelFilterNaturalCartable ||
                      (activeTabInbox === "2" &&
                        modelFilterNaturalCartableOutBox === null)
                    ? modelCartable
                    : modelFilterNaturalCartableOutBox,
                  () => {}
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

export default NaturalCard;
