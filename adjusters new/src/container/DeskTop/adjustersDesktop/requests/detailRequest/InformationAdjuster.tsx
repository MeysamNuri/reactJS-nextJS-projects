import React,{FC} from "react";
import { Row, Col, Skeleton,Collapse } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";

const { Panel } = Collapse;
interface IDetailGeneralProps {
    selectedRequest: any;
  }
const InformationAdjuster:FC<IDetailGeneralProps> = ({selectedRequest}) => { 
    const { resultId } = useSelector((state: any) => state.request);
  return (
    <div>
      <Collapse  defaultActiveKey={["1", "2", "3"]}  >
        <Panel header="اطلاعات ارزیاب" key="1">

        <Row gutter={16}>
        {/* <Col className="gutter-row" span={4}>
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

        </Panel>
      </Collapse>
    </div>
  );
};

export default InformationAdjuster;
