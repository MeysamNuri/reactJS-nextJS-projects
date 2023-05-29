import React, { useEffect, useState, useMemo, FC } from "react";
import { Table, ConfigProvider, Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import {
  getDocumentsList,
} from "../../../../../AdmissionList/ServicesCartable/AdmissionListServices";
import RowDocument from "./RowDocument";
import {
  dlDocumentHandler,
  fetchHistorydocument,
} from "../../../../../../redux/actions";
import { approvalHistory } from "../../../../../../shared/ulitities/Enums/approvalHistory";
import { ReactComponent as Download } from "../../../../../../assets/images/download.svg";

interface IDocumentsProps {
  selectedAdjuster?: any;
  isManagmentCartable?: boolean;
}


const Documents: FC<IDocumentsProps> = ({
  selectedAdjuster,
  isManagmentCartable,
}) => {
  const dispatch = useDispatch();
  const [allDocuments, setAllDocuments] = useState([] as any);
  const [loadingAllDocuments, setLoadingAllDocuments] = useState(false);
  const [downloadId, setDownloadId] = useState(0);
  const [expandedRowKeys, setExpandedRowKeys] = useState([] as any);
  const downLoadDocumentLoading = useSelector(
    (state: any) => state.dlDocument.loading
  );

  async function getDocuments() {
    try {
      setLoadingAllDocuments(true);
      const data = await getDocumentsList(selectedAdjuster.ApplicantId);
      data && setAllDocuments(data?.Result);
    } catch (err) {
    } finally {
      setLoadingAllDocuments(false);
    }
  }


  useEffect(() => {
    getDocuments();
  }, [selectedAdjuster.ApplicantId]);



  //download Document
   const dlDocument = (record: any) => {
    setDownloadId(record.Id);
    dispatch(
      dlDocumentHandler(
        selectedAdjuster.ApplicantId,
        record.Id
      )
    );
  };


  let columns = useMemo(() => {
    return [
      {
        title: "نام مستند",
        dataIndex: "DocumentTypeTitle",
        width: "40%",
        key: "Id",
      },

      {
        title: "عملیات",
        dataIndex: "adjusterType",
        key: "adjusterType",
        render: (text: any, record: any) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip placement="topLeft" title="مشاهده فایل ارسال شده">
              <Button
                type="text"
                onClick={() => dlDocument(record)}
                loading={downLoadDocumentLoading && downloadId === record.Id}
                icon={<Download style={{ cursor: "pointer" }} />}
              ></Button>
            </Tooltip>
          </div>
        ),
      },
    ];
  }, [

    allDocuments,

  ]);


  const handelExpand = (record: any, e: any) => {
    var keys = [];
    if (record) {
      keys.push(record.Id);
    }
    setExpandedRowKeys([...keys]);
    dispatch(
      fetchHistorydocument( e.Id, selectedAdjuster.ApplicantId, approvalHistory.document
      )
    );
  };

  return (
    <div className="documentAdmissionList">
      <ConfigProvider direction="rtl">
        <Table
          dataSource={allDocuments}
          pagination={false}
          columns={columns}
          loading={loadingAllDocuments}
          scroll={{ y: 180 }}
          rowKey={(record) => record.Id}
          expandable={{
            expandedRowRender: (record) => {
              return <RowDocument />;
            },
            onExpand: (record, e) => {
              handelExpand(record, e);
            },

            expandIcon: (props) => {
              if (props.expanded) {
                return (
                  <a
                    style={{ color: "black" }}
                    onClick={(e) => {
                      props.onExpand(props.record, e);
                    }}
                  >
                    <CaretDownOutlined />
                  </a>
                );
              } else {
                return (
                  <a
                    style={{ color: "black" }}
                    onClick={(e) => {
                      props.onExpand(props.record, e);
                    }}
                  >
                    <CaretLeftOutlined />
                  </a>
                );
              }
            },
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Documents;
