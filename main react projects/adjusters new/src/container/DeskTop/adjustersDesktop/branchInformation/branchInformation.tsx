import React from "react";
import { Tabs } from "antd";
import BranchManager from "../branchManager/BranchManager";
import EstablishedBranches from "../establishedBranches/EstablishedBranches";

const { TabPane } = Tabs;
const BranchInformation = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="مدیران شعب" key="1">
          <BranchManager />
        </TabPane>
        <TabPane tab="تاسیس شعب" key="2">
          <EstablishedBranches />
        </TabPane>
        <TabPane tab="محل فعالیت فعلی" key="3">
          محل فعالیت فعلی
        </TabPane>
        <TabPane tab="تغییر محل فعالیت" key="4">
          تغییر محل فعالیت
        </TabPane>
      </Tabs>
    </div>
  );
};

export default BranchInformation;
