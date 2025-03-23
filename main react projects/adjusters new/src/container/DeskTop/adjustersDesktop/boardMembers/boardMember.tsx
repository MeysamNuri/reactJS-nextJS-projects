import React from "react";
import { Tabs } from "antd";
import CurrentboardInformation from "./CurrentBoardInformation";
import NewboardInformation from "./newBoardInformation/NewBoardInformation";
import BranchInformation from "../branchInformation/branchInformation";
//import "./boardMember.css";

const { TabPane } = Tabs;
const BoardMember = () => {
  return (
    <div className="contentDesktop">
      <Tabs defaultActiveKey="1">
        <TabPane tab="اعضای هئیت مدیره" key="1">
          <NewboardInformation />
        </TabPane>
        <TabPane tab=" اطلاعات شعب" key="2">
          <BranchInformation />
        </TabPane>
        <TabPane tab="کارکنان ارزیابان خسارت" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default BoardMember;
