import React, { useState, useEffect, FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import Documents from "../../../Documents/Documents";
import WorkExperienceApprove from "../../../workExperienceApprove/WorkExperienceApprove";
import WorkFlowTask from "../../../WorkFlowTask/WorkFlowTask";
import InformationAdjuster from "../InformationAdjuster";
import Attachment from "../../../Attachment/Attachment";
import Note from "../../../Note/Note";
import DescriptionAdjusterFile from "../AdjusterInfoDetail/DescriptionAdjusterInfo/DescriptionAdjusterFile";
import FamilyMembers from "../../../FamilyMember";
import FieldInfo from "../../../fieldInfo/FIeldInfo";
import SmsOutBoxApplicantId from "../../../SmsOutBox/SmsOutBoxApplicantId";
import { IAneAdjusterList } from "../../../../../shared/ulitities/Model/oneAdjuster";
import { GetWay } from "../../../../../shared/ulitities/Enums/getWay";
import { messageError } from "../../../../../utils/utils";
import Inquiry from "../../../inquiry/Inquiry";
import * as api from "../../../ServicesCartable/AdmissionListServices";

const { TabPane } = Tabs;

interface IAdjusterInfoDetailProps {
  oneAdjusterList?: IAneAdjusterList;
  isEvaluatorDesktopInformation?: number;
  closeFileDetail?: () => void;
  isFromReportTable?: boolean;
  adjType?: number;
  activeTabInbox?: string;
}

const AdjusterInfoDetail: FC<IAdjusterInfoDetailProps> = ({
  oneAdjusterList,
  closeFileDetail,
  isFromReportTable,
  adjType,
  activeTabInbox,
  isEvaluatorDesktopInformation,
}) => {
  const [personalInfoDetail, setPersonalInfoDetail] = useState([] as any);
  const [activeTab, setActiveTab] = useState("1");
  let userRecognition = Number(localStorage.getItem("userRecognition"));

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
  }, [oneAdjusterList?.ApplicantId, userRecognition]);

  return (
    <ConfigProvider direction="rtl">
      <InformationAdjuster
        oneAdjusterList={oneAdjusterList}
        closeFileDetail={closeFileDetail}
        personalInfoDetail={personalInfoDetail}
        isFromReportTable={isFromReportTable}
        activeTabInbox={activeTabInbox}
        isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
      />
      <Tabs
        defaultActiveKey="جزییات پرونده"
        onChange={(key) => setActiveTab(key)}
        style={{ paddingTop: "30px" }}
      >
        <TabPane tab="جزییات پرونده" key="1">
          {activeTab === "1" && (
            <DescriptionAdjusterFile personalInfoDetail={personalInfoDetail} />
          )}
        </TabPane>
        <TabPane tab="افراد سببی نسبی" key="2">
          {activeTab === "2" && (
            <FamilyMembers personalInfoDetail={personalInfoDetail} />
          )}
        </TabPane>
        {/* <TabPane tab="سوابق" key="3"> */}
          {/* {activeTab === "3" && ( 
            <WorkExperienceApprove
              oneAdjusterList={oneAdjusterList}
              isFromReportTable={isFromReportTable}
              activeTabInbox={activeTabInbox}
              isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
            />
          )} */}
        {/* </TabPane> */}
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
                  isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
                />
              )}
            </TabPane>
          ))}
        {isEvaluatorDesktopInformation !== GetWay.desktop && (
          <TabPane tab="استعلامات" key="9">
            {activeTab === "9" && <Inquiry oneAdjusterList={oneAdjusterList} />}
          </TabPane>
        )}
        <TabPane tab="پیامک های ارسالی" key="10">
          {activeTab === "10" && (
            <SmsOutBoxApplicantId applicantId={oneAdjusterList?.ApplicantId} />
          )}
        </TabPane>
      </Tabs>
    </ConfigProvider>
  );
};

export default AdjusterInfoDetail;
