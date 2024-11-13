import React from "react";
import { Row, Col, Skeleton } from "antd";
import { useSelector } from "react-redux";

const DescriptionAdjusterFile=() =>  {
  const {personDetail} = useSelector(
    (state: any) => state?.listNaturalCartable
  );

  return (
    <div className="descriptionAdjusterFile">
      <Row className="linHeightRow">
        <Col span={8}>
          <h5 className="titleCol">تلفن :</h5>
          {personDetail?.Result?.Telephone !== undefined ? (
            <span className="fontStyle">{personDetail?.Result?.Telephone}</span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={8}>
          <h5 className="titleCol">تلفن همراه :</h5>
          {personDetail?.Result?.Mobile !== undefined ? (
            <span className="fontStyle">{personDetail?.Result?.Mobile} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={8}>
          <h5 className="titleCol">پست الکترونیکی:</h5>
          {personDetail?.Result?.Email !== undefined ? (
            <span className="fontStyle"> {personDetail?.Result?.Email===null?("ندارد"):personDetail?.Result?.Email} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
     
      <Row  className="linHeightRow">
        <Col span={8}>
          <h5 className="titleCol">مدرک تحصیلی</h5>
          {personDetail?.Result?.AcademicDegreeTitle !== undefined ? (
            <span className="fontStyle">
              {" "}
              {personDetail?.Result?.AcademicDegreeTitle}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
       
        <Col span={16}>
          <h5 className="titleCol">آدرس:</h5>
          {personDetail?.Result?.Address !== undefined ? (
            <span className="fontStyle  classessAddress" > {personDetail?.Result?.Address} </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DescriptionAdjusterFile;
