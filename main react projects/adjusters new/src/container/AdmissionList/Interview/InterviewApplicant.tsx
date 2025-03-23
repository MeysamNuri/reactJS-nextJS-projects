import React, { useState, useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { Table, ConfigProvider, Space, Popconfirm} from "antd";
import {
  fetchInterviewerListApplicantId,
  removeInterviewerList,
} from "../ServicesCartable/AdmissionListServices";

import { messageSuccess, messageError } from "../../../utils/utils";
import { fetchInterviewSession } from "../../../redux/actions";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

interface IInterviewProps {
  applicantId?: number;
}

const InterviewApplicant: FC<IInterviewProps> = ({ applicantId }) => {
  const dispatch = useDispatch();
  const [
    listInterViewersApplicantId,
    setListInterViewersApplicantId,
  ] = useState([] as any);
  const [
    listInterViewersApplicantIdLoading,
    setListInterViewersApplicantIdLoading,
  ] = useState(false);

  useEffect(() => {
    dispatch(fetchInterviewSession(applicantId));
  }, []);

  // لیست مصاحبه کنندگان هرارزیاب
  async function getListInterviewerApplicantId() {
    try {
      setListInterViewersApplicantIdLoading(true);
      const data = await fetchInterviewerListApplicantId(applicantId);
      data &&
        setListInterViewersApplicantId(data?.data.Result?.InterviewScores);
    } catch (err) {
    } finally {
      setListInterViewersApplicantIdLoading(false);
    }
  }

  // حذف هر مصاحبه کنندگان
  async function removeInterviewerApplicantId(removeData: any) {
    try {
      setListInterViewersApplicantIdLoading(true);
      const data = await removeInterviewerList(removeData);
      getListInterviewerApplicantId();
      // data &&
      //   setListInterViewersApplicantId(data?.data?.Result);
    } catch (err) {
      messageError("خطایی در سمت  سرور رخ داده");
    } finally {
      setListInterViewersApplicantIdLoading(false);
    }
  }

  useEffect(() => {
    getListInterviewerApplicantId();
  }, []);

  let data = listInterViewersApplicantId?.map((interviewer: any) => {
    let interview = {
      key: interviewer.Id,
      interviewerId: interviewer.InterviewerId,
      FirstName: interviewer?.Interviewer.FirstName,
      FamilyName: interviewer?.Interviewer.FamilyName,
      InterviewSessionId: interviewer?.InterviewSessionId,
      ProfilePic:
      interviewer.Interviewer?.ProfilePic == null
        ? "ندارد"
        : `data:image/jpeg;base64,` + interviewer.Interviewer.ProfilePic,
    };
    return interview;
  });
 

  const removeInterviewerHandler = (record: any) => {
    let removeData = {
      interviewSessionId: record.InterviewSessionId,
      interviewerId: record.interviewerId,
    };
    removeInterviewerApplicantId(removeData);
  };

  //coloumns Table
  let columns: any = [
    {
      title: "نمایش عکس",
      dataIndex: "Description",
      key: "Description",
      render: (value: string, record: any, index: any) => {
        return (
          <>
            {record.ProfilePic == "ندارد" ? (
              "ارسال نگردیده است"
            ) : (
              <img
                src={record.ProfilePic}
                width="30px"
                height="30px"
                style={{ borderRadius: "5px" }}
                alt="profile"
              />
              
            )}
        
          </>
        );
      },
    },
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      ellipsis: true,
    },

    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
      ellipsis: true,
    },
    {
      title: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div>
            <ConfigProvider direction="rtl">
              <Popconfirm
                title="از حذف مصاحبه کننده مورد نظر مطمئن هستید؟"
                onConfirm={() => removeInterviewerHandler(record)}
                okText="بله"
                cancelText="خیر"
              >
                <a className="action">
                  <Trash />
                </a>
              </Popconfirm>
            </ConfigProvider>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div>
       <ConfigProvider direction="rtl">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={listInterViewersApplicantIdLoading}
          scroll={{ y: 200 }}
          locale={{
            emptyText:
              listInterViewersApplicantId==null && "مصاحبه کننده ای انتخاب نگردیده است." 
          }}
        />
      </ConfigProvider> 
    </div>
  );
};

export default InterviewApplicant;
