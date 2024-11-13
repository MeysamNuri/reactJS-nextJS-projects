import React, { FC,useEffect } from "react";
import {Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import { fetchinquiryLegacy } from "../../../redux/actions";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { ILegacy } from "../../../shared/ulitities/Model/inquiry";


interface IInquiryPajooheshkadehProps {
  oneAdjusterList?: IAneAdjusterList;
}

const InquiryLegacy: FC<IInquiryPajooheshkadehProps> = ({
  oneAdjusterList,
}) => {
  const dispatch = useDispatch();
  const { loadingLegacy, inquiryLegacy } = useSelector(
    (state: any) => state.inquiry
  );



  useEffect(() => {
    dispatch(fetchinquiryLegacy(oneAdjusterList?.ApplicantId, oneAdjusterList?.NationalCode));
  }, [])

  let data = inquiryLegacy?.Result?.map((inquire: ILegacy) => { 
    let obj = { 
      FatherName: inquire.FatherName,
      key: inquire.NationalCode,
      BeginDate: moment(inquire.BeginDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
      EndDate:inquire.EndDate? moment(inquire.EndDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ):'', 
      CompanyName: inquire.CompanyName,
      Position: inquire.Position,
      Status: inquire.Status,
      TypeTitle: inquire.TypeTitle,
      Id:inquire?.key
    };
    return obj;
  });
  let columns: any = [
    // {
    //   title: "نام پدر",
    //   dataIndex: "FatherName",
    //   key: "FatherName",
    // },

    {
      title: "تاریخ شروع همکاری",
      dataIndex: "BeginDate",
      key: "BeginDate",
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "EndDate",
      key: "EndDate",
    },
    {
      title: "نام شرکت",
      dataIndex: "CompanyName",
      key: "CompanyName",
    },

    {
      title: "سمت",
      dataIndex: "Position",
      key: "Position",
    },
    {
      title: "وضعیت همکاری",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "عنوان",
      dataIndex: "TypeTitle",
      key: "TypeTitle",
    },
  ];


  return (
    <>
      <Table 
         columns={columns} 
         dataSource={data} 
        //  pagination={false} 
        rowKey={(record)=>record.Id}
         loading={loadingLegacy} 
         locale={{
          emptyText:
            "سوابقی یافت نشد.",
        }}
           />
    </>
  );
};

export default InquiryLegacy;
