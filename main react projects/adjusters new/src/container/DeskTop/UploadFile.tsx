import React, { useState, useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip, Popconfirm } from "antd";
import {
  uploadFileHandler,
  removeFileHandler,
} from "../../redux/actions";
import  Upload from "../../assets/images/upload.svg";

const UploadFile = () => {
  const dispatch = useDispatch();


  const { uploadFile } = useSelector((state: any) => state.uploadFile);
  // const allFiles = useSelector((state: any) => state.uploadFile.files);
  // const [fileList, setFileList] = useState<any>([]);

  // useEffect(() => {
  //   setFileList(allFiles);
  // }, [allFiles]);


 




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

  // const removeFile = (file: any) => {
  //   const newData = fileList.filter((item: any) => item.Id != file.Id);
  //   dispatch(removeFileHandler(file.Id, newData, () => {}));
  
  // };



  return (
    <div className="documents">
      <label className="customFileUpload">
        <input
          type="file"
          accept="image/jpeg*"
          onChange={(e) => handleUpload(e)}
    
        />
        بارگذاری فایل
       <img  src={Upload}  alt="upload"  />
      </label>
    
      
     
    </div>
  );
};

export default UploadFile;
