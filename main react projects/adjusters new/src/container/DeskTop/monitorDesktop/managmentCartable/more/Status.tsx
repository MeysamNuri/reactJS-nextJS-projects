import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Tooltip } from "antd";
import { Icon } from 'sanhab-components-library'
import DatePicker2 from "../../../../../components/UI/DatePicker/DatePicker";
import {
  fetchAllChangeStatusReason,
  fetchAllNextStatuses,
  uploadFileHandler,
  saveChangeStatuse,
  dlFileHandler,
  removeFileHandler,
  fetchNaturalJudicalExistingEvaluator,
  removeUploadedFiles,
} from "../../../../../redux/actions";
import { ReactComponent as Upload } from "../../../../../assets/images/upload.svg";

const { TextArea } = Input;
const { Option } = Select;

interface IStatusProps {
  selectedItemManamentCartable: any;
  cartableReport: any;
  adjusterType: number;
  closeModal: () => void;
  removeFiles?:boolean
}

const Status: FC<IStatusProps> = ({
  selectedItemManamentCartable,
  cartableReport,
  adjusterType,
  closeModal,
  removeFiles
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const { uploadFile, files } = useSelector((state: any) => state.uploadFile);


  let {
    allChangeStatusReason,
    loading,
    allNextStatus,
    loadingSaveChangeStatus,
  } = useSelector((state: any) => state.allChangeStatusReason);

  useEffect(() => {
    dispatch(fetchAllChangeStatusReason());
    dispatch(fetchAllNextStatuses(selectedItemManamentCartable.StatusId));
  }, []);


  useEffect(() => {
    dispatch(removeUploadedFiles())
  }, [removeFiles])


  const onFinish = (values: any) => {
    let valStatus = {
      applicantId: selectedItemManamentCartable.ApplicantId,
      newStatus: values.newStatus,
      changeStatusDate: values.changeStatusDate,
      fileDescriptionId: uploadFile?.Result.FileDescriptionId,
      description: values.description,
      changeStatusReasonId: values.changeStatusReasonId,
      effectiveDate: values.effectiveDate,
    };
    dispatch(
      saveChangeStatuse(
        valStatus,
        () =>
          dispatch(
            fetchNaturalJudicalExistingEvaluator(cartableReport, adjusterType)
          ),
        () => closeModal()
      )
    );
    form.resetFields()
    dispatch(removeUploadedFiles())
  };

  const downloadFile = (file: any) => {

    dispatch(dlFileHandler(file.Id));
  }
  const removeFile = (file: any) => {

    const newData = files.filter((item: any) => item.Id != file.Id);

    dispatch(removeFileHandler(file.Id, newData, () => { }));
  }

  const handleUpload = (e: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    setFile(e.target.files[0]);
    const fileListAsArray = Array.from(e.target.files);
    fileListAsArray.forEach((v: any) => {

      const sendObj = {
        FileDescriptionId: uploadFile?.Result.FileDescriptionId && files.length > 0
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

  const handleChange = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <>
      <Form name="createStatus" onFinish={onFinish} form={form}>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Form.Item
              name="newStatus"
              labelCol={{ span: 8 }}
              label="وضعیت جدید"
              rules={[
                { required: true, message: "وضعیت جدید الزامی می باشد" },
              ]}
            >
              <Select
                placeholder="انتخاب کنید" 
                style={{ width: "100%" }}
                loading={loading}
                onChange={handleChange}
                allowClear
              >
                {allNextStatus?.Result?.map(
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
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="changeStatusReasonId"
              label="دلیل تغییر وضعیت"
              rules={[
                { required: true, message: "دلیل تغییر وضعیت الزامی می باشد" },
              ]}
            >
              <Select
                placeholder="انتخاب کنید"
                style={{ width: "100%" }}
                loading={loading}
                allowClear
              >
                {allChangeStatusReason?.Result?.map(
                  ({
                    Id,
                    Title,
                    CreatedDate,
                  }: {
                    Id: number;
                    Title: string;
                    CreatedDate: string;
                  }) => (
                    <Option key={Id} value={Id}>
                      {Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="changeStatusDate"
              label="تاریخ تبدیل وضعیت"
              labelCol={{ span: 8 }}
              rules={[
                { required: true, message: "تاریخ تبدیل وضعیت الزامی می باشد" },
              ]}
            >
              <DatePicker2 placeholder="تاریخ تبدیل وضعیت" />
            </Form.Item>
          </Col>
          {(selectedStatus == 2 || selectedStatus == 3) && (
            <Col span={24}>
              <Form.Item
                name="effectiveDate"
                label="تا تاریخ موثر"
                labelCol={{ span: 8 }}
              >
                <DatePicker2 placeholder="تاریخ موثر" />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item
              name="upload"
              label="بارگذاری فایل"
              labelCol={{ span: 8 }}
           
            >
              <Tooltip placement="bottom" title="بارگذاری فایل">
                <label className="customFileUpload customWidthFile ">
                  <Upload />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => handleUpload(e)}
                  />
                </label>
              </Tooltip>
            </Form.Item>
          </Col>
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
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="description"
              label="توضیحات"
              rules={[
                { required: true, message: "توضیحات الزامی می باشد" },
              ]}
            >
              <TextArea autoSize allowClear />
            </Form.Item>
          </Col>
        </Row>
        <div className="nextButton">
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingSaveChangeStatus}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Status;
