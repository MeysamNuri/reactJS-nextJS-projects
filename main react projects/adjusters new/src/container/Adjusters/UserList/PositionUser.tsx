import React, { useState, useEffect, FC } from "react";
import { Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createStaff,
  fetchUserGetForGrid,
  fetchStaffType,
} from "../../../redux/actions";

const { Option } = Select;

interface IPositionProps {
  recordSearchUser?: any;
  closeModal?: any;
  dataModelUserGrid?: any;
  setVisiblePosition?: any;
}

const PositionUser: FC<IPositionProps> = ({
  recordSearchUser,
  closeModal,
  dataModelUserGrid,
  setVisiblePosition,
}) => {
  const dispatch = useDispatch();
  const { staffTypes,createStaffLoading ,loading} = useSelector((state: any) => state.staffType);
  const [staffTypeId, setStaffTypeId] = useState(0);

  useEffect(() => {
    dispatch(fetchStaffType());
  }, []);

  const selectedStaffTypeId = (value: number) => {
    setStaffTypeId(value);
  };

  let createPosition = {
    userId: recordSearchUser.Id,
    alias: "string",
    userName: recordSearchUser.FirstName + " " + recordSearchUser.LastName,
    staffType: staffTypeId,
  };

  const searchHandler = () => {
    dispatch(
      createStaff(
        createPosition,
        () => closeModal(),
        () => setVisiblePosition(false),
        () => {
          dispatch(fetchUserGetForGrid(dataModelUserGrid));
        }
      )
    );
  };

  return (
    <div className="position">
      <h3>
        {" "}
        کاربر با نام{" "}
        {recordSearchUser.FirstName + " " + recordSearchUser.LastName} انتخاب شد{" "}
      </h3>
      <div className="wraperInput">
        <label> انتخاب سمت کاربر :</label>
        <Select
          placeholder="انتخاب سمت"
          style={{ width: "50%", paddingRight: "5px" }}
          allowClear
          onChange={selectedStaffTypeId}
          loading={loading}
        >
          {staffTypes?.Result?.map(
            ({
              Value,
              Description,
            }: {
              Value: number;
              Description: string;
            }) => (
              <Option key={Value} value={Value}>
                {Description}
              </Option>
            )
          )}
        </Select>
      </div>
      <div className="submit  marginTopBottom">
        <Button type="primary" onClick={searchHandler} loading={createStaffLoading}>
          ثبت
        </Button>
      </div>
    </div>
  );
};

export default PositionUser;
