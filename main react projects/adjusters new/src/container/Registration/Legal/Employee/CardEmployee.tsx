//libraries
import React, { FC } from "react";
import { Row, Col, Collapse, Popconfirm, Tooltip, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

//styles
import classes from "./Employee.module.css";

//components
import moment from "jalali-moment";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";

//redux actuator functions
import {
  deleteLegalDraftEmployeerAction,
  deleteLegalDraftEmployeerActionEdit,
  fetchEmployeeLegal,
  fetchEmployeeLegalEdit,
  getAllInfoEmployeeLegal,
  getAllInfoEmployeeLegalEdit,
} from "../../../../redux/actions";

interface ICardEmployeerProps {
  work: any;
  key: string;
  legalDraftId: number;
  findCompany: any;
  handleEdit: any;
}
const { Panel } = Collapse;

const CardEmplyee: FC<ICardEmployeerProps> = ({
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

  const removeEmployee = () => {
    if (isUserEdit) {
      dispatch(
        deleteLegalDraftEmployeerActionEdit(gotIdForMainEdit, work.Id, () => {
          dispatch(fetchEmployeeLegalEdit(gotIdForMainEdit));
        })
      );
    } else {
      dispatch(
        deleteLegalDraftEmployeerAction(legalDraftId, work.Id, () => {
          dispatch(fetchEmployeeLegal(legalDraftId));
        })
      );
    }
  };

  const editHandler = () => {
    if (isUserEdit) {
      dispatch(getAllInfoEmployeeLegalEdit(gotIdForMainEdit, work.Id));
    } else {
      dispatch(getAllInfoEmployeeLegal(legalDraftId, work.Id));
    }

    handleEdit();
  };

  return (
    <div className={classes.card}>
      <Row className={classes.rowCard}>
        <Col xl={3}>{work?.FullName}</Col>
        <Col xl={3}>{work?.NationalCode}</Col>
        <Col xl={3}>
          {moment(work?.BirthDate?.split("T")[0]).format("jYYYY-jMM-jD")}
        </Col>
        <Col xl={4}>
          {moment(work?.EmploymentDate?.split("T")[0]).format("jYYYY-jMM-jD")}
        </Col>
        <Col xl={5}>{work?.Position}</Col>
        <Col xl={3}>
          <Popconfirm
            title=" از حذف این مورد مطمئن هستید؟"
            onConfirm={() => removeEmployee()}
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

export default CardEmplyee;
