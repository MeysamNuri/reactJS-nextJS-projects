import React, { FC } from "react";
import { Row, Col, Collapse } from "antd";
import MoreDetail from "./MoreDetail";
import { useDispatch, useSelector } from "react-redux";
interface IDetailProps {
  selectedItemManagmentCartable: any;
  activeTab: string;
}

const { Panel } = Collapse;

const Detail: FC<IDetailProps> = ({
  selectedItemManagmentCartable,
  activeTab,
}) => {
  const {personalInfoLegalDetail,loadingPersonalInfoLegal} = useSelector(
    (state: any) => state.listLegalCartable
  );

  return (
    <>
      <Row className="cartable-legal-info">
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">نوع موسسه / شرکت:</h5>
          <span>{personalInfoLegalDetail?.Result?.CompanyTypeDescription}</span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">نام موسسه / شرکت:</h5>
          <span>{personalInfoLegalDetail?.Result?.ApplicantPersonalInfo?.Applicant?.AdjustmentCompanyInfoTitle}</span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">نام و نام خانوادگی:</h5>
          <span>
            {personalInfoLegalDetail?.Result?.ApplicantPersonalInfo?.Person?.FullName}
          </span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">کدملی:</h5>
          <span>{personalInfoLegalDetail?.Result?.ApplicantPersonalInfo?.Person?.NationalCode}</span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">شماره شناسنامه:</h5>
          <span>{personalInfoLegalDetail?.Result?.IdentificationNumber}</span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">تلفن همراه</h5>
          <span>{personalInfoLegalDetail?.Result?.ApplicantPersonalInfo?.Mobile} </span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">وضعیت</h5>
          <span>{personalInfoLegalDetail?.Result?.ApplicantPersonalInfo?.Applicant?.StatusTitle}</span>
        </Col>

        {/* <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">تلفن همراه</h5>
          <span>{selectedItemManagmentCartable.Mobile}</span>
        </Col> */}
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">کد ارزیاب</h5>
          <span>
            {personalInfoLegalDetail?.Result?.ApplicantPersonalInfo?.Applicant.AdjusterCode == null
              ? "-----"
              : personalInfoLegalDetail?.Result?.ApplicantPersonalInfo?.Applicant.AdjusterCode}
          </span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">نام ارزیابی</h5>
          <span>
            {personalInfoLegalDetail?.Result?.UserName== null
              ? "-----"
              : personalInfoLegalDetail?.Result?.UserName}
          </span>
        </Col>
        <Col xs={8} sm={6} md={5} lg={3} xl={6}>
          <h5 className="titleGray">رشته تخصصی</h5>
          <span>
            {personalInfoLegalDetail?.Result?.AdjustmentFieldTitle === null
              ? "ندارد"
              : personalInfoLegalDetail?.Result?.AdjustmentFieldTitle}
          </span>
        </Col>
      </Row>
     
      <Collapse
        defaultActiveKey={["1"]}
        bordered={true} 
        className="collapse-panel-custom"
        style={{ marginTop: "20px" }} 
      >
        <Panel header="نمایش اطلاعات بیشتر" key="1">
          <MoreDetail
            selectedItemManagmentCartable={selectedItemManagmentCartable}
            activeTab={activeTab}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default Detail;
