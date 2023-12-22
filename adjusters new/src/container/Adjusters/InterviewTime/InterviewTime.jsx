import React, { useState } from "react";
import { PersianCalendar, Views } from "react-big-calendar-forked-persian";
//import 'react-big-calendar-forked-persian/lib/css/react-big-calendar.css';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import "react-big-calendar-forked-persian/lib/css/react-big-calendar.css";
import { Button, Modal, ConfigProvider, Popconfirm, Select } from "antd";
import { FindAccess } from "sanhab-components-library";
import CreateInterviewTime from "./CreateInterviewTime";
import { useAllCourseAvailable } from "../AdjustersHook";
import {
  fetchInterviewSeasonTimingList,
  removeInterviewSeasonTimingList,
} from "../../../redux/actions";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import "react-big-calendar-forked-persian/lib/addons/dragAndDrop/styles.css";
import "./InterviewTime.css";

const { Option } = Select;
const MyCalendar = () => {
  const { data: coursesAvailable, isLoading } = useAllCourseAvailable();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  // const [selectTimeInterView, setSelectTimeInterView] = useState(null);
  // const [addForm, setAddForm] = useState(false);

  const listInterviewTimes = useSelector(
    (state) => state.timingList.interviewTimingList?.Result
  );

  //createNewInterviewerTimer
  const createInterviewerTime = () => {
    setVisible(true);
  };

  //remove InterviewTime
  // const [remove] = useDeletInterviewTime();

  //get InterviewTime for CourseId
  // let interviewTimeForCourseId = interviewTime?.Result?.filter(
  //   (intTime) => intTime.Course.Id == selectedCourse
  // );

  // console.log(interviewTimeForCourseId,"interviewTimeForCourseId");

  //show InterviewerTime for CourseId
  let events = listInterviewTimes?.map((interview) => {
    let obj = {
      id: interview.Id,
      title: interview.InterviewTimeId,
      start: moment(interview.StartHour).toDate(),
      end: moment(interview.EndHour).toDate(),
      key: interview.Id,
    };
    return obj;
  });

  //remove InterviewTime
  const removeItem = (event) => {
    dispatch(removeInterviewSeasonTimingList(event.id));
  };

  //update Item
  // const updateItem = (event) => {
  //   setSelectTimeInterView(event);
  //   setVisible(true);
  // };

  const MonthEvent = ({ event }) => {
    return (
      <div>
        <div className="event">
          <span>
            {moment(event.start, "YYYY-M-D HH:mm").format(" HH:mm")} -
            {moment(event.end, "YYYY-M-D HH:mm").format(" HH:mm")}
          </span>
          <div>
            {/* <a onClick={() => updateItem(event)}>
              <EditOutlined style={{ color: "#ffffff" }} />
            </a> */}
            <Popconfirm
              title="از حذف زمان مصاحبه مورد نظر مطمئن هستید؟"
              onConfirm={() => removeItem(event)}
              okText="بله"
              cancelText="خیر"
            >
              <a>
                <DeleteOutlined style={{ color: "#ffffff" }} />
              </a>
            </Popconfirm>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (value) => {
    setSelectedCourse(value);
    dispatch(fetchInterviewSeasonTimingList(value));
  };

  return (
    <div className="interviewTime">
      <div>
        <label>دوره مصاحبه </label>
        <Select
          placeholder="انتخاب کنید"
          style={{ width: "300px" }}
          onChange={handleChange}
          loading={isLoading}
          allowClear={true}
          className="customDropDown"
        >
          {coursesAvailable?.Result?.map((course) => {
            return (
              <Option key={course.CourseId} value={course.CourseId}>
                {course.Title}
              </Option>
            );
          })}
        </Select>
      </div>
      {FindAccess(userAccessList.Adjusters_CreateInterviewTiming) && (
        <Button
          type="primary"
          onClick={createInterviewerTime}
          className="createButton"
          disabled={selectedCourse === null ? true : false}
          icon={<PlusOutlined />}
        >
          ایجاد زمان مصاحبه
        </Button>
      )}

      <PersianCalendar
        events={events}
        className="schadular"
        defaultView={Views.WEEK}
        components={{
          event: MonthEvent,
        }}
      />
      <ConfigProvider direction="rtl">
        <Modal
          title="ایجاد زمان مصاحبه"
          visible={visible}
          width={800}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <CreateInterviewTime
            visible={visible}
            closeModal={() => setVisible(false)}
            selectedCourse={selectedCourse}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default MyCalendar;
