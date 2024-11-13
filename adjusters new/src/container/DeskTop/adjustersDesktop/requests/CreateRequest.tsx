import React, { useState, FC ,useEffect} from "react";
import { Steps, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import SelectRequest from "./SelectRequest";
import FinalApproval from "./FinalApproval";
import CreateForm from "./CreateForm";
import ManagerInfoForm from './managerInfoForm'
import Documents from "./documnet/Documents";
import BoardMemberDeputy from './boardMemberDeputy'
import Description from "./Description";
import CreateBoardMember from "../boardMembers/newBoardInformation/CreateBoardMember";
import CreateEstablishedBranches from "../establishedBranches/CreateEstablishedBranches";
import CreateWorkLocation from "./workLocation/CreateWorkLocation";
import CreateBranchManager from "../branchManager/CreateBranchManager";
import NewStockHolder from "../requests/newStockHolder";
import CapitalIncrease from "../requests/capitalIncrease";
import CooperationEndDate from "../requests/cooperationEndDate";
import EditStockHolder from "../requests/editStockHolder";
import { TYPE_REQUSET,UPLOAD_FILES_SUCCESS } from "../../../../constant/desktop";
import {
  removeInqiry,
  removeUploadedFiles
} from "../../../../redux/actions";
const { Step } = Steps; 


interface ICreateRequestProps {
  closeModal: () => void;
}

const CreateRequest: FC<ICreateRequestProps> = ({ closeModal }) => {
  const [current, setCurrent] = useState(0);
  const { valueRequests } = useSelector((state: any) => state.request);
  const dispatch = useDispatch();
  const sumitHandler = () => {
    setCurrent(current + 1);
  };
  const prevHandler = () => {
    setCurrent(current - 1); 
  };
useEffect(()=>{
return ()=>{
  dispatch({ type: TYPE_REQUSET, payload: null });
  dispatch(removeUploadedFiles())
  dispatch(removeInqiry())
}
},[])

  const steps = [
    {
      title: "انتخاب درخواست",
    },
    {
      title: "فرم درخواست",
    },
    {
      title: "مستندات",
    },

  ];

  //انواع فرم در خواست
  let form = null;
  switch (valueRequests) {
    case 1:
    case 2:
    case 3:
    case 10:
    case 8:
      form = <Description onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;
    case 4:
      form = <CreateBoardMember onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;

    case 6:
      form = (
        <CreateEstablishedBranches
          onSubmit={sumitHandler}
          onPrev={prevHandler}
        />
      );
      break;
    case 7:
      form = (
        <CreateWorkLocation onSubmit={sumitHandler} onPrev={prevHandler} />
      );
      break;
    case 9:
      form = (
        <CreateBranchManager onSubmit={sumitHandler} onPrev={prevHandler}  />
      );
      break;
    case 13:
      form = (
        <NewStockHolder onSubmit={sumitHandler} onPrev={prevHandler} />
      );
      break;
    case 14:
      form = (
        <CapitalIncrease onSubmit={sumitHandler} onPrev={prevHandler} />
      );
      break;
    case 15:
      form = <ManagerInfoForm onSubmit={sumitHandler} onPrev={prevHandler} boardMemberBoss={false} />;
      // form = <Ceo onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;
    case 16:
      form = <ManagerInfoForm onSubmit={sumitHandler} onPrev={prevHandler} boardMemberBoss={true} />;
      break;
    case 17:
      form = <BoardMemberDeputy onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;
    case 18:
      form = <EditStockHolder onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;
    case 19:
      form = <CooperationEndDate onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;

    default:
      form = <Description onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;
  }

  let newSteps = steps?.map((item) => (
    <Step key={item?.title} title={item?.title} />
  ));
  let stepContent = null;
  switch (current) {
    case 0:
      {
        // title: "انتخاب درخواست",
        stepContent = <SelectRequest onSubmit={sumitHandler} />;
      }
      break;
    case 1:

      stepContent = form
      break;
    case 2:
      stepContent = (
        <Documents
          onSubmit={sumitHandler}
          onPrev={prevHandler}
          closeModal={closeModal}
        />
      );
      // requestType === 12 ? (
      //   <Documents onSubmit={sumitHandler} onPrev={prevHandler} />
      // ) : (
      //   "fbngf"
      // );
      break;
    case 3:
      stepContent = (
        <FinalApproval onSubmit={sumitHandler} onPrev={prevHandler} />
      );
      break;

    default:
      form = <Description onSubmit={sumitHandler} onPrev={prevHandler} />;
      break;
  }

  return (
    <div className="createRequest">
      <Steps current={current} type="navigation" size="small">
        {newSteps}
      </Steps>
      <div className="steps-content">{stepContent} </div>
      <div className="steps-action"></div>
    </div>
  );
};

export default CreateRequest;
