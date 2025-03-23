import React, { useState } from "react";
import {
  Table,
  ConfigProvider,
  Button,
  Popconfirm,
  Space,
  Modal,
  Tooltip,
  Alert,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import {
  useGetSpecializedFeild,
  useDeletFeild,
  useGetSpecialzedFeildId,
} from "../AdjustersHook";
import CreateSpecialzedField from "./CreateSpecialzedField";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { ISpecializedField } from "../../../shared/ulitities/Model/specializedField";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
import { ReactComponent as OK } from "../../../assets/images/ok.svg";
import { ReactComponent as UnChecked } from "../../../assets/images/removeItem.svg";

const SpecializedField = () => {
  const { data: specializedField, isLoading } = useGetSpecializedFeild();
  const [feildId, setFeildId] = useState(0);
  const { data: specializedFieldId } = useGetSpecialzedFeildId(feildId);
  const [remove] = useDeletFeild();
  const [visible, setVisible] = useState(false);
  const [addForm, setAddForm] = useState(false);

  let data = specializedField?.Result?.map((field: ISpecializedField) => {
    let obj = {
      key: field.Id,
      id: field.Id,
      title: field.Title + " ",
      SubFields: field.SubFields.length,
      AdjusterTypeTitle: field.AdjusterTypeTitle,
      Code: field.Code,
      IsActive: field.IsActive ? <OK /> : <UnChecked />,
      children:
        field.SubFields.length > 0 &&
        field.SubFields?.map((item: ISpecializedField) => {
          let subChild = {
            key: item.Id,
            id: item.Id,
            title: item.Title,
            AdjusterTypeTitle: item.AdjusterTypeTitle,
            Code: item.Code,
            IsActive: item.IsActive ? <OK /> : <UnChecked />,
          };
          return subChild;
        }),
    };
    return obj;
  });

  //romove Feild
  const removeFeildHandler = (record: any) => {
    remove(record.id);
  };

  //edit SpecializedFeild
  const editSpecializedHandler = (record: any) => {
    setVisible(true);
    setAddForm(false);
    setFeildId(record.id);
  };

  const columns = [
    {
      title: "تعداد زیر رشته ها",
      dataIndex: "SubFields",
      key: "SubFields",
      width: "8%",
    },

    {
      title: "رشته",
      dataIndex: "title",
      key: "title",
      width: "50%",
    },

    {
      title: "فعال/غیرفعال",
      dataIndex: "IsActive",
      key: "IsActive",
      width: "15%",
    },
    // {
    //   title: "نوع ارزیاب",
    //   dataIndex: "AdjusterTypeTitle",
    //   key: "AdjusterTypeTitle",
    //   width: "15%",
    // },

    {
      title: "کد رشته تخصصی",
      dataIndex: "Code",
      key: "Code",
      width: "20%",
    },

    {
      title: "عملیات",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="coursesOperations">
            {FindAccess(userAccessList.Adjusters_EditAdjustmentField) && (
              <Tooltip title="ویرایش">
                <a
                  className="action"
                  onClick={() => editSpecializedHandler(record)}
                >
                  <Edit />
                </a>
              </Tooltip>
            )}

            {FindAccess(userAccessList.Adjusters_DeleteAdjustmentField) && (
              <Popconfirm
                title={
                  record.children?.length === 0
                    ? "از حذف رشته مورد نظر مطمین هستید؟"
                    : "با حذف رشته مورد نظر همه زیرمجموعه ها حذف خواهند شد"
                }
                onConfirm={() => removeFeildHandler(record)}
                okText="بله"
                cancelText="خیر"
              >
                <Tooltip title="حذف">
                  <a className="action">
                    <Trash />
                  </a>
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        </Space>
      ),
    },
  ];

  //Modal SpecializedFeild
  const createSpecializedFeild = () => {
    setVisible(true);
    setAddForm(true);
  };

  return (
    <div className="feilds">
      {FindAccess(userAccessList.Adjusters_CreateAdjustmentField) && (
        <Button
          type="primary"
          className="createModal"
          onClick={createSpecializedFeild}
          icon={<PlusOutlined />}
        >
          ایجاد رشته
        </Button>
      )}
      {FindAccess(userAccessList.Adjusters_ViewAdjustmentFiled) ? (
        <ConfigProvider direction="rtl">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={isLoading}
          />
          <Modal
            title={addForm ? "ایجاد رشته تخصصی" : "ویرایش رشته تخصصی"}
            visible={visible}
            footer={null}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={600}
          >
            <CreateSpecialzedField
              specializedFieldId={specializedFieldId}
              addForm={addForm}
              closeModal={() => setVisible(false)}
            />
          </Modal>
        </ConfigProvider>
      ) : (
        <Alert
          type="warning"
          description="شما به بخش رشته های تخصصی دسترسی ندارید."
          message=""
        />
      )}
    </div>
  );
};

export default SpecializedField;
