import React, { useEffect, useState } from "react";
import {
  Layout,
  ILayoutLink,
  ConfigProvider,
  AuthValue,
  Login,
  FindAccess,
} from "sanhab-components-library";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import HttpBaseConstant from "../controler/services/HttpBaseConstant";
import Adjusters from "../container/Adjusters/Adjusters";
import AdmissionList from "../container/AdmissionList/AdmissionList";
import ContractEvalution from "../container/AdmissionList/contractEvalution";
import MonitoringReport from "../container/AdmissionList/monitoringReport";
import ApplicantWarningsInfo from "../container/AdmissionList/applicantWarningsInfo";
import MonthlyPerformanceReport from "../container/AdmissionList/monthlyPerformance";
import EmployeeInformation from "../container/AdmissionList/employeeInformation";
import CartableReport from "../container/AdmissionList/cartableReport/CartableReport";
import Desktop from "../container/DeskTop/DeskTop";
import AssessorsFiles from "../container/FileAssigner/fileAssigner";
import SmsOutBox from "../container/AdmissionList/SmsOutBox/SmsOutBox";
import DesktopMessageSms from "../container/AdmissionList/SmsOutBox/DesktopMessageSms";
import StatisicalReports from "../container/AdmissionList/StatisticalReports/StatisticalReports";
import ManagmentCartable from "../container/DeskTop/monitorDesktop/managmentCartable/ManagmentCartable"; 
import SendSmsSpecificType from "../container/DeskTop/monitorDesktop/sendSmsSpecificType/index"; 
import ApplicantWorkBranches from "../container/DeskTop/monitorDesktop/workBranches/index"; 
import ApplicantForbiddenCartable from "../container/DeskTop/applicantForbidden/applicantForbiden";
import RequestsCartable from "../container/DeskTop/monitorDesktop/requestsCartable/RequestCartable";
import ArchivedFiles from "../container/AdmissionList/archivedFiles/ArchivedAdjType";
import MonitorNotifications from "../container/DeskTop/adjustersDesktop/notifications/monitorNotifications";
import FileNaturalAssessors from "../container/AdmissionList/fileNaturalAssessors/FileNaturalAssessors";
import { userAccessList } from "../shared/ulitities/Enums/userAccessList";
import Error500 from "../container/Error500";
import { getUserRecognition } from "../redux/actions";
import Loading from '../components/loading/loading'
import "sanhab-components-library/src/assets/styles/main.sass";

