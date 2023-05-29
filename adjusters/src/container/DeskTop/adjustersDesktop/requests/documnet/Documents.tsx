import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { Button, Tooltip, Popconfirm } from "antd";
import {
  addRequestTypes,
  downLoaderDocument,
  uploadFileHandler,
  removeFileHandler,
  fetchListMyRequest
} from "../../../../../redux/actions";
import { ReactComponent as Upload } from "../../../../../assets/images/upload.svg";
//import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import {
  // SET_FILES,
  SET_CEO,
  //TYPE_REQUSET,
  SET_ESTABLISH_BRANCH,
  CHANGE_WORK_LOCATION,
  SET_STOCK_HOLDER,
  SET_BRANCH_MANAGER ,
  SET_CAPITAL_INCREASE
} from "../../../../../constant/desktop";
import { filterAdvanceOperator } from "../../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as Remove } from "../../../../../assets/images/remove.svg";
import { ReactComponent as NotFile } from "../../../../../assets/images/nofileStorage.svg";
import "./Document.css";

interface IDocumentProps {
  onSubmit: () => void;
  onPrev: () => void;
  closeModal: () => void;
}
const Documents: FC<IDocumentProps> = ({ onSubmit, onPrev, closeModal }) => {
  const dispatch = useDispatch();
  const {
    valueDescription,
    ceo, 
    capitalIncrease,
    stockHolder,
    branchManger,
    stablishBranch,
    workLocation,
    boardMember,
    boardMemberBoss,
    valueRequests,
    listRequestes,
    boardMemberDeputyDetails,
    // employe,
    // contractEvaluation,
    loadingAddRequest,
    error,
  } = useSelector((state: any) => state.request);
  //const { ceo } = useSelector((state: any) => state.request);
  //const { stablishBranch } = useSelector((state: any) => state.request);
  //const { boardMember } = useSelector((state: any) => state.request);
  //const { valueRequests,listRequestes } = useSelector((state: any) => state.request);
  const { uploadFile } = useSelector((state: any) => state.uploadFile);
  const allFiles = useSelector((state: any) => state.uploadFile.files);
  const [fileList, setFileList] = useState<any>([]);


  let updata = {
    firstPageSize: listRequestes.firstPageSize,
    orderBy: "Id",
    pageIndex: listRequestes.pageIndex,
    pageSize: listRequestes.pageSize,
    filters: [
      {
        operator: filterAdvanceOperator.Equal,
        propertyName: "EvaluationStatus",
        value: 0,
      },
    ],
  };

  useEffect(() => {
    setFileList(allFiles);
  }, [allFiles]);



  let data = {
    requestType: valueRequests,
    description: valueDescription,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
  };

  let dataCeo = {
    requestType: valueRequests,
    description: ceo?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
    ceo: {
      applicantId: ceo?.applicantId,
      currentApplicantId:ceo?.currentApplicantId,
      cooperationEndDate: moment(ceo?.cooperationEndDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      startDate: moment(ceo?.startDate.toDate()).format(
        "YYYY-MM-DD"
      ),
    },
  };
  let dataCapital = {
    requestType: valueRequests,
    description: capitalIncrease?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
    capitalIncrease: {
      capital:capitalIncrease?.capital
    },
  };
  let dataStockHolder = {
    requestType: valueRequests,
    description: stockHolder?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
    stockHolder: {
      joinDate: stockHolder?.joinDate,
      nationalCode: stockHolder?.nationalCode,
      fullName: stockHolder?.fullName,
      isLegal: stockHolder?.isLegal,
      birthDate: stockHolder?.birthDate,
      shareAmount: stockHolder?.shareAmount,
      endDate: stockHolder?.endDate,
      beforStockHolderId:stockHolder?.beforStockHolderId??null

    },
  };
  let databranchManager = {
    requestType: valueRequests,
    description: branchManger?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
    changeBranchManager: {

      applicantWorkLocationInfoId:branchManger?.applicantWorkLocationInfoId,
      fullName:branchManger?.fullName,
      nationalCode: branchManger?.nationalCode,
      birthDate: branchManger?.birthDate,
      startDate: branchManger?.startDate,
      beforManagerEndDate: branchManger?.beforManagerEndDate,
  

    },
  };
  let dataBoardMember = {
    requestType: valueRequests,
    description: boardMember?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
    boardMember: {
      applicantId: boardMember?.applicantId,
      postId: boardMember?.postId,
      startDate: boardMember?.startDate,
      workLocationInfoId:boardMember?.workLocationInfoId
    },
  };
  let dataBoardMemberBoss = {
    requestType: valueRequests,
    description: boardMemberBoss?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
    boardMemberBoss: {
      applicantId: boardMemberBoss?.applicantId,
      currentApplicantId:boardMemberBoss?.currentApplicantId,
      cooperationEndDate: moment(boardMemberBoss?.cooperationEndDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      startDate: moment(boardMemberBoss?.startDate.toDate()).format(
        "YYYY-MM-DD"
      ),
    },
  };
  let dataBoardMemberDeputy = {
    requestType: valueRequests,
    description: boardMemberDeputyDetails?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    title: "string",
    boardMemberDeputy: {
      applicantId: boardMemberDeputyDetails?.applicantId,
      currentApplicantId:boardMemberDeputyDetails?.currentApplicantId,
      cooperationEndDate: moment(boardMemberDeputyDetails?.cooperationEndDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      startDate: moment(boardMemberDeputyDetails?.startDate.toDate()).format(
        "YYYY-MM-DD"
      ),
    },
  };
  let dataStablishBranch = {
     requestType: valueRequests,
    description: stablishBranch?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,


    // applicantRequestId: 0,
    // beforWorkLocationInfoId:stablishBranch?.beforWorkLocationInfoId,
    workLocation:{
      provinceId: stablishBranch?.provinceId,
      cityId: stablishBranch?.cityId,
      address: stablishBranch?.address,
      placeUsage: stablishBranch?.placeUsage,
      telephone: stablishBranch?.telephone,
      fax: stablishBranch?.fax,
      email: stablishBranch?.email,
      website: stablishBranch?.website,
      postalCode: stablishBranch?.postalCode,
    }
   

  };
  let dataWorkLocation = {
     requestType: valueRequests,
    description: workLocation?.description,
    fileDescriptionId: uploadFile?.Result?.FileDescriptionId,


    // applicantRequestId: 0,
    workLocation:{
      beforWorkLocationInfoId:workLocation?.beforWorkLocationInfoId,
      provinceId: workLocation?.provinceId,
      cityId: workLocation?.cityId,
      address: workLocation?.address,
      placeUsage: workLocation?.placeUsage,
      telephone: workLocation?.telephone,
      fax: workLocation?.fax,
      email: workLocation?.email,
      website: workLocation?.website,
      postalCode: workLocation?.postalCode,
    }
 
  };
 
 

  const nextStepHandler = () => {
    dispatch({ type: SET_CEO, payload: null });
    dispatch({ type: SET_ESTABLISH_BRANCH, payload: null });
    dispatch({ type: CHANGE_WORK_LOCATION, payload: null });
    dispatch({ type: SET_STOCK_HOLDER, payload: null });
    dispatch({ type: SET_BRANCH_MANAGER , payload: null });
    dispatch({ type: SET_CAPITAL_INCREASE , payload: null });
    // dispatch({ type: SET_EMPLOYEE, payload: null });
    // setFileList(null);
    // dispatch({ type: TYPE_REQUSET, payload: null });
    // onSubmit();
    switch (valueRequests) {
      case 9:
        dispatch(
          addRequestTypes(
            databranchManager,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 14:
        dispatch(
          addRequestTypes(
            dataCapital,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 13:
      case 18:
        dispatch(
          addRequestTypes(
            dataStockHolder,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 15:
        dispatch(
          addRequestTypes(
            dataCeo,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 16:
        dispatch(
          addRequestTypes(
            dataBoardMemberBoss,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 17:
        dispatch(
          addRequestTypes(
            dataBoardMemberDeputy,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 4:
        dispatch(
          addRequestTypes(
            dataBoardMember,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 1:
      case 2:
      case 3:
      case 10:
      case 8:
        dispatch(
          addRequestTypes(
            data,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 6:
        dispatch(
          addRequestTypes(
            dataStablishBranch,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      case 7:
        dispatch(
          addRequestTypes(
            dataWorkLocation,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
      default:
        dispatch(
          addRequestTypes(
            data,
            () => dispatch(fetchListMyRequest(updata)),
            () => closeModal(),
            () => {}
          )
        );
        break;
    }
  };
  const prevHandler = () => {
    onPrev();
  };

  // useEffect(() => {
  //   dispatch(fetchDocuments(requestType));
  // }, []);

  const downloadFileHandler = (record: any) => {
    // console.log(record, "recordDownload");
    dispatch(downLoaderDocument(record.RequestTypeId));
  };

  const handleUpload = (e: any) => {
    const fileListAsArray = Array.from(e.target.files);
    fileListAsArray.forEach((v: any) => {
      //   let ex: string = '';
      //   switch (v.type) {
      //       case "image/png":
      //           ex = ".png"
      //           break;
      //       case "application/pdf":
      //           ex = ".pdf"
      //           break;
      //       case "image/jpeg":
      //           ex = ".jpeg"
      //           break;
      //       default:
      //           ex = ""
      //           break;
      //   }
      const sendObj = {
        FileDescriptionId: uploadFile?.Result.FileDescriptionId
          ? uploadFile?.Result.FileDescriptionId
          : 0,
        FileName: v.name,
        // Content: ""
      };
      let formData = new FormData();
      formData.append("file", v);
      formData.append("model", JSON.stringify(sendObj));
      dispatch(uploadFileHandler(formData));
    });
  };

  const removeFile = (file: any) => {
    const newData = fileList.filter((item: any) => item.Id != file.Id);
    dispatch(removeFileHandler(file.Id, newData, () => {}));
    // setFileList(newData)
  };

  //console.log(selectedFile, "selectedFile");

  // let rr = fileList.filter((item: any) => item.Id != selectedFile);
  // console.log(rr, "simsim");

  // useEffect(() => {
  //   if (fileList == null) {
  //     closeModal();
  //     setFileList([]);
  //   }
  // }, [fileList]);

  //   useEffect(() => {
  //   if (error ) {
  //     closeModal();
  //   }else{
  //     setFileList([])

  //   }
  // }, [error]);

  return (
    <div className="documents">
      <label className="customFileUpload" style={{width:"40%"}}>
        <input
          type="file"
          accept="image/jpeg*"
          onChange={(e) => handleUpload(e)}
          disabled={fileList?.length >=4?true:false}
        />
        بارگذاری فایل
        <Upload />
      </label>
      <br/>
      {fileList?.length === 0 ? (
        <div style={{ margin: "0 auto", width: "30%" }}>
          <NotFile />
          <h5>فایلی بارگذاری نگردیده است</h5>
        </div>
      ) : null}
<br/>
{
  fileList?.length >=4?<h4> امکان بارگذاری بیش از 4 مستند وجود ندارد</h4>:null
}

      {fileList?.map((file: any, index: number) => {
        return (
          <div className="cardDoc" key={index}>
            <div className="uploadFile">
              <span>{file.FileName}</span>
              <span>
                <Popconfirm
                  title="از حذف فایل مورد نظر مطمئن هستید؟"
                  onConfirm={() => removeFile(file)}
                  okText="بله"
                  cancelText="خیر"
                >
                  <Tooltip title="حذف" overlayClassName="popAction">
                    <a className="action">
                      <Remove className="remove" />
                    </a>
                  </Tooltip>
                </Popconfirm>
              </span>
            </div>
          </div>
        );
      })}

      <div className="nextButton">
        <Button onClick={prevHandler}>مرحله قبلی</Button>
        <Button
          type="primary"
          onClick={nextStepHandler}
          loading={loadingAddRequest}
        >
         ثبت نهایی
        </Button>
      </div>
    </div>
  );
};

export default Documents;
