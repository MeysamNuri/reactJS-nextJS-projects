import React, { FC } from "react";
import { Row, Col, Skeleton } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";

interface IDetailGeneralProps {
  selectedRequest: any;
}
const DetailCeo: FC<IDetailGeneralProps> = ({ selectedRequest }) => {
  const { resultId } = useSelector((state: any) => state.request);

  return (
    <div>
      {/* <h2 className="requestType">{selectedRequest.requestType}</h2> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={4}>
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
        </Col>

        <Col className="gutter-row" span={6}>
          <div className="titlecol">درخواست دهنده</div>
          <span className="contentColumn">
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
          <div className="titlecol">کد ملی</div>
          <span className="contentColumn">
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
          <div className="titlecol">تاریخ تولد</div>
          <span className="contentColumn">
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
          <div className="titlecol">تاریخ انتصاب</div>
          <span className="contentColumn">
            {moment(
              resultId?.Result?.CEO?.CooperationEndDate?.split("T")[0]
            ).format("jYYYY-jM-jD")}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titlecol">تلفن ثابت</div>
          <span className="contentColumn">
            {resultId?.Result?.ApplicantPersonalInfo?.Telephone !==
            undefined ? (
              <span> {resultId?.Result?.ApplicantPersonalInfo?.Telephone}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="titlecol">تلفن همراه</div>
          <span className="contentColumn">
            {resultId?.Result?.ApplicantPersonalInfo?.Mobile !== undefined ? (
              <span> {resultId?.Result?.ApplicantPersonalInfo?.Mobile}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">آدرس</div>
          <span className="contentColumn">
            {resultId !== undefined ? (
              <span> {resultId?.Result?.ApplicantPersonalInfo?.Address}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
      </Row>
      {selectedRequest.responseUser && (
        <>
          <h2 className="requestInformation">اطلاعات درخواست</h2>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col className="gutter-row" span={8}>
              <div className="titlecol">کاربر پاسخ دهنده</div>
              <span className="contentColumn">
                {selectedRequest?.Email !== undefined ? (
                  <span> {selectedRequest?.Email}</span>
                ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
              </span>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="titlecol">تاریخ پاسخ</div>
              <span className="contentColumn">
                {selectedRequest?.Address !== undefined ? (
                  <span> {selectedRequest?.Address}</span>
                ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
              </span>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="titlecol">پاسخ</div>
              <span className="contentColumn">
                {selectedRequest?.Address !== undefined ? (
                  <span> {selectedRequest?.Address}</span>
                ) : (
                  <Skeleton loading={true} active paragraph={false} />
                )}
              </span>
            </Col>
            <Col className="gutter-row" span={8} style={{ marginTop: "20px" }}>
              <div className="titlecol">توضیحات</div>
              <span className="contentColumn">
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
    </div>
  );
};

export default DetailCeo;
