import React, { FC} from "react";
import { Table} from "antd";
import moment from "jalali-moment";

interface ILegalSubTable {
  expandedTableData: any;
  applicantIdToExpand: any;
  expandedTableDataLoading: boolean;
}

const LegalSubTable: FC<ILegalSubTable> = ({
  expandedTableData,
  applicantIdToExpand,
  expandedTableDataLoading,
}) => {
  const columns = [
    { title: "نام و نام خانوادگی", dataIndex: "FullName", key: "fullName" },
    { title: "کد ملی", dataIndex: "NationalCode", key: "nationalCode" },
    { title: "تاریخ تولد", dataIndex: "BirthDate", key: "birthDate" },
    { title: "تاریخ پایان همکاری", dataIndex: "CooperationEndDate", key: "CooperationEndDate" },
    { title: "سمت", dataIndex: "PositionId", key: "positionId" },
  ];
let dataSource = expandedTableData?.map((item: any) => {
  let dataMember = {
    BirthDate: item?.BirthDate===null?null:moment(item?.BirthDate?.split("T")[0]).format(
      "jYYYY-jM-jD"
    ),
    CooperationEndDate:item?.CooperationEndDate==null?null: moment(item?.CooperationEndDate?.split("T")[0]).format(
      "jYYYY-jM-jD"
    ),
    FullName: item?.FullName,
    Id: item?.Id,
    NationalCode: item?.NationalCode,
    PositionTitle: item?.PositionTitle,
    PositionId: item?.PositionId,
 
  };
  return dataMember;
});
  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "25px",
        width: "90%",
      }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={expandedTableDataLoading}
      />
    </div>
  );
};

export default LegalSubTable;
