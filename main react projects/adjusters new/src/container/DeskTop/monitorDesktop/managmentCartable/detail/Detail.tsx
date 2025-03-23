import React, { FC } from "react";
import { Row, Col, Collapse, Skeleton, Image } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import MoreDetail from "./MoreDetail";
import { ISelectedItemManagmentCartable } from "../../../../../shared/ulitities/Model/desktop/managmentCartable";

interface IDetailProps {
  selectedItemManagmentCartable: ISelectedItemManagmentCartable;
  activeTab: string;
}

const { Panel } = Collapse;

const Detail: FC<IDetailProps> = ({
  selectedItemManagmentCartable,
  activeTab,
}) => {
  const { personDetail } = useSelector(
    (state: any) => state?.listNaturalCartable
  );

  return (
    <>
      <Row>
        <Col xs={8} sm={8} md={4} lg={4} xl={4}>
          {personDetail?.Result?.ProfilePic == undefined ? (
            <Skeleton.Avatar active shape="square" size={80} />
          ) : (
              <Image
                width={80}
                style={{ borderRadius: "5px" }}
                src={`data:image/jpeg;base64,` + personDetail?.Result.ProfilePic}
                alt="profilePic"
              />
            )}
        </Col>
        <Col xs={16} sm={16} md={20} lg={20} xl={20}>
          <Row className="adjuster-info-container">
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">نام و نام خانوادگی:</h5>
              <span>
                {personDetail?.Result?.FirstName !== undefined ? (
                  <span>
                    {" "}
                    {personDetail?.Result.FirstName +
                      " " +
                      personDetail?.Result.FamilyName}
                  </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>

            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">کدملی:</h5>
              <span>
                {personDetail?.Result?.NationalCode !== undefined ? (
                  <span>{personDetail?.Result?.NationalCode}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">شماره شناسنامه:</h5>
              <span>
                {personDetail?.Result?.IdentificationNumber !== undefined ? (
                  <span>{personDetail?.Result?.IdentificationNumber}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>

            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">تاریخ تولد:</h5>
              {personDetail?.Result?.BirthDate !== undefined ? (
                <span className="fontStyle">
                  {moment(
                    personDetail?.Result?.BirthDate?.split("T")[0]
                  ).format("jYYYY-jM-jD")}
                </span>
              ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
            </Col>

            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">محل تولد:</h5>
              {
                personDetail?.Result?.BirthProvinceTitle !== undefined ? (
                  <span>{personDetail?.Result?.BirthProvinceTitle}</span>
                ) :
                  (
                    <Skeleton loading={true} active paragraph={false} />
                  )
              }

            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">نام پدر:</h5>
              {
                personDetail?.Result?.FatherName !== undefined ? (
                  <span>{personDetail?.Result?.FatherName}</span>
                ) :
                  (
                    <Skeleton loading={true} active paragraph={false} />
                  )
              }

            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">محل صدور:</h5>
              {
                personDetail?.Result?.IssueCityTitle !== undefined ?
                  (
                    <span>{personDetail?.Result?.IssueCityTitle}</span>
                  ) :
                  (
                    <Skeleton loading={true} active paragraph={false} />
                  )
              }

            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">وضعیت:</h5>
              <span>{personDetail?.Result?.StatusTitle}</span>
            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">کد ارزیاب:</h5>
              <span>
                {personDetail?.Result?.AdjusterCode == null
                  ? "-----"
                  : personDetail?.Result?.AdjusterCode}
              </span>
            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">نام کاربری:</h5>
              <span>{personDetail?.Result?.UserName}</span>
            </Col>
            {
              personDetail?.Result?.ExpirationDate !== null &&
              <Col xs={8} sm={6} md={8} lg={6} xl={6}>
                <h5 className="titleGray">تاریخ اعتبار پروانه:</h5>


                <span className="fontStyle">
                  {moment(
                    personDetail?.Result?.ExpirationDate?.split("T")[0]
                  ).format("jYYYY-jM-jD")}
                </span>
              </Col>
            }
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">رشته تخصصی:</h5>
              <span>
                { personDetail?.Result?.AdjustmentFieldTitle === null
                  ? "ندارد"
                  : personDetail?.Result?.AdjustmentFieldTitle}
              </span>
            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">استان:</h5>
              <span>{personDetail?.Result?.ProvinceTitle}</span>
            </Col>
            <Col xs={8} sm={6} md={8} lg={6} xl={6}>
              <h5 className="titleGray">شهر:</h5>
              <span>{personDetail?.Result?.CityTitle}</span>
            </Col>
          
         
          </Row>

        </Col>
      </Row>

      <Collapse
        defaultActiveKey={["1"]}
        bordered={false}
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
