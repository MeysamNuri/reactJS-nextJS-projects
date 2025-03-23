import React, { FC } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

//styles
import classes from "./FinalApproval.module.css";

//components
import moment from "jalali-moment";

interface IWorkExperiencesFeedbackProps {
  dataState: any;
}

const WorkExperiencesFeedback: FC<IWorkExperiencesFeedbackProps> = ({
  dataState,
}) => {
  const base = useSelector((state: any) => state?.baseData);

  const dataSource = dataState?.Result?.WorkExperiences;

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

  // let findCompany = base?.baseInfo?.Result?.Companys.find(
  //   ({ Id, Title }: { Id: number; Title: string }) =>
  //     i?.CompanyId === Id
  // );
  return (
    // <div className={classes.card}>
    //   <Row className={classes.rowCard}>
    //     <Col sm={3}>
    //       {/* {workExperiences?.Certificates?.map((i: any) => (
    //         <img
    //           src={"data:image/png;base64," + i?.Content}
    //           alt="certificatePic"
    //           //width="128"
    //           height="64"
    //           style={{ display: "block", margin: "5px" }}
    //         />
    //       ))}{" "} */}
    //     </Col>
    //     <Col sm={4}>
    //       {moment(workExperiences?.StartDate?.split("T")[0]).format(
    //         "jYYYY-jM-jD"
    //       )}
    //     </Col>
    //     <Col sm={4}>
    //       {moment(workExperiences?.EndDate?.split("T")[0]).format(
    //         "jYYYY-jM-jD"
    //       )}
    //     </Col>
    //     <Col sm={4}>{workExperiences?.Position}</Col>
    //     <Col sm={4}>
    //       {workExperiences?.StillWorking ? <div>بلی</div> : <div>خیر</div>}
    //     </Col>
    //     <Col sm={4}>
    //       {findCompany?.Title === undefined
    //         ? workExperiences?.CompanyName
    //         : findCompany?.Title}
    //     </Col>
    //   </Row>
    // </div>
    <Table 
      dataSource={dataSource}
       columns={columns}
        pagination={false} 
      locale={{
      emptyText:
        "سابقه کاری اضافه نگردیده است.",
    }}    />
  );
};

export default WorkExperiencesFeedback;
