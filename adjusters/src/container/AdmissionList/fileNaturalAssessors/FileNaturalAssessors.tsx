import React, { useState } from "react";
import { Tabs, ConfigProvider} from "antd";
import { FindAccess } from "sanhab-components-library";
import ReadyToInterview from "./readyToInterview/ReadyToInterview";
import InterviewInvitation from "./InterviewInvitation";
import CompletedDossier from "./CompletedDossier";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";


const { TabPane } = Tabs;
const FileNaturalAssessors = () => {
  const [activeTab, setActiveTab] = useState("1");



  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1"  onChange={(key) => setActiveTab(key)}>
          {FindAccess(
            userAccessList.Adjusters_ViewReadyToInterviewDocument
          ) && (
            <TabPane tab="آماده به مصاحبه" key="1">
              {activeTab === "1" && <ReadyToInterview />}
            </TabPane>
          )}
          {FindAccess(
            userAccessList.Adjusters_ViewInterviewInvitationDocument
          ) && (
            <TabPane tab="دعوت به مصاحبه" key="2">
              {activeTab === "2" && <InterviewInvitation />}
            </TabPane>
          )}
          {FindAccess(userAccessList.Adjusters_ViewFilingDocument) && (
            <TabPane tab="تشکیل پرونده" key="3">
              {activeTab === "3" && <CompletedDossier />}
            </TabPane>
          )}
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default FileNaturalAssessors;
