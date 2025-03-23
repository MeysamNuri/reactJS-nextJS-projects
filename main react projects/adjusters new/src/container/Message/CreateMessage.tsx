import React, { useState, FC,useEffect } from "react";
import { Button, Input ,Row,Col} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addcreateMessage ,uploadFileHandler,dlFileHandler,removeFileHandler,removeUploadedFiles} from "../../redux/actions";
import Upload from "../../assets/images/upload.svg";
import {Icon} from 'sanhab-components-library'
const { TextArea } = Input;

interface IMessageProps {
  applicantId: number;
  closeModal: () => void;
}

const Message: FC<IMessageProps> = ({ applicantId, closeModal }) => {
  const dispatch = useDispatch();
  const [textMessage, setTextMessage] = useState("");
  let { loading } = useSelector((state: any) => state.message);
  const { uploadFile ,files} = useSelector((state: any) => state.uploadFile);
  let message = {
    applicantId:applicantId,
    text: textMessage,
    fileDescriptionId: uploadFile?.Result.FileDescriptionId,
  };
  useEffect(() => {
    dispatch(removeUploadedFiles)
  }, [])
  const submitMessageHandler = () => {
    dispatch(
      addcreateMessage(
        message,
        () => setTextMessage(""),
        () => closeModal()
      )
    );
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
  const downloadFile = (file: any) => {

    dispatch(dlFileHandler(file.Id));
  }
  const removeFile = (file: any) => {

    const newData = files.filter((item: any) => item.Id != file.Id);
    dispatch(removeFileHandler(file.Id, newData, () => { }));
  }
  return (
    <>
      <h5>پیام</h5>
      <TextArea value={textMessage} onChange={(e: any) => setTextMessage(e.target.value)} />
      <div className="documents">
        <label className="customFileUpload">
          <input
            type="file"
            accept="image/jpeg*"
            onChange={(e) => handleUpload(e)}
          />
        بارگذاری فایل
       <img src={Upload} alt="upload" />
        </label>



      </div>
      <br/>
      <Row>
        <Col span={24} >
          {
            files?.length > 0 ?
              <p className="files-text"><span style={{ color: "orange", borderBottom: "1px solid" }}>{files?.length}</span> تعداد فایل های بارگذاری شده </p>

              : null
          }

          {

            files?.map((item: any) => (

              <div className={"List-uploded"}>

                {/* <img src={remove} alt="remove" onClick={() => removeUplodedFile(item.Id)} />
                                         */}

                <Icon
                  onClick={() => downloadFile(item)}
                  iconType="download"
                  toolTip="دانلود"
                  size="medium"


                />
                <Icon
                  onClick={() => removeFile(item)}
                  iconType="trash"
                  toolTip="حذف"
                  size="medium"


                />
                <span className="class-name">{item?.FileName}</span>

              </div>


            ))

          }


        </Col>
      </Row>
      <div className="submit  mtop">
        <Button type="primary" onClick={submitMessageHandler} loading={loading}>
          ذخیره
        </Button>
      </div>
    </>
  );
};

export default Message;
