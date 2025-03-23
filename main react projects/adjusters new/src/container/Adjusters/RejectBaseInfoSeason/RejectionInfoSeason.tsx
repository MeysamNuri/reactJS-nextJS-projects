import React, { useState } from "react";
import { useRejectAllBaseInfo, useDeletRejectBaseInfo } from "../AdjustersHook";
import {
  Table,
  Button,
  Space,
  Modal,
  ConfigProvider,
  Popconfirm,
  Tooltip,
  Alert,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import CreateRejectionInfoSeason from "./CreateRejectionInfoSeason";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

const RejectionSeason = () => {
  const { data: RejectAllBaseInfo, isLoading } = useRejectAllBaseInfo();
  const [remove] = useDeletRejectBaseInfo();
  const [visible, setVisible] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);

  //show Data AllBaseInfo?
  let data = RejectAllBaseInfo?.Result?.map(
    ({ Id, Title }: { Id: number; Title: string }) => {
      let obj = {
        title: Title,
        key: Id,
        id: Id,
      };
      return obj;
    }
  );

  //remove RejectSeason
  const removeRejectHandler = (id: number) => {
    remove(id);
  };

  //addRejectSeason
  const createRejectionInfoSeason = () => {
    setAddForm(true);
    setVisible(true);
  };

  //update RejectSeason
  const updateRejectSeason = (record: any) => {
    setSelectedSeason(record);
    setAddForm(false);
    setVisible(true);
  };
  let columns = [
    {
      title: "نام مستند",
      dataIndex: "title",
      width: "93%",
    },

    {
      title:
        FindAccess(userAccessList.Adjusters_DeleteRejectReason) &&
        FindAccess(userAccessList.Adjusters_EditRejectReason)
          ? "عملیات"
          : "",
      dataIndex: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="coursesOperations">
            {FindAccess(userAccessList.Adjusters_EditRejectReason) && (
              <Tooltip title="ویرایش">
                <a
                  className="action"
                  onClick={() => updateRejectSeason(record)}
                >
                  <Edit />
                </a>
              </Tooltip>
            )}
            {data.length >= 1 &&
            FindAccess(userAccessList.Adjusters_DeleteRejectReason) ? (
              <Popconfirm
                title="از حذف دلیل رد متقاضی مورد نظر مطمئن هستید؟"
                onConfirm={() => removeRejectHandler(record?.key)}
                okText="بله"
                cancelText="خیر"
              >
                <Tooltip title="حذف">
                  <a className="action">
                    <Trash />
                  </a>
                </Tooltip>
              </Popconfirm>
            ) : null}
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="rejectSeoson">
      {FindAccess(userAccessList.Adjusters_CreateRejectReason) && (
        <Button
          type="primary"
          className="createModal"
          onClick={createRejectionInfoSeason}
          icon={<PlusOutlined />}
        >
          ایجاد دلایل رد
        </Button>
      )}
      {FindAccess(userAccessList.Adjusters_ViewChangeStatusReason) ? (
        <ConfigProvider direction="rtl">
          <Table
            dataSource={data}
            pagination={false}
            columns={columns}
            loading={isLoading}
            // rowClassName={() => "editable-row"}
          />

          <Modal
            title={addForm ? "دلیل رد متقاضی" : "ویرایش رد متقاضی"}
            visible={visible}
            footer={null}
            onOk={() => {
              setVisible(false);
            }}
            onCancel={() => {
              setVisible(false);
            }}
            width={500}
            centered
          >
            <CreateRejectionInfoSeason
              closeModal={() => setVisible(false)}
              selectedSeason={selectedSeason}
              addForm={addForm}
            />
          </Modal>
        </ConfigProvider>
      ) : (
        <Alert
          type="warning"
          description="شما به بخش دلایل رد متقاضیان دسترسی ندارید."
          message=""
        />
      )}
    </div>
  );
};

export default RejectionSeason;
