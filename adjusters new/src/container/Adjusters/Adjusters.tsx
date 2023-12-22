import React from "react";
import { Tabs, ConfigProvider } from "antd";
import Interviewers from "./interviewers/Interviewers";
import MyCalendar from "./InterviewTime/InterviewTime";
import Documents from "./Documents/Document";
import RejectionApplicants from "./RejectBaseInfoSeason/RejectionInfoSeason";
import SpecializedField from "./SpecializedField/SpecializedField";
import ChangeStatusReason from "./ChangeStatusReason/ChangeStatusReason";
import UserList from "./UserList/UserList";
import Courses from "./Courses/Courses";
import RequestDocumentsType from "./requestDocumentsType/requestDocumentsType";
import ForbiddenBaseInfo from "./forbidden/forbiddenBaseInfo";

const { TabPane } = Tabs;

const Adjusters = () => {
  return (
    <ConfigProvider direction="rtl">
      <Tabs defaultActiveKey="1">
        <TabPane tab="دوره ها" key="1">
          <Courses />
        </TabPane>
        <TabPane tab="زمان مصاحبه" key="2">
          <MyCalendar />
        </TabPane>
        <TabPane tab="مصاحبه کنندگان" key="3">
          <Interviewers />
        </TabPane>
        <TabPane tab="نوع مدرک" key="4">
          <Documents />
        </TabPane>
        <TabPane tab="رشته تخصصی" key="5">
          <SpecializedField />
        </TabPane>
        <TabPane tab="دلایل رد متقاضیان" key="6">
          <RejectionApplicants />
        </TabPane>
        <TabPane tab="دلایل تغییر وضعیت" key="7">
          <ChangeStatusReason />
        </TabPane>
        <TabPane tab="لیست کاربران" key="8">
          <UserList />
        </TabPane>
        <TabPane tab="نوع مستندات درخواست" key="9">
          <RequestDocumentsType />
        </TabPane>
        <TabPane tab="شاخص ها" key="10">
          <ForbiddenBaseInfo />
        </TabPane>
      </Tabs>
    </ConfigProvider>
  );
};

export default Adjusters;
