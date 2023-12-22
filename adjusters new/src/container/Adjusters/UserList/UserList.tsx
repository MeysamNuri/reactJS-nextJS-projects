import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  ConfigProvider,
  Space,
  Popconfirm,
  Tooltip,
  Alert,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { FindAccess } from "sanhab-components-library";
import SearchUser from "./SearchUser";
import PositionUser from "./PositionUser";
import {
  fetchUserGetForGrid,
  removeUserGetForGrid,
} from "../../../redux/actions";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { ReactComponent as Nofilestorage } from "../../../assets/images/nofileStorage.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
import "./UserList.css";

const UserList = () => {
  const dispatch = useDispatch();
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visiblePosition, setVisiblePosition] = useState(false);
  const [recordSearchUser, setRecordSearchUser] = useState({} as any);
  const [pageModel, setPageModel] = useState({
    pageSize: 14,
    pageIndex: 1,
  });
  const { userGrid, loadingUserGrid, loadingRemoveId } = useSelector(
    (state: any) => state.staffType
  );


  let data = userGrid?.Result?.map((user: any) => {
    let obj = {
      id: user.UserId,
      StaffType: user.StaffType,
      UserName: user.UserName,
      key: user.UserId,
      Alias: user.Alias,
      StaffTypeDescription: user.StaffTypeDescription,
      NationalCode: user?.User?.Person?.NationalCode,
    };
    return obj;
  });

  let dataModelUserGrid = {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: pageModel.pageIndex,
    orderBy: "UserId",
    filters: [],
  };


  useEffect(() => {
    dispatch(fetchUserGetForGrid(dataModelUserGrid));
  }, [pageModel]);

  const removeUserHandler = (record: any) => {
    let removeData = {
      userId: record.id,
      staffType: record.StaffType,
    };
    dispatch(
      removeUserGetForGrid(removeData, () => {
        dispatch(fetchUserGetForGrid(dataModelUserGrid));
      })
    );
  };

  //coloumns Table
  let columns: any = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "UserName",
      key: "UserName",
      width: "20%",
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "20%",
    },
    {
      title: "سمت",
      dataIndex: "StaffTypeDescription",
      key: "StaffTypeDescription",
      width: "55%",
    },

    {
      title: FindAccess(userAccessList.Adjusters_ViewActor) && "عملیات",
      dataIndex: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div>
            {/* <a className="action" onClick={editDocumentHandler}>
              <img src={edit} alt="edit" />
            </a> */}
            {FindAccess(userAccessList.Adjusters_DeleteActor) && (
              <Popconfirm
                title="از حذف کاربر مورد نظر مطمئن هستید؟"
                onConfirm={() => removeUserHandler(record)}
                okText="بله"
                cancelText="خیر"
              >
                <Tooltip title="حذف" overlayClassName="popAction">
                  <Button
                    className="action"
                    type="text"
                    loading={record.id === loadingRemoveId}
                  >
                    <Trash />
                  </Button>
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        </Space>
      ),
    },
  ];

  const createSearchUserHandler = () => {
    setVisibleSearch(true);
  };

  const renderComponent = (visible: boolean, record: any) => {
    setRecordSearchUser(record);
    setVisiblePosition(visible);
  };

  return (
    <>
      {FindAccess(userAccessList.Adjusters_CreateActor) && (
        <Button
          type="primary"
          className="createModal"
          onClick={createSearchUserHandler}
          icon={<PlusOutlined />}
        >
          ایجاد کابر
        </Button>
      )}
      {FindAccess(userAccessList.Adjusters_ViewActor) ? (
        <Table
          columns={columns}
          dataSource={data}
          loading={loadingUserGrid}
          pagination={{
            pageSize: pageModel.pageSize,
            total: userGrid?.TotalCount,
            showSizeChanger: true,
            showTotal: (total) => `تعداد کل : ${total} `,
            onChange: (current: number, pageSize: any) =>
              setPageModel({
                ...pageModel,
                pageIndex: current,
                pageSize: pageSize,
              }),
            locale: { items_per_page: "/ صفحه" },
          }}
          locale={{
            emptyText: (
              <>
                {" "}
                <Nofilestorage /> <div>لیست کاربران خالی است</div>
              </>
            ),
          }}
        />
      ) : (
        <Alert
          type="warning"
          description="شما به بخش لیست کاربران دسترسی ندارید."
          message=""
        />
      )}
      <ConfigProvider direction="rtl">
        <Modal
          title={visiblePosition?("انتخاب سمت"):("جستجوی کاربر")}
          visible={visibleSearch}
          footer={null}
          onOk={() => setVisibleSearch(false)}
          onCancel={() => {
            return setVisibleSearch(false), setVisiblePosition(false);
          }}
          width={1000}
          centered
          destroyOnClose={true}
        >
          {visiblePosition ? (
            <PositionUser
              recordSearchUser={recordSearchUser}
              closeModal={() => setVisibleSearch(false)}
              dataModelUserGrid={dataModelUserGrid}
              setVisiblePosition={setVisiblePosition}
            />
          ) : (
            <SearchUser
              renderComponent={renderComponent}
              closeModal={() => setVisibleSearch(true)}
            />
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default UserList;
