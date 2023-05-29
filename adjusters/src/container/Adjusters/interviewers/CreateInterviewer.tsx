import React, { useState, useEffect } from "react";
import { Form, Select, Button, Row, Col, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useCreateInterviewer, useUpdateInterviewer,useGetSpecializedFeild } from "../AdjustersHook";
import { getBaseInfo } from "../../../redux/actions";
import { ReactComponent as Profile } from "../../../assets/images/profile.svg";
import { ReactComponent as Upload } from "../../../assets/images/upload.svg";
// import { RESET_IMAGE_STATE } from "../../../constant/cartableActionTypes";
// import { ISelectedIntervewers } from "../../../shared/ulitities/Model/interviewers";
// import InputNumber from "../../../components/InputNumber/InputNumber";

const { Option } = Select;

interface interviewerInfoProps {
  selectedInterviewer: any;
  addForm?: boolean;
  closeModal: () => void;
}

// const re = /^[0-9\b]+$/;
// const regex = /^(0098|\98|0)?9\d{9}$/;
// if (e.target.value === '' || re.test(e.target.value)) {
//    this.setState({value: e.target.value})
// }
const CreateInterviewer: React.FC<interviewerInfoProps> = ({
  selectedInterviewer,
  addForm,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState({} as any);
  const showPic = useSelector((state: any) => state.interviewerPicture.image);
  const { baseInfo, loading } = useSelector((state: any) => state.baseData);


  const [CreateInterviewer, { status }] = useCreateInterviewer();
  const [updateInterviewer, { status: statusUpdate }] = useUpdateInterviewer();
  const { data: specializedField } = useGetSpecializedFeild();

  const onFinish = (values: any) => {   
    let interviewer = {
      firstName: values.firstName,
      familyName: values.familyName,
      nationalCode: Number(values.nationalCode),
      degreeId: values.degreeId,
      bankId: values.bankId,
      phone: values.phone,
      sheba: values.sheba,
      CompanyId:values.CompanyId,
      AdjustmentFieldId:values.AdjustmentFieldId,
      file: file !== false ? file : null,
    };

    const editInterViewer = {
      Id: selectedInterviewer?.Id,
      firstName: values.firstName,
      familyName: values.familyName,
      nationalCode: Number(values.nationalCode),
      degreeId: values.degreeId,
      bankId: values.bankId,
      phone: values.phone,
      sheba: values.sheba,
      CompanyId:values.CompanyId,
      AdjustmentFieldId:values.AdjustmentFieldId,
      file: file ? file : undefined,
    };


    

    if (!addForm) {
      updateInterviewer({ ...editInterViewer });
    } else {
      CreateInterviewer({ ...interviewer });
    }
    setFile(false);
  };

  useEffect(() => {
    addForm
      ? form.resetFields()
      : form.setFieldsValue({
          firstName: selectedInterviewer && selectedInterviewer.FirstName,
          familyName: selectedInterviewer && selectedInterviewer?.FamilyName,
          nationalCode:
            selectedInterviewer && selectedInterviewer?.NationalCode,
          degreeId: selectedInterviewer && selectedInterviewer?.Degree.Id,
          bankId: selectedInterviewer && selectedInterviewer?.Bank.Id,
          phone: selectedInterviewer && selectedInterviewer?.Phone,
          sheba: selectedInterviewer && selectedInterviewer.Sheba,
          CompanyId: selectedInterviewer && selectedInterviewer.CompanyId,
          AdjustmentFieldId: selectedInterviewer && selectedInterviewer.AdjustmentFieldId,
          
        });
        
  }, [selectedInterviewer, addForm]);

  //handle Close Modal
  useEffect(() => {
    if (status === "success" || statusUpdate === "success") {
      closeModal();
      form.resetFields();
    }
  }, [status, statusUpdate]);

  //get Base InfoData
  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

  //upload Image
  const handleUpload = (e: any) => {
    setFile(e.target.files[0]);
    let reader = new FileReader();
    let image = e.target.files[0];
    reader.onloadend = () => {
      dispatch({
        type: "SAVE_interviewer_IMAGE_STATE",
        payload: reader.result,
      });
      image = reader.result;
    };

    reader.readAsDataURL(image);
    // if (file.type !== "image/jpeg" && file.size > 1000) {
    //   toast.error(
    //     "لطفا عکس را با حجم کمتر از 1000 و با فرمت jpeg وارد نمایید",
    //     {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     }
    //   );
    // }
  };
  // const onChange = () => {
  //   console.log("onChange");
  // };
 
  const handleKeyDownMobile = (event: any) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    }
    const regex = /^[0-9]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
      return false;
    }
    return true;
  };
// const handleOnBlureMobile=()=>{
//   let erre=form.getFieldValue("phone")
//   const regex = /^(0098|\98|0)?9\d{9}$/;
//   // if(!regex.test(erre)){
//   //   alert("invalid")
//   // }

