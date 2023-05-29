import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Collapse } from "antd";
import { dlFileHandler } from "../../redux/actions";
import { ReactComponent as Download } from "../../assets/images/download.svg";

const { Panel } = Collapse;

const DownloadFiles = () => {
  const dispatch = useDispatch();
  const { loadingDownload } = useSelector((state: any) => state.uploadFile);
  const { resultId, loadingResultId } = useSelector(
    (state: any) => state.request
  );

  const fileDownloader = (record: any) => {
    dispatch(dlFileHandler(record.Id));
  };

  //coloumns Table
  let columns: any = [
    {
      title: "نام فایل",
      dataIndex: "FileName",
      // width: "7%",
    },

    {
      title: "عملیات",
      render: (text: any, record: any) => (
        <>
          {resultId?.Result?.Files && (
            <Button
              onClick={() => fileDownloader(record)}
              icon={<Download style={{ marginTop: "5px" }} />}
              loading={loadingDownload === record.Id}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="مشاهده فایل ها" key="1">
          <Table
            pagination={false}
            columns={columns}
            dataSource={resultId?.Result?.Files}
            loading={loadingResultId}
            locale={{
              emptyText: "فایلی بارگذاری نشده است.",
            }}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default DownloadFiles;
