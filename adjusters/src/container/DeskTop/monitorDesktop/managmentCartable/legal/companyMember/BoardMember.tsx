import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table} from "antd";
import moment from "jalali-moment";
import { fetchListBoardMember } from "../../../../../../redux/actions";
import { IBoardMember } from "../../../../../../shared/ulitities/Model/boardMember";
import { RESET_LIST_BOARD_MEMBER } from "../../../../../../constant/cartableActionTypes";

interface IBoardMemberProps {
  activeTabCompanyMember?: string;
  selectedItemManagmentCartable?: any;
}
const BoardMember: FC<IBoardMemberProps> = ({
  selectedItemManagmentCartable,
  activeTabCompanyMember,
}) => {
  const dispatch = useDispatch();
  const listMember = useSelector(
    (state: any) => state.listBoardMember.listBoardMember
  );
  const memberLoading = useSelector(
    (state: any) => state.listBoardMember.loading
  );
  useEffect(() => {
    activeTabCompanyMember == "1" &&
      dispatch(fetchListBoardMember(selectedItemManagmentCartable.ApplicantId));
    return () => {
      dispatch({ type: RESET_LIST_BOARD_MEMBER });
    };
  }, [activeTabCompanyMember]);

  let dataSource = listMember?.Result?.map((member: IBoardMember) => {
    let dataMember = {
      AppointmentDate:member?.AppointmentDate==null?null:moment(member?.AppointmentDate.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      Description: member.Description,
      FullName: member.IdentityInfo.FullName,
      Id: member.Id,
      NationalCode: member.IdentityInfo.NationalCodeOut,
      PositionTitle: member.PositionTitle,
      CooperationEndDate:member.CooperationEndDate===null?null: moment(member.CooperationEndDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      // ProfilePic: `data:image/jpeg;base64,` + member.ProfilePic,
    };
    return dataMember;
  });

  //coloumns Table
  let columns: any = [
    {
      title: "",
      dataIndex: "Description",
      key: "Description",
   
      render: (value: string, record: any, index: any) => {
        return (
          <>
            <img
              src={record.ProfilePic}
              width="70px"
              style={{ borderRadius: "5px" }}
            />
          </>
        );
      },
    },

    {
      title: "نام و نام خانوادگی",
      dataIndex: "FullName",
      key: "FullName",
      width: "30%",
    },

    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ellipsis: true,
      width: "20%",
    },

    {
      title: "سمت",
      dataIndex: "PositionTitle",
      key: "PositionTitle",
      width: "20%",
    },
    {
      title: "تاریخ انتصاب",
      dataIndex: "AppointmentDate",
      key: "AppointmentDate",
      ellipsis: true,
      width: "25%",
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "CooperationEndDate",
      key: "CooperationEndDate",
      ellipsis: true,
      width: "25%",
    },
  ];


  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        loading={memberLoading}
      />
    </div>
  );
};

export default BoardMember;
