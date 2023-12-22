import React, { FC, useEffect, useState, useRef } from "react";
import { Button, Table, Space, Modal, Tooltip, Input, Popover, } from "antd";
import { SearchOutlined, FilterFilled,CommentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { FindAccess } from "sanhab-components-library";
import Highlighter from "react-highlight-words";
import {
  cartableReportAllInfo,
  getBoardMemberListRequest,
  dlcartableReportExcel,
  smsBatchsendReportAction,
} from "../../../../redux/actions";
import LegalSubTable from "./LegalSubTable";
import AdjusterInfoDetail from "../../../AdmissionList/Legal/InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import Refer from "./Refer";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { userAccessList } from "../../../../shared/ulitities/Enums/userAccessList";
import { filterAdvanceOperator } from '../../../../shared/ulitities/Enums/advanceSearchOperator';
import { IReport } from "../../../../shared/ulitities/Model/report";
import { messageWarning } from "../../../../utils/utils";
import { ReactComponent as ArrowLeft } from "../../../../assets/images/arrowLeft.svg";
import { ReactComponent as Xls } from "../../../../assets/images/xls.svg";
import { ReactComponent as ReferB } from "../../../../assets/images/referBlack.svg";
import { ReactComponent as SubTract } from "../../../../assets/images/Subtract.svg";
import {toast} from 'react-toastify'
interface ILegalProps {
  adjType: number;
}
const { TextArea } = Input;

const Legal: FC<ILegalProps> = ({ adjType }) => { 
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(20);
  const [applicantIdToExpand, setApplicantIdToExpand] = useState(0);
  const [expandedIds, setExpandedIds] = useState([] as any);
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [applicantId, setApplicantId] = useState(0);
  const [visibleReferModal, setVisibleReferModal] = useState(false);
  const [modelReport, setModelReport] = useState({} as any);
  const [filterList, setFilterList] = useState<any>([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const removeFilter = useRef<any>(null)
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tableKey, setTableKey] = useState(0);
  const [recordReport, setRecordReport] = useState({} as any);
  // const { loadingExcel } = useSelector(
  //   (state: any) => state?.cartableReportAllInfo
  // );
  const {
    cartableReportAllnfo,
    loading: tableDataLoading,
    loadingExcel,
  } = useSelector((state: any) => state?.cartableReportAllInfo);

  const { allCourseByAdjusterType } = useSelector(
    (state: any) => state?.allCourse
  );
  const { loadingSmsBatchSendReport } = useSelector(
    (state: any) => state.smsBatchSend
  );


  

  let data = cartableReportAllnfo?.data?.Result?.map(
    (report: any) => {

      let obj = {
        Id: report.ApplicantId,
        key: report.ApplicantId,
        ApplicantId: report.ApplicantId,
        FirstName: report.FirstName,
        FamilyName: report.FamilyName,
        NationalCode: report.NationalCode,
        Mobile: report.Mobile,
        RegistrationCode: report.RegistrationCode,
        ProvinceTitle: report.ProvinceTitle,
        CityTitle: report.CityTitle,
        AdjusterCode: report.ExpireLicenseFlag ? <Tooltip title="اعتبار پروانه رو به اتمام است "><div className="cartable-management-expireLicenseFlag" >{report.AdjusterCode}</div></Tooltip> : report.FarwellFlag ? <Tooltip title="تاریخ تودیع رو به اتمام است"> <div className="cartable-management-farwelFlag" >{report.AdjusterCode}</div> </Tooltip> : report.RedundanceFlag ? <Tooltip title="تاریخ تعلیق رو به اتمام است"><div className="cartable-management-redundanceFlag" >{report.AdjusterCode}</div></Tooltip> : report.AdjusterCode,
        AdjustmentFieldTitle: report.AdjustmentFieldTitle,
        StateTitle: report.StateTitle,
        StatusId: report.StatusId,
        HasExtendedChargoonLetter: report.HasExtendedChargoonLetter,
        item: report.ApplicantId,
        CourseTitle: report.CourseTitle,
        LicenseType: report.LicenseType,
        FullName: report?.User.FullName


      };
      return obj;
    }
  );
  let coursesFilter = allCourseByAdjusterType?.Result?.map((course: any) => {
    let courseName = {
      key: course.CourseId,
      text: course.Title,
      value: course.CourseId,
    };
    return courseName;
  });

  const status = useSelector(
    (state: any) => state.statusList?.statusList?.Result
  );

  const statusFilter = status?.map((i: any) => {
    return { value: i?.StateId, text: i?.Title, key: i?.StateId };
  });

  const usersList = useSelector(
    (state: any) => state.usersForCartable.users?.Result
  );
  const usersListFilter = usersList?.map((i: any) => {
    return { value: i?.UserId, text: i?.UserName, key: i?.UserId };
  });

  let applicantIds = cartableReportAllnfo?.data?.Result?.map(
    (item: any) => item.ApplicantId
  );

  const resetFiltersHandler = () => {
    setFilterList([]);
    setSearchText("");
    removeFilter.current.click()
    setTableKey(tableKey => tableKey + 1);
  };

  const fileDetail = (i: any, record: any) => {
    setVisibleModal(true);
    setRecordReport(record);
  };

  useEffect(() => {
    if (adjType === 2) {
      let cartableReport = {
        firstPageSize: pageSize,
        pageSize: pageSize,
        pageIndex: pageIndex,
        orderBy: "ApplicantId",
        filters: filterList,
      };
      setModelReport(cartableReport);
      dispatch(cartableReportAllInfo(cartableReport, adjType, () => {}));
    }
  }, [filterList, adjType, pageSize, pageIndex]);
  
  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
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
          placeholder={`جستجو ${
            dataIndex === "RegistrationCode"
              ? "کدرهگیری"
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

  const columns = [
    
    {
      title: "کد رهگیری",
      dataIndex: "RegistrationCode",
      key: "RegistrationCode",
      ...getColumnSearchProps("RegistrationCode"),
      width: "7%",
    },
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "firstName",
      ...getColumnSearchProps("FirstName"),
      //width: "10%",
      //sorter: (a: any, b: any) => a?.FirstName?.localeCompare(b?.FirstName),
    },

    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      //width: "11%",
      key: "familyName",
      ...getColumnSearchProps("FamilyName"),
      sorter: (a: any, b: any) => a?.FamilyName?.localeCompare(b?.FamilyName),
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ...getColumnSearchProps("NationalCode"),
    },
    {
      title: "تلفن همراه",
      dataIndex: "Mobile",
      key: "Mobile",
      ...getColumnSearchProps("Mobile"),
    },

    {
      title: "نام و نام خانوادگی کارشناس",
      dataIndex: "FullName",
      filters: usersListFilter,
      width: "13%",
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },

    {
      title: "وضعیت متقاضی",
      dataIndex: "StateTitle",
      key: "StateTitle",
      filters: statusFilter,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "کد ارزیاب",
      dataIndex: "AdjusterCode",
      ...getColumnSearchProps("AdjusterCode"),
    },
    {
      title: "دوره",
      dataIndex: "CourseTitle",
      width: "16%",
      filters: coursesFilter,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },

    {
      title:
        FindAccess(userAccessList.Adjusters_SwapCartable) && "ارجاع پرونده",
      dataIndex: "referTicket",
      render: (p: any, record: { ApplicantId: number }) => (
        <>
          {FindAccess(userAccessList.Adjusters_SwapCartable) && (
            <Tooltip title="ارجاع">
              <Button
                type="text"
                onClick={() => {
                  setVisibleReferModal(true);
                  setApplicantId(record?.ApplicantId);
                }}
                size="small"
                style={{ fontSize: "12px" }}
                icon={<ReferB />}
              />
            </Tooltip>
          )}
          <div
            className="detailColum"
            onClick={() => {
              fileDetail(record?.ApplicantId, record);
              setApplicantId(record?.ApplicantId);
            }}
          >
            <ArrowLeft />
          </div>
        </>
      ),
    },
  ];
  //******************************************************EXAPAND CODES BEGIN********************************************
  const callRecordToExpand = (expanded: boolean, recordId: number) => {
    if (expanded) {
      dispatch(getBoardMemberListRequest(recordId));
      setExpandedIds([recordId]);
    } else {
      const remained = expandedIds.filter((a: any) => a !== recordId);
      setExpandedIds(remained);
    }
    setApplicantIdToExpand(recordId);
  };

  const expandedTableData = useSelector(
    (state: any) => state?.getBoardMemberListRequest?.getBoardMemberListRequest
  );

  const expandedTableDataLoading = useSelector(
    (state: any) => state?.getBoardMemberListRequest?.loading
  );

  const exelHandler = () => {
    cartableReportAllnfo?.data?.Result == null
      ? messageWarning("لیستی برای خروجی اکسل وجود ندارد")
      : dispatch(dlcartableReportExcel(modelReport, adjType));
  };

  // useEffect(() => {
  //   dispatch(fetchAllCourseByAdjusterType(adjType));
  // }, [adjType]);

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [] as any;
    if (filters.familyName != null) {
      filteredIndictmentList.push({
        propertyName: "FamilyName",
        operator: filterAdvanceOperator.Like,
        value: filters?.familyName[0],
      });
    }

    if (filters.firstName != null) {
      filteredIndictmentList.push({
        propertyName: "FirstName",
        operator: filterAdvanceOperator.Like,
        value: filters?.firstName[0],
      });
    }
    if (filters.NationalCode !== null) {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: filters?.NationalCode[0],
      });
    }
    if (filters.RegistrationCode !== null) {
      filteredIndictmentList.push({
        propertyName: "RegistrationCode",
        operator: filterAdvanceOperator.Like,
        value: filters?.RegistrationCode[0],
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

    if (filters.CourseTitle != null) {
      let first = [...filters.CourseTitle].shift();
      let last = [...filters.CourseTitle].pop();
      let fitrstIndex = filters.CourseTitle.indexOf(first);
      let lastIndex = filters.CourseTitle.indexOf(last);

      if (fitrstIndex === lastIndex) {
        filteredIndictmentList.push({
          propertyName: "CourseId",
          operator: 1,
          value: filters?.CourseTitle[0],
        });
      }

      if (filters.CourseTitle.length > 1) {
        for (let i = 0; i < filters.CourseTitle.length; i++) {
          //اولی
          if (i === fitrstIndex) {
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
          if (i === filters.CourseTitle.length - 1) {
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
    if (filters.StateTitle !== null) {
      let first = [...filters.StateTitle].shift();
      let last = [...filters.StateTitle].pop();
      let fitrstIndex = filters.StateTitle.indexOf(first);
      let lastIndex = filters.StateTitle.indexOf(last);

      if (fitrstIndex === lastIndex) {
        filteredIndictmentList.push({
          propertyName: "StateId",
          operator: 1,
          value: filters?.StateTitle[0],
        });
      }

      if (filters.StateTitle.length > 1) {
        for (let i = 0; i < filters.StateTitle.length; i++) {
          //اولی
          if (i === fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i === filters.StateTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.StateTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: filters?.StateTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    if (filters["FullName"] != null) {
      let first = [...filters["FullName"]].shift();
      let last = [...filters["FullName"]].pop();
      let fitrstIndex = filters["FullName"].indexOf(first);
      let lastIndex = filters["FullName"].indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "UserId",
          operator: 1,
          value: filters["FullName"][0],
        });
      }

      if (filters["FullName"].length > 1) {
        for (let i = 0; i < filters["FullName"].length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "UserId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters["FullName"].length - 1) {
            filteredIndictmentList.push({
              propertyName: "UserId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters["FullName"].length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "UserId",
              operator: 1,
              value: filters["FullName"][i],
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

  const hide = () => {
    setVisible(false);
  };

  let smsBatch = {
    sbject: subject,
    body: body,
    applicantIds: applicantIds,
  };

  const smsBatchSendHanler = () => {
    if(smsBatch.applicantIds.length===0) return toast.warning("لطفا مخاطبین را انتخاب کنید")
    if(subject==="") return toast.warning("لطفا عنوان پیام را مشخص کنید")
    if(body==="") return toast.warning("لطفا پیام خود را بنویسید")
    dispatch(
      smsBatchsendReportAction(
        smsBatch,
        () => hide(),
        () => setSubject(""),
        () => setBody("")
      )
    );
  };

  //********************************************************EXPAND CODES END***********************************************
  const content = (
    <div>
      <TextArea
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        autoSize
        placeholder="عنوان پیام"
      />
      <TextArea
        placeholder="متن پیام خود را اینجا بنویسید"
        autoSize
        style={{ marginTop: "20px" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        //allowClear
      />
      <div className="rightButton">
        <Button
          type="primary"
          onClick={smsBatchSendHanler}
          loading={loadingSmsBatchSendReport}
        >
          ارسال
        </Button>
      </div>
    </div>
  );

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  return (
    <>
      <div className="removeFilters">
        <Button onClick={resetFiltersHandler}>پاکسازی همه فیلتر ها</Button>
      
        <Popover
          content={content}
          title="ارسال پیامک گروهی"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button
            type="dashed"
            icon={<CommentOutlined style={{fontSize:"20px",color:"#7987A1"}} />}
            className="centerIconButton"
          >
            ارسال پیامک گروهی
          </Button>
        </Popover>
        <Tooltip title="خروجی اکسل">
          <Button
            type="dashed"
            onClick={exelHandler}
            loading={loadingExcel}
            icon={<Xls className="excel" />}
            className="centerIconButton iconCenter"
          ></Button>
        </Tooltip>
      </div>

      <Table
      key={tableKey}
        dataSource={data}
        columns={columns}
        loading={tableDataLoading || loading}
        showSorterTooltip={{ title: "ترتیب افزایشی / کاهشی" }}
        onChange={handleTableChange} 
        rowKey={(record:any) => record?.ApplicantId} 
        // scroll={{x:1100}}
        expandable={{
          expandedRowKeys:expandedIds,
          expandedRowRender: (rec: any) => ( 
            <LegalSubTable
              expandedTableData={expandedTableData[applicantIdToExpand]}
              applicantIdToExpand={applicantIdToExpand}
              expandedTableDataLoading={expandedTableDataLoading}
            />
          ),
        }}
        onExpand={(expanded: any, record: any) =>
          callRecordToExpand(expanded, record?.ApplicantId)
        }
        locale={{
          filterReset: (
            <span
            ref={removeFilter}
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
          emptyText: "ارزیاب یافت نشد.",
        }}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          total: cartableReportAllnfo?.data?.TotalCount,
          onChange: (current: number, pageSize: any) => {
            setPageSize(pageSize);
            setPageIndex(current);
          },
          locale: { items_per_page: "/ صفحه" },
          // onShowSizeChange: (current: any, pageSize: any) =>
          //   setPageSize(pageSize),
          // pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
        }}
        footer={() => ` تعداد کل:${cartableReportAllnfo?.data?.TotalCount}`}
      />
      <Modal
        title={`پرونده  ${recordReport.FirstName} ${recordReport.FamilyName}`}
        visible={visibleModal}
        onCancel={() => {
          setVisibleModal(false);
        }}
        footer={null}
        width={1000}
        destroyOnClose={true}
      >
        <AdjusterInfoDetail
          oneAdjusterList={recordReport}
          closeFileDetail={() => setVisibleModal(false)}
          isFromReportTable={true}
          adjType={adjType}
        />
      </Modal>
      <Modal
        title="ارجاع پرونده"
        visible={visibleReferModal}
        onCancel={() => {
          setVisibleReferModal(false);
        }}
        footer={null}
        width={500}
        destroyOnClose={true}
      >
        <Refer
          adjusterTypeId={adjusterType.legal}
          applicantId={applicantId}
          cartableReport={modelReport}
          adjType={adjType}
          closeModal={() => {
            setVisibleReferModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Legal;
