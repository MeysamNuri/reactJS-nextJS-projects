import React, { FC } from "react";
import {
  ConfigProvider,
  Row,
  Col,
  Button,
  Collapse,
  Tooltip,
  Popconfirm,
  Spin,
} from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import axios from "axios";

//styles
import classes from "./FinalApproval.module.css";

//components

import { ReactComponent as Download } from "../../../../assets/images/download.svg";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

interface IDocumentsFeedbackProps {
  document: any;
}

const DocumentsFeedback: FC<IDocumentsFeedbackProps> = ({ document }) => {
  const draftId = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );

  const downloadCertificateHandler = (id: string) => {
    const jwtToken = localStorage.getItem("token");
    axios({
      url: `${HttpBaseConstant.url}/registration/draft/${draftId}/judicial/document/${document.Id}/content`,
      method: "GET",
      responseType: "blob",
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.png");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("error in downloading certificate: ", error);
      });
  };

  return (
    <div className={classes.card}>
      <Row>
        <Col sm={3}></Col>
        <Col sm={3}>{document?.Title} </Col>
        <Col sm={18}>
          <Button type="text">
            <Tooltip placement="topLeft" title="دانلود فایل">
              <a
                //href={`${HttpBaseConstant.url}/registration/draft/${draftId}/judicial/document/${document.Id}/content`}
                onClick={() => downloadCertificateHandler(document.Id)}
                download
              >
                <Download />
              </a>
            </Tooltip>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DocumentsFeedback;
