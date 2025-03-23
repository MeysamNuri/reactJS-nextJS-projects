import React, { FC } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
// import classes from "./FinalApproval.module.css";

//components
import moment from "jalali-moment";

interface IWorkExperiencesFeedback {
  workExperiences: any;
}
const WorkExperiencesFeedback: FC<IWorkExperiencesFeedback> = ({
  workExperiences,
}) => {
  const dataSource = workExperiences;
  const base = useSelector((state: any) => state.baseData);

  // let findCompany = base?.baseInfo?.Result?.Companys.find(
  //   ({ Id, Title }: { Id: number; Title: string }) =>
  //     workExperiences?.CompanyId === Id
  // );

  const columns = [
    { title: "تاریخ شروع", dataIndex: "StartDate", key: "StartDate" },
    { title: "تاریخ پایان", dataIndex: "EndDate", key: "EndDate" },
    { title: "سمت", dataIndex: "Position", key: "Position" },
    {
      title: "هنوز مشغول هستم",
      dataIndex: "StillWorkingText",
      key: "StillWorkingText",
    },
    { title: "شرکت", dataIndex: "CompanyName", key: "CompanyName" },
  ];

  if (dataSource !== undefined || dataSource !== null) {
    dataSource?.forEach((i: any) => {
      const firstFourDigitsCharacterStartDate = i?.StartDate?.substring(0, 4);
      const firstFourDigitsNumberStartDate = parseInt(
        firstFourDigitsCharacterStartDate
      );
      if (firstFourDigitsNumberStartDate > 1910) {
        i["StartDate"] = moment(i?.StartDate?.split("T")[0])?.format(
          "jYYYY-jM-jD"
        );
      }

      const firstFourDigitsCharacterEndDate = i?.EndDate?.substring(0, 4);
      const firstFourDigitsNumberEndDate = parseInt(
        firstFourDigitsCharacterEndDate
      );
      if (firstFourDigitsNumberEndDate > 1910) {
        i["EndDate"] = moment(i?.EndDate?.split("T")[0])?.format("jYYYY-jM-jD");
      }

      i["StillWorkingText"] = i?.StillWorking ? "بلی" : "خیر";

      let findCompany = base?.baseInfo?.Result?.Companys?.find(
        ({ Id, Title }: { Id: number; Title: string }) => i?.CompanyId === Id
      );
      i["CompanyName"] = findCompany?.Title
        ? findCompany?.Title
        : i?.CompanyName;
    });
  }

  return (
    // <div className={classes.card}>
    //   <Row className={classes.rowCard}>
    //     <Col sm={6}>
    //       {moment(workExperiences?.EndDate?.split("T")[0]).format(
    //         "jYYYY-jM-jD"
    //       )}
    //     </Col>

    //     <Col sm={6}>
    //       {moment(workExperiences?.StartDate?.split("T")[0]).format(
    //         "jYYYY-jM-jD"
    //       )}
    //     </Col>
    //     <Col sm={6}>{workExperiences?.Position}</Col>
    //     <Col sm={6}>{findCompany?.Title}</Col>
    //   </Row>
    // </div>
    <Table dataSource={dataSource} columns={columns} pagination={false} />
  );
};

export default WorkExperiencesFeedback;
