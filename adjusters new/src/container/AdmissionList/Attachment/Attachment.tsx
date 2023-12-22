import React, { useState, useEffect, FC } from "react";
import { Button, Row, Col, Tooltip, Table, Popconfirm, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";
import {
  addAttachment,
  fetchAttachments,
  dlAttachment,
  removeAttachment,
} from "../../../redux/cartable/attacment/action";
import Download from "../../../assets/images/download.svg";
import { ReactComponent as Remove } from "../../../assets/images/remove.svg";
import Upload from "../../../assets/images/upload.svg";
import "./Attachment.css";

interface IAttachmentProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  isEvaluatorDesktopInformation?: number;
}

const Attachment: FC<IAttachmentProps> = ({
  oneAdjusterList,
  isFromReportTable,
  isEvaluatorDesktopInformation,
}) => {
  const [text, setText] = useState("");
  let userRecognition = Number(localStorage.getItem("userRecognition"));
  //const [downloadId, setDownloadId] = useState(0);
  const listAttach = useSelector(
    (state: any) => state.attachment.listAttachment
  );
  const listAttachLoading = useSelector(
    (state: any) => state.attachment.loading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    isEvaluatorDesktopInformation == GetWay.desktop
      ? dispatch(fetchAttachments(userRecognition))
      : dispatch(fetchAttachments(oneAdjusterList?.ApplicantId));
  }, []);

  //upload File
  const handleUpload = (e: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];
    let newAttachment = {
      adjusterTypeId: adjusterType.natural,
      description: text,
      file,
    };

    dispatch(
      addAttachment(newAttachment, oneAdjusterList?.ApplicantId, () => {
        dispatch(fetchAttachments(oneAdjusterList?.ApplicantId));
      })
    );
    setText(" ");
  };
  const changeInputHandler = (e: any) => {
    setText(e.target.value);
  };
  //download  Attacment
  const dlAttachHandler = (record: any) => {
    // setDownloadId(record.Id);
    dispatch(dlAttachment(oneAdjusterList?.ApplicantId, record.Id));
  };

  //remove Attachment
  const rempoveAttachHandler = (record: any) => {
    dispatch(removeAttachment(oneAdjusterList?.ApplicantId, record.Id));
  };

  let columns: any = [
    {
      title: "عنوان",
      dataIndex: "Description",
      width: "50%",
    },

    {
      title: "مشاهده تصویر ارسالی",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <>
          <Button type="text" onClick={() => dlAttachHandler(record)}>
            <img src={Download} alt="Download" />
          </Button>
        </>
      ),
    },
    isFromReportTable
      ? {}
      : {
          title: "حذف",
          dataIndex: "action",
          render: (text: any, record: any) => (
            <>
              <Popconfirm
                title="از حذف پیوست مورد نظر مطمئن هستید؟"
                okText="بله"
                cancelText="خیر"
                onConfirm={() => rempoveAttachHandler(record)}
              >
                <Remove />
              </Popconfirm>
            </>
          ),
        },
  ];

  return (
    <div className="attachment">
      {!isFromReportTable && isEvaluatorDesktopInformation !== GetWay.desktop && (
        <Row className="headerAtachment">
          <Col span={12}>
            <h5 className="titleCol">عنوان</h5>
            <Input
              onChange={(e: any) => changeInputHandler(e)}
              value={text}
              allowClear
            />
          </Col>
          <Col span={12}>
            <h5 className="titleCol">ارسال تصویر</h5>
            <Tooltip placement="topLeft" title="بارگذاری فایل">
              <label className="customFileUploadNoBorder">
                <img src={Upload} alt="Upload" />
                <input type="file" onChange={(e) => handleUpload(e)} />
              </label>
            </Tooltip>
          </Col>
        </Row>
      )}
      <Table
        columns={columns}
        dataSource={listAttach?.Result}
        loading={listAttachLoading}
        pagination={false}
        locale={{ emptyText: "پیوستی مشاهده نگردید." }}
        // scroll={{ y: 180 }}
        style={{ maxHeight: "157px", overflowY: "scroll" }}
      />
    </div>
  );
};

export default Attachment;
