//libraries
import React, { FC, useState } from "react";
import {
  Col,
  Row,
  Popconfirm,
  Tooltip,
  Spin,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import classes from "./BoardMember.module.css";

import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";

//redux actuator functions
import {
  deleteLegalDraftCardBoardMemberAction,
  fetchBoarMemberListLegalDraft,
  // getAllInfoBoardMemberWorkExperienceLegal,
  // getAllInfoBoardMemberWorkExperienceLegalEdit,
  fetchBoardMemberListLegalEdit,
  deleteLegalCardBoardMemberActionEdit,
} from "../../../../redux/actions";

interface ICardBoardMemberProps {
  key: string;
  work: any;
  legalDraftId: number;
  findAcademicDegree: any;
  findPosition: any;
  findMajor: any;
  handleEdit: any;
  positionId: number;
}

const CardBoardMember: FC<ICardBoardMemberProps> = ({
  key,
  work,
  legalDraftId,
  findAcademicDegree,
  findPosition,
  findMajor,
  handleEdit,
  positionId,
}) => {
  const dispatch = useDispatch();
  const [targetWorkId, setTargetWorkId] = useState("");

  const deleteLoadingState = useSelector(
    (state: any) => state.boadMemberDeleteFromListLoadingStatelegal?.loading
  );
  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const removeWorkExperinceHandler = () => {
    setTargetWorkId(work.Id);
    if (isUserEdit) {
      dispatch(
        deleteLegalCardBoardMemberActionEdit(gotIdForMainEdit, work.Id, () => {
          dispatch(fetchBoardMemberListLegalEdit(gotIdForMainEdit));
        })
      );
    } else {
      dispatch(
        deleteLegalDraftCardBoardMemberAction(legalDraftId, work.Id, () => {
          dispatch(fetchBoarMemberListLegalDraft(legalDraftId, () => {}));
        })
      );
    }
  };

  // const editHandler = () => {
  //   if (isUserEdit) {
  //     dispatch(
  //       getAllInfoBoardMemberWorkExperienceLegalEdit(gotIdForMainEdit, work.Id)
  //     );
  //   } else {
  //     dispatch(getAllInfoBoardMemberWorkExperienceLegal(legalDraftId, work.Id));
  //   }

  //   handleEdit();
  // };

  return (
    <div className={classes.card}>
      <Row className={classes.rowCard}>
        <Col xxl={{span:4}} xl={{span:4}} lg={{span:6}} md={{span:6}} sm={{span:6}} xs={{span:6}}>{work?.FullName}</Col>
        <Col xxl={{span:4}} xl={{span:4}} lg={{span:3}} md={{span:3}} sm={{span:4}} xs={{span:4}}>{work?.NationalCode}</Col>
        <Col xxl={{span:4}} xl={{span:4}} lg={{span:4}} md={{span:4}} sm={{span:4}} xs={{span:4}}>
          {work?.AppointmentDate !== undefined &&
            work?.AppointmentDate !== null &&
            parseInt(work?.AppointmentDate.substring(0, 4)) > 1910 &&
            moment(work?.AppointmentDate?.split("T")[0]).format(
              "jYYYY-jMM-jD"
            )}{" "}
        </Col>
        <Col xxl={{span:4}} xl={{span:4}} lg={{span:4}} md={{span:4}} sm={{span:3}} xs={{span:3}}>{findPosition?.Title}</Col>
        {/* <Col xl={3}>{work?.Mobile}</Col> */}
        <Col xxl={{span:4}} xl={{span:4}} lg={{span:3}} md={{span:3}} sm={{span:3}} xs={{span:3}}>{work.AdjusterCode}</Col>
        <Col xxl={{span:3}} xl={{span:3}} lg={{span:3}} md={{span:3}} sm={{span:3}} xs={{span:3}}>
          {work?.BirthDate !== undefined &&
            work?.BirthDate !== null &&
            parseInt(work?.BirthDate.substring(0, 4)) > 1910 &&
            moment(work?.BirthDate?.split("T")[0]).format("jYYYY-jMM-jD")}{" "}
        </Col>
        {/* <Col xl={3}>{findMajor?.Title}</Col> */}
        <Col xxl={{span:1}} xl={{span:1}} lg={{span:1}} md={{span:1}} sm={{span:1}} xs={{span:1}}>
          {positionId !== 1 && (
            <Popconfirm
              title=" از حذف این مورد مطمئن هستید؟"
              onConfirm={() => removeWorkExperinceHandler()}
              okText="بله"
              cancelText="خیر"
            >
              <a>
                <Tooltip placement="topLeft" title="حذف">
                  <Trash />
                </Tooltip>
              </a>
            </Popconfirm>
          )}
        </Col>

        <Col xl={2}>
          <Space>
            {targetWorkId === work?.Id
              ? deleteLoadingState && <Spin size="small" />
              : null}
          </Space>
        </Col>
        {/* <Col xl={2}>
          {!isUserEdit && <Button onClick={editHandler}>ویرایش</Button>}
        </Col> */}
      </Row>
    </div>
  );
};

export default CardBoardMember;
