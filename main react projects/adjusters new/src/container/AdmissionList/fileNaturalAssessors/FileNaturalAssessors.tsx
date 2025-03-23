import React, { useState } from "react";
import { Tabs, ConfigProvider, Button, Popover, Tooltip, Row } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import ReadyToInterview from "./readyToInterview/ReadyToInterview";
import InterviewInvitation from "./InterviewInvitation";
import CompletedDossier from "./CompletedDossier";
import SmsGroup from "../../DeskTop/monitorDesktop/managmentCartable/SmsGroup";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";


const { TabPane } = Tabs;

const FileNaturalAssessors = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [dataManagment, setDataManagment] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [dataSeletManagment, setDataSeletManagment] = useState<any>([]);
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  const handleGroup = () => {
    setVisible(true);
  };
  const handleChildSelectData = (data: any) => {
    setDataSeletManagment(data);
  };
  const handleChildData = (data: any) => {
    setDataManagment(data);
  };

  const operations = (
    <Row style={{ marginLeft: "25px" }}>

      <Popover
        content={
          <SmsGroup
            activeTabManagment={activeTab}
            dataManagment={dataManagment}
            closeModal={() => setVisible(false)}
            dataSeletManagment={dataSeletManagment}
            isFromNaturalDocuments={true}
          />
        }
        title="ارسال پیامک گروهی"
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button

          onClick={handleGroup}
          type="dashed"
          icon={
            <CommentOutlined style={{ fontSize: "20px", color: "#7987A1" }} />
          }
        >
          ارسال پیامک گروهی
      </Button>

      </Popover>

    </Row>
  );

  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)} tabBarExtraContent={operations} style={{ position: "relative" }}>
          {FindAccess(
            userAccessList.Adjusters_ViewReadyToInterviewDocument
          ) && (
              <TabPane tab="آماده به مصاحبه" key="1">
                {activeTab === "1" && <ReadyToInterview
                  activeTab={"1"}
                  handleChildData={handleChildData}
                  handleChildSelectData={handleChildSelectData} 
                />}
              </TabPane>
            )}
          {FindAccess(
            userAccessList.Adjusters_ViewInterviewInvitationDocument
          ) && (
              <TabPane tab="دعوت به مصاحبه" key="2">
                {activeTab === "2" && <InterviewInvitation
                  activeTab={"2"}
                  handleChildData={handleChildData}
                  handleChildSelectData={handleChildSelectData} />
                }
              </TabPane> 
            )}
          {FindAccess(userAccessList.Adjusters_ViewFilingDocument) && (
            <TabPane tab="تشکیل پرونده" key="3">
              {activeTab === "3" && <CompletedDossier
                activeTab={"3"}
                handleChildData={handleChildData}
                handleChildSelectData={handleChildSelectData} />}
            </TabPane>
          )}
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default FileNaturalAssessors;
