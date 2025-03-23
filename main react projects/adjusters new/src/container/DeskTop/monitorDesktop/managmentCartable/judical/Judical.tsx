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
import moment from "jalali-moment";
import { FindAccess } from "sanhab-components-library";
import DatePicker2 from "../../../../../components/UI/DatePicker/DatePicker";
import {
  downloadChargonLetter,
  downloadAdjusterLicence,
  sendDesktopUser,
  getAllFieldInfoNatural,
  fetchNaturalJudicalExistingEvaluator,
  fetchAllStatuses,
  downloadExtendChargonLetter,
  selectDocuments,
  changePasswordAPI,
  fetchNaturalCompanyInfo,
  getDocumentInfoHandler,
  fetchApplicantForbiddneInfo
} from "../../../../../redux/actions";
import { adjusterType } from "../../../../../shared/ulitities/Enums/adjusterTypeId";
import { ApplicantStatus } from "../../../../../shared/ulitities/Enums/desktop";
import EditCompanyInfo from '../../../../AdmissionList/Natural/InformationAdjuster/EditCompanyInfo'
import Highlighter from "react-highlight-words";
import { SearchOutlined, FilterFilled, LockOutlined } from "@ant-design/icons";
import Status from "../more/Status";
import Message from "../../../../Message/CreateMessage";
import CreateSms from "../../../sms/CreateSms";
import Detail from "../detail/Detail";
import ExtendLicense from '../extendLicense'
import WarningForm from '../warningForm'
import ForbiddenResult from '../../../applicantForbidden/forbiddenResult'
import { IReport } from "../../../../../shared/ulitities/Model/report";
import { userAccessList } from "../../../../../shared/ulitities/Enums/userAccessList";
import { filterAdvanceOperator } from "../../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as Sms } from "../../../../../assets/images/message.svg";
import { ReactComponent as Envelope } from "../../../../../assets/images/envelope.svg";
import { ReactComponent as Certificate } from "../../../../../assets/images/certificate2.svg";
import { ReactComponent as More } from "../../../../../assets/images/more.svg";
import { ReactComponent as Random } from "../../../../../assets/images/random.svg";
import { ReactComponent as Pssword } from "../../../../../assets/images/check.svg";
// import { ReactComponent as EnvelopeSend } from "../../../../../assets/images/envelope-send.svg";
import { ReactComponent as Relicensed } from "../../../../../assets/images/reLicensed.svg";
import { ReactComponent as Email2 } from "../../../../../assets/images/email2.svg";
import { ReactComponent as ArrowLeft } from "../../../../../assets/images/arrowLeft.svg";
import { ReactComponent as Danger } from "../../../../../assets/images/warnings.svg";
import { ReactComponent as Edit } from "../../../../../assets/images/edit.svg";
import { ReactComponent as Pdf } from "../../../../../assets/images/pdf.svg";
interface INaturalProps {
  activeTab: string;
  handleChildData: any;
  handleChildSelectData: any;
  clearFilter: number,
  isFromApplicantForbidden?: boolean
}

