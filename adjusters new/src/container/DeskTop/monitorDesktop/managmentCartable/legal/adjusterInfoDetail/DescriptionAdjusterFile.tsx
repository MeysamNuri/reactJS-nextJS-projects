import React from "react";
import { Row, Col, Skeleton } from "antd";
import { useSelector } from "react-redux";


const DescriptionAdjusterFile= () => {
  const { personalInfoLegalDetail } = useSelector(
    (state: any) => state?.listLegalCartable
  );

  return (
    <div className="descriptionAdjusterFile">
      <Row className="linHeightRow">
        <Col span={8}>
          <h5 className="titleCol">تلفن :</h5>
          {personalInfoLegalDetail?.Result?.Telephone !== undefined ? (
            <span className="fontStyle">
              {personalInfoLegalDetail?.Result?.Telephone}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={8}>
          <h5 className="titleCol">تلفن همراه :</h5>
          {personalInfoLegalDetail?.Result?.Mobile !== undefined ? (
            <span className="fontStyle">
              {personalInfoLegalDetail?.Result?.Mobile}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
        <Col span={8}>
          <h5 className="titleCol">پست الکترونیکی:</h5>
          {personalInfoLegalDetail?.Result?.Email !== undefined ? (
            <span className="fontStyle">
              {" "}
              {personalInfoLegalDetail?.Result?.Email === null
                ? "ندارد"
                : personalInfoLegalDetail?.Result?.Email}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
      <Row className="linHeightRow">
        {/* <Col span={6}>
          <h5 className="titleCol">مدرک تحصیلی</h5>
          {personalInfoLegalDetail?.Result?.AcademicDegreeTitle !==
          undefined ? (
            <span className="fontStyle">
              {" "}
              {personalInfoLegalDetail?.Result?.AcademicDegreeTitle}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col> */}

        <Col span={18}>
          <h5 className="titleCol">آدرس:</h5>
          {personalInfoLegalDetail?.Result?.Address !== undefined ? (
            <span className="fontStyle  classessAddress">
              {" "}
              {personalInfoLegalDetail?.Result?.Address}{" "}
            </span>
          ) : (
            <Skeleton loading={true} active paragraph={false} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DescriptionAdjusterFile;
