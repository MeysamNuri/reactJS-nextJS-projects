import React, { useState, useEffect, FC, useRef } from "react";
import {
  Table,
  Modal,
  Space,
  ConfigProvider,
  Input,
  Button,
  Popover,
  Tooltip,
  Radio
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FilterFilled } from "@ant-design/icons";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined, LockOutlined } from "@ant-design/icons";
import { FindAccess, Icon } from "sanhab-components-library";

import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import {
  getAllFieldInfoNatural,

  fetchAllStatuses,
  selectDocuments,
  fetchApplicantForbiddneInfo
} from "../../../redux/actions";
import ForbiddenResult from './forbiddenResult'

import { filterAdvanceOperator } from "../../../shared/ulitities/Enums/advanceSearchOperator";
import { IReport } from "../../../shared/ulitities/Model/report";
import { ReactComponent as ArrowLeft } from "../../../assets/images/arrowLeft.svg";
import { ReactComponent as More } from "../../../assets/images/more.svg";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { ReactComponent as Danger } from "../../../assets/images/warnings.svg";

interface IForbiddenListInfoProps {
  handleChildData: any;
  handleChildSelectData: any;
  clearFilter: number

}

const ForbiddenListInfo: FC<IForbiddenListInfoProps> = ({

  handleChildData,
  handleChildSelectData,
  clearFilter,

}) => {
  const dispatch = useDispatch();
  const [callServise, setCallService] = useState(false)
  const [visible, setVisible] = useState(false);
  const [visibleApplicantForbidden, setVisibleApplicantForbidden] = useState(false);
  const [dataIndex, setDataIndex] = useState("");

  const [customOrder, setCustomOrder] = useState<any>(null);


  const [data, setData] = useState<any>(null)
  const [filterState, setFilterState] = useState<number>(7)
  const [
    selectedItemManamentCartable,
    setSelectedItemManamentCartable,
  ] = useState({} as any);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const removeFilterRef = useRef<any>(null)
  const [filterList, setFilterList] = useState<any>([]);

  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
  });
  let {
    reportNaturalJudicalEvalutor,
    applicantForbiddenInfo,
    applicantForbiddenLoading
  } = useSelector((state: any) => state.cartableReportAllInfo);
  let { selectedDocumentList } = useSelector((state: any) => state.selectedDocumentList)

  const { loadingExcel } = useSelector(
    (state: any) => state.excelCartable
  );

  useEffect(() => {
    dispatch(getAllFieldInfoNatural());
    dispatch(fetchAllStatuses());
  }, []);

  useEffect(() => {
    handleChildData(filterList);
  }, [filterList]);

  useEffect(() => {
    let filteredSelectedKeys = [] as any;
    if (selectedDocumentList != null) {
      let first = [...selectedDocumentList].shift();
      let last = [...selectedDocumentList].pop();
      let fitrstIndex = selectedDocumentList.indexOf(first);
      let lastIndex = selectedDocumentList.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredSelectedKeys.push({
          propertyName: "ApplicantId",
          operator: 1,
          value: selectedDocumentList[0]?.ApplicantId,
        });
      }

      if (selectedDocumentList.length > 1) {
        for (let i = 0; i < selectedDocumentList.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredSelectedKeys.push({
              propertyName: "ApplicantId",
              operator: 1,
              value: first?.ApplicantId,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == selectedDocumentList.length - 1) {
            filteredSelectedKeys.push({
              propertyName: "ApplicantId",
              operator: 1,
              value: last?.ApplicantId,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== selectedDocumentList.length - 1 && i !== fitrstIndex) {
            filteredSelectedKeys.push({
              propertyName: "ApplicantId",
              operator: 1,
              value: selectedDocumentList[i]?.ApplicantId,
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    handleChildSelectData(filteredSelectedKeys);
    // setFilterListSelectedKey(filteredSelectedKeys);
  }, [selectedDocumentList]);

  useEffect(() => {
    let data = applicantForbiddenInfo?.Result?.map(
      (report: any) => {
        let obj = {
          Id: report.ApplicantId,
          key: report?.ApplicantId,
          ApplicantId: report.ApplicantId,
          ForbiddenFiles: report.ApplicantPersonalInfo?.Person?.ForbiddenFiles,
          FirstName: report?.ApplicantPersonalInfo?.Person?.FirstName,
          FamilyName: report?.ApplicantPersonalInfo?.Person?.FamilyName,
          NationalCode: report?.ApplicantPersonalInfo?.Person?.NationalCode,
          BirthDate: moment(report?.ApplicantPersonalInfo?.Person?.BirthDate?.split("T")[0]).format(
            "jYYYY-jMM-jDD"
          ),
          Mobile: report?.ApplicantPersonalInfo?.Mobile,
          AdjusterCode: report?.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
          ForbiddenResult: report?.ForbiddenResult,
          Address: report?.ApplicantPersonalInfo?.Address,
          Code: report?.Forbidden?.Code
        };
        return obj;
      }
    );
    setData(data)
  }, [reportNaturalJudicalEvalutor, applicantForbiddenInfo])

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setDataIndex(dataIndex);

    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  useEffect(() => {
    setPageModel({
      ...pageModel,
      pageIndex: 1
    })
    setFilterList([]);
    setSearchText("");

    removeFilterRef?.current?.click()
  }, [clearFilter])
  const handleReset = (clearFilters: any) => {

    clearFilters();
    setSearchText("");
    setFilterState(7)
  };
  const radioCahnge = (e: any, clearFilters: any) => {

    setFilterState(e.target.value)
    setSearchText("");
    setDataIndex("")
    clearFilters();

  }


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
        {   dataIndex === "FirstName" ||
          dataIndex === "FamilyName" ||
          dataIndex === "NationalCode" ||
          dataIndex === "AdjusterCode"
          ?
          <>

            <Input
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: "block" }}
            />
            <Radio.Group onChange={(e: any) => radioCahnge(e, clearFilters)} defaultValue={7}>
              <Radio value={7}>شامل</Radio>
              <Radio value={1}>برابر</Radio>

            </Radio.Group>
          </>
          : (
            <Input
              ref={searchInput}
              placeholder={`جستجو ${dataIndex === "StatusTitle"
                ? "وضعیت"
                : dataIndex === "FirstName"
                  ? "نام"
                  : dataIndex === "FamilyName"
                    ? "نام خانوادگی"
                    : dataIndex === "NationalCode"
                      ? "کد ملی"
                      : dataIndex === "degree"
                        ? "مدرک تحصیلی"
                        : dataIndex === "AdjusterCode"
                          ? "کد ارزیابی"
                          : dataIndex === "AdjustmentFieldTitle"
                            ? "زمینه تخصصی"
                            : dataIndex === "Mobile"
                              ? "تلفن همراه"
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
          )}
        <Space>
          <Button
            ref={removeFilterRef}
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



  //جزئیات شاخص
  const applicantForbiddenHandler = () => {
    setVisibleApplicantForbidden(true)
  }

  const content = (
    <div>

      {

        FindAccess(userAccessList.Adjusters_ViewLicense) &&
        <p>
          <Button
            type="text"
            icon={<Danger style={{ width: "20px" }} />}
            onClick={applicantForbiddenHandler}
            className="centerIconButton"
            loading={loadingExcel}

          >
            جزئیات شاخص
          </Button>
        </p>
      }
    </div>
  );

  //جزئیات درخواست
  const detailHandler = (record: any) => {
    setVisible(true);
    setSelectedItemManamentCartable(record);
  };

  useEffect(() => {
    let cartableReport = {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: "Id",
      filters: filterList,
    };

    if (!callServise) {
      return setCallService(true);
    } else
      dispatch(
        fetchApplicantForbiddneInfo(
          cartableReport
        )
      );



  }, [pageModel, filterList, dataIndex, customOrder]);

  const moreHandler = (record: any) => {
    setSelectedItemManamentCartable(record);
  };

  //coloumns Table
  let columns: any = [
    // {
    //   render: (text: any, record: any) => (
    //     <Space size="middle">
    //       <div className="detailColum2" onClick={() => detailHandler(record)}>
    //         <ArrowLeft />
    //       </div>
    //     </Space>
    //   ),
    // },
    // {
    //   title: "عملیات",
    //   render: (text: any, record: any) => (
    //     <Space size="middle">
    //       <Popover
    //         content={content}
    //         title=""
    //         placement="bottom"
    //         // trigger="click"

    //       >
    //         <div onMouseEnter={() => moreHandler(record)}>
    //           <More className="pointer" />
    //         </div>
    //       </Popover>
    //     </Space>
    //   ),
    // },

    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      ...getColumnSearchProps("FirstName"),
      responsive: ["sm"],
    },
    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
      ...getColumnSearchProps("FamilyName"),
      responsive: ["sm"],
    },

    {
      title: ` کد ارزیابی`,
      dataIndex: "AdjusterCode",
      key: "AdjusterCode",
      ...getColumnSearchProps("AdjusterCode"),
      responsive: ["sm"],
    },


    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ...getColumnSearchProps("NationalCode"),
      responsive: ["sm"],
    },

    {
      title: "تاریخ تولد",
      dataIndex: "BirthDate",
      key: "BirthDate",

    },


    {
      title: "تلفن همراه",
      dataIndex: "Mobile",
      key: "Mobile",
      ...getColumnSearchProps("Mobile"),
      responsive: ["sm"],
    },

    {
      title: "نتیجه شاخص",
      dataIndex: "ForbiddenResult",
      key: "ForbiddenResult",
      responsive: ["sm"],

    },
    {
      title: "کد شاخص",
      dataIndex: "Code",
      key: "Code",
      responsive: ["sm"],

    },
    {
      title: "آدرس",
      dataIndex: "Address",
      key: "Address",
      responsive: ["sm"],

    },

    // {
    //   title: "نام کاربری",
    //   dataIndex: "UserName",
    //   key: "UserName",
    //   responsive: ["sm"],
    // },

  ];

  const handleChange = (pagination: any, filters: any, sorter: any) => {

    let filteredIndictmentList = [] as any;
    if (filters.FamilyName != null) {
      filteredIndictmentList.push({
        propertyName: "FamilyName",
        operator: filterState,
        value: filters?.FamilyName[0],
      });
    }

    if (filters.FirstName != null) {
      filteredIndictmentList.push({
        propertyName: "FirstName",
        operator: filterState,
        value: filters?.FirstName[0],
      });
    }

    if (filters.NationalCode != null) {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: filters?.NationalCode[0],
      });
    }
    if (filters.AdjusterCode != null) {
      filteredIndictmentList.push({
        propertyName: "AdjusterCode",
        operator: filterAdvanceOperator.Like,
        value: filters?.AdjusterCode[0],
      });
    }

    if (filters.Mobile != null) {
      filteredIndictmentList.push({
        propertyName: "Mobile",
        operator: 1,
        value: filters?.Mobile[0],
      });
    }

    if (filters.ProvinceTitle != null) {
      let first = [...filters.ProvinceTitle].shift();
      let last = [...filters.ProvinceTitle].pop();
      let fitrstIndex = filters.ProvinceTitle.indexOf(first);
      let lastIndex = filters.ProvinceTitle.indexOf(last);
      if (fitrstIndex === lastIndex) {
        filteredIndictmentList.push({
          propertyName: "ProvinceId",
          operator: 1,
          value: filters?.ProvinceTitle[0],
        });
      }

      if (filters.ProvinceTitle.length > 1) {
        for (let i = 0; i < filters.ProvinceTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "ProvinceId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.ProvinceTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "ProvinceId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.ProvinceTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "ProvinceId",
              operator: 1,
              value: filters?.ProvinceTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    if (filters.CityTitle != null) {
      let first = [...filters.CityTitle].shift();
      let last = [...filters.CityTitle].pop();
      let fitrstIndex = filters.CityTitle.indexOf(first);
      let lastIndex = filters.CityTitle.indexOf(last);
      if (fitrstIndex === lastIndex) {
        filteredIndictmentList.push({
          propertyName: "CityId",
          operator: 1,
          value: filters?.CityTitle[0],
        });
      }

      if (filters.CityTitle.length > 1) {
        for (let i = 0; i < filters.CityTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CityId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.CityTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "CityId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.CityTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CityId",
              operator: 1,
              value: filters?.CityTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    if (filters.AdjustmentFieldTitle != null) {
      let first = [...filters.AdjustmentFieldTitle].shift();
      let last = [...filters.AdjustmentFieldTitle].pop();
      let fitrstIndex = filters.AdjustmentFieldTitle.indexOf(first);
      let lastIndex = filters.AdjustmentFieldTitle.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "AdjustmentFieldId",
          operator: 1,
          value: filters?.AdjustmentFieldTitle[0],
        });
      }

      if (filters.AdjustmentFieldTitle.length > 1) {
        for (let i = 0; i < filters.AdjustmentFieldTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.AdjustmentFieldTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: last,
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (
            i !== filters.AdjustmentFieldTitle.length - 1 &&
            i !== fitrstIndex
          ) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: filters?.AdjustmentFieldTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    if (filters.StatusTitle != null) {
      let first = [...filters.StatusTitle].shift();
      let last = [...filters.StatusTitle].pop();
      let fitrstIndex = filters.StatusTitle.indexOf(first);
      let lastIndex = filters.StatusTitle.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "StatusId",
          operator: 1,
          value: filters?.StatusTitle[0],
        });
      }

      if (filters.StatusTitle.length > 1) {
        for (let i = 0; i < filters.StatusTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StatusId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.StatusTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "StatusId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.StatusTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StatusId",
              operator: 1,
              value: filters?.StatusTitle[i],
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

      <Table
        columns={columns}
        dataSource={data}
        loading={applicantForbiddenLoading}
        onChange={handleChange}
        pagination={{
          pageSize: pageModel.pageSize,
          total: reportNaturalJudicalEvalutor ? reportNaturalJudicalEvalutor?.data.TotalCount : applicantForbiddenInfo?.TotalCount,
          showTotal: (total) => `تعداد کل : ${total} `,
          showSizeChanger: true,
          onChange: (current: any, pageSize: any) =>
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
          emptyText: "پرونده ای موجود نیست.",
        }}
      />
      <ConfigProvider direction="rtl">
        {/* <Modal
          title={`جزئیات شاخص `}
          visible={visibleApplicantForbidden}
          footer={null}
          onCancel={() => setVisibleApplicantForbidden(false)}
          width={1200}
          centered

        >
          {visibleApplicantForbidden && (
            <ForbiddenResult forbiddenFilesResult={selectedItemManamentCartable?.ForbiddenFiles} />
          )}
        </Modal> */}




      </ConfigProvider>
    </>
  );
};

export default ForbiddenListInfo;
