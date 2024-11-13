import React, { useState } from "react";
import { Tabs, ConfigProvider } from "antd";
import NotReview from "./notReviewed/NotReview";

const { TabPane } = Tabs;

const RequestsCartable = () => {
  return (
    <>
      <ConfigProvider direction="rtl">
        <NotReview />   
      </ConfigProvider>
    </>
  );
};

export default RequestsCartable;
