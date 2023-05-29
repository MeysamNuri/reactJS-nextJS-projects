import React, { useState, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button } from "antd";
import { TYPE_REQUSET } from "../../../../constant/desktop";
import {
  fetchListRequestTypes,
  addRequestTypes,
} from "../../../../redux/actions";

const { Option } = Select;

interface ISelectedProps {
  onSubmit: () => void;
}

const SelectRequest: FC<ISelectedProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
 // let userIdRecognition =Number(localStorage.getItem("userRecognition"));
  const { valueRequests } = useSelector((state: any) => state.request);
 /*  const userIdLogin = useSelector(
    (state: any) => state.userLogin.userLogin?.Result
  ); */

  const lisRequestType = useSelector(
    (state: any) => state.request.listRequestType?.Result
  );
 

  const loading = useSelector(
    (state: any) => state.request.loading
  );
 


  const handleChange = (value: any) => { 
    dispatch({ type: TYPE_REQUSET, payload: value });
  };
  const nextStepHandler = () => {
    // let requstType = {
    //   applicantId: userIdLogin.ApplicantId,
    //   requestTypeId: valRequest,
    // };
    // dispatch(addRequestTypes(requstType));
    onSubmit();
  };
  useEffect(() => {
      dispatch(fetchListRequestTypes());
  }, []);

  return (
    <div>
      <label>انتخاب درخواست</label>
      <Select
        showSearch
        placeholder="انتخاب نمایید"
        optionFilterProp="children"
        onChange={handleChange}
        style={{ width: 300, marginRight: "20px" }}
        allowClear
        loading={loading}
        defaultValue={valueRequests}
      >
        {lisRequestType?.map((requestType: { Value: number; Description: string }) => (
          <Option key={requestType.Value} value={requestType.Value}>
            {requestType.Description}
          </Option>
        ))}
      </Select>

      <div className="nextButton">
        <Button type="primary" onClick={nextStepHandler}>
          مرحله بعدی
        </Button>
      </div>
    </div>
  );
};

export default SelectRequest;
