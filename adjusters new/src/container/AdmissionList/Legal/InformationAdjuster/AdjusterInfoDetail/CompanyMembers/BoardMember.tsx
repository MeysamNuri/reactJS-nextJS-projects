import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Input, Button, Tooltip, Modal, Row, Col, Skeleton } from "antd";
import moment from "jalali-moment";
import {
  fetchListBoardMember,
  sendDescriptionBoardMember,
  boardMemberEndCooperation
} from "../../../../../../redux/actions";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";
import { IBoardMember } from "../../../../../../shared/ulitities/Model/boardMember";
import { RESET_LIST_BOARD_MEMBER } from "../../../../../../constant/cartableActionTypes";
import CooperationendDateModal from './cooperationEndDate'

interface IBoardMemberProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  applicantId?: number; 
  userIdRecognition: number,
  isFromLegalUser:boolean,
  activeTab:string
}
const BoardMember: FC<IBoardMemberProps> = ({
  oneAdjusterList, 
  isFromReportTable,
  userIdRecognition,
  isFromLegalUser,
  activeTab
}) => { 
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)
  const [selectedBoardMember, setSelectedBoardMember] = useState<any>()

  const { TextArea } = Input
  const listMember = useSelector(
    (state: any) => state.listBoardMember.listBoardMember 
  );
  const memberLoading = useSelector(
    (state: any) => state.listBoardMember.loading
  );


  let dataSource = listMember?.Result?.map((member: IBoardMember) => {
    let dataMember = {
      AppointmentDate: moment(member?.AppointmentDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      CooperationEndDate: member?.CooperationEndDate == null ? null : moment(member?.CooperationEndDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      Description: member.Description,
      FullName: member.IdentityInfo.FullName,
      Id: member.Id,
      NationalCode: member.IdentityInfo.NationalCodeOut,
      PositionTitle: member.PositionTitle,
      PositionId: member.PositionId,
      FounderId: member.FounderId
    };
    return dataMember;
  });

  useEffect(() => {
    dispatch(
      fetchListBoardMember(oneAdjusterList?.ApplicantId??userIdRecognition)
    );
    return () => {
      dispatch({ type: RESET_LIST_BOARD_MEMBER });
    };
  }, []);

  const changeInputHandler = (e: any, record: any) => {
    setDescription(e.target.value);
    let descriptionMember = {
      applicantId: oneAdjusterList?.ApplicantId,
      boardMemberId: record.Id,
      description: e.target.value,
    };
    dispatch(sendDescriptionBoardMember(descriptionMember));
  };
  const handleEndCoorperationModal = (value: any) => {
    setVisible(true)
    setSelectedBoardMember(value)
  }

  // const onSelectChange = (selectedBoardMember: any) => {
  //   setSelectedBoardMember(selectedBoardMember);
  //   let test = {
  //     applicantId: oneAdjusterList.ApplicantId,
  //     boardMemberId: selectedBoardMember.Id,
  //     description: description,
  //   };
  // };
  // const rowhandler=(record:any)=>{
  //   console.log(record,"recorddddd");

  // }

  // let rowSelection = {
  //   selectedBoardMember,
  //   onChange: onSelectChange,
  // };

  //coloumns Table
  let columns: any = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ellipsis: true,
    },

    {
      title: "سمت",
      dataIndex: "PositionTitle",
      key: "PositionTitle",
    },
    {
      title: "تاریخ انتصاب",
      dataIndex: "AppointmentDate",
      key: "AppointmentDate",
      ellipsis: true,
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "CooperationEndDate",
      key: "CooperationEndDate",
      ellipsis: true,
    },
    isFromReportTable
      ? {}
      :isFromLegalUser?
      {
        title: "توضیحات",
        dataIndex: "Description",
        key: "Description",
     
      }
      : {
        title: "توضیحات",
        dataIndex: "Description",
        key: "Description",
        render: (value: string, record: any, index: any) => {
          return (
            <>
              <TextArea
                autoSize
                value={record.Description}
                onBlur={(e: any) => changeInputHandler(e, record)}

              />
            </>
          );
        },
      },
    {
      title: "عملیات",
      dataIndex: "Operation",
      key: "Operation",
      width: "9%",
  
      render: (value: string, record: any, index: any) => {
        return (
          <>
            {
              record.PositionId !== 3 && record.PositionId!==1&& record.PositionId!==7 && record.CooperationEndDate===null ?
                <Tooltip title="تاریخ پایان همکاری">
                  <Button onClick={() => handleEndCoorperationModal(record)}> پایان همکاری</Button>
                </Tooltip> :
                null
            }

          </>
        );
      },
    },
  ];

  // const userRowSelection = (selectedRow: IBoardMember) => {
  //   setSelectedBoardMember(selectedRow);
  //   let test = {
  //     applicantId: isFromReportTable
  //       ? applicantId
  //       : oneAdjusterList.ApplicantId,
  //     boardMemberId: selectedBoardMember.Id,
  //     description: description,
  //   };
  // };

  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        loading={memberLoading}
        scroll={{ y: 200 }}
      // rowSelection={rowSelection}
      // onRow={(record) => {
      //   return {
      //     onClick: () => {
      //       userRowSelection(record);
      //     },
      //   };
      // }}
      />
      <Modal
        title={` تاریخ پایان همکاری ` + selectedBoardMember?.FullName}
        visible={visible}
        footer={null}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        width={800}
     
      >
       <CooperationendDateModal activeTab={activeTab} selectedBoardMember={selectedBoardMember} userIdRecognition={userIdRecognition} closeModal={()=>setVisible(false)}/>
      </Modal>
    </div>
  );
};

export default BoardMember;