const Judical: FC<INaturalProps> = ({
  activeTab,
  handleChildData,
  handleChildSelectData,
  clearFilter,
  isFromApplicantForbidden
}) => {
  const dispatch = useDispatch();
  const [callServise, setCallService] = useState(false)
  const [visible, setVisible] = useState(false);
  const [visibleApplicantForbidden, setVisibleApplicantForbidden] = useState(false);
  const [editCompanyInfoVisible, setEditComapnyInfoVisible] = useState(false);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleWarning, setVisibleWarning] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [visibleExtendLicense, setVisibleExtendLicense] = useState(false);
  const [visibleSms, setVisibleSms] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterList, setFilterList] = useState<any>([]);
  const [selectedCityList, setSelectedCityList] = useState<any>()
  const [cityFilters, setCityFilters] = useState<any>([])
  const [CityList, setCityList] = useState<any>([])
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const removeFilterRef = useRef<any>(null)
  const [cartableReport, setCartableReport] = useState({} as any);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const { baseInfo } = useSelector((state: any) => state?.baseData);
  const [dataIndex, setDataIndex] = useState("");
  const [fromEfectiveDate, setFromEfectiveDate] = useState<any>(null);
  const [toEfectiveDate, setToEfectiveDate] = useState<any>(null);
  const [customOrder, setCustomOrder] = useState<any>(null);
  const [data, setData] = useState<any>(null)
  const [filterState, setFilterState] = useState<number>(7)
  const [tableKey, setTableKey] = useState(0);

  const [
    selectedItemManamentCartable,
    setSelectedItemManamentCartable,
  ] = useState({} as any);
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
  });

  let {
    reportNaturalJudicalEvalutor,
    loadingReportNaturalJudicalEvalutor,
    applicantForbiddenInfo,
    applicantForbiddenLoading
  } = useSelector((state: any) => state.cartableReportAllInfo);
  let { selectedDocumentList } = useSelector((state: any) => state.selectedDocumentList)

  let { loadingUserDesktop } = useSelector((state: any) => state.userDesktop);
  let { specializedField } = useSelector(
    (state: any) => state.specializedField
  );
  const { loadingExtendChargonLetter, loadingChargonLetter } = useSelector(
    (state: any) => state.chargonLetter
  );
  const { loadingAdjusterLicense } = useSelector(
    (state: any) => state.licenseAdjuster
  );
  const { loadingFetchBaseInfo, changePasswordLoading } = useSelector(
    (state: any) => state.companyBaseInfo
  );
  let { statusList } = useSelector((state: any) => state.allChangeStatusReason);
  const { loadingExcel } = useSelector(
    (state: any) => state.excelCartable
  );
  let provinceFilters = baseInfo?.Result?.Provinces?.map((province: any) => {
    let provinceObj = {
      key: province.Id,
      text: province.Title,
      value: province.Id,
    };
    return provinceObj;
  });
  const createcityList = (array1: any, array2: any) => {
    const result = array1?.filter((cert: any) => {
      let arr: any = array2?.filter((detail: any) => detail === cert.Id)
      return !(arr?.length === 0)
    });
    setSelectedCityList(result)

  }
  useEffect(() => {
    createcityList(baseInfo?.Result?.Provinces, cityFilters)
  }, [baseInfo, cityFilters])


  useEffect(() => {
    let newlist: any[] = selectedCityList?.map((item: any) => {
      return item?.Cities?.map((city: any) => {
        let obj = {
          key: city.Id,
          text: city.Title,
          value: city.Id,
        }
        return obj
      })

    })
    const output = newlist?.flat();

    setCityList(output)


  }, [selectedCityList])
  let specialized = specializedField?.Result?.map((field: any) => {
    let fieldName = {
      key: field.Id,
      text: field.Title,
      value: field.Id,
    };
    return fieldName;
  });

  let applicantStatusList = statusList?.Result?.map((status: any) => {
    let stausName = {
      key: status.Value,
      text: status.Description,
      value: status.Value,
    };
    return stausName;
  });


  useEffect(() => {
    dispatch(getAllFieldInfoNatural());
    dispatch(fetchAllStatuses());
  }, []);

  useEffect(() => {
    handleChildData(filterList);
  }, [filterList]);

  useEffect(() => {
    if (isFromApplicantForbidden) {
      let data = applicantForbiddenInfo?.Result?.map(
        (report: IReport) => {
          let obj = {
            Id: report.ApplicantId,
            key: report.ApplicantId,
            AdjusterCodeId: report.AdjusterCode,
            ApplicantId: report.ApplicantId,
            ForbiddenFiles: report.ForbiddenFiles,
            licenseExpireDate: report?.ExpirationDate,
            FirstName: report.FirstName,
            FamilyName: report.FamilyName,
            NationalCode: report.NationalCode,
            Mobile: report.Mobile,
            ProvinceTitle: report.ProvinceTitle,
            CityTitle: report.CityTitle,
            HasExtendedChargoonLetter: report.HasExtendedChargoonLetter,
            AdjusterCode: report.ExpireLicenseFlag ? <Tooltip title="اعتبار پروانه رو به اتمام است "><div className="cartable-management-expireLicenseFlag" >{report.AdjusterCode}</div></Tooltip> : report.FarwellFlag ? <Tooltip title="تاریخ تودیع رو به اتمام است"> <div className="cartable-management-farwelFlag" >{report.AdjusterCode}</div> </Tooltip> : report.RedundanceFlag ? <Tooltip title="تاریخ تعلیق رو به اتمام است"><div className="cartable-management-redundanceFlag" >{report.AdjusterCode}</div></Tooltip> : report.AdjusterCode,
            AdjustmentFieldTitle: report.AdjustmentFieldTitle,
            StatusTitle: report.StatusTitle,
            StatusId: report.StatusId,
            CompanyName: report?.CompanyName ?? "-",
            UserName: report?.UserName,
            ExpirationDate: moment(report?.ExpirationDate?.split("T")[0]).format(
              "jYYYY-jMM-jDD"
            ),
            LiceseCreationDate: moment(
              report?.LiceseCreationDate?.split("T")[0]
            ).format("jYYYY-jMM-jDD"),

            EffectiveDate:
              report?.EffectiveDate == null
                ? "--"
                : moment(report?.EffectiveDate?.split("T")[0]).format(
                  "jYYYY-jMM-jDD"
                ),
          };
          return obj;
        }

      );
      setData(data)
    } else {
      let data = reportNaturalJudicalEvalutor?.data?.Result?.map(
        (report: IReport) => {
          let obj = {
            Id: report.ApplicantId,
            key: report.ApplicantId,
            AdjusterCodeId: report.AdjusterCode,
            ApplicantId: report.ApplicantId,
            licenseExpireDate: report?.ExpirationDate,
            FirstName: report.FirstName,
            FamilyName: report.FamilyName,
            NationalCode: report.NationalCode,
            Mobile: report.Mobile,
            ProvinceTitle: report.ProvinceTitle,
            CityTitle: report.CityTitle,
            HasExtendedChargoonLetter: report.HasExtendedChargoonLetter,
            AdjusterCode: report.ExpireLicenseFlag ? <Tooltip title="اعتبار پروانه رو به اتمام است "><div className="cartable-management-expireLicenseFlag" >{report.AdjusterCode}</div></Tooltip> : report.FarwellFlag ? <Tooltip title="تاریخ تودیع رو به اتمام است"> <div className="cartable-management-farwelFlag" >{report.AdjusterCode}</div> </Tooltip> : report.RedundanceFlag ? <Tooltip title="تاریخ تعلیق رو به اتمام است"><div className="cartable-management-redundanceFlag" >{report.AdjusterCode}</div></Tooltip> : report.AdjusterCode,
            AdjustmentFieldTitle: report.AdjustmentFieldTitle,
            StatusTitle: report.StatusTitle,
            StatusId: report.StatusId,
            CompanyName: report?.CompanyName ?? "-",
            UserName: report?.UserName,
            ExpirationDate: moment(report?.ExpirationDate?.split("T")[0]).format(
              "jYYYY-jMM-jDD"
            ),
            LiceseCreationDate: moment(
              report?.LiceseCreationDate?.split("T")[0]
            ).format("jYYYY-jMM-jDD"),

            EffectiveDate:
              report?.EffectiveDate == null
                ? "--"
                : moment(report?.EffectiveDate?.split("T")[0]).format(
                  "jYYYY-jMM-jDD"
                ),
          };
          return obj;
        }

      );
      setData(data)
    }
  }, [applicantForbiddenInfo, reportNaturalJudicalEvalutor, isFromApplicantForbidden])

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setDataIndex(dataIndex);
    if ((dataIndex = "EffectiveDate")) {
      filterList.push({
        propertyName: "EffectiveDate",
        operator: filterAdvanceOperator.GreaterOrEqual,
        value: moment(fromEfectiveDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
      });
      filterList.push({
        propertyName: "EffectiveDate",
        operator: filterAdvanceOperator.LessOrEqual,
        value: moment(toEfectiveDate?.toDate()).format("YYYY-MM-DD") + "T23:59:00",
      });
    }
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  //از تاریخ موثر
  const handleDateEffectiveDate = (value: any) => {
    setFromEfectiveDate(value);
  };

  //تا تاریخ موثر
  const handleEndDateEffectiveDate = (value: any) => {
    setToEfectiveDate(value);
  };

  useEffect(() => {
    removeFilterRef?.current?.click()
    setTableKey(tableKey => tableKey + 1);
    setPageModel({
      ...pageModel,
      pageIndex: 1
    })
    setFilterList([]);
    setSearchText("");
    if (dataIndex === "EffectiveDate") {
      setFilterList([]);
      setFromEfectiveDate(null);
      setToEfectiveDate(null);
    }
  }, [clearFilter])
  const handleReset = (clearFilters: any) => {
    clearFilters();
    if (dataIndex === "EffectiveDate") {
      setFilterList([]);
      setFromEfectiveDate(null);
      setToEfectiveDate(null);
    }
    setSearchText("");
    setFilterState(7)
    setDataIndex("")
  };


  const radioCahnge = (e: any, clearFilters: any) => {

    setFilterState(e.target.value)
    setSearchText("");
    setDataIndex("")
    setFromEfectiveDate(null);
    setToEfectiveDate(null);
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
        {dataIndex === "EffectiveDate" ? (
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <DatePicker2
              placeholder="از تاریخ"
              value={fromEfectiveDate}
              onChange={(value: any) => handleDateEffectiveDate(value)}
            />
            <DatePicker2
              placeholder="تا تاریخ"
              value={toEfectiveDate}
              onChange={(value: any) => handleEndDateEffectiveDate(value)}
            />
          </div>
        ) :
          dataIndex === "FirstName" ||
            dataIndex === "FamilyName" ||
            dataIndex === "AdjusterCode" ||
            dataIndex === "Mobile"
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
            :
            (
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

  const changeStatusHandler = () => {
    setVisibleStatus(true);
  };

  //مدال پیام
  const sendMessageHandler = () => {
    setVisibleMessage(true);
  };

  //ایجاد مدال پیامک
  const sendSmsHandler = () => {
    setVisibleSms(true);
  };

  //دانلود نامه چارگون
  const dlLetterChargoonHandler = () => {
    dispatch(downloadChargonLetter(selectedItemManamentCartable.ApplicantId));
  };
  //مدال ویرایش اطلاعات شخص
  const editCompnayInfoHandler = () => {
    dispatch(fetchNaturalCompanyInfo(selectedItemManamentCartable?.ApplicantId, () => setEditComapnyInfoVisible(true)))

  };
  //بازنشانی رمز ورود
  const changePassword = () => {
    dispatch(changePasswordAPI(selectedItemManamentCartable?.ApplicantId))

  };
  //دانلود پروانه ارزیاب
  const dlLicenenceAdjusterHandler = () => {
    dispatch(downloadAdjusterLicence(selectedItemManamentCartable.ApplicantId));
  };
  //ثبت اخطار مدال
  const createApplicantWarningHandler = () => {
    setVisibleWarning(true)
  };
  //دانلود تمدید نامه
  const downloadExtendChargonLetterHandler = () => {
    dispatch(
      downloadExtendChargonLetter(selectedItemManamentCartable.ApplicantId)
    );
  };

  //تمدید اعتبار پروانه
  const extendLicenseHandler = () => {
    setVisibleExtendLicense(true)
  };
  //ایجاد میز کار ارزیاب
  const createAdjusterDesktopHandler = () => {
    let desktopUser = {
      applicantId: selectedItemManamentCartable.ApplicantId,
      encId: null,
    };
    dispatch(sendDesktopUser(desktopUser));
  };
  //اطلاعات پرونده
  const documentInfoHandler = () => {
    dispatch(getDocumentInfoHandler(selectedItemManamentCartable.ApplicantId))
  }
  //جزئیات شاخص
  const applicantForbiddenHandler = () => {
    setVisibleApplicantForbidden(true)
  }
  const content = (
    <div>
      {selectedItemManamentCartable.UserName === null &&
        FindAccess(userAccessList.Adjusters_ActiveApplicantDesktop) && (
          <p>
            <Button
              type="text"
              onClick={createAdjusterDesktopHandler}
              className="centerIconButton"
              loading={loadingUserDesktop}
            // icon={<Envelope />}
            >
              ایجاد میزکار ارزیاب
            </Button>
          </p>
        )}
      {FindAccess(userAccessList.Adjusters_SendMessage) && (
        <p>
          <Button
            type="text"
            onClick={sendMessageHandler}
            className="centerIconButton"
            icon={<Envelope />}
          >
            ارسال پیام
          </Button>
        </p>
      )}
      {FindAccess(userAccessList.Adjusters_SendSms) && (
        <p>
          <Button
            type="text"
            className="centerIconButton"
            icon={<Sms />}
            onClick={sendSmsHandler}
          >
            ارسال پیامک
          </Button>
        </p>
      )}
      {
        //selectedItemManamentCartable.StatusId !== ApplicantStatus.Cancellation &&
        FindAccess(userAccessList.Adjusters_ChangeApplicantStatus) && (
          <p>
            <Button
              type="text"
              onClick={changeStatusHandler}
              className="centerIconButton"
              icon={<Random />}
            >
              تغییر وضعیت
            </Button>
          </p>
        )}
      {/* {FindAccess(userAccessList.Adjusters_ViewApplicantStatusHistory) && (
        <p>
          <Button
            type="text"
            onClick={historychangeStatusHandler}
            className="centerIconButton"
            icon={<Random />}
          >
            تاریخچه تغییر وضعیت
          </Button>
        </p>
      )} */}

      {/* <p>
        <Button
          type="text"
          className="centerIconButton"
          icon={<EnvelopeSend />}
        >
          ارسال مجدد رمز عبور
        </Button>
      </p> */}
      {FindAccess(userAccessList.Adjusters_ViewLicense) && (
        <p>
          <Button
            type="text"
            onClick={dlLicenenceAdjusterHandler}
            className="centerIconButton  certificate "
            loading={
              selectedItemManamentCartable.ApplicantId ===
              loadingAdjusterLicense
            }
            icon={
              <Certificate
              //style={{ width: "20px !important", height: "20px important" }}
              />
            }
          >
            پروانه ارزیاب
          </Button>
        </p>
      )}
      {FindAccess(userAccessList.Adjusters_ViewChargoonLetter) && (
        <p>
          <Button
            type="text"
            onClick={dlLetterChargoonHandler}
            icon={<Email2 />}
            className="centerIconButton"
            loading={
              selectedItemManamentCartable.ApplicantId === loadingChargonLetter
            }
          >
            نامه چارگون
          </Button>
        </p>
      )}
      {
        FindAccess(userAccessList.Adjusters_ExtensionLicense) &&
          selectedItemManamentCartable.HasExtendedChargoonLetter == true ? (
            <p>
              <Button
                type="text"
                icon={<Relicensed />}
                onClick={downloadExtendChargonLetterHandler}
                loading={
                  selectedItemManamentCartable.ApplicantId ===
                  loadingExtendChargonLetter
                }
              >
                نامه تمدید
          </Button>
            </p>
          )


          : null}
      {
        FindAccess(userAccessList.Adjusters_ViewLicense) &&
        <p>
          <Button
            type="text"
            icon={<Danger style={{ width: "20px" }} />}
            onClick={createApplicantWarningHandler}
            className="centerIconButton"

          >
            اخطار
             </Button>
        </p>
      }

      {
        FindAccess(userAccessList.Adjusters_ViewLicense) && (
          <p>
            <Button
              type="text"
              icon={<Edit style={{ width: "20px" }} />}
              onClick={editCompnayInfoHandler}
              className="centerIconButton"
              loading={loadingFetchBaseInfo}

            >
              ویرایش اطلاعات شخص
            </Button>
          </p>
        )
      }
      {
        FindAccess(userAccessList.Adjusters_ViewLicense) && (
          <p>
            <Button
              type="text"
              icon={<LockOutlined style={{ width: "20px", fontSize: "18px", marginRight: "-4px", color: "#676767" }} />}
              onClick={changePassword}
              className="centerIconButton"
              loading={changePasswordLoading}

            >
              بازنشانی رمز ورود
            </Button>
          </p>
        )
      }
      {
        FindAccess(userAccessList.Adjusters_ViewLicense) &&
        <p>
          <Button
            type="text"
            icon={<Relicensed />}
            onClick={extendLicenseHandler}
            className="centerIconButton"

          >
            تمدید اعتبار پروانه
          </Button>
        </p>
      }
      {
        FindAccess(userAccessList.Adjusters_ViewLicense) &&
        <p>
          <Button
            type="text"
            icon={<Pdf />}
            onClick={documentInfoHandler}
            className="centerIconButton"
            loading={loadingExcel}

          >
            اطلاعات پرونده
          </Button>
        </p>
      }
      {
        isFromApplicantForbidden &&
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
      orderBy: customOrder,
      filters: filterList,
    };

    if (!callServise) {
      return setCallService(true);
    } else
      if (activeTab === "3") {
        dispatch(
          fetchNaturalJudicalExistingEvaluator(
            cartableReport,
            adjusterType.judical
          )
        );
        setCartableReport(cartableReport);
      }
  }, [pageModel, activeTab, searchText, filterList, dataIndex, customOrder]);

  const moreHandler = (record: any) => {
    setSelectedItemManamentCartable(record);
  };

  //coloumns Table
  let columns: any = [
    {
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="detailColum2" onClick={() => detailHandler(record)}>
            <ArrowLeft />
          </div>
        </Space>
      ),
    },
    {
      title: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Popover
            content={content}
            title=""
            placement="bottom"
          // trigger="click"

          >
            <div onMouseEnter={() => moreHandler(record)}>
              <More className="pointer" />
            </div>
          </Popover>
        </Space>
      ),
    },
    {
      title: "وضعیت",
      dataIndex: "StatusTitle",
      key: "StatusTitle",
      filters: applicantStatusList,
      responsive: ["sm"],
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      filterSearch: true,
      ...getColumnSearchProps("FirstName"),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
      filterSearch: true,
      ...getColumnSearchProps("FamilyName"),
    },

    {
      title: `نام شرکت`,
      dataIndex: "CompanyName",
      key: "CompanyName",
      responsive: ["sm"],
    },

    {
      title: ` کد ارزیابی`,
      dataIndex: "AdjusterCode",
      key: "AdjusterCode",
      ...getColumnSearchProps("AdjusterCode"),
    },

    {
      title: "زمینه تخصصی",
      dataIndex: "AdjustmentFieldTitle",
      key: "AdjustmentFieldTitle",
      filters: specialized,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ...getColumnSearchProps("NationalCode"),
    },
    {
      title: "تاریخ اعتبار پروانه",
      dataIndex: "ExpirationDate",
      key: "ExpirationDate",
      sorter: true
    },
    {
      title: "تاریخ صدور پروانه",
      dataIndex: "LiceseCreationDate",
      key: "LiceseCreationDate",
      responsive: ["sm"],
    },


    {
      title: "تلفن همراه",
      dataIndex: "Mobile",
      key: "Mobile",
      ...getColumnSearchProps("Mobile"),
    },

    {
      title: "تاریخ موثر",
      dataIndex: "EffectiveDate",
      key: "EffectiveDate",
      ...getColumnSearchProps("EffectiveDate"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filterList?.length > 0 ? "#E64848" : undefined }} />
      ),
      responsive: ["sm"],
    },
    {
      title: "استان",
      dataIndex: "ProvinceTitle",
      key: "ProvinceTitle",
      filters: provinceFilters,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "شهر",
      dataIndex: "CityTitle",
      key: "CityTitle",
      filters: CityList,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),

    },

    // {
    //   title: "نام کاربری",
    //   dataIndex: "UserName",
    //   key: "UserName",
    //   responsive: ["sm"],
    // },


  ];

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter.field == "ExpirationDate") {
      if (sorter.order == "ascend") {
        setCustomOrder("ExpirationDate");
      }
      if (sorter.order == "descend" && sorter.order !== "ascend") {
        setCustomOrder("ExpirationDate desc");
      }
    } else {
      setCustomOrder("ExpirationDate");
    }
    let filteredIndictmentList = [] as any;
    if (filters.FamilyName !== null) {
      filteredIndictmentList.push({
        propertyName: "FamilyName",
        operator: filterState,
        value: filters?.FamilyName[0],
      });
    }

    if (filters.FirstName !== null) {
      filteredIndictmentList.push({
        propertyName: "FirstName",
        operator: filterState,
        value: filters?.FirstName[0],
      });
    }

    if (filters.NationalCode !== null) {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: filters?.NationalCode[0],
      });
    }
    if (filters.AdjusterCode !== null) {
      filteredIndictmentList.push({
        propertyName: "AdjusterCode",
        operator: filterState,
        value: filters?.AdjusterCode[0],
      });
    }

    if (filters.Mobile != null) {
      filteredIndictmentList.push({
        propertyName: "Mobile",
        operator: filterState,
        value: filters?.Mobile[0],
      });
    }

    if (filters.ProvinceTitle != null) {
      let first = [...filters.ProvinceTitle].shift();
      let last = [...filters.ProvinceTitle].pop();
      let fitrstIndex = filters.ProvinceTitle.indexOf(first);
      let lastIndex = filters.ProvinceTitle.indexOf(last);
      setCityFilters(filters?.ProvinceTitle)
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

      if (fitrstIndex === lastIndex) {
        filteredIndictmentList.push({
          propertyName: "AdjustmentFieldId",
          operator: 1,
          value: filters?.AdjustmentFieldTitle[0],
        });
      }

      if (filters.AdjustmentFieldTitle.length > 1) {
        for (let i = 0; i < filters.AdjustmentFieldTitle.length; i++) {
          //اولی
          if (i === fitrstIndex) {
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
          if (i === filters.AdjustmentFieldTitle.length - 1) {
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
  }, [selectedDocumentList]);

  const rowSelection = {
    onChange: (selectedRow: React.Key[], selectedRows: any[]) => {
      const filterDataSelected = selectedDocumentList.filter((item: any) => {
        return data.find((findItem: any) => findItem.item === item.item) === undefined

      })

      selectedRows = filterDataSelected.concat(selectedRows)
      selectDocuments(dispatch, selectedRows)

    },

  };

  const checkBoxStatus = (): number[] => {

    return selectedDocumentList.map((item: any) => (
      item.key
    ))
  }
  return (
    <>
      <span>انتخاب شده ها {selectedDocumentList.length}</span>
      <Table
        key={tableKey}
        columns={columns}
        dataSource={data}
        // scroll={{ x: 1600 }}
        loading={isFromApplicantForbidden ? applicantForbiddenLoading : loadingReportNaturalJudicalEvalutor}
        onChange={handleChange}
        rowSelection={{
          selectedRowKeys: checkBoxStatus(),
          ...rowSelection,
        }}
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
          emptyText: "ارزیابی یافت نشد.",
        }}
      />
      <ConfigProvider direction="rtl">
        <Modal
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
        </Modal>
        <Modal
          title={`تغییر وضعیت ${selectedItemManamentCartable.FirstName +
            " " +
            selectedItemManamentCartable.FamilyName
            } `}
          visible={visibleStatus}
          footer={null}
          onCancel={() => setVisibleStatus(false)}
          width={500}
          centered
          destroyOnClose={true}
        // bodyStyle={{height:"600px"}}
        >
          {visibleStatus && (
            <Status
              selectedItemManamentCartable={selectedItemManamentCartable}
              adjusterType={adjusterType.judical}
              cartableReport={cartableReport}
              closeModal={() => setVisibleStatus(false)}
            />
          )}
        </Modal>
        <Modal
          title={` تمدید اعتبار پروانه ${selectedItemManamentCartable.FirstName +
            " " +
            selectedItemManamentCartable.FamilyName
            } `}
          visible={visibleExtendLicense}
          footer={null}
          onCancel={() => setVisibleExtendLicense(false)}
          width={500}
          centered
          destroyOnClose={true}
        // bodyStyle={{height:"600px"}}
        >
          {visibleExtendLicense && (
            <ExtendLicense
              selectedItemManamentCartable={selectedItemManamentCartable}
              closeModal={() => setVisibleExtendLicense(false)}
            />
          )}
        </Modal>
        <Modal
          title={`ارسال پیام به  ${selectedItemManamentCartable.FirstName +
            " " +
            selectedItemManamentCartable.FamilyName
            }`}
          visible={visibleMessage}
          footer={null}
          onCancel={() => setVisibleMessage(false)}
          width={500}
          centered
          destroyOnClose={true}
        // bodyStyle={{height:"600px"}}
        >
          {visibleMessage && (
            <Message
              applicantId={selectedItemManamentCartable.ApplicantId}
              closeModal={() => setVisibleMessage(false)}
            />
          )}
        </Modal>
        <Modal
          title={` اخطار به ${selectedItemManamentCartable.FirstName +
            " " +
            selectedItemManamentCartable.FamilyName
            } `}
          visible={visibleWarning}
          footer={null}
          onCancel={() => setVisibleWarning(false)}
          width={500}
          centered
          destroyOnClose={true}
        // bodyStyle={{height:"600px"}}
        >
          {visibleWarning && (
            <WarningForm
              selectedItemManamentCartable={selectedItemManamentCartable}
              closeModal={() => setVisibleWarning(false)}
            />
          )}
        </Modal>
        <Modal
          title={` ارسال پیامک به ${selectedItemManamentCartable.FirstName +
            " " +
            selectedItemManamentCartable.FamilyName
            } `}
          visible={visibleSms}
          footer={null}
          onCancel={() => setVisibleSms(false)}
          width={500}
          centered
          destroyOnClose={true}
        // bodyStyle={{height:"600px"}}
        >
          {visibleSms && (
            <CreateSms
              oneAdjusterList={selectedItemManamentCartable}
              closeModal={() => setVisibleSms(false)}
            />
          )}
        </Modal>
        <Modal

          title={`جزئیات ارزیاب ${selectedItemManamentCartable.FirstName +
            " " +
            selectedItemManamentCartable.FamilyName
            } با کد ارزیابی ${selectedItemManamentCartable?.AdjusterCodeId?.split("-")[1]}-${selectedItemManamentCartable?.AdjusterCodeId?.split("-")[0]}`}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          width={1200}
          centered
          destroyOnClose={true}
          bodyStyle={{
            height: "550px",
            maxHeight: "550px",
            overflowY: "scroll",
          }}
        >
          {visible && (
            <Detail
              selectedItemManagmentCartable={selectedItemManamentCartable}
              activeTab={activeTab}
            />
          )}
        </Modal>
        <Modal
          title={`ویرایش اطلاعات ${selectedItemManamentCartable?.FirstName} ${selectedItemManamentCartable?.FamilyName}`}
          visible={editCompanyInfoVisible}
          footer={null}
          onCancel={() => setEditComapnyInfoVisible(false)}
          centered
          width={700}
        >
          <EditCompanyInfo
            oneAdjusterList={selectedItemManamentCartable}
            isFromReportTable={true}

            closeModal={() => setEditComapnyInfoVisible(false)}
          />
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Judical;
