import React, { FC,useState } from "react";
import { Tabs, ConfigProvider } from "antd";
import BoardMember from "./BoardMember";
import EmployeeList from "./EmployeeList";
import StockHolder from "./StockHolderList";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";

const { TabPane } = Tabs;

interface ICompanyMembersProps {
  oneAdjusterList?: IAneAdjusterList; 
  isFromReportTable?: boolean;
  applicantId?: number;
  isEvaluatorDesktopInformation?: number
  userIdRecognition: number
}


const CompanyMembers: FC<ICompanyMembersProps> = ({
  oneAdjusterList,
  isFromReportTable,
  applicantId,
  isEvaluatorDesktopInformation,
  userIdRecognition
}) => {
  const [activeTab, setActiveTab] = useState("1"); 

  const handleTabsChange=(key:string)=>{
    setActiveTab(key)
  }
  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs defaultActiveKey="1" onChange={handleTabsChange}>
          <TabPane tab="اعضای هیئت مدیره" key="1">
            <BoardMember
              isFromLegalUser={true}
              userIdRecognition={userIdRecognition}
              oneAdjusterList={oneAdjusterList}
              isFromReportTable={isFromReportTable}
              applicantId={applicantId}
              activeTab={activeTab}
            />
          </TabPane>
          <TabPane tab="سهامداران" key="2">
            <StockHolder
              userIdRecognition={userIdRecognition}
              oneAdjusterList={oneAdjusterList}
              isFromReportTable={isFromReportTable}
              applicantId={applicantId}
              isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              activeTab={activeTab}
            />
          </TabPane>
          <TabPane tab="کارکنان" key="3">
            <EmployeeList
              userIdRecognition={userIdRecognition}
              oneAdjusterList={oneAdjusterList}
              isFromReportTable={isFromReportTable}
              applicantId={applicantId}
              isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              activeTab={activeTab}
            />
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default CompanyMembers;
