import React, { FC, useState } from "react";
import { ConfigProvider, Tabs } from "antd";
import Natural from "./reportTable/Natural";
import Judicial from "./reportTable/Judicial";
import Legal from "./reportTable/Legal";



interface ICartableReportProps { }

const CartableReport: FC<ICartableReportProps> = ({ }) => {
  const { TabPane } = Tabs;
  const [activeTab, setActiveTab] = useState("1");

  return (
    <ConfigProvider direction="rtl">
      <div style={{ position: "relative" }}>
        <Tabs onChange={(key) => setActiveTab(key)} >
          <TabPane tab="حقیقی" key={1}>
            <Natural adjType={Number(activeTab)} />
          </TabPane>
          <TabPane tab="حقوقی" key={2}>
            <Legal adjType={Number(activeTab)} />
          </TabPane>
          <TabPane tab="دادگستری" key={3}>
            <Judicial adjType={Number(activeTab)} />
          </TabPane>

        </Tabs>

      </div>
    </ConfigProvider>
  );
};

export default CartableReport;
