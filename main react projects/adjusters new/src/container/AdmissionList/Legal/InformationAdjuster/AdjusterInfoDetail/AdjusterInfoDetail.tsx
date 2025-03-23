import React, { useState, useEffect, FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import Documents from "../../../Documents/Documents";
import { useDispatch,useSelector } from "react-redux";
import WorkExperienceApprove from "../../../workExperienceApprove/WorkExperienceApprove";
import Attachment from "../../../Attachment/Attachment";
import Note from "../../../Note/Note";
import WorkFlowTask from "../../../WorkFlowTask/WorkFlowTask";
import InformationAdjuster from "../InformationAdjuster";
import DescriptionAdjusterFile from "../AdjusterInfoDetail/DescriptionAdjusterInfo/DescriptionAdjusterFile";
import CompanyMembers from "./CompanyMembers/CompanyMember";
import FieldInfo from "../../../fieldInfo/FIeldInfo";
import SmsOutBoxApplicantId from "../../../SmsOutBox/SmsOutBoxApplicantId";
import { IAneAdjusterList } from "../../../../../shared/ulitities/Model/oneAdjuster";
import ApplicantWorkLocationInfo from "../../../../DeskTop/monitorDesktop/managmentCartable/applicantWorkLocationInfo";
import * as api from "../../../ServicesCartable/AdmissionListServices";
import { messageError } from "../../../../../utils/utils";
import { adjusterType } from '../../../../../shared/ulitities/Enums/adjusterTypeId';
import { fetchPersonalInfoLegalDetailCartable } from "../../../../../redux/actions";
const { TabPane } = Tabs;

interface IAdjusterInfoDetailProps {
  oneAdjusterList?: IAneAdjusterList;
  closeFileDetail?: () => void;
  isFromReportTable?: boolean;
  adjType?: number;
  admissionType?: string;
  isEvaluatorDesktopInformation?: number;
  activeTabInbox?: string;
  isFromCartable?:boolean
}

const AdjusterInfoDetail: FC<IAdjusterInfoDetailProps> = ({ 
  oneAdjusterList,
  closeFileDetail,
  isFromReportTable,
  adjType,
  admissionType,
  isEvaluatorDesktopInformation,
  activeTabInbox,
  isFromCartable
}) => {
  const [personalInfoDetail, setPersonalInfoDetail] = useState([] as any);
  const [activeTab, setActiveTab] = useState("1");
  let userIdRecognition = Number(localStorage.getItem("userRecognition"));
  let adjusterTypeId = 1;
  const dispatch = useDispatch();
const {personalInfoLegalDetail,loadingPersonalInfoLegal} = useSelector(
  (state: any) => state.listLegalCartable
);
  async function getPesonalDetail() {
    try {
      //setloading(true);
      const data = await api.getAdjusterDesktopPersonalInfoDetail()

      if (data.IsSucceed === false && data.ErrorType === -29) {
        messageError("جزئیات ارزیاب یافت نشد");
      } else if (data.IsSucceed === false) {
      }
      data && setPersonalInfoDetail(data?.Result);
    } catch (err) {
      // console.log(err, "errr");
    } finally {
      //setloading(false);
    }
  }
useEffect(()=>{
  setPersonalInfoDetail(personalInfoLegalDetail?.Result)
},[personalInfoLegalDetail])
  useEffect(() => {
    if(isFromReportTable ||isFromCartable){
      dispatch(
        fetchPersonalInfoLegalDetailCartable( 
          oneAdjusterList?.ApplicantId??0
        )
      );
    }else{
      getPesonalDetail();
    } 
   
  }, [oneAdjusterList?.ApplicantId]); 

  // useEffect(() => {
  //   if (isFromReportTable) {
  //     setPersonalInfoDetail(oneAdjusterList);
  //   }
  // }, [personalInfoDetail]);

  return (
    <div>
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
          defaultActiveKey="جزئیات پرونده"
          onChange={(key) => setActiveTab(key)}
          style={{ paddingTop: "30px" }}
        >
          <TabPane tab="جزئیات پرونده" key="1">
            {activeTab === "1" && (
              <DescriptionAdjusterFile
                personalInfoDetail={personalInfoDetail}
              />
            )}
          </TabPane>

          <TabPane tab="سوابق" key="2">
            {activeTab === "2" && (
              <WorkExperienceApprove
                oneAdjusterList={oneAdjusterList}
                isFromReportTable={isFromReportTable}
                activeTabInbox={activeTabInbox}
                isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              />
            )}
          </TabPane>
          <TabPane tab="مدارک" key="3">
            {activeTab === "3" && (
              <Documents
                oneAdjusterList={oneAdjusterList}
                isFromReportTable={isFromReportTable}
                // isManagmentCartable={false}
                activeTabInbox={activeTabInbox}
                isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              />
            )}
          </TabPane>
          <TabPane tab="اعضای شرکت" key="4">
            {activeTab === "4" && (
              <CompanyMembers
                userIdRecognition={userIdRecognition}
                oneAdjusterList={oneAdjusterList}
                isFromReportTable={isFromReportTable}
                isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
              />
            )}
          </TabPane>
          {oneAdjusterList?.ApplicantId !== undefined && (
            <TabPane tab="سابقه تغییرات" key="5">
              {activeTab === "5" && (
                <WorkFlowTask
                  oneAdjusterList={oneAdjusterList}
                  isFromReportTable={isFromReportTable}
                />
              )}
            </TabPane>
          )}
          {oneAdjusterList?.ApplicantId !== undefined && (
            <TabPane tab="یادداشت" key="6">
              {activeTab === "6" && (
                <Note
                  oneAdjusterList={oneAdjusterList}
                  isFromReportTable={isFromReportTable}
                />
              )}
            </TabPane>
          )}

          {oneAdjusterList?.ApplicantId !== undefined && (
            <TabPane tab="پیوست ها" key="7">
              {activeTab === "7" && (
                <Attachment
                  oneAdjusterList={oneAdjusterList}
                  isFromReportTable={isFromReportTable}
                />
              )}
            </TabPane>
          )}
          {
            <TabPane tab="رشته ها" key="8">
              {activeTab === "8" && (
                <FieldInfo
                  oneAdjusterList={oneAdjusterList}
                  adjType={adjType}
                  admissionType={admissionType}
                />
              )}
            </TabPane>
          }
          {
            <TabPane tab="محل فعالیت" key="9">
              {activeTab === "9" && (
                <ApplicantWorkLocationInfo 
                isFromAdjusterDescktop={true}
                />
              )}
            </TabPane>
          }
          <TabPane tab="پیامک های ارسالی" key="10">
            {activeTab === "10" && (
              <SmsOutBoxApplicantId applicantId={oneAdjusterList?.ApplicantId} />
            )}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default AdjusterInfoDetail;
