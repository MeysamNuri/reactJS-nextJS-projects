import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Tooltip } from "antd";
import {
  fetchDocuments,
  // addRequestTypes,
 // addDocument,
  downLoaderDocument,
} from "../../../../../redux/actions";
import { IListDocuments } from "../../../../../shared/ulitities/Model/desktop/document";
import { ReactComponent as Download } from "../../../../../assets/images/download.svg";
import { ReactComponent as Upload } from "../../../../../assets/images/upload.svg";

interface IDLDocumentProps {
  selectedRequest: any;
}
const DlDocuments: FC<IDLDocumentProps> = ({ selectedRequest }) => {
 

  const dispatch = useDispatch();
  const [selectedDocument, setSelectedDocument] = useState(0);

  const listDocs = useSelector(
    (state: any) => state.documentList.documentList?.Result
  );
  const loadingDoc = useSelector((state: any) => state.documentList.loading);
  // const userIdLogin = useSelector(
  //   (state: any) => state.userLogin.userLogin?.Result
  // );
  const resultRequestType = useSelector(
    (state: any) => state.request.resRequestType?.Result
  );



  useEffect(() => {
    dispatch(fetchDocuments(selectedRequest.RequestTypeId));
  }, []);

  // let requstType = {
  //   applicantId: userIdLogin.ApplicantId,
  //   requestTypeId: selectedRequest.RequestTypeId,
  // };
  // useEffect(() => {
  //   dispatch(addRequestTypes(requstType));
  // }, []);

  let dataSource = listDocs?.map((doc: IListDocuments) => {
    let data = {
      key: doc.Id,
      Id: doc.Id,
      Title: doc.Title,
    };
    return data;
  });

  //دانلود اسناد
  const downloadHandler = (record: any) => {
    dispatch(downLoaderDocument(record.Id));
  };


  const uploadDocHandler = (e: any, record: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];
    let upload = {
      id: resultRequestType,
      DocumentRequestTypeId: record.Id,
      file: file,
    };
    setSelectedDocument(record.Id);
    // dispatch(addDocument(upload));
  
  };

  //coloumns Table
  let columns: any = [
    {
      title: "نام",
      dataIndex: "Title",
      key: "Title",
      ellipsis: true,
      className: "textCenter",
    },

    {
      title: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            <Tooltip placement="topLeft" title="مشاهده فایل ارسالی">
              <Download
                onClick={() => downloadHandler(record)}
                className="downloadFile"
              />
            </Tooltip>
            {selectedRequest.RequestTypeId === 4 && (
              <Tooltip placement="topLeft" title="بارگذاری فایل">
                <label className="customUpload">
                  <Upload />
                  <input
                    type="file"
                    onChange={(e) => uploadDocHandler(e, record)}
                  />
                </label>
              </Tooltip>
            )}
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        // showSorterTooltip={false}
        pagination={false}
        loading={loadingDoc ? true : false}
        locale={{ emptyText: "سندی وجود ندارد" }}
      />
    </div>
  );
};

export default DlDocuments;
