import React, { useState, FC } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { SET_DESCRIPTION } from "../../../../constant/desktop";

interface IFinalApprovalProps {
  onSubmit: () => void;
  onPrev: () => void;
}
const { TextArea } = Input;

const Description: FC<IFinalApprovalProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");

  
  const prevHandler = () => {
    onPrev();
  };
  const nextStepHandler = () => {
    onSubmit();
    dispatch({ type: SET_DESCRIPTION, payload: desc }); 
  };
  const setDescription = (e: any) => {
    setDesc(e.target.value);
  };


  return (
    <div>
      <label>توضیحات</label>
      <TextArea rows={4} onChange={(e) => setDescription(e)} />
      <div className="nextButton">
        <Button onClick={prevHandler}>مرحله قبلی</Button>
        <Button type="primary" onClick={nextStepHandler}>
          مرحله بعدی
        </Button>
      </div>
    </div>
  );
};

export default Description;
