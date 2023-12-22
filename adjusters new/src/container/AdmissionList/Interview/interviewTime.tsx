import React, { useState, FC, useEffect } from "react";
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import moment from "jalali-moment";
import {
  Button,
  Radio,
  Space,
  ConfigProvider,
  Empty,
  Descriptions,
  // Tooltip,
  PageHeader,
  Popconfirm,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IInterviewTiming } from "../../../shared/ulitities/Model/interviewerTime";
// import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import {
  sendInterviewSession,
  fetchInterviewTimingApplicantId,
  removeInterviewTimingApplicantId,
} from "../../../redux/actions";
import { sendDataTiming } from "../ServicesCartable/AdmissionListServices";
import { messageError } from "../../../utils/utils";
import calendar from "../../../assets/images/calendar.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
import "./interview.css";

interface IInterviewTimeProps {
  applicantId?: number;
}

const InterviewTime: FC<IInterviewTimeProps> = ({ applicantId }) => {
  const [valTime, setValTime] = useState(0);
  const [valDate, setValDate] = useState(moment);
  const [endDate, setEndDate] = useState(moment);
  const [listTimes, setListTime] = useState([] as any);
  const [listTimesLoading, setListTimeLoading] = useState(false);
  const dispatch = useDispatch();

  const { interviewTimingApplicant, interviewTimeIdloading } = useSelector(
    (state: any) => state.interviewTime
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
    applicantId: applicantId,
    interviewTimeId: interviewTimId,
    sessionStatusId: 1,
    interviewTimingId: valTime,
  };

  const submitTimeHandler = () => {
    dispatch(
      sendInterviewSession(interviewTiming, () => {
        dispatch(fetchInterviewTimingApplicantId(applicantId));
      })
    );
    // setDisableButton(true)
  };

  useEffect(() => {
    dispatch(fetchInterviewTimingApplicantId(applicantId));
  }, [applicantId]);

  const ChangeDateHandler = () => {
    fechListTimes();
  };

  const removeTimeHandler = () => {
    dispatch(
      removeInterviewTimingApplicantId(applicantId, () => {
        dispatch(fetchInterviewTimingApplicantId(applicantId));
      })
    );
  };

  return (
    <div>
      {interviewTimingApplicant?.Result !== null && (
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title="زمان مصاحبه"
            extra={
              <ConfigProvider direction="rtl">
                <Popconfirm
                  title="از حذف زمان مصاحبه کننده مورد نظر مطمئن هستید؟"
                  onConfirm={removeTimeHandler}
                  okText="بله"
                  cancelText="خیر"
                >
                  <Button type="text" icon={<Trash />} />
                </Popconfirm>
              </ConfigProvider>
            }
          >
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="تاریخ و ساعت شروع">
                {interviewTimingApplicant?.Result?.StartHour?.split(
                  "T"
                )[1].split(":")[0] +
                  ":" +
                  interviewTimingApplicant?.Result?.StartHour?.split(
                    "T"
                  )[1].split(":")[1] +
                  "_" +
                  moment(
                    interviewTimingApplicant?.Result?.StartHour?.split("T")[0]
                  ).format("jYYYY-jMM-jDD")}
              </Descriptions.Item>

              <Descriptions.Item label="تاریخ و ساعت پایان">
                {interviewTimingApplicant?.Result?.EndHour?.split("T")[1].split(
                  ":"
                )[0] +
                  ":" +
                  interviewTimingApplicant?.Result?.EndHour?.split(
                    "T"
                  )[1].split(":")[1] +
                  "_" +
                  moment(
                    interviewTimingApplicant?.Result?.EndHour?.split("T")[0]
                  ).format("jYYYY-jMM-jDD")}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      )}
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
            loading={listTimesLoading}
          >
            لیست زمان های مصاحبه
          </Button>
        </div>
        {listTimes?.length === 0 || listTimes === null ? (
          <Empty description="لیست زمان های مصاحبه" image={calendar} />
        ) : (
          <Radio.Group onChange={ChangeValueHandler} value={valTime}>
            <Space direction="vertical">
              {listTimes?.map((interviewTime: IInterviewTiming) => (
                <Radio
                  key={interviewTime.Id}
                  value={interviewTime.Id}
                  disabled={interviewTime.Used}
                >
                  تاریخ و ساعت شروع :
                  {  interviewTime?.StartHour?.split("T")[1].split(":")[0] +
                    ":" +
                    interviewTime?.StartHour?.split("T")[1].split(":")[1] +
                    "_" +
                    moment(interviewTime?.StartHour?.split("T")[0]).format(
                      "jDD-jMM-jYYYY"
                    ) +  " "}

                   

                  تاریخ و ساعت پایان :
                  {interviewTime?.EndHour?.split("T")[1].split(":")[0] +
                    ":" +
                    interviewTime?.EndHour?.split("T")[1].split(":")[1] +
                    "_" +
                    moment(interviewTime?.EndHour?.split("T")[0]).format(
                      "jDD-jMM-jYYYY"
                    ) +  " "}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        )}
      </div>
      <div className="submit marginTop">
        <Button
          onClick={submitTimeHandler}
          loading={interviewTimeIdloading}
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
