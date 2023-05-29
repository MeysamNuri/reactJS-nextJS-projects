import React, { useState, useEffect } from "react";
import { Form, InputNumber, Button, Row, Col, TimePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createAddTime } from "../../../redux/actions";
import momentJalali from "jalali-moment";
import moment from "moment";
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";

// const format = "HH:mm";

const CreateInterviewTime = (props: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const addInterviewTimeLoading = useSelector(
    (state: any) => state.resCreateTime.loading
  );

  // const [insertCreateTime, { status, data }] = useCreateTimeInterview();
  const [timeDivisition, setTimeDivisition] = useState(30);
  const [rangeTime, setRangeTime] = useState({
    startTime: "00:00",
    endTime: "",
  });
  // const [selectTime, setSelectTime] = useState("00:00");
  const [componentSize, setComponentSize] = React.useState<any | "default">(
    "default"
  );

  //submit Create InterviewTime
  const onFinish = async (values: any) => {
    let insertViewTime = {
      startTime: momentJalali(values.startTime.toDate()).format("YYYY-MM-DD"),
      endTime: momentJalali(values.endTime).format("YYYY-MM-DD"),
      courseId: props.selectedCourse,
      duration: timeDivisition,
      startHour: rangeTime.startTime,
      endHour: rangeTime.endTime,
    };
    // insertCreateTime(insertViewTime);
    await dispatch(
      createAddTime(insertViewTime, props.closeModal, form.resetFields)
    );
  };

  //get Divition
  const changeNumberHandler = (value: any) => {
    setTimeDivisition(value);
  };

  //get start Time
  // const startChangeHandler = (time: any, timeString: any) => {
  //   setRangeTime({
  //     ...rangeTime,
  //     startTime: timeString,
  //   });
  // };

  //get End Time
  // const endChangeHandler = (time: any, timeString: any) => {
  //   setRangeTime({
  //     ...rangeTime,
  //     endTime: timeString,
  //   });
  // };

  //handle Close Modal
  useEffect(() => {
    if (props.visible === false) {
      form.resetFields();
    }
  }, [props.visible]);

  // const range = (start: any, end: any) => {
  //   const result = [];
  //   for (let i = start; i < end; i++) {
  //     result.push(i);
  //   }
  //   return result;
  // };

  // const disabledHours = () => {
  //   const hours = range(0, 60);
  //   hours.splice(8, 12);
  //   return hours;
  // };

  const onFormLayoutChange = ({ size }: { size: any }) => {
    setComponentSize(size);
  };

  return (
    <div className="createInterviewTime">
      <Form
        onFinish={onFinish}
        form={form}
        style={{ width: "100%" }}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as any}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="startTime"
              label="تاریخ شروع"
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="endTime"
              label="تاریخ پایان"
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="timeDivision"
              label="بازه مصاحبه"
            >
              <InputNumber
                min={15}
                max={45}
                defaultValue={30}
                style={{ width: "100%" }}
                step={15}
                onChange={changeNumberHandler}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="rangeTime"
              label="ساعت شروع"
              trigger="onSelect"
            >
              <TimePicker
                format="HH:mm"
                style={{width:'100%'}}
                placeholder="انتخاب ساعت"
                showNow={false}
                value={moment(rangeTime.startTime, "HH:mm")}
                onSelect={(value) => {
                  const timeString = moment(value).format("HH:mm");
                  setRangeTime({...rangeTime,startTime:timeString});
                }}
                popupClassName="timepickerCustom"
              />

            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="rangeTimew"
              label="ساعت پایان"
              trigger="onSelect"
            >
              <TimePicker
                format="HH:mm"
                style={{width:'100%'}}
                placeholder="انتخاب ساعت"
                showNow={false}
                value={moment(rangeTime.endTime, "HH:mm")}
                onSelect={(value) => {
                  const timeString = moment(value).format("HH:mm");
                  setRangeTime({...rangeTime,endTime:timeString});
                }}
                popupClassName="timepickerCustom"
              />

            </Form.Item>
          </Col>
        </Row>
        <div className="submit">
          <Button
            type="primary"
            htmlType="submit"
            loading={addInterviewTimeLoading}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateInterviewTime;
