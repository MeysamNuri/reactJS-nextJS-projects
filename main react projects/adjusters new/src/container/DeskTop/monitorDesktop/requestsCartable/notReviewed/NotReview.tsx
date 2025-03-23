import React, { useState, FC, useEffect } from "react";
import { Tabs, ConfigProvider, Table } from "antd";
import BossGrid from "./BossGrid";
import ExpertGrid from "./ExpertGrid";
import AllView from "../allView/allView";

const { TabPane } = Tabs;

interface INotReviewedProps {
  modelExpertGrid?: any;
  detailRequestGetWay?: any;
}

const RequestsCartable: FC<INotReviewedProps> = () => {
  const [activeAwait, setActiveAwait] = useState("1");
  const [activeReview, setactiveReview] = useState("");


  return (
    <>
      <ConfigProvider direction="rtl">


        <Tabs onChange={(key) => setactiveReview(key)}>
          <TabPane tab="همه" key="">

          </TabPane>
          <TabPane tab="تمدید پروانه" key="1">

          </TabPane>
          <TabPane tab="لغو پروانه" key="2">

          </TabPane>
          <TabPane tab="مکاتبات" key="3">

          </TabPane>
          <TabPane tab="افزودن هیئت مدیره جدید" key="4">

          </TabPane>

          <TabPane tab="تأسیس شعبه" key="6">

          </TabPane>
          <TabPane tab="تغییر محل فعالیت" key="7">

          </TabPane>

          <TabPane tab="تغییر مدیر شعبه" key="9">

          </TabPane>
          <TabPane tab="تودیع" key="10">

          </TabPane>

          <TabPane tab="فعالسازی مجدد میز کار حقیقی و دادگستری" key="12">

          </TabPane>
          <TabPane tab="افزودن سهامداران جدید" key="13">

          </TabPane>
          <TabPane tab="افزایش سرمایه" key="14">

          </TabPane>
          <TabPane tab="تغییر مدیر عامل" key="15">

          </TabPane>
          <TabPane tab="تغییر رئیس هیئت مدیره" key="16">

          </TabPane>
          <TabPane tab="تغییر نایب رئیس هیئت مدیره" key="17">

          </TabPane>
          <TabPane tab="ویرایش سهامداران" key="18">

          </TabPane>
          <TabPane tab="پایان همکاری" key="19">

          </TabPane>
        </Tabs>
        <Tabs onChange={(key) => setActiveAwait(key)}>
          <TabPane tab="تأیید کارشناس" key="1">
            <ExpertGrid activeAwait={activeAwait} activeReview={parseInt(activeReview)} />
          </TabPane>
          <TabPane tab="تأیید رئیس اداره" key="2">
            <BossGrid activeAwait={activeAwait} activeReview={parseInt(activeReview)} />
          </TabPane>
          <TabPane tab="بایگانی" key="3"  >
            <AllView activeReview={parseInt(activeReview)} />
          </TabPane>
        </Tabs>


      </ConfigProvider>
    </>
  );
};

export default RequestsCartable;
