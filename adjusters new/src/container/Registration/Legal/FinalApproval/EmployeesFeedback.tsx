import React, { FC } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
// import classes from "./FinalApproval.module.css";

//components
import moment from "jalali-moment";

interface IEmployeesFeedbackProps {
  Employees: any;
}

const EmployeesFeedback: FC<IEmployeesFeedbackProps> = ({ Employees }) => {
  const base = useSelector((state: any) => state?.baseData);

  const columns = [
    {
      title: "تاریخ استخدام",
      dataIndex: "EmploymentDate",
      key: "EmploymentDate",
    },
    { title: "رشته تحصیلی", dataIndex: "MajorText", key: "MajorText" },
    { title: "سمت", dataIndex: "PositionText", key: "PositionText" },
    {
      title: "تاریخ تولد",
      dataIndex: "BirthDate",
      key: "BirthDate",
    },
    { title: "کد ملی", dataIndex: "NationalCode", key: "NationalCode" },
  ];

  const dataSource = Employees;

  if (dataSource !== undefined || dataSource !== null) {
    dataSource?.forEach((i: any) => {
      const firstFourDigitsCharacterEmplymentDate = i?.EmploymentDate?.substring(
        0,
        4
      );
      const firstFourDigitsNumberEmplymentDate = parseInt(
        firstFourDigitsCharacterEmplymentDate
      );
      if (firstFourDigitsNumberEmplymentDate > 1910) {
        i["EmploymentDate"] = moment(i?.EmploymentDate?.split("T")[0])?.format(
          "jYYYY-jM-jD"
        );
      }

      const firstFourDigitsCharacterBirthDate = i?.IdentityInfo?.BirthDate?.substring(
        0,
        4
      );
      const firstFourDigitsNumberBirthDate = parseInt(
        firstFourDigitsCharacterBirthDate
      );
      if (firstFourDigitsNumberBirthDate > 1910) {
        i["BirthDate"] = moment(
          i?.IdentityInfo?.BirthDate?.split("T")[0]
        )?.format("jYYYY-jM-jD");
      }

      let findMajor = base?.baseInfo?.Result?.AcademicFields?.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          i.AcademicFieldId === Id
      );
      i["MajorText"] = findMajor?.Title;

      i["NationalCode"] = i?.IdentityInfo?.NationalCode;

      let findPosition = base?.baseInfo?.Result?.Positions?.find(
        ({ Id, Title }: { Id: number; Title: string }) => i.Position === Id
      );
      i["PositionText"] = findPosition?.Title;
    });
  }

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default EmployeesFeedback;
