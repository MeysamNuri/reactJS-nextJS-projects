import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import { useDeletRejectBaseInfo } from "../AdjustersHook";
import {
  Table,
  Button,
  Space,
  Modal,
  ConfigProvider,
  Popconfirm,
  Tooltip,
  Alert
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import CreateChangeStatusReason from "./CreateChangeStatusReason";
import moment from "jalali-moment";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { api } from "../../../httpServices/service";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

const RejectionSeason = () => {
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    pageIndex: 1,
  });
  const [remove] = useDeletRejectBaseInfo();
  const [visible, setVisible] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);

  let dataModel = {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: pageModel.pageIndex,
    orderBy: "Id",
    filters: [],
  };
  const fetchChangeStatusReason = (key: number, page = 1) =>
    api.post(`/ChangeStatusReason/GetForGrid`, dataModel);

  const { resolvedData } = usePaginatedQuery(
    ["statusReasons", pageModel.pageIndex, pageModel.pageSize],
    fetchChangeStatusReason
  );

  //show Data  change status?
  let data = resolvedData?.data?.Result?.map(
    ({
      Id,
      Title,
      CreatedDate,
    }: {
      Id: number;
      Title: string;
      CreatedDate: string;
    }) => {
      let obj = {
        Title: Title,
        key: Id,
        id: Id,
        CreatedDate: moment(CreatedDate?.split("T")[0]).format("jYYYY-jMM-jDD"),
      };
      return obj;
    }
  );

  //remove RejectSeason
  const removeChangeStatusReasonHandler = (id: number) => {
    remove(id);
  };

  //add Change Status Reason
  const createChangeStatusReason = () => {
    setAddForm(true);
    setVisible(true);
  };

  //update Change Status Reason
  const updateChangeStatusReason = (record: any) => {
    setSelectedReason(record);
    setAddForm(false);
    setVisible(true);
  };
  let columns = [
    {
      title: "تاریخ ثبت",
      dataIndex: "CreatedDate",
      width: "20%",
    },
    {
      title: "وضعیت",
      dataIndex: "Title",
      width: "85%",
    },

    {
      title:
        FindAccess(userAccessList.Adjusters_EditChangeStatusReason) && "عملیات",
      dataIndex: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="coursesOperations">
            {FindAccess(userAccessList.Adjusters_EditChangeStatusReason) && (
              <Tooltip title="ویرایش">
                <a
                  className="action"
                  onClick={() => updateChangeStatusReason(record)}
                >
                  <Edit />
                </a>
              </Tooltip>
            )}
            {/*  {data.length >= 1 ? (
              <Popconfirm
                title="از حذف دلیل رد متقاضی مورد نظر مطمئن هستید؟"
                onConfirm={() => removeChangeStatusReasonHandler(record?.key)}
                okText="بله"
                cancelText="خیر"
              >
                <Tooltip title="حذف">
                  <a className="action">
                    <Trash />
                  </a>
                </Tooltip>
              </Popconfirm>
            ) : null} */}
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="rejectSeoson">
      {FindAccess(userAccessList.Adjusters_CreateChangeStatusReason) && (
        <Button
          type="primary"
          className="createModal"
          onClick={createChangeStatusReason}
          icon={<PlusOutlined />}
        >
          ایجاد دلیل تغییر وضعیت
        </Button>
      )}

      <ConfigProvider direction="rtl">
        {FindAccess(userAccessList.Adjusters_ViewChangeStatusReason) ? (
          <Table
            dataSource={data}
            columns={columns}
            // loading={isLoading }
            // rowClassName={() => "editable-row"}
            pagination={{
              pageSize: pageModel.pageSize,
              total: resolvedData?.data?.TotalCount,
              showSizeChanger: true,
              onChange: (current: number, pageSize: any) =>
                setPageModel({
                  ...pageModel,
                  pageIndex: current,
                  pageSize: pageSize,
                }),
              locale: { items_per_page: "/ صفحه" },
            }}
          />
        ) : (
          <Alert
          message=""
          type="warning"
          description="شما به بخش دلایل تغییر وضعیت دسترسی ندارید."
          />
        )}

        <Modal
          title={addForm ? "دلیل تغییر وضعیت" : "ویرایش تغییر وضعیت"}
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
          <CreateChangeStatusReason
            closeModal={() => setVisible(false)}
            selectedReason={selectedReason}
            addForm={addForm}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default RejectionSeason;
