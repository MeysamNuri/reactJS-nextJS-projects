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
import CreateContractEvaluation from "./CreateContractEvaluation";
import DetailContractEvaluation from './DetailContractEvaluation';
import {
  fetchAllAdjustmentField,
  fetchContactEvaluation,
  fetchContactEvaluationId,
  getBaseInfo,
} from "../../../../redux/actions";
import { IViewContractEvaluation } from "../../../../shared/ulitities/Model/desktop/contractEvaluation";
import { ReactComponent as Edit } from "../../../../assets/images/edit.svg";
import { ReactComponent as ArrowLeft } from "../../../../assets/images/arrowLeft.svg";

interface IContractEvaluationProps {
  isManagmentCartable?: boolean;
  applicantId?: number;
  isFromMenue?:boolean
}
const ContractEvaluation: FC<IContractEvaluationProps> = ({
  isManagmentCartable,
  applicantId,
  isFromMenue

}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false)
  const [selectedContractEvaluation, setSelectedContractEvaluation] = useState<any>()
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
  // const specializedField = useSelector(
  //   (state: any) => state?.specializedField?.specializedField
  // );
  const { baseInfo } = useSelector((state: any) => state?.baseData);
  const {
    viewContractEvaluation,
    loadingViewContractEvaluation,
    loadingContractEvaluationId,
  } = useSelector((state: any) => state.contractEvaluation);
  const [pageModel, setPageModel] = useState({
    pageSize: 15,
    pageIndex: 1,
  });

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

  let dataSource = viewContractEvaluation?.Result?.map(
    (item: IViewContractEvaluation) => {
      let findCompany = baseInfo?.Result?.Companys.find(
        (company: any) => company.Id === item.CompanyId
      );
      let obj = {
        Id: item.Id,
        key: item.Id,
        ApplicantInfoFirstName:item.ApplicantPersonalInfo?.Person.FirstName,
        ApplicantInfoLastName:item.ApplicantPersonalInfo?.Person.FamilyName,
        ApplicantInfoNationlCode:item.ApplicantPersonalInfo?.Person.NationalCode,
        ApplicantInfoCode:item.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
        ApplicantId: item.ApplicantId,
        InsurerId: item.InsurerId,
        InsurerName: item.InsurerName,
        AuthorityLevel: item.AuthorityLevel,
        CalculationRemunerationMethod: item.CalculationRemunerationMethod,
        ContractEvaluationCode: item.ContractEvaluationCode,
        ContractStartDate: moment(
          item?.ContractStartDate?.split("T")[0]
        ).format("jYYYY-jMM-jDD"),
        ContractEndDate: moment(item?.ContractEndDate?.split("T")[0]).format(
          "jYYYY-jMM-jDD"
        ),
        contractEvaluationCode: item.ContractEvaluationCode,
        ReportingMethod: item.ReportingMethod,
        ContractingParty: item.ContractingParty,
        CompanyId: findCompany?.Title,
        SystemCode:item.SystemCode,
        TerminatingCondition:item.TerminatingCondition,
        ResolutionDispute:item.ResolutionDispute
        

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

  // let adjustmentFilter = specializedField?.Result?.map(
  //   (field: any, index: number) => {
  //     return {
  //       key: index,
  //       text: field.Title,
  //       value: field.AdjustmentFieldId,
  //     };
  //   }
  // );

  let companiesFilter = baseInfo?.Result?.Companys?.map(
    ({ Id, Title }: { Id: number; Title: string }) => {
      return {
        key: Id,
        text: Title,
        value: Id,
      };
    }
  );

  let modelContractEvaluation = useMemo(() => {
    return {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: "Id",
      filters: filterList,
    };
  }, [pageModel, filterList]);

  useEffect(() => {
    dispatch(fetchContactEvaluation(modelContractEvaluation));
  }, [pageModel, filterList]);

  const editContractEvaluationHandler = (record: any) => {
    dispatch(fetchContactEvaluationId(record?.Id));
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

    //جزییات قرارداد
    const detailHandler = (record: any) => {
      setVisibleDetail(true)
      setSelectedContractEvaluation(record);
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
            dataIndex === "InsurerName"?
            "نام بیمه گذار":
            dataIndex === "ApplicantInfoFirstName"?
            "نام ارزیاب":
            dataIndex === "ApplicantInfoLastName"?
            "نام خانوادگی ارزیاب":
            dataIndex === "ApplicantInfoNationlCode"?
            "کدملی ارزیاب":
            dataIndex === "ApplicantInfoCode"?
            "کد ارزیاب":
            dataIndex === "insurerName"
              ? "نام/ عنوان بیمه گذار"
              : dataIndex === "insurerId"
              ? "شماره/شناسه ملی بیمه گذار"
              : dataIndex === "contractEvaluationCode"
              ? "شماره قرارداد ارزیابی خسارت"
              : dataIndex === "calculationRemunerationMethod"
              ? "روش محاسبه حق الزحمه"
              : dataIndex === "reportingMethod"
              ? "نحوه ارائه و ارسال گزارش"
              : dataIndex === "authorityLevel"
              ? "حدود اختیارات ارزیاب"
              : dataIndex === "contractingParty"
              ? "طرف قرارداد"
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
    //   {

    //   render: (value:any, item:any, index:any) => pageModel.pageIndex === 1 ? (index + 1) : ((pageModel.pageIndex - 1) * pageModel.pageSize) + (index + 1)
    // },
    {
      width: "3%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="detailColum" onClick={() => detailHandler(record)}>
            <ArrowLeft />
          </div>
        </Space>
      ),
    },
    {
      title: !isManagmentCartable && !isFromMenue&&"عملیات",
      width: "10%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            {!isManagmentCartable &&!isFromMenue&& (
              <Tooltip title="ویرایش" placement="topLeft">
                <Button
                  onClick={() => editContractEvaluationHandler(record)}
                  className="action"
                  type="text"
                  loading={loadingContractEvaluationId === record.Id}
                  icon={<Edit />}
                ></Button>
              </Tooltip>
            )}
          </div>
        </Space>
      ),
    },

  !isManagmentCartable?
    {
      title: "نام ارزیاب",
      dataIndex: "ApplicantInfoFirstName",
      key: "ApplicantInfoFirstName",
      ellipsis: true,
      width: "16%",
      ...getColumnSearchProps("ApplicantInfoFirstName"),
    }:{},
    !isManagmentCartable?
    {
      title: "نام خانوادگی ارزیاب",
      dataIndex: "ApplicantInfoLastName",
      key: "ApplicantInfoLastName",
      ellipsis: true,
      width: "25%",
      ...getColumnSearchProps("ApplicantInfoLastName"),
      
    }:{},

    !isManagmentCartable?
    {
      title: "کدملی ارزیاب",
      dataIndex: "ApplicantInfoNationlCode",
      key: "ApplicantInfoNationlCode",
      ellipsis: true,
      width: "18%",
      ...getColumnSearchProps("ApplicantInfoNationlCode"),
    }:{},
    !isManagmentCartable?
    { 
      title: "کد ارزیابی",
      dataIndex: "ApplicantInfoCode",
      key: "ApplicantInfoCode",
      ellipsis: true,
      width: "16%",
      ...getColumnSearchProps("ApplicantInfoCode"),
    }:{},
    {
      title: "نام/ عنوان بیمه گذار",
      dataIndex: "InsurerName",
      key: "InsurerName",
      ellipsis: true,
      width: "25%",
      ...getColumnSearchProps("InsurerName"),
    },
    // {
    //   title: "شماره/شناسه ملی بیمه گذار",
    //   dataIndex: "insurerId",
    //   key: "insurerId",
    //   ellipsis: true,
    //   width: "10%",
    //   ...getColumnSearchProps("insurerId"),
    // },
    {
      title: "نام شرکت",
      dataIndex: "CompanyId",
      key: "CompanyId",
      ellipsis: true,
      width: "15%",
      filters: companiesFilter,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "تاریخ شروع قرارداد",
      dataIndex: "ContractStartDate",
      key: "ContractStartDate",
      ellipsis: true,
      width: "20%",
    },
  
    {
      title: "تاریخ پایان قرارداد",
      dataIndex: "ContractEndDate",
      key: "ContractEndDate",
      ellipsis: true,
      width: "20%",
    },
    {
      title: "شماره قرارداد",
      dataIndex: "ContractEvaluationCode", 
      key: "ContractEvaluationCode",
      width: "18%",
      ellipsis: true,
      ...getColumnSearchProps("contractEvaluationCode"),
    },

  /*   {
      title: "روش محاسبه حق الزحمه",
      dataIndex: "calculationRemunerationMethod",
      key: "calculationRemunerationMethod",
      ellipsis: true,
      ...getColumnSearchProps("calculationRemunerationMethod"),
    }, */
    /* {
      title: "نحوه ارائه و ارسال گزارش",
      dataIndex: "reportingMethod",
      key: "reportingMethod",
      ellipsis: true,
      ...getColumnSearchProps("reportingMethod"),
    }, */
   /*  {
      title: "حدود اختیارات ارزیاب",
      dataIndex: "authorityLevel",
      key: "authorityLevel",
      ellipsis: true,
      ...getColumnSearchProps("authorityLevel"),
    }, */
    {
      title: "طرف قرارداد",
      width: "18%",
      dataIndex: "ContractingParty",
      key: "ContractingParty",
      ellipsis: true,
      ...getColumnSearchProps("contractingParty"),
    },
    // {
    //   title: "توضیحات",
    //   dataIndex: "Description",
    //   key: "Description",
    //   ellipsis: true,
    // },


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
 

    if (filters.insurerName != null) {
      filteredIndictmentList.push({
        propertyName: "InsurerName",
        operator: 1,
        value: filters?.insurerName[0],
      });
    }
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
    if (filters.insurerId != null) {
      filteredIndictmentList.push({
        propertyName: "InsurerId",
        operator: 1,
        value: filters?.insurerId[0],
      });
    }
    if (filters.contractEvaluationCode != null) {
      filteredIndictmentList.push({
        propertyName: "ContractEvaluationCode",
        operator: 1,
        value: filters?.contractEvaluationCode[0],
      });
    }
    if (filters.calculationRemunerationMethod != null) {
      filteredIndictmentList.push({
        propertyName: "CalculationRemunerationMethod",
        operator: 1,
        value: filters?.calculationRemunerationMethod[0],
      });
    }
    if (filters.reportingMethod != null) {
      filteredIndictmentList.push({
        propertyName: "ReportingMethod",
        operator: 1,
        value: filters?.reportingMethod[0],
      });
    }

    if (filters.authorityLevel != null) {
      filteredIndictmentList.push({
        propertyName: "AuthorityLevel",
        operator: 1,
        value: filters?.authorityLevel[0],
      });
    }

    if (filters.contractingParty != null) {
      filteredIndictmentList.push({
        propertyName: "ContractingParty",
        operator: 1,
        value: filters?.contractingParty[0],
      });
    }

    if (filters.CompanyId != null) {
      let first = [...filters.CompanyId].shift();
      let last = [...filters.CompanyId].pop();
      let fitrstIndex = filters.CompanyId.indexOf(first);
      let lastIndex = filters.CompanyId.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "CompanyId",
          operator: 1,
          value: filters?.CompanyId[0],
        });
      }

      if (filters.CompanyId.length > 1) {
        for (let i = 0; i < filters.CompanyId.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CompanyId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.CompanyId.length - 1) {
            filteredIndictmentList.push({
              propertyName: "CompanyId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.CompanyId.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CompanyId",
              operator: 1,
              value: filters?.CompanyId[i],
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
            ثبت قرارداد ماهیانه ارزیاب خسارت
          </Button>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loadingViewContractEvaluation}
        onChange={handleTableChange}
        pagination={{
          pageSize: pageModel.pageSize,
          total: viewContractEvaluation?.TotalCount,
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
          emptyText: "قراردادی وجود ندارد.",
        }}
      />
      <ConfigProvider direction="rtl">
        <Modal
          title={edit ? "ویرایش ثبت قرارداد" : "ایجاد ثبت قرارداد"}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          width={1000}
          centered
          destroyOnClose={true}
        >
          {visible && (
            <CreateContractEvaluation
              closeModal={() => setVisible(false)}
              modelcontractEvaluation={modelContractEvaluation}
              edit={edit}
            />
          )}
        </Modal>
        <Modal
          title={"جزئیات قرارداد"}
          visible={visibleDetail}
          footer={null}
          onCancel={() => setVisibleDetail(false)}
          width={1000}
          centered
          destroyOnClose={true}
        >
          {visibleDetail && (
            <DetailContractEvaluation
            selectedContractEvaluation={selectedContractEvaluation}
              
            />
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default ContractEvaluation;
