import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table, Button, Space, Modal, ConfigProvider, Tooltip } from "antd";
import { fetchCurrentListBoardMember } from "../../../../redux/actions";
import Date from "./CooperationEndDate";
import { ICurrentBoardMember } from "../../../../shared/ulitities/Model/boardMember";
import { ReactComponent as Edit } from "../../../../assets/images/edit.svg";

const CurrentBoardInformation = () => {
  const dispatch = useDispatch();
  const [showDate, setShowDate] = useState(false);
  const [selectedBoardMember, setSelectedBoardMember] = useState({} as any);
  const listCurrentBoard = useSelector(
    (state: any) => state.boardMember.listCurrrentBoardMember
  );
  const listCurrentBoardLoading = useSelector(
    (state: any) => state.boardMember.loading
  );

  const userIdLogin = useSelector(
    (state: any) => state.userLogin.userLogin?.Result
  );

  useEffect(() => {
    dispatch(fetchCurrentListBoardMember(3));
  }, []);

  const editBoardMemberHandler = (record: any) => {
    setSelectedBoardMember(record);
    setShowDate(true);
  };

  let list = listCurrentBoard?.Result?.map(
    (boarMember: ICurrentBoardMember) => {
      let data = {
        Id: boarMember.Id,
        key: boarMember.Id,
        FullName: boarMember.FullName,
        NationalCode: boarMember.NationalCode,
        BirthDate: moment(boarMember.BirthDate.split("T")[0]).format(
          "jYYYY-jM-jD"
        ),
        PositionId: boarMember.PositionId,
        AppointmentDate: moment(
          boarMember.AppointmentDate.split("T")[0]
        ).format("jYYYY-jM-jD"),
        CooperationEndDate: moment(
          boarMember.CooperationEndDate.split("T")[0]
        ).format("jYYYY-jM-jD"),
        AdjusterCode: boarMember.AdjusterCode,
        AdjustmentField: boarMember.AdjustmentField,
      };
      return data;
    }
  );

  //coloumns Table
  let columns: any = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "FullName",
      key: "FullName",
      sorter: (a: any, b: any) => a.FullName?.length - b.FullName?.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
    },

    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      sorter: (a: any, b: any) => a.familyName?.length - b.familyName?.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
    },
    {
      title: "تاریخ تولد",
      dataIndex: "BirthDate",
      key: "BirthDate",
      ellipsis: true,
    },

    {
      title: "سمت",
      dataIndex: "PositionId",
      key: "PositionId",
    },
    {
      title: "تاریخ انتصاب",
      dataIndex: "AppointmentDate",
      key: "AppointmentDate",
      ellipsis: true,
    },
    {
      title: "تاریخ پایان",
      dataIndex: "CooperationEndDate",
      key: "CooperationEndDate",
    },
    {
      title: "زمینه تخصصی",
      dataIndex: "AdjustmentField",
      key: "AdjustmentField",
    },

    {
      title: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            <Tooltip title="ویرایش" placement="topLeft">
              <a
                onClick={() => editBoardMemberHandler(record)}
                className="action"
              >
                <Edit />
              </a>
            </Tooltip>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        showSorterTooltip={false}
        pagination={false}
        loading={listCurrentBoardLoading ? true : false}
        locale={{ emptyText: "هئیت مدیره ای وجود ندارد" }}
      />
      <Modal
        title="تاریخ پایان فعالیت"
        visible={showDate}
        footer={null}
        onOk={() => setShowDate(false)}
        onCancel={() => setShowDate(false)}
        width={500}
        centered
      >
        {showDate && (
          <Date
            closeModal={() => setShowDate(false)}
            selectedBoardMember={selectedBoardMember}
          />
        )}
      </Modal>
    </div>
  );
};

export default CurrentBoardInformation;
