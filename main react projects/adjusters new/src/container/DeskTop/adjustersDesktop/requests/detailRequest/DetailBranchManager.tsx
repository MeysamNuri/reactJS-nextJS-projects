import React, { FC } from "react";
import { Row, Col, Skeleton, Collapse } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import TerminateActionExpert from "./TerminateActionExpert";
import TerminateActionBoss from "./TerminateActionBoss";
import DownloadFiles from "../../../downloadFiles";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
interface IDetailBranchMangerProps {
  selectedRequest: any;
  detailRequestGetWay?: any;
  modelExpertGrid?: any;
  closeModal?: () => void
}
const DetailBranchManger: FC<IDetailBranchMangerProps> = ({
  selectedRequest,
  detailRequestGetWay,
  modelExpertGrid,
  closeModal
}) => {
  const { resultId } = useSelector((state: any) => state.request);
  const { Panel } = Collapse;
  return (
    <div>
      <h4 style={{ fontWeight: "bolder" }}>اطلاعات درخواست دهنده</h4>
      <Row gutter={16}>

        <Col className="gutter-row" span={6}>
          <div className="titles">درخواست دهنده</div>
          <span className="contentColumns">
            {resultId?.Result?.ApplicantPersonalInfo?.Person?.FullName !==
              undefined ? (
                <span>
                  {" "}
                  {resultId?.Result?.ApplicantPersonalInfo?.Person?.FullName}
                </span>
              ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">کد ارزیابی</div>
          <span className="contentColumns">
            {resultId?.Result?.ApplicantPersonalInfo?.Applicant?.AdjusterCode !==
              undefined ? (
                <span>
                  {" "}
                  {resultId?.Result?.ApplicantPersonalInfo?.Applicant?.AdjusterCode}
                </span>
              ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">کد ملی</div>
          <span className="contentColumns">
            {resultId?.Result?.ApplicantPersonalInfo?.Person
              ?.NationalCodeOut !== undefined ? (
                <span>
                  {" "}
                  {
                    resultId?.Result?.ApplicantPersonalInfo?.Person
                      ?.NationalCodeOut
                  }
                </span>
              ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>

        <Col className="gutter-row" span={6}>
          <div className="titles">تاریخ تولد</div>
          <span className="contentColumns">
            {resultId !== undefined ? (
              <span>
                {" "}
                {moment(
                  resultId?.Result?.ApplicantPersonalInfo?.Person?.BirthDate?.split(
                    "T"
                  )[0]
                ).format("jYYYY-jMM-jDD")}
              </span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={4}>
          <div className="titles">تلفن ثابت</div>
          <span className="contentColumns">
            {resultId?.Result?.ApplicantPersonalInfo?.Telephone !==
              undefined ? (
                <span> {resultId?.Result?.ApplicantPersonalInfo?.Telephone}</span>
              ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">تلفن همراه</div>
          <span className="contentColumns">
            {resultId?.Result?.ApplicantPersonalInfo?.Mobile !== undefined ? (
              <span> {resultId?.Result?.ApplicantPersonalInfo?.Mobile}</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titles">آدرس</div>
          <span className="contentColumns">
            {resultId !== undefined ? (
              <span> {resultId?.Result?.ApplicantPersonalInfo?.Address}</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
      </Row>
      <Collapse defaultActiveKey={["1", "2", "3"]}  >
        <Panel header="اطلاعات درخواست تغییر مدیر شعبه" key="1">


          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="titles">{!selectedRequest?.ChangeBranchManager?.IsLegal ? ("نام و نام خانوادگی") : ("نام شرکت")} </div>
              <span className="contentColumns">
                {selectedRequest?.ChangeBranchManager?.FullName !==
                  undefined ? (
                    <span>
                      {" "}
                      {selectedRequest?.ChangeBranchManager?.FullName}
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">{!selectedRequest?.ChangeBranchManager?.IsLegal ? ("کد ملی") : ("شناسه ملی")} </div>
              <span className="contentColumns">
                {selectedRequest?.ChangeBranchManager?.NationalCode !==
                  undefined ? (
                    <span>
                      {" "}
                      {selectedRequest?.ChangeBranchManager?.NationalCode}
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            {
              !selectedRequest?.ChangeBranchManager?.IsLegal &&
              <Col className="gutter-row" span={6}>
                <div className="titles">تاریخ تولد</div>
                <span className="contentColumns">
                  {selectedRequest?.ChangeBranchManager?.BirthDate !== undefined ? (
                    <span>
                      {" "}
                      {moment(
                        selectedRequest?.ChangeBranchManager?.BirthDate?.split(
                          "T"
                        )[0]
                      ).format("jYYYY-jMM-jDD")}
                    </span>
                  ) : (
                      <Skeleton loading={true} active paragraph={false} />
                    )}
                </span>
              </Col>
            }

            <Col className="gutter-row" span={6}>
              <div className="titles">تاریخ انتصاب</div>
              <span className="contentColumns">
                {selectedRequest?.ChangeBranchManager?.StartDate !== undefined ? (
                  <span>
                    {" "}
                    {moment(
                      selectedRequest?.ChangeBranchManager?.StartDate?.split(
                        "T"
                      )[0]
                    ).format("jYYYY-jMM-jDD")}
                  </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>

          </Row>

          <Row gutter={16} style={{ marginTop: "20px" }}>

            <Col className="gutter-row" span={24}>
              <div className="titles">محل فعالیت</div>
              <span className="contentColumns">
                {selectedRequest?.ChangeBranchManager?.ApplicantWorkLocationInfo !== undefined ? (
                  <span>
                    {" "}
                    {selectedRequest?.ChangeBranchManager?.ApplicantWorkLocationInfo?.Province?.Title + " " +
                      selectedRequest?.ChangeBranchManager?.ApplicantWorkLocationInfo?.City?.Title + " " +
                      (selectedRequest?.ChangeBranchManager?.ApplicantWorkLocationInfo?.Address ? selectedRequest?.ChangeBranchManager?.ApplicantWorkLocationInfo?.Address : "")}
                  </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>

          </Row>

        </Panel>
      </Collapse>
      <br />

      <Row>

        <Col className="gutter-row" span={24}>
          <div className="titles">توضیحات</div>
          <span className="contentColumns" style={{ backgroundColor: "rgb(254 249 249)", padding: "15px" }}>
            {selectedRequest?.Description !== undefined ? (
              <span> {selectedRequest?.Description ?? '-'}</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
      </Row>
      <br />
      <DownloadFiles />
      {detailRequestGetWay === DetailRequestGetWay.Expert && (
        <TerminateActionExpert
          selectedRequest={selectedRequest}
          modelExpertGrid={modelExpertGrid}
          closeModal={closeModal}
        />
      )}
      {detailRequestGetWay === DetailRequestGetWay.Boss && (
        <TerminateActionBoss
          selectedRequest={selectedRequest}
          modelExpertGrid={modelExpertGrid}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default DetailBranchManger;
