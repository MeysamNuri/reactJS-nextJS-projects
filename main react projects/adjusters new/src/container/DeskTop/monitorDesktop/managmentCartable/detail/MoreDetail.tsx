import React, { FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import { FindAccess } from "sanhab-components-library";
import Requests from "./Requests";
import AdjusterInfoDetail from "./adjusterInfoDetail/AdjusterInfoDetail";
import History from "../more/History";
import { ISelectedItemManagmentCartable } from "../../../../../shared/ulitities/Model/desktop/managmentCartable";
import SmsOutBoxApplicantId from "../../../../AdmissionList/SmsOutBox/SmsOutBoxApplicantId";
import Message from "../../../../Message/Message";
import Sms from "../../../sms/Sms";
import { userAccessList } from "../../../../../shared/ulitities/Enums/userAccessList";
import ContractEvaluation from "../../../adjustersDesktop/contractEvaluation/ContractEvaluation";
import MonthlyPerformance from "../../../adjustersDesktop/monthlyPerformance/MonthlyPerfomance";
import Employee from "../../../adjustersDesktop/employee/Employee";
import ApplicantWarnings from "../../../adjustersDesktop/applicantWarnings";

const { TabPane } = Tabs;

interface IMoreDatailProps {
  selectedItemManagmentCartable: ISelectedItemManagmentCartable;
  activeTab: string;
}

const MoreDetail: FC<IMoreDatailProps> = ({
  selectedItemManagmentCartable,
  activeTab,
}) => {
  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs tabPosition="right" type="card">
          <TabPane tab="اطلاعات هویتی" key="1"> 
            <AdjusterInfoDetail
              selectedItemManagmentCartable={selectedItemManagmentCartable}
              activeTab={activeTab}
            />
          </TabPane>
          {FindAccess(userAccessList.Adjusters_ViewApplicantStatusHistory) && (
            <TabPane tab="تاریخچه تغییر وضعیت" key="2">
              <History
                selectedItemManagmentCartable={selectedItemManagmentCartable}
                activeTab={activeTab}
              />
            </TabPane>
          )}
          <TabPane tab="پیام ها" key="3">
            <Tabs type="card">
              <TabPane tab="پیام های فردی/ گروهی" key="4">
                <Message
                  applicantId={selectedItemManagmentCartable.ApplicantId}
                />
              </TabPane>
              <TabPane tab="پیامک های فردی/گروهی" key="5">
                <Sms applicantId={selectedItemManagmentCartable.ApplicantId} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="در خواست ها" key="8">
            <Requests
              applicantId={selectedItemManagmentCartable.ApplicantId}
              isManagmentCartable={true}
            />
          </TabPane>
          <TabPane tab="قراردادهای ارزیاب خسارت" key="9">
            <ContractEvaluation
              isManagmentCartable={true}
              applicantId={selectedItemManagmentCartable.ApplicantId}
            />
          </TabPane>
          <TabPane tab="گزارش عملکرد ماهانه" key="10">
            <MonthlyPerformance
              isManagmentCartable={true}
              applicantId={selectedItemManagmentCartable.ApplicantId}
            />
          </TabPane>
          <TabPane tab="اطلاعات کارکنان" key="11">
            <Employee
              isManagmentCartable={true}
              applicantId={selectedItemManagmentCartable.ApplicantId}
            />
          </TabPane>
          <TabPane tab="اخطارها" key="12">
            <ApplicantWarnings 
              isManagmentCartable={true}
              applicantId={selectedItemManagmentCartable.ApplicantId}
            />
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default MoreDetail;
