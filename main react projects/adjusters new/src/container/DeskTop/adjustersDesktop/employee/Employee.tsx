import React, { useState, useMemo, useEffect, useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  Space,
  Tooltip,
  Modal,
  ConfigProvider,
  Input,
} from "antd";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { PlusOutlined, FilterFilled, SearchOutlined } from "@ant-design/icons";
import CreatreEmployee from "./CreateEmployee";
import {
  fetchAllAdjustmentField,
  fetchEmployee,
  getBaseInfo,
  fetchEmployeeId,
} from "../../../../redux/actions";
import { IViewEmployee } from "../../../../shared/ulitities/Model/desktop/employee";
import { INQUIRE_SUCCESS } from "../../../../constant/actionTypes";
import { filterAdvanceOperator } from "../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as Edit } from "../../../../assets/images/edit.svg";

interface IEmployeeProps {
  isManagmentCartable?: boolean;
  applicantId?: number;
  isFromMenue?:boolean
}
const Employee: FC<IEmployeeProps> = ({ isManagmentCartable, applicantId,isFromMenue }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [filterList, setFilterList] = useState<any>(
    isManagmentCartable
      ? [
          {
            propertyName: "ApplicantId",
            operator: 1,
            value: applicantId,
          },
        ]
      : []
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const { baseInfo } = useSelector((state: any) => state?.baseData);
  const {
    loadingViewEmployee,
    viewEmployee,
    loadingViewEmployeeId,
  } = useSelector((state: any) => state.employee);
  const [pageModel, setPageModel] = useState({
    pageSize: 15,
    pageIndex: 1,
  });

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

  let dataSource = viewEmployee?.Result?.map((item: IViewEmployee) => {
    let obj = {
      Id: item.Id,
      key: item.Id,
      ApplicantInfoFirstName:item.ApplicantPersonalInfo?.Person.FirstName,
      ApplicantInfoLastName:item.ApplicantPersonalInfo?.Person.FamilyName,
      ApplicantInfoNationlCode:item.ApplicantPersonalInfo?.Person.NationalCode,
      ApplicantInfoCode:item.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
      FirstName: item.IdentityInfo.FirstName,
      FamilyName: item.IdentityInfo.FamilyName,
      NationalCode: item.IdentityInfo.NationalCode,
      EmploymentDate: moment(item?.EmploymentDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
      EndDate:
        item?.EndDate == null
          ? "---"
          : moment(item?.EndDate?.split("T")[0]).format("jYYYY-jMM-jDD"),
      PositionDescription: item.PositionDescription,
      AcademicDegree: item.AcademicDegree === null? "--":item.AcademicDegree,
      AcademicField: item.AcademicField=== null ? "--" : item.AcademicField,
    };

    return obj;
  });

  let adjustmentField = {
    isActive: null,
  };

  useEffect(() => {
    dispatch(fetchAllAdjustmentField(adjustmentField));
  }, []);

  let positionFilter = baseInfo?.Result?.Positions?.filter(
    (item: any) => item.IsBoardMember === false
  )?.map((position: any, index: number) => {
    return {
      key: index,
      text: position.Title,
      value: position.Id,
    };
  });
  let modelEmployee = useMemo(() => {
    return {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: "Id",
      filters: filterList,
    };
  }, [pageModel, filterList]);

  useEffect(() => {
    dispatch(fetchEmployee(modelEmployee));
  }, [pageModel, filterList]);

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    setFilterList([]);
    clearFilters();
    setSearchText("");
  };

  const editEmployeeHandler = (record: any) => {
    dispatch(fetchEmployeeId(record?.Id));
    setEdit(true);
    setVisible(true);
    dispatch({ type: INQUIRE_SUCCESS, payload: null });
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
          placeholder={`جستجو ${
            dataIndex === "ApplicantInfoFirstName"?
            "نام ارزیاب":
            dataIndex === "ApplicantInfoLastName"?
            "نام خانوادگی ارزیاب":
            dataIndex === "ApplicantInfoNationlCode"?
            "کدملی ارزیاب":
            dataIndex === "ApplicantInfoCode"?
            "کد ارزیاب":
            dataIndex === "FirstName"
              ? "نام"
              : dataIndex === "FamilyName"
              ? "نام خانوادگی"
              : dataIndex === "NationalCode"
              ? "کدملی"
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

  let columns: any = [
    /*   {

      render: (value:any, item:any, index:any) => pageModel.pageIndex === 1 ? (index + 1) : ((pageModel.pageIndex - 1) * pageModel.pageSize) + (index + 1)
    }, */
    !isManagmentCartable?
    {
      title: "نام ارزیاب",
      dataIndex: "ApplicantInfoFirstName",
      key: "ApplicantInfoFirstName",
      ellipsis: true,
      width: "14%",
      ...getColumnSearchProps("ApplicantInfoFirstName"),
    }:{},
    !isManagmentCartable?
    {
      title: "نام خانوادگی ارزیاب",
      dataIndex: "ApplicantInfoLastName",
      key: "ApplicantInfoLastName",
      ellipsis: true,
      width: "20%",
      ...getColumnSearchProps("ApplicantInfoLastName"),
    }:{},
  
    !isManagmentCartable?
    {
      title: "کدملی ارزیاب",
      dataIndex: "ApplicantInfoNationlCode",
      key: "ApplicantInfoNationlCode",
      ellipsis: true,
      width: "16%",
      ...getColumnSearchProps("ApplicantInfoNationlCode"),
    }:{},
    !isManagmentCartable?
    { 
      title: "کد ارزیابی",
      dataIndex: "ApplicantInfoCode",
      key: "ApplicantInfoCode",
      ellipsis: true,
      width: "14%",
      ...getColumnSearchProps("ApplicantInfoCode"),
    }:{},
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      ellipsis: true,
      width: "16%",
      ...getColumnSearchProps("FirstName"),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
      width: "18%",
      ...getColumnSearchProps("FamilyName"),
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "13%",
      ...getColumnSearchProps("NationalCode"),
    },
    {
      title: "شروع همکاری",
      dataIndex: "EmploymentDate",
      key: "EmploymentDate",
      width: "17%",
    },
    {
      title: "پایان همکاری",
      dataIndex: "EndDate",
      key: "EndDate",
      width: "17%",
    },

    {
      title: "سمت",
      dataIndex: "PositionDescription",
      key: "PositionDescription",
      filters: positionFilter,
      width: "16%",
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "مدرک",
      dataIndex: "AcademicDegree",
      key: "AcademicDegre",
      width: "16%",
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "AcademicField",
      key: "AcademicField",
      width: "18%",
    },
    {
      title: !isManagmentCartable &&!isFromMenue&& "عملیات",
      width: "7%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            {!isManagmentCartable &&!isFromMenue&& (
              <Tooltip title="ویرایش" placement="topLeft">
                <Button
                  onClick={() => editEmployeeHandler(record)}
                  className="action"
                  type="text"
                  loading={loadingViewEmployeeId === record.Id}
                  icon={<Edit />}
                ></Button>
              </Tooltip>
            )}
          </div>
        </Space>
      ),
    },
  ];

  const visibleRegisterHandler = () => {
    setVisible(true);
    setEdit(false);
  };

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [] as any;
    isManagmentCartable
      ? filteredIndictmentList.push({
          propertyName: "ApplicantId",
          operator: 1,
          value: applicantId,
        })
      : ([] as any);
      if (filters.ApplicantInfoFirstName != null) {
        filteredIndictmentList.push({
          propertyName: "Applicant.FirstName",
          operator: 7,
          value: filters?.ApplicantInfoFirstName[0],
        });
      }
      if (filters.ApplicantInfoLastName != null) {
        filteredIndictmentList.push({
          propertyName: "Applicant.FamilyName",
          operator: 7,
          value: filters?.ApplicantInfoLastName[0],
        });
      }
      if (filters.ApplicantInfoNationlCode != null) {
        filteredIndictmentList.push({
          propertyName: "Applicant.NationalCode",
          operator: 1,
          value: filters?.ApplicantInfoNationlCode[0],
        });
      }
      if (filters.ApplicantInfoCode != null) {
        filteredIndictmentList.push({
          propertyName: "Applicant.AdjusterCode",
          operator: 7,
          value: filters?.ApplicantInfoCode[0],
        });
      }
    if (filters.FirstName != null) {
      filteredIndictmentList.push({
        propertyName: "Person.FirstName",
        operator: filterAdvanceOperator.Like,
        value: filters?.FirstName[0],
      });
    }
    if (filters.FamilyName != null) {
      filteredIndictmentList.push({
        propertyName: "Person.FamilyName",
        operator: filterAdvanceOperator.Like,
        value: filters?.FamilyName[0],
      });
    }
    if (filters.NationalCode != null) {
      filteredIndictmentList.push({
        propertyName: "Person.NationalCode",
        operator: 1,
        value: filters?.NationalCode[0],
      });
    }

    if (filters.PositionDescription != null) {
      let first = [...filters.PositionDescription].shift();
      let last = [...filters.PositionDescription].pop();
      let fitrstIndex = filters.PositionDescription.indexOf(first);
      let lastIndex = filters.PositionDescription.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "Position",
          operator: 1,
          value: Number(filters?.PositionDescription[0]),
        });
      }

      if (filters.PositionDescription.length > 1) {
        for (let i = 0; i < filters.PositionDescription.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "PositionDescription",
              operator: 1,
              value: Number(first),
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.PositionDescription.length - 1) {
            filteredIndictmentList.push({
              propertyName: "PositionDescription",
              operator: 1,
              value: Number(last),
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (
            i !== filters.PositionDescription.length - 1 &&
            i !== fitrstIndex
          ) {
            filteredIndictmentList.push({
              propertyName: "Position",
              operator: 1,
              value: Number(filters?.PositionDescription[i]),
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    setFilterList(filteredIndictmentList);
  };

  return (
    <>
      {!isManagmentCartable && !isFromMenue &&(
        <div className="buttonRight">
          <Button
            type="primary"
            onClick={visibleRegisterHandler}
            icon={<PlusOutlined />}
          >
            افزودن کارمند
          </Button>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loadingViewEmployee}
        onChange={handleTableChange}
        pagination={{
          pageSize: pageModel.pageSize,
          total: viewEmployee?.TotalCount,
          showSizeChanger: true,
          showTotal: (total) => `تعداد کل : ${total} `,
          onChange: (current: number, pageSize: any) =>
            setPageModel({
              ...pageModel,
              pageIndex: current,
              pageSize: pageSize,
            }),
          locale: { items_per_page: "/ صفحه" },
        }}
        locale={{
          filterReset: (
            <span
              onClick={() => {
                document
                  .querySelector(".ant-dropdown")!
                  .classList.add("ant-dropdown-hidden");
                setFilterList([]);
              }}
            >
              باز نشانی
            </span>
          ),
          filterConfirm: "جستجو",
          filterEmptyText: "یافت نشد",
          emptyText: "اطلاعاتی وجود ندارد.",
        }}
      />
      <ConfigProvider direction="rtl">
        <Modal
          title={edit ? "ویرایش کارکنان" : "ایجاد کارکنان"}
          visible={visible}
          footer={null}
          onCancel={() => {
            return setVisible(false);
          }}
          width={1000}
          centered
          destroyOnClose={true}
        >
          {visible && (
            <CreatreEmployee
              closeModal={() => setVisible(false)}
              modelEmployee={modelEmployee}
              edit={edit}
            />
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Employee;
