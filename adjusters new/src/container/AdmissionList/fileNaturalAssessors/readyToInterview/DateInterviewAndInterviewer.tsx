import React, { FC,  useState } from "react";
import { Tabs, ConfigProvider } from "antd";
import Interview from "./interview";
import InterviewTime from "../../Interview/interviewTime";


const { TabPane } = Tabs;
interface IDateInterviewProps {
  closeModal: () => void;
  ApplicantId: number;
  isCartable: boolean;
  CartableId: number;
  modelReport: any;
}

const DateInterviewAndInterviewers: FC<IDateInterviewProps> = ({
  ApplicantId,
  CartableId,
  modelReport,
  closeModal,
  isCartable
}) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
          <TabPane tab="زمان مصاحبه" key="1">
            {activeTab === "1" && <InterviewTime applicantId={ApplicantId} />}
          </TabPane>
          <TabPane tab="مصاحبه کنندگان" key="2">
            {activeTab === "2" && (
              <Interview
                ApplicantId={ApplicantId}
                CartableId={CartableId}
                modelReport={modelReport}
                closeModal={closeModal}
                isCartable={isCartable}
              />
            )}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default DateInterviewAndInterviewers;
