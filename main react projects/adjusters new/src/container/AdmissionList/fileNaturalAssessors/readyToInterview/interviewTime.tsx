import React, { useState, FC } from "react";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import moment from "jalali-moment";
import { Button, Radio, Space, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IInterviewTiming } from "../../../../shared/ulitities/Model/interviewerTime";
import { sendInterviewSession } from "../../../../redux/actions";
import  Calendar from "../../../../assets/images/calendar.svg";
import { sendDataTiming } from "../../ServicesCartable/AdmissionListServices";
import { messageError } from "../../../../utils/utils";
import "../Interview/interview.css";

interface IInterviewTimeProps {
  ApplicantId: number;
}

const InterviewTime: FC<IInterviewTimeProps> = ({ ApplicantId }) => {
  const [valTime, setValTime] = useState(0);
  const [valDate, setValDate] = useState(moment);
  const [endDate, setEndDate] = useState(moment);
  const [listTimes, setListTime] = useState([] as any);
  const [listTimesLoading, setListTimeLoading] = useState(false);
  const dispatch = useDispatch();
  const interviewTimeIdloading = useSelector(
    (state: any) => state.interviewTime.loading
  );

  let fromDateTime = moment(valDate.toDate()).format("YYYY-MM-DD");
  let endDateTime = moment(endDate.toDate()).format("YYYY-MM-DD");

  let betweenInterviewTime = {
    from: fromDateTime,
    to: endDateTime,
  };

  //لیست زمانها
  async function fechListTimes() {
    try {
      setListTimeLoading(true);
      const data = await sendDataTiming(betweenInterviewTime);
      if (data.IsSucceed === true && data.Result !== null) {
        //ddd
      } else if (data.IsSucceed === false) {
        messageError(data.Message);
      } else if (data.IsSucceed === true && data.Result === null) {
        messageError(data.Message);
      }

      data && setListTime(data?.Result);
    } catch (err) {
    } finally {
      setListTimeLoading(false);
    }
  }

  let interviewTimId = listTimes ? listTimes[0]?.InterviewTimeId : null;

  //change value radio
  const ChangeValueHandler = (e: any) => {
    setValTime(e.target.value);
  };
  let interviewTiming = {
    applicantId: ApplicantId,
    interviewTimeId: interviewTimId,
    sessionStatusId: 1,
    interviewTimingId: valTime,
  };

  const submitTimeHandler = () => {
    dispatch(sendInterviewSession(interviewTiming,()=>{}));
    // setDisableButton(true)
  };

  const ChangeDateHandler = (value: any) => {
    fechListTimes();
  };

  return (
    <div>
      <div className="interviewTimSession">
        <div className="interviewTiming">
          <DatePicker2
            value={valDate}
            onChange={(value: any) => setValDate(value)}
            clasName="calendar"
          />
          <DatePicker2
            value={endDate}
            onChange={(value: any) => setEndDate(value)}
            clasName="calendar"
          />

          <Button
            onClick={ChangeDateHandler}
            type="primary"
            loading={listTimesLoading }
          >
            لیست زمان های مصاحبه
          </Button>
        </div>
        {listTimes?.length === 0 || listTimes === null ? (
          <Empty description="لیست زمان های مصاحبه" image={Calendar} />
        ) : (
          <Radio.Group onChange={ChangeValueHandler} value={valTime}>
            <Space direction="vertical">
              {listTimes?.map((interviewTime: IInterviewTiming) => (
                <Radio
                  key={interviewTime.Id}
                  value={interviewTime.Id}
                  disabled={interviewTime.Used ? true : false}
                >
                  تاریخ و ساعت شروع :
                  {moment(interviewTime?.StartHour).format(" HH:mm ") +
                    " " +
                    moment(interviewTime?.StartHour.split("T")[0]).format(
                      "jYYYY-jM-jD"
                    ) +
                    " "}
                  تاریخ و ساعت پایان :
                  {moment(interviewTime?.EndHour).format("HH:mm ") +
                    " " +
                    moment(interviewTime?.EndHour.split("T")[0]).format(
                      "jYYYY-jM-jD"
                    )}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        )}
      </div>
      <div className="submit marginTop">
        <Button
          onClick={submitTimeHandler}
          loading={interviewTimeIdloading }
          type="primary"
          // disabled={disableButton?true:false}
        >
          ذخیره
        </Button>
      </div>
    </div>
  );
};

export default InterviewTime;
