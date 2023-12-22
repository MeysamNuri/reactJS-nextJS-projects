import React, { useState, useEffect, FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import Documents from "../../../Documents/Documents";
import WorkExperienceApprove from "../../../workExperienceApprove/WorkExperienceApprove";
import Attachment from "../../../Attachment/Attachment";
import Note from "../../../Note/Note";
import WorkFlowTask from "../../../WorkFlowTask/WorkFlowTask";
import InformationAdjuster from "../InformationAdjuster";
import DescriptionAdjusterFile from "../AdjusterInfoDetail/DescriptionAdjusterInfo/DescriptionAdjusterFile";
import FamilyMembers from "../../../FamilyMember";
import FieldInfo from "../../../fieldInfo/FIeldInfo";
import SmsOutBoxApplicantId from "../../../SmsOutBox/SmsOutBoxApplicantId";
import Inquiry from "../../../inquiry/Inquiry";
import { IAneAdjusterList } from "../../../../../shared/ulitities/Model/oneAdjuster";
import { messageError } from "../../../../../utils/utils";
import { GetWay } from "../../../../../shared/ulitities/Enums/getWay";
import * as api from "../../../ServicesCartable/AdmissionListServices";

const { TabPane } = Tabs;

interface IAdjusterInfoDetailProps {
  oneAdjusterList?: IAneAdjusterList;
  closeFileDetail?: () => void;
  isFromReportTable?: boolean;
  recordReport?: any 
  adjType?: number;
  activeTabInbox?: string;
  isInterviewInvitation?: boolean;
  modelReport?: any;
  isEvaluatorDesktopInformation?: number;
}

const AdjusterInfoDetail: FC<IAdjusterInfoDetailProps> = ({
  oneAdjusterList,
  closeFileDetail,
  isFromReportTable,
  adjType,
  activeTabInbox,
  isInterviewInvitation,
  modelReport,
  isEvaluatorDesktopInformation,
  recordReport
}) => {
  const [personalInfoDetail, setPersonalInfoDetail] = useState([] as any);
  // let userRecognition = Number(localStorage.getItem("userRecognition"));
  const [activeTab, setActiveTab] = useState("1");

  async function getPesonalDetail() {
    try {
      const data =
        isEvaluatorDesktopInformation === GetWay.desktop
          ? await api.getAdjusterDesktopPersonalInfoDetail()
          : await api.getPersonalInfoDetail(oneAdjusterList?.ApplicantId);

      if (data.IsSucceed == false) {
        messageError(data.Message);
      } else {
        data && setPersonalInfoDetail(data?.Result);
      }
    } catch (err) {
    } finally {
    }
  }

  useEffect(() => {
    getPesonalDetail();
  }, [oneAdjusterList?.ApplicantId]);

  return (
    <div>
      <ConfigProvider direction="rtl">
        <InformationAdjuster
          recordReport={recordReport} 
          oneAdjusterList={oneAdjusterList}
          closeFileDetail={closeFileDetail}
          personalInfoDetail={personalInfoDetail}
          isFromReportTable={isFromReportTable}
          activeTabInbox={activeTabInbox}
          isInterviewInvitation={isInterviewInvitation}
          modelReport={modelReport}
          isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
        />
        <Tabs
          defaultActiveKey="جزییات پرونده"
          onChange={(key) => setActiveTab(key)}
          style={{ paddingTop: "30px" }}
        >
          <TabPane tab="جزییات پرونده" key="1">
            {activeTab === "1" && (
              <DescriptionAdjusterFile
                personalInfoDetail={personalInfoDetail}
              />
            )}
          </TabPane>
          <TabPane tab="افراد سببی نسبی" key="2">
            {activeTab === "2" && (
              <FamilyMembers personalInfoDetail={personalInfoDetail} />
            )}
          </TabPane>
          <TabPane tab="سوابق" key="3">
            {activeTab === "3" && (
              <WorkExperienceApprove
                oneAdjusterList={oneAdjusterList}
                isFromReportTable={isFromReportTable}
                isManagmentCartable={false}
                activeTabInbox={activeTabInbox}
                isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              />
            )}
          </TabPane>
          <TabPane tab="مدارک" key="4">
            {activeTab === "4" && (
              <Documents
                oneAdjusterList={oneAdjusterList}
                isFromReportTable={isFromReportTable}
                activeTabInbox={activeTabInbox}
                isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              />
            )}
          </TabPane>
          {isEvaluatorDesktopInformation !== GetWay.desktop && (
            <TabPane tab="سابقه تغییرات" key="5">
              {activeTab === "5" && (
                <WorkFlowTask
                  oneAdjusterList={oneAdjusterList}
                  isFromReportTable={isFromReportTable}
                  isManagmentCartable={false}
                  isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
                />
              )}
            </TabPane>
          )}
          {isEvaluatorDesktopInformation !== GetWay.desktop && (
            <TabPane tab="یادداشت" key="6">
              {activeTab === "6" && (
                <Note
                  oneAdjusterList={oneAdjusterList}
                  isFromReportTable={isFromReportTable}
                  isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
                />
              )}
            </TabPane>
          )}

          {isEvaluatorDesktopInformation !== GetWay.desktop && (
            <TabPane tab="پیوست ها" key="7">
              {activeTab === "7" && (
                <Attachment
                  oneAdjusterList={oneAdjusterList}
                  isFromReportTable={isFromReportTable}
                  isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
                />
              )}
            </TabPane>
          )}
          {isFromReportTable ||
            (isEvaluatorDesktopInformation === GetWay.desktop && (
              <TabPane tab="رشته ها" key="8">
                {activeTab === "8" && (
                  <FieldInfo
                    oneAdjusterList={oneAdjusterList}
                    adjType={adjType}
                    isEvaluatorDesktopInformation={
                      isEvaluatorDesktopInformation
                    }
                  />
                )}
              </TabPane>
            ))}
          {isEvaluatorDesktopInformation !== GetWay.desktop && (
            <TabPane tab="استعلامات" key="9">
              {activeTab === "9" && (
                <Inquiry oneAdjusterList={oneAdjusterList} />
              )}
            </TabPane>
          )}
          <TabPane tab="پیامک های ارسالی" key="10">
            {activeTab === "10" && (
              <SmsOutBoxApplicantId
                applicantId={oneAdjusterList?.ApplicantId}
              />
            )}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default AdjusterInfoDetail;
