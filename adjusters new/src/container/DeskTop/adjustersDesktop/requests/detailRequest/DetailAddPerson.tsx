import React, { FC } from "react";
import { Row, Col, Skeleton } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";

interface IDetailAddPersonProps {
  selectedRequest: any;
}
const DetailAddPerson: FC<IDetailAddPersonProps> = ({ selectedRequest }) => {

  return (
    <div>
      {/* <h2 className="requestType">{selectedRequest.requestType}</h2> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">درخواست دهنده</div>
          <span className="contentColumn">
            {selectedRequest?.Position !== undefined ? (
              <span> {selectedRequest?.Position}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">کد ملی</div>
          <span className="contentColumn">
            {selectedRequest?.Mobile !== undefined ? (
              <span> {selectedRequest?.Mobile}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">تاریخ تولد</div>
          <span className="contentColumn">
            {selectedRequest?.Mobile !== undefined ? (
              <span> {selectedRequest?.Position}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">سمت</div>
          <span className="contentColumn"> {selectedRequest?.Position}</span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">تاریخ شروع فعالیت</div>
          <span className="contentColumn">
            {selectedRequest?.Mobile !== undefined ? (
              <span> {selectedRequest?.Mobile}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">مدرک</div>
          <span className="contentColumn">
            {selectedRequest?.AppointmentDate !== undefined ? (
              <span>
                {" "}
                {moment(selectedRequest?.AppointmentDate.split("T")[0]).format(
                  "jYYYY-jM-jD"
                )}
              </span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">رشته</div>
          <span className="contentColumn">
            {selectedRequest?.Mobile !== undefined ? (
              <span> {selectedRequest?.Mobile}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">نوع دفتر</div>
          <span className="contentColumn">
            {selectedRequest?.Telephone !== undefined ? (
              <span> {selectedRequest?.Telephone}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">تلفن همراه</div>
          <span className="contentColumn">
            {selectedRequest?.Mobile !== undefined ? (
              <span> {selectedRequest?.Mobile}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={8}>
          <div className="titlecol">پست الکترونیکی</div>
          <span className="contentColumn">
            {selectedRequest?.Email !== undefined ? (
              <span> {selectedRequest?.Email}</span>
            ) : (
              <Skeleton loading={true} active paragraph={false} />
            )}
          </span>
        </Col>
        <Col className="gutter-row" span={8}>
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
      {selectedRequest.responseUser && (
         <>
      <h2  className="requestInformation"  >اطلاعات درخواست</h2>
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

export default DetailAddPerson;
