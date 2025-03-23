import React, { useState } from "react";
import { Tabs, ConfigProvider } from "antd";
import Natural from "./Natural/Natural";
import Legal from "./Legal/Legal";

const { TabPane } = Tabs;
const AssessorsFiles = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
          <TabPane tab="حقیقی" key="1">
            {activeTab === "1" && <Natural activeTab={activeTab} />}
          </TabPane>
          <TabPane tab="حقوقی" key="2">
            {activeTab === "2" && <Legal  />}
          </TabPane>
          <TabPane tab="دادگستری" key="3">
            {activeTab === "3" && <Natural activeTab={activeTab} />}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default AssessorsFiles;
