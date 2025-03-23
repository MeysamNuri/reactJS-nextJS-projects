import React, { useState, useEffect, useMemo, FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Table, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moment from "jalali-moment";
import { FindAccess } from "sanhab-components-library";
import {
  fetchBasketListLegal,
  fetchAdmistionListExpert,
  asignerFileHandler,
  fetchAllCourseByAdjusterType,
} from "../../../redux/actions";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import {
  IAdmisstionExpert,
  IInitalList,
} from "../../../shared/ulitities/Model/fileAssigner";

const { Option } = Select;
// interface INaturalProps {
//   activeTab: string;
// }

const Legal = () => {
  const dispatch = useDispatch();
  const [valAdmission, setValAdmission] = useState<any>();
  const [downloadId, setDownloadId] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const [filterList, setFilterList] = useState<any>([]);
  const { allCourseByAdjusterType } = useSelector(
    (state: any) => state?.allCourse
  );

  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const { asignerLoading, admissitionList, listLegal, loading } = useSelector(
    (state: any) => state.fileAssiner
  );

  let coursesFilter = allCourseByAdjusterType?.Result?.map((course: any) => {
    let courseName = {
      key: course.CourseId,
      text: course.Title,
      value: course.CourseId,
    };
    return courseName;
  });

  let dataLegal = useMemo(() => {
    return {
      adjusterType: adjusterType.legal,
      model: {
        firstPageSize: 1,
        pageSize: pageModel.pageSize,
        pageIndex: pageModel.pageIndex,
        orderBy: "Id",
        filters: filterList,
      },
    };
  }, [pageModel, adjusterType, filterList]);

  let dataSource = listLegal?.Result?.map((item: IInitalList) => {
    let obj = {
      Id: item.ApplicantId,
      key: item.ApplicantId,
      ApplicantId: item.ApplicantId,
      RegistrationCode: item.RegistrationCode,
      FullName: item.FullName,
      CourseTitle: item.CourseTitle,
      NationalCode: item.NationalCode,
      StateTitle: item.StateTitle,
      RegisterDate: moment(item?.RegisterDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
    };
    return obj;
  });

  useEffect(() => {
    dispatch(fetchAllCourseByAdjusterType(adjusterType.legal));
  }, []);

  useEffect(() => {
    dispatch(fetchBasketListLegal(dataLegal));
  }, [pageModel.pageIndex, filterList]);

  useEffect(() => {
    dispatch(fetchAdmistionListExpert());
  }, []);

  const admissionHandler = (value: number) => {
    setValAdmission(value);
  };

  const referHandler = (record: any) => {
    setDownloadId(record.ApplicantId);
    dispatch(
      asignerFileHandler(record.ApplicantId, valAdmission, () => {
        dispatch(fetchBasketListLegal(dataLegal));
      })
    );
  };
  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
    setFilterList([]);
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
            dataIndex === "FullName"
              ? "نام خانوادگی"
              : dataIndex === "FirstName"
              ? "نام"
              : dataIndex === "RegistrationCode"
              ? "کدرهگیری"
              : dataIndex === "NationalCode"
              ? "کد ملی"
              : dataIndex === "degree"
              ? "مدرک تحصیلی"
              : dataIndex === "AdjusterCode"
              ? "کد ارزیابی"
              : dataIndex === "AdjustmentFieldTitle"
              ? "زمینه تخصصی"
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

  //coloumns Table
  let columns: any = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "FullName",
      key: "FullName",
      width: "14%",
    },
    {
      title: "کد ملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "12%",
      ...getColumnSearchProps("NationalCode"),

      //width: "10%",
    },
    {
      title: "تاریخ ثبت نام",
      dataIndex: "RegisterDate",
      key: "RegisterDate",
      width: "10%",
    },
    {
      title: "کدرهگیری",
      dataIndex: "RegistrationCode",
      key: "RegistrationCode",
      width: "10%",
    },

    {
      title: "وضعیت",
      dataIndex: "StateTitle",
      key: "StateTitle",
      width: "15%",
    },
    {
      title: "دوره",
      dataIndex: "CourseTitle",
      key: "CourseTitle",
      filters: coursesFilter,
      width: "23%",
    },

    {
      title: "لیست کارشناسان",
      render: (text: any, record: any) => (
        <>
          <Select
            showSearch
            placeholder="انتخاب نمایید"
            optionFilterProp="children"
            onChange={admissionHandler}
            allowClear
            // value={valAdmission}
            style={{ width: "100%" }}
          >
            {admissitionList?.Result?.map((admission: IAdmisstionExpert) => (
              <Option key={admission.UserId} value={admission.UserId}>
                {admission.UserName}
              </Option>
            ))}
          </Select>
        </>
      ),
      width: "20%",
    },
    {
      title: FindAccess(userAccessList.Adjusters_AssignIncommingAdjuster) && "ارجاع",
      render: (text: any, record: any) => (
        <>
          {FindAccess(userAccessList.Adjusters_AssignIncommingAdjuster) && (
            <Button
              type="primary"
              onClick={() => referHandler(record)}
              loading={asignerLoading && downloadId === record.ApplicantId}
            >
              ارجاع
            </Button>
          )}
        </>
      ),
    },
  ];

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [] as any;
    if (filters.FullName != null) {
      filteredIndictmentList.push({
        propertyName: "FullName",
        operator: 1,
        value: filters?.FullName[0],
      });
    }
    if (filters.RegistrationCode != null) {
      filteredIndictmentList.push({
        propertyName: "RegistrationCode",
        operator: 1,
        value: filters?.RegistrationCode[0],
      });
    }
    if (filters.NationalCode != null) {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: filters?.NationalCode[0],
      });
    }

    if (filters.LicenseType != null) {
      let first = [...filters.LicenseType].shift();
      let last = [...filters.LicenseType].pop();
      let fitrstIndex = filters.LicenseType.indexOf(first);
      let lastIndex = filters.LicenseType.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "LicenseType",
          operator: 1,
          value: filters?.LicenseType[0],
        });
      }

      if (filters.LicenseType.length > 1) {
        for (let i = 0; i < filters.LicenseType.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "LicenseType",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.LicenseType.length - 1) {
            filteredIndictmentList.push({
              propertyName: "LicenseType",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.LicenseType.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "LicenseType",
              operator: 1,
              value: filters?.LicenseType[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    if (filters.CourseTitle != null) {
      let first = [...filters.CourseTitle].shift();
      let last = [...filters.CourseTitle].pop();
      let fitrstIndex = filters.CourseTitle.indexOf(first);
      let lastIndex = filters.CourseTitle.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "CourseId",
          operator: 1,
          value: filters?.CourseTitle[0],
        });
      }

      if (filters.CourseTitle.length > 1) {
        for (let i = 0; i < filters.CourseTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CourseId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.CourseTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "CourseId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.CourseTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CourseId",
              operator: 1,
              value: filters?.CourseTitle[i],
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
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      locale={{ emptyText: "پرونده ای جهت ارجاع وجود ندارد" }}
      onChange={handleTableChange}
      pagination={{
        pageSize: pageModel.pageSize,
        total: listLegal?.TotalCount,
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
    />
  );
};

export default Legal;
