import React, { useState } from "react";
import { Tabs, ConfigProvider, Tooltip } from "antd";
import Natural from "./Natural/Natural";
import Judical from "./Judicial/Judicial";
import Legal from "./Legal/Legal";
import { ReactComponent as Help } from "../../assets/images/help.svg";


const { TabPane } = Tabs;
const AdmissionList = () => {
  const [activeTab, setActiveTab] = useState("1");

  const operations = (
    <div className="help">
      <Tooltip placement="rightBottom" title="مشاهده فایل راهنما">
        <a
          download
          href={
            process.env.PUBLIC_URL +
            "/راهنمای کاربری کارتابل پذیرش ارزیابان.pdf"
          }
          className="downloadFile"
        >
          <span>مشاهده فایل راهنما</span>
          <Help />
        </a>
      </Tooltip>
    </div>
  );

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => setActiveTab(key)}
          tabBarExtraContent={operations}
        >
          <TabPane tab="حقیقی" key="1">
            {activeTab === "1" && <Natural activeTab={activeTab}/>}
          </TabPane>
          <TabPane tab="حقوقی" key="2">
            {activeTab === "2" && <Legal activeTab={activeTab}/>}
          </TabPane>
          <TabPane tab="دادگستری" key="3">
            {activeTab === "3" && <Judical activeTab={activeTab}/>}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default AdmissionList;
