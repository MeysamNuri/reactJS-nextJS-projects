import React, { useState,FC } from "react";
import {Tabs, ConfigProvider } from "antd";
import InquiryPajooheshkadeh from "./InquiryPajooheshkadeh";
import InquiryCertificate from "./InquiryCertificate";
import InquiryList from "./InquiryList";
import InquiryLegacy from "./InquiryLegacy";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";

const { TabPane } = Tabs;
interface IInquiryProps {
  oneAdjusterList?: IAneAdjusterList;

}



const Inquiry:FC<IInquiryProps> = ({oneAdjusterList}) => {
  const [tabPosition, setTabPosition] = useState<any>("right");


  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs tabPosition={tabPosition} type="card">
          <TabPane tab="گواهی آزمون آداب" key="1">
           <InquiryPajooheshkadeh oneAdjusterList={oneAdjusterList}   />
          </TabPane>
          <TabPane tab="گواهینامه آموزشی" key="2">
           <InquiryCertificate oneAdjusterList={oneAdjusterList}  />
          </TabPane>
          <TabPane tab="سوابق شغلی" key="3">
           <InquiryLegacy oneAdjusterList={oneAdjusterList}  />
          </TabPane>
          <TabPane tab="تاریخچه استعلام" key="4">
           <InquiryList oneAdjusterList={oneAdjusterList}  />
          </TabPane>
        
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default Inquiry;
