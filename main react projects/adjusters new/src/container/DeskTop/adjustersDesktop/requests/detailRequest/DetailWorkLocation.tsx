import React, { FC } from "react";
import { Row, Col, Skeleton, Collapse } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import TerminateActionExpert from "./TerminateActionExpert";
import TerminateActionBoss from "./TerminateActionBoss";
import DownloadFiles from "../../../downloadFiles";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
interface IDetailWorkLocationProps {
  selectedRequest: any;
  detailRequestGetWay?: any;
  modelExpertGrid?: any;
  closeModal?: () => void
}
const DetailWorkLocation: FC<IDetailWorkLocationProps> = ({
  selectedRequest,
  detailRequestGetWay,
  modelExpertGrid,
  closeModal

}) => {
  const { Panel } = Collapse;

  return (
    <div>
      <Collapse defaultActiveKey={["1", "2", "3"]}  >
        <Panel header="محل فعالیت جدید" key="1">

          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="titles">استان</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.Province?.Title !==
                  undefined ? (
                    <span>
                      {" "}
                      {selectedRequest?.WorkLocation?.Province?.Title}
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">شهر</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.City?.Title!== undefined ? (
                    <span>
                      {" "}
                      {
                        selectedRequest?.WorkLocation?.City?.Title
                      }
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>

            <Col className="gutter-row" span={6}>
              <div className="titles">کد پستی</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.PostalCode !== undefined ? (
                  <span>
                   {selectedRequest?.WorkLocation?.PostalCode}
                  </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">ایمیل</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.Email !==
                  undefined ? (
                    <span> {selectedRequest?.WorkLocation?.Email}</span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>

            <Col className="gutter-row" span={6}>
              <div className="titles">فکس</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.Fax !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.Fax}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">وب سایت</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.Website !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.Website }</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">تلفن</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.Telephone  !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.Telephone }</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">کاربری</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.PlaceUsageDescription  !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.PlaceUsageDescription }</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
         

          </Row>

          <Row gutter={16} style={{ marginTop: "20px" }}>
              <Col className="gutter-row" span={12}>
                <div className="titles">آدرس</div>
                <span className="contentColumns">
                  {selectedRequest?.WorkLocation?.Address !== undefined ? (
                    <span> {selectedRequest?.WorkLocation?.Address}</span>
                  ) : (
                      <Skeleton loading={true} active paragraph={false} />
                    )}
                </span>
              </Col>
            
            </Row>
        </Panel>
        <Panel header="محل فعالیت قبلی" key="1">

         
        <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="titles">استان</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Province?.Title !==
                  undefined ? (
                    <span>
                      {" "}
                      {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Province?.Title}
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">شهر</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.City?.Title!== undefined ? (
                    <span>
                      {" "}
                      {
                        selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.City?.Title
                      }
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>

            <Col className="gutter-row" span={6}>
              <div className="titles">کد پستی</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.PostalCode !== undefined ? (
                  <span>
                   {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.PostalCode}
                  </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">ایمیل</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Email !==
                  undefined ? (
                    <span> {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Email}</span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>

            <Col className="gutter-row" span={6}>
              <div className="titles">فکس</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Fax !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Fax}</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">وب سایت</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Website !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Website }</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">تلفن</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Telephone  !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Telephone }</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">کاربری</div>
              <span className="contentColumns">
                {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.PlaceUsageDescription  !== undefined ? (
                  <span> {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.PlaceUsageDescription }</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>

          </Row>

          <Row gutter={16} style={{ marginTop: "20px" }}>
              <Col className="gutter-row" span={12}>
                <div className="titles">آدرس</div>
                <span className="contentColumns">
                  {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Address !== undefined ? (
                    <span> {selectedRequest?.WorkLocation?.BeforWorkLocationInfo?.Address}</span>
                  ) : (
                      <Skeleton loading={true} active paragraph={false} />
                    )}
                </span>
              </Col>
          
            </Row>

        </Panel>
      </Collapse>
      <br/>
  
      <Row>

      <Col className="gutter-row" span={24}>
                <div className="titles">توضیحات</div>
                <span className="contentColumns" style={{backgroundColor:"rgb(254 249 249)",padding:"15px"}}>
                  {selectedRequest?.Description !== undefined ? (
                    <span> {selectedRequest?.Description}</span>
                  ) : (
                      <Skeleton loading={true} active paragraph={false} />
                    )}
                </span>
              </Col>
      </Row>
      <br/>
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

export default DetailWorkLocation;
