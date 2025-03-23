import React from "react";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table} from "antd";
import { IDocumentHistory } from "../../../../../../shared/ulitities/Model/documentApprove";

const RowDocument = () => {
  const { historyDocument, loading } = useSelector(
    (state: any) => state.historyDocument
  );

  let hisDocument = historyDocument?.map(
    (doc: IDocumentHistory, index: number) => {
      let historyDoc = {
        key: index,
        id: index,
        Description: doc.Description === null ? "ندارد" : doc.Description,
        CreationDate: moment(doc.CreationDate.split("T")[0]).format(
          "jYYYY-jM-jD"
        ),
        UserName: doc.UserName,
        ApprovalStatusTitle: doc.ApprovalStatusTitle,
      };
      return historyDoc;
    }
  );

  //coloumns Table
  let columns: any = [
    {
      title: "تاریخ ثبت",
      dataIndex: "CreationDate",
      key: "CreationDate",
    },
    {
      title: "ثبت کننده",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "وضعیت",
      dataIndex: "ApprovalStatusTitle",
      key: "ApprovalStatusTitle",
    },
    {
      title: "دلیل رد",
      dataIndex: "Description",
      key: "Description",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={hisDocument}
        showSorterTooltip={false}
        pagination={false}
        loading={loading}
        locale={{ emptyText: "تاریخچه ای یافت نشد." }}
        className="historyDocuments"
      />
    </div>
  );
};

export default RowDocument;
