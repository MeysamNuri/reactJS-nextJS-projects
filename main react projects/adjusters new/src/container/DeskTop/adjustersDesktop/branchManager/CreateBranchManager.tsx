import React, { FC, useEffect, useState } from "react";
import { Form, Button, Row, Col, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { toast } from 'react-toastify'
import moment from "jalali-moment";
import { SET_BRANCH_MANAGER } from '../../../../constant/desktop'
import {
  postInquire,
  fetchWorkingLocationList,
  removeInqiry

} from "../../../../redux/actions";

interface IBranchManagerProps {
  onSubmit: () => void;
  onPrev: () => void;

}
const CreateBranchManager: FC<IBranchManagerProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const [selectedWorkLocation, setSelectedWorkLocation] = useState<number>(0)
  const [findLocationInfo, setLocationInfo] = useState<any>({})
  const [birthDate, setBirthDate] = useState<any>(null)
  const [nationalCode, setNationalCode] = useState("")
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input
  const {
    applicantWorkingLocation,
    loadingApplicantWorkingLocation } = useSelector((state: any) => state.request)
  const { inquire, loading } = useSelector(
    (state: any) => state.inquire
  );
  useEffect(() => {
    dispatch(fetchWorkingLocationList());
  }, []);


  const selectWorkLocation = (value: any) => {
    setSelectedWorkLocation(value)
  }
  useEffect(() => {
    if (selectedWorkLocation) {
      setLocationInfo(applicantWorkingLocation?.Result?.find((f: any) => f.Id === selectedWorkLocation))
    }

  }, [selectedWorkLocation])
  const onFinish = (values: any) => {
    let branchManagerOBG = {
      applicantRequestId: 0,
      applicantWorkLocationInfoId: findLocationInfo?.Id,
      fullName: inquire.Result?.FirstName + " " + inquire.Result?.LastName,
      nationalCode: nationalCode,
      birthDate: birthDate == null ? null : moment(birthDate).format("YYYY-MM-DD"),
      startDate: values.startDate == null ? null : moment(values.startDate).format("YYYY-MM-DD"),
      beforManagerEndDate: values.startDate == null ? null : moment(values.startDate).format("YYYY-MM-DD"),
      description: values.description
    }
    dispatch({ type: SET_BRANCH_MANAGER, payload: branchManagerOBG });
    onSubmit();
  };

  const prevHandler = () => {
    onPrev();
  };
  const stockHolderInquiry = () => {
    let identityInfo = {
      nationalCode: nationalCode,
      birthDate: moment(birthDate?.toDate()).format("YYYY-MM-DD"),
    };
    if (identityInfo.nationalCode === "" || birthDate === null) return toast.warning("لطفا مقادیر لازم را تکمیل بفرمایید")
    dispatch(postInquire(identityInfo, () => { }));
  };
  return (
    <div>
      <Row>
        <Col span={10}>
          <Form.Item
            labelCol={{ span: 6 }}
            name="nationalCode"
            label="کد ملی"
          >
            <Input onChange={(e) => setNationalCode(e.target.value)} value={nationalCode} />
          </Form.Item>
        </Col>
        <Col span={10} style={{ paddingRight: "10px" }}>
          <Form.Item
            name="birthDate"
            label="تاریخ تولد"
            labelCol={{ span: 6 }}
          >
            <DatePicker2 placeholder="تاریخ تولد"
              clasName="calendar"
              value={birthDate} onChange={(value: any) => setBirthDate(value)}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={stockHolderInquiry} loading={loading}>
            استعلام
                                             </Button>
        </Col>
      </Row>

      {
        inquire ?
          <>

            <Row>

              <h4>مشخصات شخص</h4>

            </Row>
            <Row className="stock-holder-details bgColorGray-1">

              <Col span={8}>
                <p>نام و نام خانوادگی : </p>
                <span>{`${inquire.Result?.FirstName} ${inquire.Result?.LastName}`}</span>
              </Col>
              <Col span={8}>
                <p>کد ملی :</p>
                <span>{inquire.Result?.NationalCode}</span>

              </Col>
              <Col span={8}>
                <p>تاریخ تولد :</p>
                {

                  <span> {

                    inquire.Result?.BirthDate ?
                      (
                        moment(inquire.Result?.BirthDate?.split("T")[0]).locale('fa').format('YYYY/MM/DD')
                      ) : "-"
                  } </span>
                }


              </Col>
              <Col span={8}>
                <p>نام پدر :</p>
                <span>{inquire.Result?.FatherName}</span>
              </Col>

              <Col span={8}>
                <p>جنسیت :</p>
                <span>{inquire.Result?.Gender ? ("مرد") : ("زن")}</span>

              </Col>


            </Row>
            <br />
            <Form name="createCourse" onFinish={onFinish} form={form}>
              <Row gutter={[16, 8]}>


                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 6 }}
                    label="محل فعالیت"
                    name="workLocationInfoId"
                    rules={[{ required: true, message: "محل فعالیت الزامی می باشد " }]}
                  >
                    <Select
                      placeholder="انتخاب نمایید"
                      style={{ width: "100%" }}
                      allowClear
                      loading={loadingApplicantWorkingLocation}
                      notFoundContent="محل فعالیت وجود ندارد"
                      onChange={selectWorkLocation}
                    >

                      {applicantWorkingLocation?.Result?.map((work: any) => (
                        <Option key={work.Id} value={work.Id}>
                          {work.Province?.Title + " " + work.City?.Title + " " + (work.Address ? work.Address : "")}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="startDate"
                    label="تاریخ انتصاب"
                    labelCol={{ span: 6 }}
                  >
                    <DatePicker2 placeholder="تاریخ انتصاب" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 6 }}
                    name="description"
                    label="توضیحات"
                  >
                    <TextArea autoSize allowClear />
                  </Form.Item>
                </Col>
              </Row>
              <div className="nextButton">
                <Button onClick={prevHandler}>مرحله قبلی</Button>
                <Button type="primary" htmlType="submit">
                  مرحله بعدی
          </Button>
              </div>
            </Form>
          </> : null
      }

    </div>
  );
};

export default CreateBranchManager;
