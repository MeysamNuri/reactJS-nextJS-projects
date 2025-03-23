import React, { FC } from "react";
import { Row, Col, Skeleton,Collapse } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import TerminateActionExpert from "./TerminateActionExpert";
import TerminateActionBoss from "./TerminateActionBoss";
import DownloadFiles from "../../../downloadFiles";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
interface IDetailEstablishedBranchesProps {
  selectedRequest: any;
  detailRequestGetWay?: any;
  modelExpertGrid?: any;
  closeModal?: () => void
}

const DetailEstablishedBranches: FC<IDetailEstablishedBranchesProps> = ({
  selectedRequest,
  detailRequestGetWay,
  modelExpertGrid,
  closeModal
}) => {

  const { resultId } = useSelector((state: any) => state.request);

const { Panel } = Collapse;

  return ( 
    <div>
     <Collapse  defaultActiveKey={["1", "2", "3"]}  >
        <Panel header="اطلاعات درخواست تأسیس شعبه" key="1">

     
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

export default DetailEstablishedBranches;
