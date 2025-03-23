import React, { FC, useEffect } from "react";
import {Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import { fetchinquiryList } from "../../../redux/actions";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";

interface IInquiryPajooheshkadehProps {
  oneAdjusterList?: IAneAdjusterList;
}

const InquiryList: FC<IInquiryPajooheshkadehProps> = ({ oneAdjusterList }) => {
  const dispatch = useDispatch();
  const { inquiryList, loadingInquiryList } = useSelector(
    (state: any) => state.inquiry
  );

  useEffect(() => {
    dispatch(fetchinquiryList(oneAdjusterList?.ApplicantId));
  }, []);

  let dataSource = inquiryList?.Result?.map((item: any) => {
    let obj = {
      Id: item.Id,
      key: item.InquiryDate,
      ApplicantId: item.ApplicantId,
      UserName: item.Actor.UserName,
      InquiryTitle:item.InquiryTitle,
      InquiryDate: moment(item?.InquiryDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
    };
    return obj;
  });

  //coloumns Table
  let columns: any = [
    {
      title: "نام کارشناس",
      dataIndex: "UserName",
      key: "UserName",
      width: "20%",
    },
    {
      title: "نوع استعلام",
      dataIndex: "InquiryTitle",
      key: "InquiryTitle",
      width: "20%",
    },
    {
      title: "تاریخ استعلام",
      dataIndex: "InquiryDate",
      key: "StaffTypeDescription",
      width: "55%",
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false}  loading={loadingInquiryList}   />
    </>
  );
};

export default InquiryList;
