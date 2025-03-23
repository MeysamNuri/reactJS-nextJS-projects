import React, { useState, FC, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PositionUser from "./PositionUser";
import { ReactComponent as Nofilestorage } from "../../../assets/images/nofileStorage.svg";
import {removeSearchUserList} from '../../../redux/actions'
import "./UserList.css";

interface ISearchUserProps {
  renderComponent: any;
  closeModal: any;
}

const UserListSearch: FC<ISearchUserProps> = ({
  renderComponent,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [recordSearchUser, setRecordSearchUser] = useState({} as any);
  const { searchUserLists } = useSelector((state: any) => state.staffType);

  const selectUserHandler = (record: any) => {
    setRecordSearchUser(record);
    setVisible(true);
    dispatch(removeSearchUserList())
  };

  useEffect(() => {
    renderComponent(visible, recordSearchUser);
  }, [visible]);

  let dataSource = searchUserLists?.Result?.map((user: any) => {
    let obj = {
      FirstName: user?.Person?.FirstName,
      LastName: user?.Person?.LastName,
      NationalCode: user?.Person?.NationalCode,
      Id: user.Id,
      key: user.Id,
    };

    return obj;
  });

  //coloumns Table
  let columns: any = [
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      sorter: (a: any, b: any) => a.firstName?.length - b.firstName?.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
    },

    {
      title: "نام خانوادگی",
      dataIndex: "LastName",
      key: "LastName",
      sorter: (a: any, b: any) => a.familyName?.length - b.familyName?.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ellipsis: true,
    },

    {
      title: "سمت",
      dataIndex: "degree",
      key: "degree",
      filterMode: "menu",
      filterSearch: true,
    },
    {
      title: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div>
            <Button type="primary" onClick={() => selectUserHandler(record)}>
              انتخاب
            </Button>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        className="noDataTable"
        dataSource={dataSource}
        pagination={false}
        locale={{
          emptyText: (
            <>
              {" "}
              <Nofilestorage /> <div>لیست کاربران خالی است</div>
            </>
          ),
        }}
      />
      {visible && (
        <PositionUser
          recordSearchUser={recordSearchUser}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default UserListSearch;