const CentinsurLogin = () => {
  const dispatch = useDispatch();
  const [userRecognitionHaveError, setUserRecognitionHaveError] = useState(
    false
  );

  // const userIdLogin = useSelector(
  //   (state: any) => state.userLogin.userLogin?.Result
  // );
  const { loading, userLogin } = useSelector((state: any) => state.userLogin);
  const [loginLoading, setLoginLoading] = useState(false);

  let userId = AuthValue()?.userId;
  let user = {
    userId: userId,
  };
  const links: ILayoutLink[] = [
    {
      path: "/base-info",
      title: "اطلاعات پایه",
      accessId: true,
      component: Adjusters,
      subLink: [],
    },
    {
      path: "/admission",
      title: "پذیرش",
      accessId: true,
      component: undefined,
      subLink: [
        {
          path: "/fileAssigner",
          title: "پرونده های اولیه",
          accessId: true,
          component: AssessorsFiles,
          subLink: [],
        },
        {
          path: "/admissionOfficeList",
          title: "کارتابل",
          accessId: true,
          component: AdmissionList,
          subLink: [],
        },
        {
          path: "/fileNaturalAssessors",
          title: "پرونده ارزیابان حقیقی",
          accessId:
            FindAccess(userAccessList.Adjusters_ViewReadyToInterviewDocument) &&
            FindAccess(userAccessList.Adjusters_ViewInterviewInvitationDocument) &&
            FindAccess(userAccessList.Adjusters_ViewFilingDocument),
          component: FileNaturalAssessors,
          subLink: [],
        },
        {
          path: "/cartableReport",
          title: "گزارشات کارتابل",
          accessId: FindAccess(userAccessList.Adjusters_CartableReport),
          component: CartableReport,
          subLink: [],
        },
        {
          path: "/statisicalReports",
          title: "گزارشات آماری",
          accessId: FindAccess(userAccessList.Adjusters_ViewReport),
          component: StatisicalReports,
          subLink: [],
        },
        {
          path: "/smsOutBoxList",
          title: "پیامک های ارسالی پذیرش",
          accessId: FindAccess(userAccessList.Adjusters_SmsOutBox),
          component: SmsOutBox,
          subLink: [],
        },
        {
          path: "/archivedFiles",
          title: "پرونده های بایگانی شده",
          accessId: FindAccess(userAccessList.Adjusters_ViewArchiveFiles),
          component: ArchivedFiles,
          subLink: [],
        },
      
      ],
    },
    {
      path: "/monitoring",
      title: "نظارت",
      accessId: true,
      component: undefined,
      subLink: [
        {
          path: "/managment-cartable",
          title: "کارتابل مدیریت",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: ManagmentCartable,
          subLink: [],
        },
        {
          path: "/applicant-forbidden",
          title: "کارتابل شاخص ها",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: ApplicantForbiddenCartable,
          subLink: [],
        },
        {
          path: "/request-cartable",
          title: "کارتابل در خواست ها",
          accessId: FindAccess(userAccessList.Adjusters_ViewRequestCartable),
          component: RequestsCartable,
          subLink: [],
        },
    

        {
          path: "/contract-evalution",
          title: "قرارداد های ارزیاب خسارت",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: ContractEvalution,
          subLink: [],
        },
        {
          path: "/monthly-performance",
          title: "گزارش عملکرد ماهانه",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: MonthlyPerformanceReport,
          subLink: [],
        },
        {
          path: "/employee-information",
          title: "اطلاعات کارکنان",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: EmployeeInformation,
          subLink: [],
        },
        {
          path: "/applicant-warning",
          title: "اخطارها",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: ApplicantWarningsInfo,
          subLink: [],
        },
        {
          path: "/monitoring-report",
          title: "گزارش نظارت",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: MonitoringReport,
          subLink: [],
        },
        {
          path: "/desktopSmsOutBoxList",
          title: "پیامک های ارسالی نظارت",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: DesktopMessageSms,
          subLink: [],
        },
        {
          path: "/notifications",
          title: "بخشنامه ها و اعلامیه ها",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: MonitorNotifications,
          subLink: [],
        },
        {
          path: "/send-sms-specific-type",
          title: "ارسال پیامک انبوه",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable) && FindAccess(userAccessList.Adjusters_SendGroupSms),
          component: SendSmsSpecificType,
          subLink: [],
        },
        {
          path: "/work-branches",
          title: "کارتابل شعب",
          accessId: FindAccess(userAccessList.Adjusters_ViewManagementCartable),
          component: ApplicantWorkBranches,
          subLink: [],
        },
      ],
    },
   
  
  
  ];

  useEffect(() => {
    if (userId === undefined) {
    } else {
      setLoginLoading(true);
      dispatch(
        getUserRecognition(
          user,
          () => {
            setUserRecognitionHaveError(false);
          },
          () => {
            setUserRecognitionHaveError(true);
          }
        )
      );
    }
  }, [userId]);

  return (
    <ConfigProvider>
      {loginLoading === true && loading ? (
        <Loading />
      ) : userLogin?.Result?.RecognitionUser === 2 ? (
        <Desktop />
      ) : userLogin?.Result?.RecognitionUser === 3 || userLogin?.Result === undefined ? (
        <Layout
          softwareCode={2500}
          links={links}
          authorizationUrl={HttpBaseConstant.login}
          backendUrl={HttpBaseConstant.url}
          mode={process.env.NODE_ENV}
          ssoUrl={HttpBaseConstant.ssoUrl}

        // loginComponent={
        //   <Login
        //     pushPath="/"
        //     timer={1140}
        //     submitUrl={`${HttpBaseConstant.login}/security/captchalogin`}
        //     captchaUrl={`${HttpBaseConstant.login}/Captcha/GetBase64`}
        //   />
        // }
        />

      ) : userRecognitionHaveError ? (
        <>
          <Error500 />
        </>
      ) : (
                <div className="customSpin">
                  <Spin />
                </div>
              )}
    </ConfigProvider>
  );
};

export default CentinsurLogin;
