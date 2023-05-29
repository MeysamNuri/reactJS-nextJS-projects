import React, { FC } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Button, Tooltip, Popconfirm, Table } from "antd";
import { IAneAdjusterList } from "../../../../../../../shared/ulitities/Model/oneAdjuster";
import {
  fetchDocumentFileInterview,
  dlFileHandler,
  removeFileHandler,
} from "../../../../../../../redux/actions";
import { ReactComponent as Download } from "../../../../../../../assets/images/download.svg";
import { ReactComponent as Remove } from "../../../../../../../assets/images/remove.svg";

interface IpListFile {
  documentFileInterviewId: any;
  oneAdjusterList?: IAneAdjusterList;
}

const ListUploadFiles: FC<IpListFile> = ({
  documentFileInterviewId,
  oneAdjusterList,
}) => {
  const dispatch = useDispatch();
  const { loadingDownload } = useSelector((state: any) => state.uploadFile);

 
  const fileDownloader = (record: any) => {
    dispatch(dlFileHandler(record.Id));
  };

  const removeFile = (record: any) => {
    dispatch(
      removeFileHandler(
        record.Id,
        () => {},
        () => {
          dispatch(fetchDocumentFileInterview(oneAdjusterList?.ApplicantId));
        }
      )
    );
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
          {documentFileInterviewId && (
            <Button
              onClick={() => fileDownloader(record)}
              icon={<Download style={{ marginTop: "5px" }} />}
              loading={loadingDownload===record.Id}
            />
          )}
          {documentFileInterviewId && (
            <Popconfirm
              title="از حذف فایل مورد نظر مطمئن هستید؟"
              onConfirm={() => removeFile(record)}
              okText="بله"
              cancelText="خیر"
            >
              <Tooltip
                placement="topLeft"
                title="حذف"
                overlayClassName="popAction"
              >
                <Button icon={<Remove style={{ marginTop: "5px" }} />} />
              </Tooltip>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={documentFileInterviewId?.Result}
        
      />
    </>
  );
};

export default ListUploadFiles;
