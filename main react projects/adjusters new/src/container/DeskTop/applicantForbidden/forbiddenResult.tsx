import React, { useState, useEffect } from 'react';
import {
  Table,
} from "antd";
import moment from "jalali-moment";
export interface ForbiddenResultProps {
  forbiddenFilesResult: any[]
}

const ForbiddenResult: React.FC<ForbiddenResultProps> = ({ forbiddenFilesResult }) => {
  const [pageModel, setPageModel] = useState({
    pageSize: 5,
    pageIndex: 1,
  });
  console.log(forbiddenFilesResult,"forbiddenFilesResult");
  
  const [data, setData] = useState<any>(null)
  useEffect(() => {
      let newList = forbiddenFilesResult?.map((item: any) => {
        let obj = {
          ForbiddenResult: item.ForbiddenResult,
          Flag: item.Flag ? ("عدم رفع شاخص") : ("رفع شاخص"),
          CreationDateTime: moment(item.CreationDateTime?.split("T")[0]).format(
            "jYYYY-jMM-jDD"
          ),
        };
        return obj;
      });
      setData(newList)

  }, [forbiddenFilesResult])
  //coloumns Table
  let columns: any = [
    {
      title: "وضعیت",
      dataIndex: "Flag",
      key: "Flag",
      responsive: ["sm"],

    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "CreationDateTime",
      key: "CreationDateTime",
      responsive: ["sm"],

    },
    {
      title: "توضیحات شاخص",
      dataIndex: "ForbiddenResult",
      key: "ForbiddenResult",
      width: "55%",
    },
  ]
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{
          pageSize: pageModel.pageSize,
          total: forbiddenFilesResult?.length,
          showTotal: (total) => `تعداد کل : ${total} `,
          showSizeChanger: true,
          onChange: (current: any, pageSize: any) =>
            setPageModel({
              ...pageModel,
              pageIndex: current,
              pageSize: pageSize,
            }),
          locale: { items_per_page: "/ صفحه" },
        }}
        //  loading={isLoading ? true : false}
        locale={{ emptyText: "اطلاعات شاخص یافت نشد." }}
      />
    </>
  );
}

export default ForbiddenResult;