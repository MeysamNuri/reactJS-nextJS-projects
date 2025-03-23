import React, { FC } from "react";
import { Row, Col, Skeleton } from "antd";
import { IViewContractEvaluation } from "../../../../shared/ulitities/Model/desktop/contractEvaluation";

interface IDetailWorkLocationProps {
  selectedContractEvaluation: IViewContractEvaluation;
}
const DetailContractEvaluation: FC<IDetailWorkLocationProps> = ({
  selectedContractEvaluation,
}) => {
  return (
    <div>
      {/* <h2 className="requestType">{selectedRequest.requestType}</h2> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <div className="titleGray">روش محاسبه حق الزحمه:</div>
          <span className="contentColumn">
            {selectedContractEvaluation?.CalculationRemunerationMethod !==
            undefined ? (
              <span>
                {" "}
                {selectedContractEvaluation?.CalculationRemunerationMethod}
              </span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titleGray">نحوه ارائه و ارسال گزارش :</div>
          <span className="contentColumn">
            {selectedContractEvaluation?.ReportingMethod !== undefined ? (
              <span> {selectedContractEvaluation?.ReportingMethod}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titleGray">حدود اختیارات ارزیاب:</div>
          <span className="contentColumn">
            {selectedContractEvaluation?.AuthorityLevel !== undefined ? (
              <span> {selectedContractEvaluation?.AuthorityLevel}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={8}>
          <div className="titleGray">شرایط فسخ قرارداد:</div>
          <span className="contentColumn">
            {" "}
            {selectedContractEvaluation?.TerminatingCondition}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titleGray">کد سیستمی:</div>
          <span className="contentColumn">
            {selectedContractEvaluation?.SystemCode !== undefined ? (
              <span> {selectedContractEvaluation?.SystemCode}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default DetailContractEvaluation;
