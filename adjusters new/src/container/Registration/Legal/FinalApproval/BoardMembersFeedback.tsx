import React, { FC } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

//components
import moment from "jalali-moment";

interface IBoardMembersFeedbackProps {
  boardMembers: any;
}

const BoardMembersFeedback: FC<IBoardMembersFeedbackProps> = ({
  boardMembers,
}) => {
  const base = useSelector((state: any) => state?.baseData);

  const dataSource = boardMembers;

  const columns = [
    { title: "کد ملی", dataIndex: "NationalCode", key: "NationalCode" },
    { title: "نام", dataIndex: "FirstName", key: "FirstName" },
    { title: "نام خانوادگی", dataIndex: "FamilyName", key: "FamilyName" },
    { title: "تاریخ تولد", dataIndex: "BirthDate", key: "BirthDate" },
    {
      title: "تاریخ انتصاب",
      dataIndex: "AppointmentDate",
      key: "AppointmentDate",
    },
    { title: "سمت", dataIndex: "PositionText", key: "PositionText" },
    { title: "رشته", dataIndex: "MajorText", key: "MajorText" },
    {
      title: "رشته تحصیلی",
      dataIndex: "SubAcademicField",
      key: "SubAcademicField",
    },
  ];

  if (dataSource !== undefined || dataSource !== null) {
    dataSource?.forEach((i: any) => {
      i["NationalCode"] = i?.IdentityInfo?.NationalCode;
      i["FirstName"] = i?.IdentityInfo?.FirstName;
      i["FamilyName"] = i?.IdentityInfo?.FamilyName;

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

      const firstFourDigitsCharacterAppointmentDate = i?.AppointmentDate?.substring(
        0,
        4
      );
      const firstFourDigitsNumberAppointmentDate = parseInt(
        firstFourDigitsCharacterAppointmentDate
      );
      if (firstFourDigitsNumberAppointmentDate > 1910) {
        i["AppointmentDate"] = moment(
          i?.AppointmentDate?.split("T")[0]
        )?.format("jYYYY-jM-jD");
      }

      let findPosition = base?.baseInfo?.Result?.Positions?.find(
        ({ Id, Title }: { Id: number; Title: string }) => i?.PositionId === Id
      );
      i["PositionText"] = findPosition?.Title;

      let findMajor = base?.baseInfo?.Result?.AcademicFields?.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          i?.AcademicFieldId === Id
      );
      i["MajorText"] = findMajor?.Title;
    });
  }

  return (
    // <div className={classes.card}>
    //   <Row className={classes.rowCard}>
    //     <Col sm={3}>{boardMember?.IdentityInfo?.NationalCode}</Col>
    //     <Col sm={6}>
    //       {boardMember?.IdentityInfo?.FirstName}{" "}
    //       {boardMember?.IdentityInfo?.FamilyName}
    //     </Col>

    //     <Col sm={3}>
    //       {parseInt(boardMember?.IdentityInfo?.BirthDate?.substring(0, 4)) >
    //         1100 &&
    //         moment(boardMember?.IdentityInfo?.BirthDate?.split("T")[0]).format(
    //           "jYYYY-jM-jD"
    //         )}
    //     </Col>
    //     <Col sm={3}>
    //       {parseInt(boardMember?.AppointmentDate?.substring(0, 4)) > 1100 &&
    //         moment(boardMember?.AppointmentDate?.split("T")[0]).format(
    //           "jYYYY-jM-jD"
    //         )}
    //     </Col>
    //     <Col sm={3}>{findPosition?.Title}</Col>
    //     <Col sm={3}>{findMajor?.Title}</Col>
    //     <Col sm={3}>{boardMember?.SubAcademicField}</Col>
    //   </Row>
    // </div>
    <Table dataSource={dataSource} columns={columns} pagination={false} />
  );
};

export default BoardMembersFeedback;
