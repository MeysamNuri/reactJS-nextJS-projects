import React, { FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import Requests from "../detail/Requests";
import AdjusterInfoDetail from "./adjusterInfoDetail/AdjusterInfoDetail";
import { GetWay } from "../../../../../shared/ulitities/Enums/getWay";
import CompanyMembers from "./companyMember/CompanyMember";
import Message from "../../../../Message/Message";
import SmsOutBoxApplicantId from "../../../../AdmissionList/SmsOutBox/SmsOutBoxApplicantId";
import SmsOutBox from "../../../../AdmissionList/SmsOutBox/SmsOutBox";
import AdjusterCompanyInfo from "../adjusterCompanyInfo";
import ApplicantWorkLocationInfo from "../applicantWorkLocationInfo";
import ApplicantContrsctEvalution from "../applicantContractEvalution";

const { TabPane } = Tabs;
interface IMoreDatailProps {
  selectedItemManagmentCartable: any;
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
          <TabPane tab="اطلاعات هویتی" key="15">
            <AdjusterInfoDetail
              selectedItemManagmentCartable={selectedItemManagmentCartable}
              activeTab={activeTab}
            />
          </TabPane>
          <TabPane tab="پیام ها" key="1">
            <Tabs type="card">
              <TabPane tab="پیام های فردی/ گروهی" key="1">
                {/* <SmsOutBoxApplicantId
                  applicantId={selectedItemManagmentCartable.ApplicantId}
                /> */}
                <Message
                  applicantId={selectedItemManagmentCartable.ApplicantId}
                />
              </TabPane>
              <TabPane tab="پیامک های فردی/گروهی" key="2">
                <SmsOutBox isManagmentCartable={true} applicantId={selectedItemManagmentCartable.ApplicantId} />
              </TabPane>
            </Tabs>
          </TabPane>

          <TabPane tab="در خواست ها" key="5">
            <Requests
              applicantId={selectedItemManagmentCartable.ApplicantId}
              isManagmentCartable={true} />
          </TabPane>

          <TabPane tab="شعبه ها" key="8">
            <ApplicantWorkLocationInfo applicantId={selectedItemManagmentCartable.ApplicantId} />
          </TabPane>
          <TabPane tab="قراردادها" key="9">
            <ApplicantContrsctEvalution applicantId={selectedItemManagmentCartable.ApplicantId} />
          </TabPane>
          <TabPane tab="میزان سرمایه" key="10">
            <AdjusterCompanyInfo applicantId={selectedItemManagmentCartable.ApplicantId} />
          </TabPane>
          {/* <TabPane tab="اعضای شرکت" key="12">
            <CompanyMembers
              selectedItemManagmentCartable={selectedItemManagmentCartable}
              isEvaluatorDesktopInformation={GetWay.managmentCatable}
            />
          </TabPane> */}
        </Tabs>
      </ConfigProvider>
    </>
  );
};

export default MoreDetail;
