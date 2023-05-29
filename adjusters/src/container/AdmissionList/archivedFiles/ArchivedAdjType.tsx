import React, { useState } from "react";
import { Tabs, ConfigProvider } from "antd";
import Archive from "./ArchiveList";

const { TabPane } = Tabs;
const ArchivedFiles = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
          <TabPane tab="حقیقی" key="1">
            {activeTab === "1" && <Archive activeTab={activeTab} />}
          </TabPane>
          <TabPane tab="حقوقی" key="2">
            {activeTab === "2" && <Archive activeTab={activeTab} />}
          </TabPane>
          <TabPane tab="دادگستری" key="3">
            {activeTab === "3" && <Archive activeTab={activeTab} />}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default ArchivedFiles;