// }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    }
    const regex = /^[0-9]+$/
    if (!regex.test(event.key)) {
      event.preventDefault();
      return false;
    }
    return true;
  };


  
  return (
    <div className="createInterViewer">
      <Form name="InterViewer" onFinish={onFinish} form={form}>
        <Row>
          <Col span={7} order={1} offset={4}>
            <Form.Item
              name="upload"
              // label="بارگذاری تصویر"
              // extra="حداکثر 1000 کیلو بایت و با فرمت jpeg"
              className="uploader"
              labelCol={{ xxl: 3, xl: 4, md: 5 }}
            >
              <div>
                <div>
                  <div className="uploadBox">
                    {showPic ? <img src={showPic}  alt="profile" /> : <Profile />}
                  </div>
                  <label className="customFileUpload">
                    <input
                      type="file"
                      accept="image/jpeg*"
                      onChange={(e) => handleUpload(e)}
                    />
                    بارگذاری فایل
                    <Upload />
                  </label>
                </div>
              </div>
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item
              label="نام"
              name="firstName"
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              className="titleGray"
              rules={[
                {
                  required: true,
                  message: "نام الزامی می باشد",
                },
                {
                  pattern: /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/,
                  message: "نام باید با حروف فارسی باشد",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="نام خانوادگی"
              name="familyName"
              className="titleGray"
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              rules={[
                {
                  required: true,
                  message: "نام خانوادگی الزامی می باشد",
                },
                {
                  pattern: /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/,
                  message: "نام خانوادگی باید با حروف فارسی باشد",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="کدملی"
              name="nationalCode"
              className="titleGray"
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              rules={[
                {
                  required: true,
                  message: "کدملی الزامی می باشد.",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "کدملی وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input maxLength={10} type="text" onKeyDown={handleKeyDown} />
            </Form.Item>
            <Form.Item
              label="موبایل"
              name="phone"
              className="titleGray"
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              rules={[
                {
                  required: true,
                  message: "شماره موبایل الزامی است",
                },
                {
                  pattern: /(0|\+98|0098)?9[0123][0-9]{8}/,
                  message: "شماره موبایل وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input
                type="text"
                maxLength={11}
                placeholder="09121111111"
                onKeyDown={handleKeyDownMobile}
               //onBlur={handleOnBlureMobile}
              />
            </Form.Item>

            <Form.Item
              name="degreeId"
              label="مدرک تحصیلی"
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              rules={[
                {
                  required: true,
                  message: "انتخاب مدرک تحصیلی الزامی می باشد",
                },
              ]}
            >
              <Select
               // style={{ width: "350px" }}
                placeholder="انتخاب نمایید"
                loading={loading}
              >
                {baseInfo?.Result?.AcademicDegrees?.map(
                  ({ Id, Title }: { Id: number; Title: string }) => (
                    <Option key={Id} value={Id}>
                      {Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="CompanyId"
              label="نام شرکت"
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              rules={[
                {
                  required: true,
                  message: "انتخاب نام شرکت الزامی است",
                },
              ]}
            >
              <Select
                //style={{ width: "350px" }}
                placeholder="انتخاب نمایید"
                loading={loading}
              >
                {baseInfo?.Result?.Companys?.map(
                  ({ Id, Title }: { Id: number; Title: string }) => (
                    <Option key={Id} value={Id}>
                      {Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="AdjustmentFieldId"
              label="نام رشته تخصصی"
            
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              rules={[
                {
                  required: true,
                  message: "انتخاب نام رشته تخصصی الزامی است",
                },
              ]}
            >
              <Select
               // style={{ width: "350px" }}
                placeholder="انتخاب نمایید"
                loading={loading}
              >
                {specializedField?.Result?.map((field:any) => (
                    <Option key={field.Id} value={field.Id}>
                      {field.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>


            <Form.Item
              name="bankId"
              label="نام بانک"
             
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              rules={[
                {
                  required: true,
                  message: "انتخاب نام بانک الزامی می باشد",
                },
              ]}
            >
              <Select placeholder="انتخاب نمایید" loading={loading}>
                {baseInfo?.Result?.Banks?.map(
                  ({ Id, Title }: { Id: number; Title: string }) => (
                    <Option key={Id} value={Id}>
                      {Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="شماره شبا"
              labelCol={{  md: 5, xxl: 6, xl: 6, }}
              name="sheba"
              className="titleGray"
              rules={[
                {
                  required: true,
                  message: "شماره شبا الزامی می باشد",
                },
                {
                  pattern: /^\d{24}$/,
                  message: "شماره شبا باید 24 رقم باشد",
                },
              ]}
            >
              <Input
                maxLength={24}
                prefix="IR"
                className="sheba"
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="submit">
          <Button
            type="primary"
            htmlType="submit"
            loading={status === "loading"}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateInterviewer;
