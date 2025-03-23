import React, { useState, FC } from "react";
import { usePaginatedQuery } from "react-query";
import { Table, ConfigProvider, Pagination } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { IWorkFlowTask } from "../../../shared/ulitities/Model/workTaskFlow";
import { workFlowTask } from "../../../shared/ulitities/Enums/workTaskFlow";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";
import { api } from "../../../httpServices/service";

interface IWorkFlowTaskProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  isManagmentCartable?: boolean;
  isEvaluatorDesktopInformation?: number;
}

const WorkFlowTask: FC<IWorkFlowTaskProps> = ({
  oneAdjusterList,
  isManagmentCartable,
  isEvaluatorDesktopInformation,
}) => {
  const [pageModel, setPageModel] = useState({
    pageSize: isManagmentCartable ? 4 : 5,
    current: 1,
  });
  const loadingRefer = useSelector((state: any) => state.reffer.loading);
  let userRecognition = Number(localStorage.getItem("userRecognition"));
  const taskHandler = (task: IWorkFlowTask) => {
    let result = "";
    switch (task.FromStep || task.CurrentStep) {
      case "InitialSubmissionApplicant":
        result = workFlowTask.InitialSubmissionApplicant;
        break;
      case "AdmissionExpert":
        result = workFlowTask.AdmissionExpert;
        break;
      case "ReturnToApplicant":
        result = workFlowTask.ReturnToApplicant;
        break;
      case "RejectionAdmissionExpert":
        result = workFlowTask.RejectionAdmissionExpert;
        break;
      case "InterviewInvitation":
        result = workFlowTask.InterviewInvitation;
        break;
      case "ReadyToInterview":
        result = workFlowTask.ReadyToInterview;
        break;
      case "RejectedInInterview":
        result = workFlowTask.RejectedInInterview;
        break;
      case "Absence":
        result = workFlowTask.Absence;
        break;
      case "ReturnToApplicantToCompleteDossier":
        result = workFlowTask.ReturnToApplicantToCompleteDossier;
        break;
      case "CompletedDossier":
        result = workFlowTask.CompletedDossier;
        break;
      case "OfficeBoss":
        result = workFlowTask.OfficeBoss;
        break;
      case "Deputy":
        result = workFlowTask.Deputy;
        break;
      case "GeneralManager":
        result = workFlowTask.GeneralManager;
        break;
      case "ExistingEvaluator":
        result = workFlowTask.ExistingEvaluator;
        break;
      case "FinalReject":
        result = workFlowTask.FinalReject;
        break;
    }
    return result;
  };

  const taskCurrentStepHandler = (task: IWorkFlowTask) => {
    let result = "";
    switch (task.CurrentStep) {
      case "InitialSubmissionApplicant":
        result = workFlowTask.InitialSubmissionApplicant;
        break;
      case "AdmissionExpert":
        result = workFlowTask.AdmissionExpert;
        break;
      case "ReturnToApplicant":
        result = workFlowTask.ReturnToApplicant;
        break;
      case "RejectionAdmissionExpert":
        result = workFlowTask.RejectionAdmissionExpert;
        break;
      case "InterviewInvitation":
        result = workFlowTask.InterviewInvitation;
        break;
      case "ReadyToInterview":
        result = workFlowTask.ReadyToInterview;
        break;
      case "RejectedInInterview":
        result = workFlowTask.RejectedInInterview;
        break;
      case "Absence":
        result = workFlowTask.Absence;
        break;
      case "ReturnToApplicantToCompleteDossier":
        result = workFlowTask.ReturnToApplicantToCompleteDossier;
        break;
      case "CompletedDossier":
        result = workFlowTask.CompletedDossier;
        break;
      case "OfficeBoss":
        result = workFlowTask.OfficeBoss;
        break;
      case "Deputy":
        result = workFlowTask.Deputy;
        break;
      case "GeneralManager":
        result = workFlowTask.GeneralManager;
        break;
      case "ExistingEvaluator":
        result = workFlowTask.ExistingEvaluator;
        break;
      case "FinalReject":
        result = workFlowTask.FinalReject;
        break;
    }
    return result;
  };
  //api Request adjusterListPagination
  const fetchWorkFlowTask = (key: number, page = 1) =>
    isEvaluatorDesktopInformation === GetWay.desktop
      ? api.get(
          `/admission/cartable/applicant-work-flow-task?applicntId=${userRecognition}&pageSize=${pageModel.pageSize}&pageNo=${pageModel.current}`
        )
      : api.get(
          `/admission/cartable/applicant-work-flow-task?applicntId=${oneAdjusterList?.ApplicantId}&pageSize=${pageModel.pageSize}&pageNo=${pageModel.current}`
        );

  const { resolvedData, latestData, status } = usePaginatedQuery(
    [
      "workFlowList",
      pageModel.current,
      oneAdjusterList?.ApplicantId,
      loadingRefer,
    ],
    fetchWorkFlowTask
  );

  let dataTask = resolvedData?.data?.Result?.map(
    (task: IWorkFlowTask, index: number) => {
      let history = {
        key: index,
        CreatedDate: moment(task?.CreatedDate?.split("T")[0]).format(
          "jYYYY-jM-jD"
        ),
        CurrentStep: taskCurrentStepHandler(task),
        FromStep: taskHandler(task),
        Message: task.Message,
        SendingSmsDate: task.SendingSmsDate,
        SmsText: task.SmsText,
        UserTitle: task.UserTitle,
      };
      return history;
    }
  );

  let columns = [
    {
      title: "وضعیت قبلی",
      dataIndex: "FromStep",
      key: "FromStep",
    },

    {
      title: "وضعیت جدید",
      dataIndex: "CurrentStep",
      key: "CurrentStep",
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
    },
    {
      title: "ثبت کننده",
      dataIndex: "UserTitle",
      key: "UserTitle",
    },
    {
      title: "توضیحات",
      dataIndex: "Message",
      key: "Message",
    },
  ];

  //change Page
  const changePageHandler = (current: number) => {
    setPageModel({
      ...pageModel,
      current: current,
    });
  };
  return (
    <div className="workTaskFlow">
      <Table
        dataSource={dataTask}
        pagination={false}
        columns={columns}
        loading={status === "loading"}
        locale={{ emptyText: "برای متقاضی جاری سابقه ای مشاهده نگردید." }}
      />
      <ConfigProvider direction="rtl">
        <Pagination
          total={resolvedData?.data?.TotalCount??0}
          pageSize={pageModel.pageSize}
          showTotal={(total, range) =>
            `تعداد سوابق تغییرات:   ${latestData?.data.TotalCount??0} `
          }
          current={pageModel.current}
          onChange={(current: number) => changePageHandler(current)}
          size="small"
        />
      </ConfigProvider>
    </div>
  );
};

export default WorkFlowTask;
