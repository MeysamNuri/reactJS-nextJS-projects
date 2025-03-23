import React, { FC } from "react";
import { Row, Col, Skeleton, Collapse } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import TerminateActionExpert from "./TerminateActionExpert";
import TerminateActionBoss from "./TerminateActionBoss";
import DownloadFiles from "../../../downloadFiles";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
const { Panel } = Collapse;
interface BoardMemberBossProps {
    selectedRequest: any;
    modelExpertGrid?: any;
    detailRequestGetWay?: any;
    closeModal?: () => void
}
const BoardMemberBoss: FC<BoardMemberBossProps> = ({ selectedRequest, modelExpertGrid,
    detailRequestGetWay,
    closeModal }) => {
    const { resultId } = useSelector((state: any) => state.request);

    return (
        <div>
            <Collapse defaultActiveKey={["1", "2", "3"]}  >
                <Panel header="اطلاعات رئیس هیئت مدیره فعلی" key="1">
                    {
                        resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo == null ?
                            <h4 style={{ margin: "15px auto", color: "red" }}>اطلاعات رئیس هیئت مدیره فعلی یافت نشد</h4>
                            :
                            (
                                <>

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
                                                {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo?.Person?.FullName !==
                                                    undefined ? (
                                                        <span>
                                                            {" "}
                                                            {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo?.Person?.FullName}
                                                        </span>
                                                    ) : (
                                                        <Skeleton loading={true} active paragraph={false} />
                                                    )}
                                            </span>
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <div className="titles">کد ارزیابی</div>
                                            <span className="contentColumns">
                                                {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo?.Applicant?.AdjusterCode !==
                                                    undefined ? (
                                                        <span>
                                                            {" "}
                                                            {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo?.Applicant?.AdjusterCode}
                                                        </span>
                                                    ) : (
                                                        <Skeleton loading={true} active paragraph={false} />
                                                    )}
                                            </span>
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <div className="titles">کد ملی</div>
                                            <span className="contentColumns">
                                                {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo.Person
                                                    ?.NationalCodeOut !== undefined ? (
                                                        <span>
                                                            {" "}
                                                            {
                                                                resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo.Person
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
                                                            resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo.Person?.BirthDate?.split(
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
                                                {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo.Telephone !==
                                                    undefined ? (
                                                        <span> {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo?.Telephone}</span>
                                                    ) : (
                                                        <Skeleton loading={true} active paragraph={false} />
                                                    )}
                                            </span>
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <div className="titles">تلفن همراه</div>
                                            <span className="contentColumns">
                                                {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo.Mobile !== undefined ? (
                                                    <span> {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo.Mobile}</span>
                                                ) : (
                                                        <Skeleton loading={true} active paragraph={false} />
                                                    )}
                                            </span>
                                        </Col>
                                        <Col className="gutter-row" span={8}>
                                            <div className="titles">آدرس</div>
                                            <span className="contentColumns">
                                                {resultId !== undefined ? (
                                                    <span> {resultId?.Result?.BoardMemberBoss?.CurrentApplicantPersonalInfo?.Address}</span>
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

                                </>
                            )
                    }

                </Panel>
                <Panel header="اطلاعات رئیس هیئت مدیره جدید" key="2">

                    <Row gutter={16}>

                        <Col className="gutter-row" span={6}>
                            <div className="titles">نام و نام خانوادگی</div>
                            <span className="contentColumns">
                                {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                    ?.Person?.FullName !==
                                    undefined ? (
                                        <span>
                                            {" "}
                                            {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                                ?.Person?.FullName}
                                        </span>
                                    ) : (
                                        <Skeleton loading={true} active paragraph={false} />
                                    )}
                            </span>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="titles">کد ارزیابی</div>
                            <span className="contentColumns">
                                {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                    ?.Applicant?.AdjusterCode !==
                                    undefined ? (
                                        <span>
                                            {" "}
                                            {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                                ?.Applicant?.AdjusterCode}
                                        </span>
                                    ) : (
                                        <Skeleton loading={true} active paragraph={false} />
                                    )}
                            </span>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="titles">کد ملی</div>
                            <span className="contentColumns">
                                {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                    .Person
                                    ?.NationalCodeOut !== undefined ? (
                                        <span>
                                            {" "}
                                            {
                                                resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                                    .Person
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
                                            resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                                .Person?.BirthDate?.split(
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
                                {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                    .Telephone !==
                                    undefined ? (
                                        <span> {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                            ?.Telephone}</span>
                                    ) : (
                                        <Skeleton loading={true} active paragraph={false} />
                                    )}
                            </span>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="titles">تلفن همراه</div>
                            <span className="contentColumns">
                                {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                    .Mobile !== undefined ? (
                                        <span> {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                            .Mobile}</span>
                                    ) : (
                                        <Skeleton loading={true} active paragraph={false} />
                                    )}
                            </span>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="titles">آدرس</div>
                            <span className="contentColumns">
                                {resultId !== undefined ? (
                                    <span> {resultId?.Result?.BoardMemberBoss?.NewApplicantPersonalInfo
                                        ?.Address}</span>
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

export default BoardMemberBoss;
