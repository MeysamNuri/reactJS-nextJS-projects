import React,{useState} from "react";
import { Tabs, ConfigProvider } from "antd";
import DesktopMessage from "./DesktopMessage";
import DesktopSmsOutBox from "./DesktopSmsOutBox";


const { TabPane } = Tabs;
const DesktopMessageSms = () => {
    const [activeTab, setActiveTab] = useState("1");
    
    
  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1"  onChange={(key) => setActiveTab(key)}   >
          <TabPane tab="پیامک های ارزیابان" key="1">
            <DesktopSmsOutBox  />
          </TabPane>
          <TabPane tab="پیام های ارزیابان" key="2">
            <DesktopMessage />
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default DesktopMessageSms;
