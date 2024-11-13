import React, { FC } from "react";
import moment from "jalali-moment";
import { Row, Col, Skeleton } from "antd";
import { IPersonalInfoDetail } from "../../../../../../shared/ulitities/Model/personalInfoDetail";

interface DescriptionAdjuster {
  personalInfoDetail: IPersonalInfoDetail;
}

const DescriptionAdjusterFile: FC<DescriptionAdjuster> = ({
  personalInfoDetail,
}) => {
  return (
    <div>
      <Row  className="linHeightRow" >
        <Col span={8}>
          <h5 className="titleCol">تلفن :</h5>
          {personalInfoDetail?.Telephone !== undefined ? (
            <span>{personalInfoDetail?.Telephone}</span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={8}>
          <h5 className="titleCol">تلفن همراه :</h5>
          {personalInfoDetail?.Mobile !== undefined ? (
            <span>{personalInfoDetail?.Mobile} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={8}>
          <h5 className="titleCol">پست الکترونیکی:</h5>
          {personalInfoDetail?.Email !== undefined ? (
            <span> {personalInfoDetail?.Email} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
      <Row className="linHeightRow"  >
        <Col span={8}>
          <h5 className="titleCol">نام دانشگاه:</h5>
          {personalInfoDetail?.University !== undefined ? (
            <span> {personalInfoDetail?.University} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        {/* <Col span={8}>
          <h5 className="titleCol">تاریخ فارغ التحصیلی:</h5>
          {personalInfoDetail?.GraduationDate !== undefined ? (
            <span>
              {moment(personalInfoDetail?.GraduationDate?.split("T")[0]).format(
                "jYYYY-jM-jD"
              )}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col> */}
        <Col span={8}>
          <h5 className="titleCol">آدرس:</h5>
          {personalInfoDetail?.Address !== undefined ? (
            <span> {personalInfoDetail?.Address} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DescriptionAdjusterFile;
