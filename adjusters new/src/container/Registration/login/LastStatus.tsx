import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";
// import Finger from "../../../assets/images/finger.png";
import { Timeline } from "antd";
import {
  workTaskFlowId,
} from "../../../shared/ulitities/Enums/workTaskFlow";

const LastStatus = () => {
  const lastStatus = useSelector(
    (state: any) =>
      state?.lastStatusOfApplicantInAllStates?.lastStatusMessage?.Result
  );

  const [find2, setfind2] = useState<any>();

  let states = [
    { StateId: 0, SortId: 0, Title: "ارسال اولیه متقاضی" },
    { StateId: 1, SortId: 1, Title: "کارشناس پذیرش" },
    { StateId: 2, SortId: 2, Title: "برگشت به متقاضی" },
    { StateId: 3, SortId: 3, Title: "رد کارشناس پذیرش" },
    { StateId: 7, SortId: 4, Title: "آماده به مصاحبه" },
    { StateId: 4, SortId: 5, Title: "دعوت به مصاحبه" },
    { StateId: 5, SortId: 6, Title: "مردود در مصاحبه" },
    { StateId: 6, SortId: 7, Title: "غایب در مصاحبه" },
    { StateId: 8, SortId: 8, Title: "بازگشت به متقاضی جهت تکمیل پرونده" },
    { StateId: 9, SortId: 9, Title: "پرونده تکمیل شده" },
    { StateId: 10, SortId: 10, Title: "رئیس اداره" },
    { StateId: 11, SortId: 11, Title: "معاون" },
    { StateId: 12, SortId: 12, Title: "مدیر کل" },
    { StateId: 13, SortId: 13, Title: "رد نهایی" },
    { StateId: 14, SortId: 14, Title: "تایید نهایی" },
  ];

  const findStateId = () => {
    let findState = states.find(
      (state: any) => state.StateId === lastStatus?.StateId
    );
    setfind2(findState);
  };

  useEffect(() => {
    findStateId();
  }, []);

  const filterByID = (state: any) => {
    if (
      state.StateId !== workTaskFlowId.RejectedInInterview &&
      state.StateId !== workTaskFlowId.Absence &&
      state.StateId !== workTaskFlowId.RejectionAdmissionExpert
    ) {
      return true;
    }
    return false;
  };

  const filterByExistingEvaluator = (state: any) => {
    if (
      state.StateId !== workTaskFlowId.RejectedInInterview &&
      state.StateId !== workTaskFlowId.Absence &&
      state.StateId !== workTaskFlowId.RejectionAdmissionExpert &&
      state.StateId !== workTaskFlowId.FinalReject
    ) {
      return true;
    }
    return false;
  };

  let test: any;
  const findState = () => {
    if (
      lastStatus?.StateId === workTaskFlowId.CompletedDossier ||
      lastStatus?.StateId === workTaskFlowId.ReturnToApplicantToCompleteDossier
    ) {
      test = states
        .filter((state) => filterByID(state))
        .map((state) => {
          return (
            <Timeline.Item
              color={state.StateId === lastStatus?.StateId ? "blue" : "yellow"}
              key={state.StateId}
              dot={
                state.StateId < find2?.StateId && (
                  <CheckOutlined style={{ color: "green" }} />
                )
              }
            >
              {state.Title}
            </Timeline.Item>
          );
        });
    } else if (lastStatus?.StateId === workTaskFlowId.ExistingEvaluator) {
      test = states
        .filter((state) => filterByExistingEvaluator(state))
        .map((state) => {
          return (
            <Timeline.Item
              color={state.StateId === lastStatus?.StateId ? "blue" : "yellow"}
              key={state.StateId}
              dot={
                state.StateId < find2?.StateId && (
                  <CheckOutlined style={{ color: "green" }} />
                )
              }
            >
              {state.Title}
            </Timeline.Item>
          );
        });
    } else if (lastStatus?.StateId === workTaskFlowId.InterviewInvitation) {
      test = states
        .filter(
          (state) => state.StateId !== workTaskFlowId.RejectionAdmissionExpert
        )
        .map((state) => {
          return (
            <Timeline.Item
              color={state.StateId === lastStatus?.StateId ? "blue" : "yellow"}
              key={state.StateId}
              dot={
                state.SortId < find2?.SortId && (
                  <CheckOutlined style={{ color: "green" }} />
                )
              }
            >
              {state.Title}
            </Timeline.Item>
          );
        });
    } else if (lastStatus?.StateId === workTaskFlowId.ReadyToInterview) {
      test = states
        .filter(
          (state) => state.StateId !== workTaskFlowId.RejectionAdmissionExpert
        )
        .map((state) => {
          return (
            <Timeline.Item
              color={state.StateId === lastStatus?.StateId ? "blue" : "yellow"}
              key={state.StateId}
              dot={
                state.StateId < find2?.StateId &&
                state.StateId !== workTaskFlowId.RejectedInInterview &&
                state.StateId !== workTaskFlowId.InterviewInvitation &&
                state.StateId !== workTaskFlowId.Absence && (
                  <CheckOutlined style={{ color: "green" }} />
                )
              }
            >
              {state.Title}
            </Timeline.Item>
          );
        });
    } else {
      test = states.map((state) => {
        return (
          <Timeline.Item
            color={state.StateId === lastStatus?.StateId ? "blue" : "yellow"}
            key={state.StateId}
            dot={
              state.StateId < find2?.StateId && (
                <CheckOutlined style={{ color: "green" }} />
              )
            }
          >
            {state.Title}
          </Timeline.Item>
        );
      });
    }

    return test;
  };

  return (
    <>
      <Timeline>{findState()}</Timeline>
    </>
  );
};

export default LastStatus;
