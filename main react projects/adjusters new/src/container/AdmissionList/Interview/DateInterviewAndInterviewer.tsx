import React, { FC, useEffect, useState } from "react";
import { Tabs, ConfigProvider } from "antd";
import Interview from "./interview";
import InterviewTime from "./interviewTime";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";

const { TabPane } = Tabs;
interface IDateInterviewProps {
  closeModal?: () => void;
  oneAdjusterList?: IAneAdjusterList;
  closeModalInterview: () => void;
  isInterviewInvitation?:boolean;
  modelReport?:any
}

const DateInterviewAndInterviewers: FC<IDateInterviewProps> = ({
  closeModal,
  oneAdjusterList,
  closeModalInterview,
  isInterviewInvitation,
  modelReport
}) => {
  const [activeTab, setActiveTab] = useState("1");
 
  useEffect(() => {
    closeModal && closeModal();
  });

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
          <TabPane tab="زمان مصاحبه" key="1">
            {activeTab === "1" && (
              <InterviewTime applicantId={oneAdjusterList?.ApplicantId} />
            )}
          </TabPane>
          <TabPane
            tab="مصاحبه کنندگان"
            key="2"
          >
            {activeTab === "2" && (
              <Interview
                closeModal={closeModalInterview}
                oneAdjusterList={oneAdjusterList}
                isInterviewInvitation={isInterviewInvitation}
                modelReport={modelReport}
              />
            )}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default DateInterviewAndInterviewers;
