import React, { useEffect, FC } from "react";
import { useAllAdjusterType, useAllSeasons } from "../AdjustersHook";
import { Form, Select, Radio, Button, Row, Col, Input } from "antd";
import { useCreateCourse, useUpdateCourse } from "../AdjustersHook";
import { courseInfoProps } from "./interface-course";
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import moment from "jalali-moment";

const { Option } = Select;
const { TextArea } = Input;

export const CreateCourse: FC<courseInfoProps> = ({
  itemCourse,
  addForm,
  closeModal,
}) => {
  const { data: allAdjusterType } = useAllAdjusterType();
  const [insertCourse, { status }] = useCreateCourse();
  const [updateCourse, { status: status2 }] = useUpdateCourse();
  const [form] = Form.useForm();  
  const { data: seasons } = useAllSeasons();

  let year = new Date()
    .toLocaleDateString("fa-IR")
    .replace(/([۰-۹])/g, (token) =>
      String.fromCharCode(token.charCodeAt(0) - 1728)
    );

  let getyear = moment(year, "jYYYY/jM/jD").jYear();

  let courseId = itemCourse?.CourseId;

  //submit Form
  const onFinish = (values: any) => {
    let newCourse = {
      title: values.title,
      courseTypeId: values.CourseTypeId ,
      seasonId:  values.season ,
      editDeadline:moment(values.editDeadline.toDate()).format(
        "YYYY-MM-DD"
      ),
      registerOpenDate: moment(values.registerOpenDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      registerCloseDate: moment(values.registerCloseDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      year: Number(values.year),
    };

    if (!addForm) {
      updateCourse({ courseId, ...newCourse });
    } else {
      insertCourse(newCourse);
    }
  };

  //initial Value ItemCourse
  useEffect(() => {
    addForm
      ? form.resetFields()
      : form.setFieldsValue({
          title: itemCourse && itemCourse.Title,
          CourseTypeId: itemCourse && itemCourse.CourseType.Id,
          season: itemCourse && itemCourse.Season.Id,
          interviewDate: itemCourse && itemCourse.interviewDate,
          registerOpenDate: moment(itemCourse?.RegisterOpenDate.split("T")[0]),
          editDeadline: moment(itemCourse?.EditDeadline?.split("T")[0]),
          registerCloseDate:
            itemCourse && moment(itemCourse?.RegisterCloseDate.split("T")[0]),
          year: itemCourse && itemCourse.Year,
        });
  }, [itemCourse, addForm]);

  //handle Close Modal
  useEffect(() => {
    if (status === "success" || status2 === "success") {
      closeModal();
    }
  }, [status, status2]);

  //reset feield when create new form
  useEffect(() => {
    if (status === "success") {
      form.resetFields();
    }
  }, [status]);

  return (
    <Form name="createCourse" onFinish={onFinish} form={form}>
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Form.Item
            name="CourseTypeId"
            labelCol={{ span: 5 }}
            label="نوع ارزیاب"
            rules={[
              { required: true, message: "انتخاب نوع ارزیاب الزامی می باشد" },
            ]}
          >
            <Select
              placeholder="انتخاب ارزیاب"
              style={{ width: "100%" }}
              allowClear
            >
              {allAdjusterType?.Result?.map(
                ({ CourseTypeId, Title }: { CourseTypeId: number; Title: string }) => (
                  <Option key={CourseTypeId} value={CourseTypeId}>
                    {Title}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 5 }}
            label="عنوان دوره"
            name="title"
            rules={[
              {
                required: true,
                message: "نام دوره الزامی می باشد ",
              },
              // {
              //   pattern: /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/,
              //   message: "نام دوره باید با حروف فارسی باشد",
              // },
            ]}
          >
            <TextArea autoSize allowClear />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="year"
            labelCol={{ span: 5 }}
            label="سال دوره"
            rules={[
              { required: true, message: "انتخاب سال دوره الزامی می باشد" },
            ]}
          >
            <Radio.Group>
              <Radio value={getyear}>{getyear}</Radio>
              <Radio value={Number(getyear) + 1}>{Number(getyear) + 1}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 5 }}
            label="فصل دوره"
            name="season"
            rules={[
              { required: true, message: "انتخاب فصل دوره الزامی می باشد" },
            ]}
          >
            <Select placeholder="انتخاب فصل" allowClear>
              {seasons?.Result?.map(
                ({ Id, Title }: { Id: number; Title: string }) => (
                  <Option key={Id} value={Id}>
                    {Title}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="registerOpenDate"
            label="تاریخ شروع"
            labelCol={{ span: 5 }}
            rules={[
              { required: true, message: "انتخاب  تاریخ شروع الزامی می باشد" },
            ]}
          >
            <DatePicker2 placeholder="شروع ثبت نام" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 5 }}
            name="registerCloseDate"
            label="تاریخ پایان"
            rules={[
              { required: true, message: "انتخاب تاریخ پایان الزامی می باشد" },
            ]}
          >
            <DatePicker2 placeholder="پایان ثبت نام" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 13 }}
            name="editDeadline"
            label="مهلت ویرایش پرونده های مرجوعی"
          >
            <DatePicker2 placeholder="مهلت ویرایش" />
          </Form.Item>
        </Col>
      </Row>
      <div className="submit">
        <Button type="primary" htmlType="submit" loading={status === "loading"}>
          ذخیره
        </Button>
      </div>
    </Form>
  );
};

export default CreateCourse;
