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

//components
import { ReactComponent as Download } from "../../../../assets/images/download.svg";

//styles
import classes from "./FinalApproval.module.css";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

const { Panel } = Collapse;

interface IDocumentsFeedback {
  document: any;
}

const DocumentsFeedback: FC<IDocumentsFeedback> = ({ document }) => {
  const draftId = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );

  return (
    <div className={classes.card}>
      <Row>
        <Col sm={3}></Col>
        <Col sm={3}>{document?.Title} </Col>
        <Col sm={18}>
          <Button type="text">
            <Tooltip placement="topLeft" title="دانلود فایل">
              <a
                href={`${HttpBaseConstant.url}/registration/draft/${draftId}/natural/document/${document?.Id}/content`}
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
