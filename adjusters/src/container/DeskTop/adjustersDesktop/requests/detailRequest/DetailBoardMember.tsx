import React, { FC } from "react";
import { Row, Col, Skeleton } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import TerminateActionExpert from "./TerminateActionExpert";
import TerminateActionBoss from "./TerminateActionBoss";
import DownloadFiles from "../../../downloadFiles";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
interface IDetailBoardMemberProps {
  selectedRequest: any;
  detailRequestGetWay?: any;
  modelExpertGrid?: any;
  closeModal?: () => void
}
const DetailBoardMember: FC<IDetailBoardMemberProps> = ({
  selectedRequest,
  detailRequestGetWay,
  modelExpertGrid,
  closeModal
}) => {
  // const detailBoardMember = useSelector(
  //   (state: any) => state.boardMember.detailBoardMember?.Result
  // );
  const { resultId } = useSelector((state: any) => state.request);
  const { baseInfo } = useSelector((state: any) => state.baseData);



  return (
    <div>
      <Row gutter={16}>
        {/* <Col className="gutter-row" span={3}>
          <img
            src={
              resultId?.Result?.ApplicantPersonalInfo?.ProfilePic == null
                ? "ندارد"
                : `data:${resultId?.Result?.ApplicantPersonalInfo?.ContentType};base64,` +
                  resultId?.Result?.ApplicantPersonalInfo?.ProfilePic
            }
            className="profilePic"
            alt="profilePic"
          />
        </Col> */}


        <Col className="gutter-row" span={6}>
          <div className="titles">نام و نام خانوادگی</div>
          <span className="contentColumns">
            {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Person?.FullName !==
              undefined ? (
                <span>
                  {" "}
                  {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Person?.FullName}
                </span>
              ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">کد ملی</div>
          <span className="contentColumns">
            {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Person?.NationalCode !==
              undefined ? (
                <span>
                  {" "}
                  {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Person?.NationalCode}
                </span>
              ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">سمت</div>
          <span className="contentColumns">
            {resultId?.Result?.BoardMember?.PostIdDescription !== undefined ? (
              <span> {resultId?.Result?.BoardMember?.PostIdDescription}</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">محل فعالیت</div>
          <span className="contentColumns">
            {resultId?.Result?.BoardMember?.WorkLocationInfo?.Province?.Title !== undefined ? (
              <span> {resultId?.Result?.BoardMember?.WorkLocationInfo?.Province?.Title + "-"+
              resultId?.Result?.BoardMember?.WorkLocationInfo?.Province?.CenterCityName
              +"-"+resultId?.Result?.BoardMember?.WorkLocationInfo?.City?.Title
              }</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">کد ارزیابی</div>
          <span className="contentColumns">
            {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Applicant?.AdjusterCode !== undefined ? (
              <span> {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Applicant?.AdjusterCode}</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titles">تاریخ انتصاب</div>
          <span className="contentColumns">
            {moment(
              resultId?.Result?.BoardMember?.StartDate.split("T")[0]
            ).format("jYYYY-jM-jD")}
          </span>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>


        <Col className="gutter-row" span={12}>
          <div className="titles">آدرس</div>
          <span className="contentColumns">
            {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Address !== undefined ? (
              <span> {resultId?.Result?.BoardMember?.ApplicantPersonalInfo?.Address}</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>

        <Col className="gutter-row" span={12}>
          <div className="titles">توضیحات</div>
          <span className="contentColumns">
            {resultId?.Result?.Description !== undefined ? (
              <span> {resultId?.Result?.Description}</span>
            ) : (
                <Skeleton loading={true} active paragraph={false} />
              )}
          </span>
        </Col>
      </Row>
      <br />

      {selectedRequest.responseUser && (
        <>
          <h2 className="requestInformation">اطلاعات درخواست</h2>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col className="gutter-row" span={8}>
              <div className="titles">کاربر پاسخ دهنده</div>
              <span className="contentColumns">
                {selectedRequest?.Email !== undefined ? (
                  <span> {selectedRequest?.Email}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="titles">تاریخ پاسخ</div>
              <span className="contentColumns">
                {selectedRequest?.Address !== undefined ? (
                  <span> {selectedRequest?.Address}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="titles">پاسخ</div>
              <span className="contentColumns">
                {selectedRequest?.Address !== undefined ? (
                  <span> {selectedRequest?.Address}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={8} style={{ marginTop: "20px" }}>
              <div className="titles">توضیحات</div>
              <span className="contentColumns">
                {selectedRequest?.Address !== undefined ? (
                  <span> {selectedRequest?.Address}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
          </Row>
        </>
      )}
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

export default DetailBoardMember;
