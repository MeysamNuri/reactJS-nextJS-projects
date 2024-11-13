import React, { useState, useMemo, useEffect, FC,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  Space,
  Tooltip,
  Modal,
  ConfigProvider,
  Popconfirm,
  Input
} from "antd";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { PlusOutlined, FilterFilled ,SearchOutlined} from "@ant-design/icons";
import CreateMonthlyPerfomance from "./CreateMonthlyPerformance";
import {
  fetchAllAdjustmentField,
  fetchMonthlyPerformance,
  fetchMonthlyPerformanceId,
} from "../../../../redux/actions";
import { IViewMonthlyPerformance } from "../../../../shared/ulitities/Model/desktop/monthlyPerformance";
import { ReactComponent as Edit } from "../../../../assets/images/edit.svg";

interface IMonthlyPerformanceProps {
  isManagmentCartable?: boolean;
  applicantId?: number;
  isFromMenue?:boolean
}

const MonthlyPerformance: FC<IMonthlyPerformanceProps> = ({
  isManagmentCartable,
  applicantId,
  isFromMenue
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [edit, setEdit] = useState(false);
  const searchInput = useRef<any>(null);
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
  const specializedField = useSelector(
    (state: any) => state?.specializedField?.specializedField
  );
  const {
    viewMonthlyPerformance,
    loadingViewMonthlyPerformance,
    loadingMonthlyPerformanceId,
  } = useSelector((state: any) => state.monthlyPerformance);
  const [pageModel, setPageModel] = useState({
    pageSize: 15,
    pageIndex: 1,
  });
 
  let dataSource = viewMonthlyPerformance?.Result?.map(
    (item: IViewMonthlyPerformance) => {
      let obj = {
        Id: item.Id,
        key: item.Id,
        ApplicantInfoFirstName:item.ApplicantPersonalInfo?.Person.FirstName,
        ApplicantInfoLastName:item.ApplicantPersonalInfo?.Person.FamilyName,
        ApplicantInfoNationlCode:item.ApplicantPersonalInfo?.Person.NationalCode,
        ApplicantInfoCode:item.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
        ApplicantId: item.ApplicantId,
        AdjustmentField: item.AdjustmentField.Title,
        DocumentCount: item.DocumentCount,
        Description: item.Description,
        CreatedDate: moment(item?.CreatedDate?.split("T")[0]).format(
          "jYYYY-jMM-jDD"
        ),
      };
      return obj;
    }
  );

  let adjustmentField = {
    isActive: null,
  };

  useEffect(() => {
    dispatch(fetchAllAdjustmentField(adjustmentField));
  }, []);

  let adjustmentFilter = specializedField?.Result?.map(
    (field: any, index: number) => {
      return {
        key: index,
        text: field.Title,
        value: field.AdjustmentFieldId,
      };
    }
  );

  const removePerformanceHandler = (record: any) => {
    // console.log(record, "recordPerformance");
  };

  let modelMonthlePerformance = useMemo(() => {
    return {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      // orderBy: "Id",
      filters: filterList,
    };
  }, [pageModel, filterList]);

  useEffect(() => {
    dispatch(fetchMonthlyPerformance(modelMonthlePerformance));
  }, [pageModel.pageSize, pageModel.pageIndex, filterList]);

  const editPerformanceHandler = (record: any) => {
    dispatch(fetchMonthlyPerformanceId(record.Id));
    setEdit(true);
    setVisible(true);
  };
  
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
            "کد ارزیاب": null
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
    !isManagmentCartable?
    {
      title: "نام ارزیاب",
      dataIndex: "ApplicantInfoFirstName",
      key: "ApplicantInfoFirstName",
      ellipsis: true,
      width: "10%",
      ...getColumnSearchProps("ApplicantInfoFirstName"),
    }:{},
    !isManagmentCartable?
    {
      title: "نام خانوادگی ارزیاب",
      dataIndex: "ApplicantInfoLastName",
      key: "ApplicantInfoLastName",
      ellipsis: true,
      width: "16%",
      ...getColumnSearchProps("ApplicantInfoLastName"),
    }:{},
    !isManagmentCartable?
    {
      title: "کدملی ارزیاب",
      dataIndex: "ApplicantInfoNationlCode",
      key: "ApplicantInfoNationlCode",
      ellipsis: true,
      width: "14%",
      ...getColumnSearchProps("ApplicantInfoNationlCode"),
    }:{},
    !isManagmentCartable?
    { 
      title: "کد ارزیابی",
      dataIndex: "ApplicantInfoCode",
      key: "ApplicantInfoCode",
      ellipsis: true,
      width: "12%",
      ...getColumnSearchProps("ApplicantInfoCode"),
    }:{},
    {
      title: "تاریخ ثبت",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      ellipsis: true,
      width: "20%",
    },
    {
      title: "تعداد پرونده بررسی",
      dataIndex: "DocumentCount",
      key: "DocumentCount",
      ellipsis: true,
      width: "18%",
    },
    {
      title: "زمینه تخصصی",
      dataIndex: "AdjustmentField",
      key: "AdjustmentField",
      filters: adjustmentFilter,
      ellipsis: true,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
      width: "20%",
    },

    {
      title: "توضیحات",
      dataIndex: "Description",
      key: "Description",
      ellipsis: true,
      width: "20%",
    },

    {
      width: "7%",
      title: !isManagmentCartable &&!isFromMenue&& "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            {!isManagmentCartable &&!isFromMenue&& (
              <Tooltip title="ویرایش" placement="topLeft">
                <Button
                  onClick={() => editPerformanceHandler(record)}
                  className="action"
                  icon={<Edit />}
                  type="text"
                  loading={loadingMonthlyPerformanceId === record.Id}
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
    if (filters.AdjustmentField != null) {
      let first = [...filters.AdjustmentField].shift();
      let last = [...filters.AdjustmentField].pop();
      let fitrstIndex = filters.AdjustmentField.indexOf(first);
      let lastIndex = filters.AdjustmentField.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "AdjustmentFieldId",
          operator: 1,
          value: filters?.AdjustmentField[0],
        });
      }
   
      if (filters.AdjustmentField.length > 1) {
        for (let i = 0; i < filters.AdjustmentField.length; i++) {
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
          if (i == filters.AdjustmentField.length - 1) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.AdjustmentField.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: filters?.AdjustmentField[i],
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
      {!isManagmentCartable &&!isFromMenue&& (
        <div className="buttonRight">
          <Button
            type="primary"
            onClick={visibleRegisterHandler}
            icon={<PlusOutlined />}
          >
            ثبت گزارش عملکرد ارزیاب خسارت
          </Button>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loadingViewMonthlyPerformance}
        onChange={handleTableChange}
        pagination={{
          pageSize: pageModel.pageSize,
          total: viewMonthlyPerformance?.TotalCount,
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
                //setFilterList([]);
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
          title={edit ? "ویرایش آمار عملکرد" : "ایجاد آمار عملکرد"}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          width={600}
          centered
          destroyOnClose={true}
        >
          {visible && (
            <CreateMonthlyPerfomance
              closeModal={() => setVisible(false)}
              modelMonthlePerformance={modelMonthlePerformance}
              edit={edit}
            />
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default MonthlyPerformance;
