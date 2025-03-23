//libraries
import React, { FC } from "react";
import { Row, Col, Collapse, Popconfirm, Tooltip, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

//styles
import classes from "./Stockholder.module.css";

//components
import moment from "jalali-moment";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";

//redux actuator functions
import {
  deleteLegalDraftStockholderAction,
  deleteLegalDraftStockholderActionEdit,
  fetchStockholderLegal,
  fetchStockholderLegalEdit,
  getAllInfoStockholderLegal,
  getAllInfoStockholderLegalEdit,
} from "../../../../redux/actions";

interface ICardStockholderProps {
  work: any;
  key: string;
  legalDraftId: number;
  findCompany: any;
  handleEdit: any;
}
const { Panel } = Collapse;

const CardWorkExperience: FC<ICardStockholderProps> = ({
  work,
  key,
  legalDraftId,
  findCompany,
  handleEdit,
}) => {
  const dispatch = useDispatch();

  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const removeStockholderHandler = () => {
    if (isUserEdit) {
      dispatch(
        deleteLegalDraftStockholderActionEdit(gotIdForMainEdit, work.Id, () => {
          dispatch(fetchStockholderLegalEdit(gotIdForMainEdit));
        })
      );
    } else {
      dispatch(
        deleteLegalDraftStockholderAction(legalDraftId, work.Id, () => {
          dispatch(fetchStockholderLegal(legalDraftId));
        })
      );
    }
  };

  const editHandler = () => {
    if (isUserEdit) {
      dispatch(getAllInfoStockholderLegalEdit(gotIdForMainEdit, work.Id));
    } else {
      dispatch(getAllInfoStockholderLegal(legalDraftId, work.Id));
    }

    handleEdit();
  };

  return (
    <div className={classes.card}>
      <Row className={classes.rowCard}>
      <Col xl={3}>{work?.FullName}</Col>
        <Col xl={3}>{work?.NationalCode}</Col>
        <Col xl={3}>
          {moment(work?.BirthDate.split("T")[0]).format("jYYYY-jMM-jD")}
        </Col>
        <Col xl={3}>{work?.ShareAmount}</Col>
        <Col xl={3}>
          {moment(work?.JoinDate.split("T")[0]).format("jYYYY-jMM-jD")}
        </Col>
        <Col xl={2}>
          <Popconfirm
            title=" از حذف این مورد مطمئن هستید؟"
            onConfirm={() => removeStockholderHandler()}
            okText="بله"
            cancelText="خیر"
          >
            <a>
              <Tooltip placement="topLeft" title="حذف">
                <Trash />
              </Tooltip>
            </a>
          </Popconfirm>
        </Col>
        <Col xl={2}>{/* <Button onClick={editHandler}>ویرایش</Button> */}</Col>
      </Row>
    </div>
  );
};

export default CardWorkExperience;
