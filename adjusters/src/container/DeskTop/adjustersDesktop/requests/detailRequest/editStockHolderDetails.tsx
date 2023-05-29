import React, { FC } from "react";
import { Row, Col, Skeleton, Collapse } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import TerminateActionExpert from "./TerminateActionExpert";
import TerminateActionBoss from "./TerminateActionBoss";
import DownloadFiles from "../../../downloadFiles";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
interface IDetailEditStockHolderProps {
  selectedRequest: any;
  detailRequestGetWay?: any;
  modelExpertGrid?: any;
  closeModal?: () => void
}
const DetailEditStockHolder: FC<IDetailEditStockHolderProps> = ({
  selectedRequest,
  detailRequestGetWay,
  modelExpertGrid,
  closeModal

}) => {
  const { Panel } = Collapse;
  return (
    <div>
      <Collapse defaultActiveKey={["1", "2", "3"]}  >
        <Panel header="اطلاعات جدید سهامدار" key="1">

          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="titles">نام کامل</div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.FullName !==
                  undefined ? (
                    <span>
                      {" "}
                      {selectedRequest?.StockHolder?.FullName }
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">کد ملی</div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.NationalCode!== undefined ? (
                    <span>
                      {" "}
                      {
                        selectedRequest?.StockHolder?.NationalCode
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
                {selectedRequest?.StockHolder?.BirthDate !== undefined ? (
                 <span>
                 {" "}
                 {moment(
                     selectedRequest?.StockHolder?.BirthDate?.split(
                         "T"
                     )[0]
                 ).format("jYYYY-jMM-jDD")}
             </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">نوع سهامدار</div>
              <span className="contentColumns">
               
                  <span> {selectedRequest?.StockHolder?.IsLegal?("حقوقی"):("حقیقی")}</span>

              </span>
            </Col>
          
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col className="gutter-row" span={6}>
              <div className="titles">تاریخ شروع تخصیص</div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.JoinDate !==
                  undefined ? (
                    <span>
                 {" "}
                 {moment(
                    selectedRequest?.StockHolder?.JoinDate?.split(
                         "T"
                     )[0]
                 ).format("jYYYY-jMM-jDD")}
             </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">تاریخ پایان تخصیص</div>
              <span className="contentColumns">
                { selectedRequest?.StockHolder?.EndDate !== undefined ? (
                     <span>
                     {" "}
                     {moment(
                        selectedRequest?.StockHolder?.EndDate?.split(
                             "T"
                         )[0]
                     ).format("jYYYY-jMM-jDD")}
                 </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">میزان سهم</div>
              <span className="contentColumns">
                { selectedRequest?.StockHolder?.ShareAmount !== undefined ? (
                  <span> { selectedRequest?.StockHolder?.ShareAmount }</span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            

          </Row>
 
        </Panel>
        <Panel header="اطلاعات قبلی سهامدار" key="1">

         
        <Row gutter={16}>
          {
            selectedRequest?.StockHolder?.BeforStockHolder?.IsLegal?(
              <Col className="gutter-row" span={6}>
              <div className="titles">نام شرکت</div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.BeforStockHolder?.CompanyName !==
                  undefined ? (
                    <span>
                      {" "}
                      {selectedRequest?.StockHolder?.BeforStockHolder?.CompanyName }
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            ):

            (
              <Col className="gutter-row" span={6}>
              <div className="titles">نام کامل</div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.BeforStockHolder?.FirstName !==
                  undefined ? (
                    <span>
                      {" "}
                      {`${selectedRequest?.StockHolder?.BeforStockHolder?.FirstName} ${selectedRequest?.StockHolder?.BeforStockHolder?.FamilyName}` }
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            )
          }
            
            <Col className="gutter-row" span={6}>
              <div className="titles">{selectedRequest?.StockHolder?.BeforStockHolder?.IsLegal?("شناسه شرکت"):("کد ملی")} </div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.BeforStockHolder?.NationalCode!== undefined ? (
                    <span>
                      {" "}
                      {
                        selectedRequest?.StockHolder?.BeforStockHolder?.NationalCode
                      }
                    </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            {
              selectedRequest?.StockHolder?.BeforStockHolder?.IsLegal?(
                  <Col className="gutter-row" span={6}>
                  <div className="titles">تاریخ ثبت</div>
                  <span className="contentColumns">
                    {selectedRequest?.StockHolder?.BeforStockHolder?.CompanyREgistrationDate !== undefined ? (
                     <span>
                     {" "}
                     {moment(
                         selectedRequest?.StockHolder?.BeforStockHolder?.CompanyREgistrationDate?.split(
                             "T"
                         )[0]
                     ).format("jYYYY-jMM-jDD")}
                 </span>
                    ) : (
                        <Skeleton loading={true} active paragraph={false} />
                      )}
                  </span>
                </Col>
                ):
                (
                  <Col className="gutter-row" span={6}>
                  <div className="titles">تاریخ تولد</div>
                  <span className="contentColumns">
                    {selectedRequest?.StockHolder?.BeforStockHolder?.BirthDate !== undefined ? (
                     <span>
                     {" "}
                     {moment(
                         selectedRequest?.StockHolder?.BeforStockHolder?.BirthDate?.split(
                             "T"
                         )[0]
                     ).format("jYYYY-jMM-jDD")}
                 </span>
                    ) : (
                        <Skeleton loading={true} active paragraph={false} />
                      )}
                  </span>
                </Col>
                )
            }

           
            <Col className="gutter-row" span={6}>
              <div className="titles">نوع سهامدار</div>
              <span className="contentColumns">
               
                  <span> {selectedRequest?.StockHolder?.BeforStockHolder?.IsLegal?("حقوقی"):("حقیقی")}</span>

              </span>
            </Col>
           
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>

          <Col className="gutter-row" span={6}>
              <div className="titles">تاریخ شروع تخصیص</div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.BeforStockHolder?.JoinDate !==
                  undefined ? (
                    <span>
                 {" "}
                 {moment(
                    selectedRequest?.StockHolder?.BeforStockHolder?.JoinDate?.split(
                         "T"
                     )[0]
                 ).format("jYYYY-jMM-jDD")}
             </span>
                  ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">تاریخ پایان تخصیص</div>
              <span className="contentColumns">
                {selectedRequest?.StockHolder?.BeforStockHolder?.EndDate!== undefined ? (
                   <span>
                   {" "}
                   {moment(
                      selectedRequest?.StockHolder?.BeforStockHolder?.EndDate?.split(
                           "T"
                       )[0]
                   ).format("jYYYY-jMM-jDD")}
               </span>
                ) : (
                    <Skeleton loading={true} active paragraph={false} />
                  )}
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="titles">میزان سهم</div>
              <span className="contentColumns">
                { selectedRequest?.StockHolder?.BeforStockHolder?.ShareAmount  !== undefined ? (
                  <span> { selectedRequest?.StockHolder?.BeforStockHolder?.ShareAmount  }</span>
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

export default DetailEditStockHolder;
