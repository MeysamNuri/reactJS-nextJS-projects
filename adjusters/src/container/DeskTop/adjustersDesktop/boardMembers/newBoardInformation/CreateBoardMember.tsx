import React, { useEffect, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Table } from "antd";
import moment from "jalali-moment";
import {
  //  fetchAdjusterList,
  fetchWorkingLocationList,
  addBoardMember,
  searchAdjuster,
  fetchApplcantPosition
} from "../../../../../redux/actions";
import { toast } from 'react-toastify'
import DatePicker2 from "../../../../../components/UI/DatePicker/DatePicker";
import {
  IAddBoardMember,
  //IAdjusterList,
} from "../../../../../shared/ulitities/Model/boardMember";
import { INaturalPersonalAll } from "../../../../../shared/ulitities/Model/naturalPersonalAll";
import { SET_BOARD_MEMBER } from '../../../../../constant/desktop'

const { Option } = Select;
const { TextArea, Search } = Input;


interface ICreateBoardMemberProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const CreateBoardMember: FC<ICreateBoardMemberProps> = ({
  onSubmit,
  onPrev,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [selectedAdjusterInfo, setSelctedAdjusterInfo] = useState<any>()

  const { adjusterSearchLoading,
    adjusterSearchResult,
    applicantWorkingLocation,
    applicantposition,
    loadingApplicantPosition,
    loadingApplicantWorkingLocation } = useSelector((state: any) => state.request)

  const handleSlectedAdjuster = (record: any) => {

    setSelctedAdjusterInfo(record)
  }

  useEffect(() => {
    if (searchValue !== "" && adjusterSearchResult?.Result.length === 0) {
      toast.warning("موردی پیدا نشد")
    }

  }, [searchValue, adjusterSearchResult])
  const onSearch = (value: any) => {
    setSelctedAdjusterInfo({})
    setSearchValue(value)
    const searchOBJ = {
      count: 10,
      searchTerm: value
    }
    dispatch(searchAdjuster(searchOBJ))
  }
  const onFinish = (values: any) => {
    let boardMember: IAddBoardMember = {
      applicantId: selectedAdjusterInfo.applicantId,
      startDate: moment(values.startDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      postId: values.postId,
      description: values.description,
      workLocationInfoId: values.workLocationInfoId
    };
    dispatch({ type: SET_BOARD_MEMBER, payload: boardMember });
    // dispatch(addBoardMember(add));
    onSubmit();
  };
  /*  const listAdjusters = useSelector(
     (state: any) => state.boardMember.adjusterList?.Result
   ); */

  useEffect(() => {
    dispatch(fetchWorkingLocationList());
  }, []);
  useEffect(() => {
    dispatch(fetchApplcantPosition());
  }, []);

  // useEffect(() => {
  //   dispatch(getBaseInfo());
  // }, []);

  const prevHandler = () => {
    onPrev();
  };
  const nextHandler = () => {
    onSubmit();
  };
  let data = adjusterSearchResult?.Result?.map((request: any) => {
    let obj = {
      Id: request.Id,
      key: request.Id,
      adjusterCode: request.AdjusterCode,
      firstName: request.FirstName,
      familyName: request.FamilyName,
      applicantId: request.ApplicantId
    };
    return obj;
  });
  //coloumns Table
  let columns: any = [
    {
      title: "کد ارزیاب",
      dataIndex: "adjusterCode",
      key: "adjusterCode",
      width: "18%",

    },
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: "20%",

    },
    {
      title: "نام خانوادگی",
      dataIndex: "familyName",
      key: "familyName",
      width: "20%",

    },
    {
      title: "عملیات",
      dataIndex: "action",
      key: "action",
      width: "7%",
      render: (p: any, record: any) => <Button type="primary" onClick={() => handleSlectedAdjuster(record)}>انتخاب</Button>
    },
  ]
  return (
    <div>
      <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 10 }} sm={{ span: 24 }} xs={{ span: 24 }}>
        <p>جستجو بر اساس نام خانوادگی یا کد ارزیابی</p>
        <Search placeholder="جستجوی نام خانوادگی یا کد ارزیابی"
          loading={adjusterSearchLoading}
          onSearch={onSearch} />


      </Col>
      <br />
      {
        selectedAdjusterInfo?.adjusterCode === undefined ?
          <Table
            columns={columns}
            dataSource={data}
            locale={{ emptyText: "لیست خالی می باشد" }}
            pagination={false}


          /> :
          <Row className="manager-info-container">
            <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
              <p>کد ارزیابی :</p>
              <span>{selectedAdjusterInfo?.adjusterCode}</span>
            </Col>
            <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
              <p>نام و نام خانوادگی :</p>
              <span>{`${selectedAdjusterInfo?.firstName} ${selectedAdjusterInfo?.familyName} `}</span>
            </Col>
            {/* <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
        <p>کد ملی :</p>
        <span>0015223531</span>
      </Col> */}



          </Row>
      }
      <br/>
      <br/>
      <Form labelCol={{ span: 6 }} name="createBoardMember" onFinish={onFinish} form={form}>

        <Row gutter={[16, 8]}>

          <Col span={12}>
            <Form.Item

              label="سمت"
              name="postId"
            // rules={[{ required: true, message: "نام دوره الزامی می باشد " }]}
            >
              <Select
                placeholder="انتخاب نمایید"
                style={{ width: "100%" }}
                allowClear
                loading={loadingApplicantPosition}
                notFoundContent="سمتی وجود ندارد"
              >

                {applicantposition?.Result?.map((Position: { Value: number; Description: string }) => (
                  <Option key={Position.Value} value={Position.Value}>
                    {Position.Description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item

              label="محل فعالیت"
              name="workLocationInfoId"
            // rules={[{ required: true, message: "نام دوره الزامی می باشد " }]}
            >
              <Select
                placeholder="انتخاب نمایید"
                style={{ width: "100%" }}
                allowClear
                loading={loadingApplicantWorkingLocation}
                notFoundContent="محل فعالیت وجود ندارد"
              >

                {applicantWorkingLocation?.Result?.map((work: any) => (
                  <Option key={work.Id} value={work.Id}>
                    {work.Province?.Title + " " + work.City?.Title+ " "+(work.Address?work.Address:"") }
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="startDate"
              label="تاریخ انتصاب"

            >
              <DatePicker2 placeholder="تاریخ انتصاب" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item

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
    </div>
  );
};

export default CreateBoardMember;
