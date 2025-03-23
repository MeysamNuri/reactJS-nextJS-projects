import React, { FC } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

interface ICreateFormProps {
  onSubmit: () => void;
  onPrev: () => void;
}
const CreateForm: FC<ICreateFormProps> = ({ onSubmit, onPrev }) => {
  const requestType = useSelector((state: any) => state.request.valueRequests);

  const prevHandler=()=>{
    onPrev()
  }
  const nextStepHandler = () => {
    onSubmit();
  };
  return (
    <div>
      "createform"
      <div className="nextButton"  >
        <Button onClick={prevHandler}>مرحله قبلی</Button>
        <Button
          type="primary"
          onClick={nextStepHandler}
        >
          مرحله بعدی
        </Button>
      </div>
    </div>
  );
};

export default CreateForm;
