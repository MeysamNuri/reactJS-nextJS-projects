import React, { FC } from "react";
import { Button, Select, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { messageWarning } from "../../../../utils/utils";
import {
  postSwapUsers,
  cartableReportAllInfo,
} from "../../../../redux/actions";

const { Option } = Select;

interface IReferProps {
  adjusterTypeId: number;
  applicantId: number;
  cartableReport: any;
  adjType: any;
  closeModal: any;
}

const Refer: FC<IReferProps> = ({
  adjusterTypeId,
  applicantId,
  cartableReport,
  adjType,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.swap);

  const onFinish = (values: any) => {
    let dataToPost = {
      applicantId: applicantId,
      adjusterTypeId: adjusterTypeId,
      assignTo: values.assignee,
    };
    values.assignee == undefined
      ? messageWarning("لطفا نام کارشناس را انتخاب نمایید")
      : dispatch(
          postSwapUsers(
            dataToPost,
            () => {
              dispatch(cartableReportAllInfo(cartableReport, adjType,()=>{}));
            },
            () => closeModal()
          )
        );
  };

  const usersList = useSelector(
    (state: any) => state.usersForCartable.users?.Result
  );

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="assignee" label=" ارجاع به">
        <Select showSearch placeholder="انتخاب نمایید">
          {usersList?.map((i: any) => (
            <Option value={i?.UserId} key={i?.UserId}>
              {i?.UserName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="submit">
        <Button type="primary" htmlType="submit" loading={loading}>
          ارجاع
        </Button>
      </div>
    </Form>
  );
};
export default Refer;
