import React, { useState, FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import BoardMember from "./BoardMember";
import EmployeeList from "../../../../../AdmissionList/Legal/InformationAdjuster/AdjusterInfoDetail/CompanyMembers/EmployeeList";
import StockHolder from "../../../../../AdmissionList/Legal/InformationAdjuster/AdjusterInfoDetail/CompanyMembers/StockHolderList";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";

const { TabPane } = Tabs;

interface ICompanyMembersProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  applicantId?: number;
  isEvaluatorDesktopInformation?: number;
  selectedItemManagmentCartable: any;
}

const CompanyMembers: FC<ICompanyMembersProps> = ({
  oneAdjusterList,
  isFromReportTable,
  applicantId,
  isEvaluatorDesktopInformation,
  selectedItemManagmentCartable,
}) => {
  const [activeTabCompanyMember, setActiveTabCompanyMember] = useState("1");

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs
          defaultActiveKey="1"
          // tabPosition={tabPosition}
          onChange={(key) => setActiveTabCompanyMember(key)}
          type="card"
        >
          <TabPane tab="اعضای هیئت مدیره" key="1">
            <BoardMember
              selectedItemManagmentCartable={selectedItemManagmentCartable}
              activeTabCompanyMember={activeTabCompanyMember}
              isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
             
            />
          </TabPane>
          <TabPane tab="سهامداران" key="2">
            <StockHolder
              oneAdjusterList={oneAdjusterList}
              isFromReportTable={isFromReportTable}
              applicantId={applicantId}
              isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              selectedItemManagmentCartable={selectedItemManagmentCartable}
              activeTabCompanyMember={activeTabCompanyMember}
             
            />
          </TabPane>
          <TabPane tab="کارکنان" key="3">
            <EmployeeList
              oneAdjusterList={oneAdjusterList}
              isFromReportTable={isFromReportTable}
              applicantId={applicantId}
              isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              selectedItemManagmentCartable={selectedItemManagmentCartable}
              activeTabCompanyMember={activeTabCompanyMember}
            />
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default CompanyMembers;
