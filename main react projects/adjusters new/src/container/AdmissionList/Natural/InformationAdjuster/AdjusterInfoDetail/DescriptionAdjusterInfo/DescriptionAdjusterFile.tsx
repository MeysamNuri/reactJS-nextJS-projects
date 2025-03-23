import React, { FC } from "react";
import moment from "jalali-moment";
import { Row, Col, Skeleton } from "antd";
import { IPersonalInfoDetail } from "../../../../../../shared/ulitities/Model/personalInfoDetail";

interface IDescriptionAdjuster {
  personalInfoDetail: IPersonalInfoDetail;
}

const DescriptionAdjusterFile: FC<IDescriptionAdjuster> = ({
  personalInfoDetail,
}) => {
  return (
    <div className="descriptionAdjusterFile">
      <Row className="linHeightRow">
        <Col span={6}>
          <h5 className="titleCol">تلفن :</h5>
          {personalInfoDetail?.Telephone !== undefined ? (
            <span className="fontStyle">{personalInfoDetail?.Telephone}</span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">تلفن همراه :</h5>
          {personalInfoDetail?.Mobile !== undefined ? (
            <span className="fontStyle">{personalInfoDetail?.Mobile} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">پست الکترونیکی:</h5>
          {personalInfoDetail?.Email !== undefined ? (
            <span className="fontStyle"> {personalInfoDetail?.Email===null?("ندارد"):personalInfoDetail?.Email} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">وضعیت تاهل:</h5>
          {personalInfoDetail?.MaritalStatusTitle !== undefined ? (
            <span className="fontStyle">
              {" "}
              {personalInfoDetail?.MaritalStatusTitle}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
      <Row  className="linHeightRow" >
        <Col span={6}>
          <h5 className="titleCol">دین:</h5>
          {personalInfoDetail?.ReligionTitle !== undefined ? (
            <span className="fontStyle">
              {personalInfoDetail?.ReligionTitle}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">مذهب :</h5>
          {personalInfoDetail?.DenominationTitle !== undefined ? (
            <span className="fontStyle">
              {personalInfoDetail?.DenominationTitle === null
                ? "ندارد"
                : personalInfoDetail?.DenominationTitle}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">وضعیت خدمت:</h5>
          {personalInfoDetail?.MilitaryStatusTitle !== undefined ? (
            <span className="fontStyle">
              {personalInfoDetail?.MilitaryStatusTitle === null
                ? "ندارد"
                : personalInfoDetail?.MilitaryStatusTitle}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">زمینه تخصصی:</h5>
          {personalInfoDetail?.AdjustmentFieldTitle !== undefined ? (
            <span className="fontStyle">
              {" "}
              {personalInfoDetail?.AdjustmentFieldTitle}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
      <Row  className="linHeightRow">
        <Col span={6}>
          <h5 className="titleCol">نام دانشگاه:</h5>
          {personalInfoDetail?.University !== undefined ? (
            <span className="fontStyle">
              {" "}
              {personalInfoDetail?.University}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">مدرک تحصیلی:</h5>
          {personalInfoDetail?.AcademicDegreeTitle !== undefined ? (
            <span className="fontStyle">
              {" "}
              {personalInfoDetail?.AcademicDegreeTitle}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">تاریخ فارغ التحصیلی:</h5>
          {personalInfoDetail?.GraduationDate !== undefined ? (
            <span className="fontStyle">
              {moment(personalInfoDetail?.GraduationDate?.split("T")[0]).format(
                "jYYYY-jM-jD"
              )}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={6}>
          <h5 className="titleCol">آدرس:</h5>
          {personalInfoDetail?.Address !== undefined ? (
            <span className="fontStyle  classessAddress" > {personalInfoDetail?.Address} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DescriptionAdjusterFile;
