import React, { FC } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

//components
import moment from "jalali-moment";

//styles
import classes from "./FinalApproval.module.css";

interface ICardPersonalInfoFeedbackProps {
  familyMembers: any;
}

const CardPersonalInfoFeedback: FC<ICardPersonalInfoFeedbackProps> = ({
  familyMembers,
}) => {
  const dataSource = familyMembers;

  if (dataSource !== undefined || dataSource !== null) {
    dataSource?.forEach((i: any) => {
      const firstFourDigitsCharactersBirthDate = i?.BirthDate?.substring(0, 4);
      const firstFourDigitsNumbersBirthDate = parseInt(
        firstFourDigitsCharactersBirthDate
      );
      if (firstFourDigitsNumbersBirthDate > 1910) {
        i["BirthDate"] = moment(i?.BirthDate?.split("T")[0])?.format(
          "jYYYY-jM-jD"
        );
      }

      switch (i?.FamilyRelation) {
        case 1:
          i["FamilyRelationText"] = "پدر";
          break;
        case 2:
          i["FamilyRelationText"] = "مادر";
          break;
        case 3:
          i["FamilyRelationText"] = "برادر";
          break;
        case 4:
          i["FamilyRelationText"] = "خواهر";
          break;
        case 5:
          i["FamilyRelationText"] = "همسر";
          break;
        default:
          i["FamilyRelationText"] = "";
      }
    });
  }

  const columns = [
    {
      title: "نسبت",
      dataIndex: "FamilyRelationText",
      key: "FamilyRelationText",
    },
    { title: "نام", dataIndex: "FirstName", key: "FirstName" },
    { title: "نام خانوادگی", dataIndex: "FamilyName", key: "FamilyName" },
    { title: "تاریخ تولد", dataIndex: "BirthDate", key: "BirthDate" },
    { title: "کد ملی", dataIndex: "NationalCode", key: "NationalCode" },
  ];

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default CardPersonalInfoFeedback;
