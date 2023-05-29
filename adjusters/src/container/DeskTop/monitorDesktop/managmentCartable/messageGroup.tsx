import React, { useState, FC } from "react";
import { Button, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { supervisionMessageGroupSendAction, uploadFileHandler,dlFileHandler,removeFileHandler } from "../../../../redux/actions";
import { toast } from 'react-toastify'
import Upload from "../../../../assets/images/upload.svg";
import {Icon} from 'sanhab-components-library'
const { TextArea } = Input;

interface IMessageGroupProps {
  activeTabManagment: string;
  dataManagment: any;
  closeModal: any;
  dataSeletManagment: any;
}
const MessageGroup: FC<IMessageGroupProps> = ({
  activeTabManagment,
  closeModal,
  dataSeletManagment,
}) => {
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const { loadingSupervisionSmsBatch } = useSelector(
    (state: any) => state.smsBatchSend
  );
  const { uploadFile ,files} = useSelector((state: any) => state.uploadFile);
  let findUndefind = dataSeletManagment?.some(
    (item: any) => item.value === undefined
  );

  let smsBatch = {
    text: body,
    fileDescriptionId: uploadFile?.Result.FileDescriptionId,
    adjusterTypeId: Number(activeTabManagment),
    filters: findUndefind ? [] : dataSeletManagment,
  };

  const submitSmsHandler = () => {
    if (findUndefind) return toast.warning("لطفا مخاطب را انتخاب کنید")
    if (body === "") return toast.warning(" لطفا متن پیام را بنویسید")
    dispatch(
      supervisionMessageGroupSendAction(
        smsBatch,
        () => closeModal(),
        () => setBody("")
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
    <div>

      <TextArea
        placeholder="متن پیام خود را اینجا بنویسید"
        autoSize
        style={{ marginTop: "20px" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        allowClear
      />
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
      <div className="rightButton">
        <Button
          type="primary"
          onClick={submitSmsHandler}
          loading={loadingSupervisionSmsBatch}
        >
          ارسال
        </Button>
      </div>
    </div>
  );
};

export default MessageGroup;
