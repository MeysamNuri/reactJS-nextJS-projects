import React, { FC, useEffect, useState ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table, Modal,Tooltip,Button,Input,Space } from "antd";
import { SearchOutlined,FilterFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
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
  userIdRecognition?: number,
  activeTab?:string
}
const EmployeeList: FC<IEmployeeListProps> = ({
  oneAdjusterList,
  isEvaluatorDesktopInformation,
  selectedItemManagmentCartable,
  activeTabCompanyMember,
  isFromReportTable,
  userIdRecognition,
  activeTab
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)
  const [selectedBoardMember, setSelectedBoardMember] = useState<any>()
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataIndex, setDataIndex] = useState("");
  const searchInput = useRef<any>(null);
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
console.log(selectedItemManagmentCartable," selectedItemManagmentCartable ppppp");

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setDataIndex(dataIndex);
  
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
  
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`جستجو ${dataIndex === "FullName"
              ? "نام خانوادگی"
              : dataIndex === "NationalCode"
                ? "کد ملی"

                : null
            }`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
          
        <Space>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            باز نشانی
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            جستجو
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <FilterFilled
        style={{
          color: filtered ? "#E64848" : undefined,
        }}
      />
    ),
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
          text
        ),
  });

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
      EndDate: employee?.EndDate!==null ? moment(employee?.EndDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ): "",
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
      width: "18%",
      ...getColumnSearchProps("FullName"),
      filterSearch: true,
      onFilter: (value: string, record:any) => (record.FullName?.endsWith(value)||record.FullName?.startsWith(value) ),
   
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "14%",
      ...getColumnSearchProps("NationalCode"),
      filterSearch: true,
      onFilter: (value: string, record:any) => record.NationalCode?.startsWith(value),
    },
    {
      title: "تاریخ تولد",
      dataIndex: "BirthDate",
      key: "BirthDate",
      width: "14%"
    },
    {
      title: "سمت",
      dataIndex: "Position",
      key: "Position",
      width: "13%"
    },
    {
      title: "تاریخ استخدام",
      dataIndex: "EmploymentDate",
      key: "EmploymentDate",
      width: "16%"
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "EndDate",
      key: "EndDate",
      width: "20%"
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
                  <Button onClick={() => handleEndCoorperationModal(record)} style={{width:"100px",fontSize:"11px"}}> پایان همکاری</Button>
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
        <CooperationendDateModal 
       selectedItemManagmentCartable={selectedItemManagmentCartable} 
        activeTabCompanyMember={activeTabCompanyMember}
        isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
        activeTab={activeTab} 
        selectedBoardMember={selectedBoardMember} 
        userIdRecognition={userIdRecognition} closeModal={() => setVisible(false)} />
      </Modal>
    </div>
  );
};

export default EmployeeList;
 