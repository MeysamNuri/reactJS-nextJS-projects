import React, { useEffect, useState, useRef } from "react";
import { usePaginatedQuery} from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { FindAccess } from "sanhab-components-library";
import {
  Table,
  Button,
  Space,
  Modal,
  Pagination,
  ConfigProvider,
  Popconfirm,
  Tooltip,
  Input,
  Alert,
} from "antd";
import { SearchOutlined, PlusOutlined, FilterFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import CreateInterviewer from "./CreateInterviewer";
import { useDeletInterviewer } from "../AdjustersHook";
import { api } from "../../../httpServices/service";
import { getBaseInfo, fetchAllAdjustmentField } from "../../../redux/actions";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { IIntervewers } from "../../../shared/ulitities/Model/interviewers";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

const Interviewers = () => { 
  const dispatch = useDispatch();
  const [removeInterviewer] = useDeletInterviewer();
  const [addForm, setAddForm] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [visible, setVisible] = useState(false);
  const [customOrder, setCustomOrder] = useState<any>(null);
  const [selectInterviewer, setSelectInterviewer] = useState(null);
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
  });
  const [searchText, setSearchText] = useState("");
  const [customSort, setCustomSort] = useState({} as any);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filterList, setFilterList] = useState<any>([]);
  const searchInput = useRef<any>(null);
  //const showPic = useSelector((state: any) => state.interviewerPicture.image);
  const { baseInfo } = useSelector((state: any) => state.baseData);
  const specializedField = useSelector(
    (state: any) => state?.specializedField?.specializedField
  );

  let adjustmentField = {
    isActive: null,
  };

  useEffect(() => {
    dispatch(fetchAllAdjustmentField(adjustmentField));
  }, []);

  let academies = baseInfo?.Result?.AcademicDegrees?.map((academy: any) => {
    let degree = {
      key: academy.Id,
      text: academy.Title,
      value: academy.Id,
    };
    return degree;
  });

  let companys = baseInfo?.Result?.Companys?.map((company: any) => {
    let companyNames = {
      key: company.Id,
      text: company.Title,
      value: company.Id,
    };
    return companyNames;
  });

  let banks = baseInfo?.Result?.Banks?.map((bank: any) => {
    let bankName = {
      key: bank.Id,
      text: bank.Title,
      value: bank.Id,
    };
    return bankName;
  });

  let specialized = specializedField?.Result?.map((field: any) => {
    let fieldName = {
      key: field.AdjustmentFieldId,
      text: field.Title,
      value: field.AdjustmentFieldId,
    };
    return fieldName;
  });

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

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

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
            dataIndex === "firstName"
              ? "نام"
              : dataIndex === "familyName"
              ? "نام خانوادگی"
              : dataIndex === "nationalCode"
              ? "کد ملی"
              : dataIndex === "degree"
              ? "مدرک تحصیلی"
              : dataIndex === "phone"
              ? "تلفن"
              : dataIndex === "sheba"
              ? "شبا"
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

  // const handleSorting = (sorter: any) => {

  //   console.log(sorter, "sorterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

  //   if (sorter.field == "familyName") {
  //     if (sorter.order == "ascend") {
  //       setCustomOrder("FamilyName");
  //     }
  //     if (sorter.order == "descend") {
  //       setCustomOrder("FamilyName desc");
  //     }
  //   } else {
  //     setCustomOrder("Id");
  //   }
  // };

  const advancedSearchModel = {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: current,
    orderBy: customOrder,
    filters: filterList,
  };

  //api Request Pagination
  const fetchInterviewer = async (key: string,advancedSearchModel:any) => {
    return await api.post(`/interviewer/all/paged`, {advancedSearchModel});
  };

  const { isLoading, resolvedData } = usePaginatedQuery(
    ["projectsInterview",advancedSearchModel],
    fetchInterviewer,
    {
      staleTime: 1000 * 2 * 60,
    }
  );

  // all Interviewer
  let interviewers = resolvedData?.data?.Result?.map(
    (interviewer: IIntervewers) => {
      let interview = {
        key: interviewer.Id,
        id: interviewer.Id,
        firstName: interviewer.FirstName,
        familyName: interviewer.FamilyName,
        nationalCode: interviewer.NationalCode,
        degree: interviewer.DegreeTitle,
        bank: interviewer.BankTitle,
        phone: interviewer.Phone,
        sheba: interviewer.Sheba,
        CompanyTitle: interviewer.CompanyTitle,
        AdjustmentFieldTitle: interviewer.AdjustmentFieldTitle,
        ProfilePic:
          interviewer.ProfilePic == null
            ? "ندارد"
            : `data:image/jpeg;base64,` + interviewer.ProfilePic,
      };
      return interview;
    }
  );

  //handle DataPage
  useEffect(() => {
    if (interviewers?.length <= 0) {
      setCurrent((oldState) => {
        if (oldState === 1) {
          return oldState;
        }
        return oldState - 1;
      });
    }
  }, [interviewers]);

  //edit Interviewer
  const editInterviewerHandler = (id: number) => {
    // setLoading(true);
    setAddForm(false);
    setVisible(true);
    api.get(`/interviewer/${id}`).then((res) => {
      dispatch({
        type: "SAVE_interviewer_IMAGE_STATE",
        payload: "data:image/jpeg;base64," + res.data.Result.ProfilePic,
      });
      setSelectInterviewer(res.data.Result);
      // setLoading(false);
    });
  };

  //remove Interviewer
  const removeInterviewerHandler = (id: number) => {
    removeInterviewer(id);
  };

  //coloumns Table
  let columns: any = [
    {
      title: "نمایش عکس",
      dataIndex: "Description",
      key: "Description",
      render: (value: string, record: any, index: any) => {
        return (
          <>
            {record.ProfilePic == "ندارد" ? (
              "ارسال نگردیده است"
            ) : (
              <img
                src={record.ProfilePic}
                width="50px"
                style={{ borderRadius: "5px" }}
                alt="profile"
              />
            )}
            {/* <Image
          preview={{ visible: false }}
          width={100}
          src={ record.ProfilePic}
          onClick={() => setVisible(true)}
        />
        <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={ record.ProfilePic} />
          <Image src={ record.ProfilePic} />
          <Image src={ record.ProfilePic} />
        </Image.PreviewGroup>
      </div> */}
          </>
        );
      },
    },

    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      sorter: false,
      // sorter: (a: any, b: any) => a.firstName?.length - b.firstName?.length,
      // sortDirections: ["descend", "ascend"],
      // ellipsis: true,
      ...getColumnSearchProps("firstName"),
    },

    {
      title: "نام خانوادگی",
      dataIndex: "familyName",
      key: "familyName",
      sorter: true,
      // sortDirections: ["descend", "ascend"],
      ellipsis: true,
      width: "11%",
      ...getColumnSearchProps("familyName"),
    },
    {
      title: "کدملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      sorter: false,
      ellipsis: true,
      ...getColumnSearchProps("nationalCode"),
    },

    {
      title: "مدرک تحصیلی",
      dataIndex: "degree",
      key: "degree",
      filterMode: "menu",
      filterSearch: true,
      sorter: false,
      filters: academies,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      sorter: false,
    },
    {
      title: "نام بانک",
      dataIndex: "bank",
      key: "bank",
      filters: banks,
      filterSearch: true,
      sorter: false,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "شبا",
      dataIndex: "sheba",
      key: "sheba",
      sorter: false,
      /* width: "11%", */
    },
    {
      title: "شرکت",
      dataIndex: "CompanyTitle",
      key: "CompanyTitle",
      filters: companys,
      filterSearch: true,
      sorter: false,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
      //width: "20%",
    },
    {
      title: "رشته تخصصی",
      dataIndex: "AdjustmentFieldTitle",
      key: "AdjustmentFieldTitle",
      filters: specialized,
      filterSearch: true,
      sorter: false,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
      /*   width: "12%", */
    },
    {
      title:
        FindAccess(userAccessList.Adjusters_EditInterviewer) &&
        FindAccess(userAccessList.Adjusters_DeleteInterviewer)
          ? "عملیات"
          : "",
      /*  width: "8%", */
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            {FindAccess(userAccessList.Adjusters_EditInterviewer) && (
              <Tooltip title="ویرایش" placement="topLeft">
                <a
                  onClick={() => editInterviewerHandler(record.id)}
                  className="action"
                >
                  <Edit />
                </a>
              </Tooltip>
            )}
            {interviewers.length >= 1 &&
              FindAccess(userAccessList.Adjusters_DeleteInterviewer) && (
                <ConfigProvider direction="rtl">
                  <Popconfirm
                    title="از حذف مصاحبه کننده مورد نظر مطمئن هستید؟"
                    onConfirm={() => removeInterviewerHandler(record.id)}
                    okText="بله"
                    cancelText="خیر"
                  >
                    <Tooltip title="حذف" placement="topLeft">
                      <a className="action">
                        <Trash />
                      </a>
                    </Tooltip>
                  </Popconfirm>
                </ConfigProvider>
              )}
          </div>
        </Space>
      ),
    },
  ];

  //change Page

  const changePageHandler = (page: number, pageSize: any) => {
    return (
      setPageModel({
        ...pageModel,
        pageSize: pageSize,
      }),
      setCurrent(page)
    );
  };

  //show Modal Interviewers
  const showCreateInterviewersHandler = () => {
    setAddForm(true);
    setVisible(true);
  };

  /*  useEffect(() => {
    if (customSort.field === "familyName" && customSort.order === "ascend"  ) {

      setCustomOrder("FamilyName");
  
  } else if(customSort.order === "descend" &&  customSort.field === "familyName"   ) {
  
    setCustomOrder("FamilyName desc");
  }else{
    setCustomOrder(null);
  }
  }, [customSort]) */

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setCustomSort(sorter);

    // if (sorter.field == "familyName") {
    //   if (sorter.order == "ascend") {
    //     setCustomOrder("FamilyName");
    //   }
    //   if (sorter.order == "descend" && sorter.order !== "ascend" ) {
    //     setCustomOrder("FamilyName desc");
    //   }
    // } else {
    //   setCustomOrder("Id");
    // }

    if (sorter.field === "familyName" && sorter.order === "ascend") {
      setCustomOrder("FamilyName");
    } else if (sorter.order === "descend" && sorter.field === "familyName") {
      setCustomOrder("FamilyName desc");
    } else {
      setCustomOrder(null);
    }

    let filteredIndictmentList = [] as any;

    if (filters.familyName != null) {
      filteredIndictmentList.push({
        propertyName: "FamilyName",
        operator: 1,
        value: filters?.familyName[0],
      });
    }

    if (filters.firstName != null) {
      filteredIndictmentList.push({
        propertyName: "FirstName",
        operator: 1,
        value: filters?.firstName[0],
      });
    }

    if (filters.nationalCode != null) {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: filters?.nationalCode[0],
      });
    }

    /**
     * فیلتر بانک
     */
    if (filters.bank != null) {
      let first = [...filters.bank].shift();
      let last = [...filters.bank].pop();
      let fitrstIndex = filters.bank.indexOf(first);
      let lastIndex = filters.bank.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "BankId",
          operator: 1,
          value: filters?.bank[0],
        });
      }

      if (filters.bank.length > 1) {
        for (let i = 0; i < filters.bank.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "BankId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.bank.length - 1) {
            filteredIndictmentList.push({
              propertyName: "BankId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.bank.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "BankId",
              operator: 1,
              value: filters?.bank[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    /**
     *
     * فیلتر مدرک
     */
    if (filters.degree != null) {
      let first = [...filters.degree].shift();
      let last = [...filters.degree].pop();
      let fitrstIndex = filters.degree.indexOf(first);
      let lastIndex = filters.degree.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "DegreeId",
          operator: 1,
          value: filters?.degree[0],
        });
      }

      if (filters.degree.length > 1) {
        for (let i = 0; i < filters.degree.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "DegreeId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.degree.length - 1) {
            filteredIndictmentList.push({
              propertyName: "DegreeId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.degree.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "DegreeId",
              operator: 1,
              value: filters?.degree[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    /**
     * شرکت
     */
    if (filters.CompanyTitle != null) {
      let first = [...filters.CompanyTitle].shift();
      let last = [...filters.CompanyTitle].pop();
      let fitrstIndex = filters.CompanyTitle.indexOf(first);
      let lastIndex = filters.CompanyTitle.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "CompanyId",
          operator: 1,
          value: filters?.CompanyTitle[0],
        });
      }

      if (filters.CompanyTitle.length > 1) {
        for (let i = 0; i < filters.CompanyTitle.length; i++) {
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
          if (i == filters.CompanyTitle.length - 1) {
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
          if (i !== filters.CompanyTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CompanyId",
              operator: 1,
              value: filters?.CompanyTitle[i],
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
              propertyName: "CompanyId",
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

    setFilterList(filteredIndictmentList);
  };

  return (
    <div className="interviewers">
      {FindAccess(userAccessList.Adjusters_CreateInterviewer) && (
        <Button
          type="primary"
          onClick={showCreateInterviewersHandler}
          className="createModal"
          icon={<PlusOutlined />}
        >
          ایجاد مصاحبه کننده
        </Button>
      )}
      {FindAccess(userAccessList.Adjusters_ViewInterviwers) ? (
        <ConfigProvider direction="rtl">
          <Table
            columns={columns}
            dataSource={interviewers}
            pagination={false}
            loading={isLoading}
            onChange={handleChange}
            showSorterTooltip={{ title: "ترتیب افزایشی / کاهشی" }}
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
              emptyText: "مصاحبه کننده ای یافت نشد.",
            }}
          />

          <ConfigProvider direction="rtl">
            <Pagination
              total={resolvedData?.data.TotalCount}
              pageSize={pageModel.pageSize}
              showSizeChanger={true}
              showTotal={(total, range) => (
                <span>{` تعداد کل مصاحبه کنندگان:   ${total} `}</span>
              )}
              current={current}
              onChange={changePageHandler}
              locale={{ items_per_page: "/ صفحه"}}
            />
          </ConfigProvider>
          <Modal
            title={addForm ? "ایجاد مصاحبه کننده " : "ویرایش مصاحبه کننده "}
            visible={visible}
            footer={null}
            onOk={() => {
              setVisible(false);
              dispatch({ type: "CLAER_INTERVIEWR_PICTURE" });
            }}
            onCancel={() => {
              dispatch({ type: "CLAER_INTERVIEWR_PICTURE" });
              setVisible(false);
            }}
            width={1000}
            centered
          >
            {visible && (
              <CreateInterviewer
                selectedInterviewer={selectInterviewer}
                addForm={addForm}
                closeModal={() => {
                  setVisible(false);
                  dispatch({ type: "CLAER_INTERVIEWR_PICTURE" });
                }}
              />
            )}
          </Modal>
        </ConfigProvider>
      ) : (
        <Alert
          type="warning"
          message=""
          description="شما به مشاهده مصاحبه کننده ها دسترسی ندارید."
        />
      )}
    </div>
  );
};

export default Interviewers;
