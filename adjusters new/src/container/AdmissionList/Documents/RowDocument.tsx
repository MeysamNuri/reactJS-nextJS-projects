import React, { FC } from "react";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table} from "antd";
import { IDocumentHistory } from "../../../shared/ulitities/Model/documentApprove";

interface IRowDocumentsProps {
  rejectAllBaseInfo?: any;
}

const RowDocument: FC<IRowDocumentsProps> = ({ rejectAllBaseInfo }) => {
  const { historyDocument, loading } = useSelector(
    (state: any) => state.historyDocument
  );

  let hisDocument = historyDocument?.map(
    (doc: IDocumentHistory, index: number) => {
      let historyDoc = {
        key: index,
        id: index,
        Description: doc.Description === null ? "---" : doc.Description,
        CreationDate: moment(doc.CreationDate.split("T")[0]).format(
          "jYYYY-jM-jD"
        ),
        UserName: doc.UserName,
        ApprovalStatusTitle: doc.ApprovalStatusTitle,
        RejectReasonId:doc.RejectReasonId==null?"---" :rejectAllBaseInfo?.Result?.find(
          ({ Id, Title }: { Id: number; Title: string }) => Id === doc.RejectReasonId
        ).Title,
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
      width: "10%",
    },
    {
      title: "ثبت کننده",
      dataIndex: "UserName",
      key: "UserName",
      width: "15%",
    },
    {
      title: "وضعیت",
      dataIndex: "ApprovalStatusTitle",
      key: "ApprovalStatusTitle",
      width: "10%",
    },
    {
      title: "دلیل رد",
      dataIndex: "RejectReasonId",
      key: "RejectReasonId",
    },
    // {
    //   title: "دلیل رد",
    //   dataIndex: "Description",
    //   key: "Description",
    // },
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
