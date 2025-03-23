import React from "react";
import { Tabs, ConfigProvider } from "antd";
import RequestsCartable from "./requestsCartable/RequestCartable";
import ManagmentCartable from "./managmentCartable/ManagmentCartable";

const { TabPane } = Tabs;

const MonitorDesktop = () => {
  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1">
          <TabPane tab="کارتابل در خواست ها" key="1">
            <RequestsCartable />
          </TabPane>
          <TabPane tab=" کارتابل مدیریت" key="2">
            <ManagmentCartable/>
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default MonitorDesktop;
