import React, { FC } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
// import classes from "./FinalApproval.module.css";

//components
import moment from "jalali-moment";

interface IStockhodlerFeedbackProps {
  stockholders: any;
}

const StockholderFeedback: FC<IStockhodlerFeedbackProps> = ({
  stockholders,
}) => {
  // const base = useSelector((state: any) => state?.baseData);

  const dataSource = stockholders;

  const columns = [
    {
      title: "کد ملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
    },
    { title: "تاریخ تولد", dataIndex: "BirthDate", key: "BirthDate" },
    {
      title: "تعداد سهم",
      dataIndex: "ShareAmount",
      key: "ShareAmount",
    },
    { title: "تاریخ سهامدار شدن", dataIndex: "JoinDate", key: "JoinDate" },
  ];

  if (dataSource !== undefined || dataSource !== null) {
    dataSource?.forEach((i: any) => {
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

      const firstFourDigitsCharacterJoinDate = i?.JoinDate?.substring(0, 4);
      const firstFourDigitsNumberJoinDate = parseInt(
        firstFourDigitsCharacterJoinDate
      );
      if (firstFourDigitsNumberJoinDate > 1910) {
        i["JoinDate"] = moment(i?.JoinDate?.split("T")[0])?.format(
          "jYYYY-jM-jD"
        );
      }

      i["NationalCode"] = i?.IdentityInfo?.NationalCode;
    });
  }

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default StockholderFeedback;
