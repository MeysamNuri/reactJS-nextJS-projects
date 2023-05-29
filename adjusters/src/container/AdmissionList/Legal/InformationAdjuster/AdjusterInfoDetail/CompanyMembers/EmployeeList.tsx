import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table, Modal,Tooltip,Button } from "antd";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";
import { IEmployeeList } from "../../../../../../shared/ulitities/Model/employee";
import { fetchEmployeeLegalEditToken } from "../../../../../../redux/actions";
import { GetWay } from "../../../../../../shared/ulitities/Enums/getWay";
import CooperationendDateModal from './cooperationEndDate'
interface IEmployeeListProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  applicantId?: number;
  isEvaluatorDesktopInformation?: number;
  selectedItemManagmentCartable?: any;
  activeTabCompanyMember?: string;
  userIdRecognition?: number
}
const EmployeeList: FC<IEmployeeListProps> = ({
  oneAdjusterList,
  isEvaluatorDesktopInformation,
  selectedItemManagmentCartable,
  activeTabCompanyMember,
  isFromReportTable,
  userIdRecognition
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)
  const [selectedBoardMember, setSelectedBoardMember] = useState<any>()
  const { listEmploeeLegal, loading } = useSelector(
    (state: any) => state.listEmployeeLegal
  );
  const handleEndCoorperationModal = (value: any) => {
    setVisible(true)
    setSelectedBoardMember(value)
  }
  useEffect(() => {
    if (isEvaluatorDesktopInformation === GetWay.desktop) {
      dispatch(fetchEmployeeLegalEditToken(userIdRecognition));
    } else if (isEvaluatorDesktopInformation === GetWay.admission || isFromReportTable) {
      dispatch(fetchEmployeeLegalEditToken(oneAdjusterList?.ApplicantId));
    }
  }, []);

  useEffect(() => {
    activeTabCompanyMember === "3" &&
      isEvaluatorDesktopInformation === GetWay.managmentCatable &&
      dispatch(fetchEmployeeLegalEditToken(selectedItemManagmentCartable?.ApplicantId));
  }, [activeTabCompanyMember]); 

  let data = listEmploeeLegal?.Result?.map((employee: IEmployeeList) => {
    let obj = {
      key: employee.Id,
      FullName: employee.FullName,
      BirthDate: moment(employee.BirthDate?.split("T")[0]).format("jYYYY-jM-jD"),
      Id: employee.Id,
      EmploymentDate: moment(employee.EmploymentDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      EndDate: moment(employee?.EndDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      NationalCode: employee.NationalCode,
      Position: employee.Position,
    };
    return obj;
  });

  //coloumns Table
  let columns: any = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "FullName",
      key: "FullName",
      ellipsis: true,
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ellipsis: true,
    },
    {
      title: "تاریخ تولد",
      dataIndex: "BirthDate",
      key: "BirthDate",
      ellipsis: true,
    },
    {
      title: "سمت",
      dataIndex: "Position",
      key: "Position",
      ellipsis: true,
    },
    {
      title: "تاریخ استخدام",
      dataIndex: "EmploymentDate",
      key: "EmploymentDate",
      ellipsis: true,
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "EndDate",
      key: "EndDate",
      ellipsis: true,
    },
          
    {
      title: "عملیات",
      dataIndex: "Operation",
      key: "Operation",
      width: "9%",
  
      render: (value: string, record: any, index: any) => {
        return (
          <>
           
                <Tooltip title="تاریخ پایان همکاری">
                  <Button onClick={() => handleEndCoorperationModal(record)}> پایان همکاری</Button>
                </Tooltip> 

          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ y: 200 }}
        locale={{emptyText:"لیست شما خالی است"}}
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
        <CooperationendDateModal selectedBoardMember={selectedBoardMember} userIdRecognition={userIdRecognition} closeModal={() => setVisible(false)} />
      </Modal>
    </div>
  );
};

export default EmployeeList;
