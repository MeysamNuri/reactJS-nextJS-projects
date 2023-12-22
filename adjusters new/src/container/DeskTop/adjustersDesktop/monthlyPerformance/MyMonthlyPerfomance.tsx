import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  Space,
  Tooltip,
  Modal,
  ConfigProvider,
} from "antd";
import { Icon } from 'sanhab-components-library'
import moment from "jalali-moment";
import { PlusOutlined, FilterFilled } from "@ant-design/icons";
import CreateMonthlyPerfomance from "./CreateMonthlyPerformance";
import {
  fetchAllAdjustmentField,
  fetchMyMonthlyPerformance,
  fetchMonthlyPerformanceId,
  removeMonthlyPerformance 
} from "../../../../redux/actions";
import { IViewMonthlyPerformance } from "../../../../shared/ulitities/Model/desktop/monthlyPerformance";
import { ReactComponent as Edit } from "../../../../assets/images/edit.svg";


const MyMonthlyPerformance = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [removeId,setRemoveId]=useState<number>(0)
  const [filterList, setFilterList] = useState<any>([]);
  const specializedField = useSelector(
    (state: any) => state?.specializedField?.specializedField
  );
  const {
    removePerformanceState,
    removeMonthlyPerformanceLoading,
    viewMyMonthlyPerformance,
    loadingViewMyMonthlyPerformance,
    loadingMonthlyPerformanceId,
  } = useSelector((state: any) => state.monthlyPerformance);
  const [pageModel, setPageModel] = useState({
    pageSize: 15,
    pageIndex: 1,
  });

  let dataSource = viewMyMonthlyPerformance?.Result?.map(
    (item: IViewMonthlyPerformance) => {
      let obj = {
        Id: item.Id,
        key: item.Id,
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
    dispatch(fetchMyMonthlyPerformance(modelMonthlePerformance));
  }, [pageModel, filterList, removePerformanceState]);

  const editPerformanceHandler = (record: any) => {
    dispatch(fetchMonthlyPerformanceId(record.Id));
    setEdit(true);
    setVisible(true);
  };

  const removePerformanceHandler = (request: any) => {
    setRemoveId(request?.Id)
    dispatch(removeMonthlyPerformance(request?.Id))
  }
  let columns: any = [
    {
      title: "تاریخ ثبت",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      ellipsis: true,
      width: "11%",
    },
    {
      title: "تعداد پرونده بررسی",
      dataIndex: "DocumentCount",
      key: "DocumentCount",
      ellipsis: true,
      width: "20%",
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
      width: "30%",
    },

    {
      title: "توضیحات",
      dataIndex: "Description",
      key: "Description",
      ellipsis: true,
      width: "20%",
    },

    {
      title: "عملیات",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            <Tooltip title="ویرایش" placement="topLeft">
              <Button
                onClick={() => editPerformanceHandler(record)}
                className="action"
                icon={<Edit />}
                type="text"
                loading={loadingMonthlyPerformanceId === record.Id}
              ></Button>
            </Tooltip>
            <Tooltip title="حذف" placement="topLeft">
              <Icon iconType="trash"
                loading={removeId==record.Id?? removeMonthlyPerformanceLoading}
                onClick={() => removePerformanceHandler(record)} />
            </Tooltip>
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
      <div className="buttonRight">
        <Button
          type="primary"
          onClick={visibleRegisterHandler}
          icon={<PlusOutlined />}
        >
          ثبت گزارش عملکرد ارزیاب خسارت
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loadingViewMyMonthlyPerformance}
        onChange={handleTableChange}
        pagination={{
          pageSize: pageModel.pageSize,
          total: viewMyMonthlyPerformance?.TotalCount,
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
          emptyText: "پرونده ای جهت ارجاع وجود ندارد.",
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

export default MyMonthlyPerformance;
