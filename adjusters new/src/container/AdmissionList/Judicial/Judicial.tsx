import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  ConfigProvider,
  Spin,
  Alert,
  Empty,
  Button,
  Tooltip,
  Input,
  Popover,
  Tabs,
} from "antd";
import { SyncOutlined,CommentOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import Filters from "../Natural/Filter";
import {
  fetchListJudicalCartable,
  excelOutPutHandler,
  smsBatchsendAction,
} from "../../../redux/actions";
import {
  DATA_JUDICAL_CARTABLE,
  DATA_FILTER_JUDICAL_CARTABLE,
} from "../../../constant/cartableActionTypes";
import { messageWarning } from "../../../utils/utils";
import { GetInbox } from "../../../shared/ulitities/Enums/inbox";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { ReactComponent as Filter } from "../../../assets/images/filter.svg";
import { ReactComponent as Xls } from "../../../assets/images/xls.svg";
import { ReactComponent as SubTract } from "../../../assets/images/Subtract.svg";
import nofileStorage from "../../../assets/images/nofileStorage.svg";
import JudicalCard from "./JudicalCard";

interface IJudicalProps {
  activeTab: string;
}

const { TextArea } = Input;
const { TabPane } = Tabs;

const Judical: FC<IJudicalProps> = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [subject, setSubject] = useState("");
  const [activeTabInbox, setActiveTabClose] = useState("1");
  const [body, setBody] = useState("");
  const [visible, setVisible] = useState(false);
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
  });
  const {
    listJudicalCartable,
    modelFilterJudicalCartable,
    loading,
  } = useSelector((state: any) => state.listJudicalCartable);

  const { loadingExcel } = useSelector((state: any) => state.excelCartable);
  const { loadingSmsBatchSend } = useSelector(
    (state: any) => state.smsBatchSend
  );

  let smsBatch = {
    sbject: subject,
    body: body,
    adjusterTypeId: modelFilterJudicalCartable?.adjusterTypeId,
    filters: modelFilterJudicalCartable?.advancedSearchModel.filters,
  };
  let dataJudicalCartable = {
    adjusterTypeId: adjusterType.judical,
    advancedSearchModel: {
      firstPageSize: 0,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: "ApplicantId",
      filters:
        modelFilterJudicalCartable === null
          ? [
              {
                propertyName: "IsClosed",
                operator: 1,
                value:
                  activeTabInbox === "1" ? GetInbox.inbox : GetInbox.outBox,
              },
            ]
          : modelFilterJudicalCartable?.advancedSearchModel.filters,
    },
  };

  let dataJudicalCartableReset = {
    adjusterTypeId: adjusterType.judical,
    advancedSearchModel: {
      firstPageSize: 0,
      pageSize: pageModel.pageSize,
      pageIndex: 1,
      orderBy: "ApplicantId",
      filters: [
        {
          propertyName: "IsClosed",
          operator: 1,
          value: activeTabInbox === "1" ? GetInbox.inbox : GetInbox.outBox,
        },
      ],
    },
  };

  useEffect(() => {
    dispatch({ type: DATA_JUDICAL_CARTABLE, payload: dataJudicalCartable });
  }, [pageModel, adjusterType, activeTabInbox]);

  useEffect(() => {
    dispatch(fetchListJudicalCartable(dataJudicalCartable));
  }, [pageModel, activeTabInbox]);

  //change Page
  const changePageHandler = (current: number, pageSize: any) => {
    setPageModel({
      ...pageModel,
      pageIndex: current,
      pageSize: pageSize,
    });
  };

  const filterHandler = () => {
    setFilter(!filter);
  };
  const refreshHandler = () => {
    setPageModel({
      ...pageModel,
      pageIndex: 1,
    });
    dispatch({
      type: DATA_FILTER_JUDICAL_CARTABLE,
      payload: null,
    });
    dispatch(fetchListJudicalCartable(dataJudicalCartableReset));
  };

  const changeTab = (key: string) => {
    dispatch({
      type: DATA_FILTER_JUDICAL_CARTABLE,
      payload: null,
    });
    setActiveTabClose(key);
    setPageModel({
      pageSize: 20,
      pageIndex: 1,
    });
  };

  //خروجی اکسل
  const exelHandler = () => {
    modelFilterJudicalCartable?.advancedSearchModel?.filters?.length > 0
      ? dispatch(excelOutPutHandler(modelFilterJudicalCartable))
      : dispatch(excelOutPutHandler(dataJudicalCartable));
  };

  const smsBatchSendHanler = () => {
    modelFilterJudicalCartable === null
      ? messageWarning("ابتدا باید فیلتر کنید")
      : dispatch(
          smsBatchsendAction(
            smsBatch,
            () => hide(),
            () => setSubject(""),
            () => setBody("")
          )
        );
  };

  const hide = () => {
    setVisible(false);
  };
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

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
          loading={loadingSmsBatchSend}
        >
          ذخیره
        </Button>
      </div>
    </div>
  );

  const operations = (
    <div className="filter">
      <div className="filter">
        <Popover
          content={
            <Filters
              closeFilter={() => setFilter(false)}
              activeTab={activeTab}
              pageModel={pageModel}
            />
          }
          title="جستجو"
          trigger="click"
        >
          <Button
            type="primary"
            onClick={filterHandler}
            className="filter"
            icon={<Filter />}
            style={{ display: "flex", alignItems: "center" }}
          >
            جستجو
          </Button>
        </Popover>
        <Tooltip title="به روز رسانی لیست">
          <Button
            icon={<SyncOutlined style={{ color: "#f6bb42" }} />}
            onClick={refreshHandler}
            type="dashed"
          />
        </Tooltip>
        <Tooltip title="خروجی اکسل">
          <Button
            type="dashed"
            onClick={exelHandler}
            loading={loadingExcel}
            icon={<Xls />}
            className="centerIconButton iconCenter "
          ></Button>
        </Tooltip>
        {FindAccess(userAccessList.Adjusters_SendGroupSms) && (
          <Popover
            content={content}
            title="ارسال پیامک گروهی"
            trigger="hover"
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
        )}
      </div>
    </div>
  );
  return (
    <div className="legal">
      {FindAccess(userAccessList.Adjusters_Cartable) && (
        <ConfigProvider direction="rtl">
          <Tabs
            defaultActiveKey="1"
            onChange={(key) => changeTab(key)}
            tabBarExtraContent={operations}
          >
            <TabPane tab="دریافتی" key="1"></TabPane>
            <TabPane tab="ارسالی" key="2"></TabPane>
          </Tabs>
        </ConfigProvider>
      )}

      {FindAccess(userAccessList.Adjusters_Cartable) ? (
        loading ? (
          <>
            <Spin tip="Loading...">
              <Alert
                message="لیست کارتابل"
                description="در حال بروز رسانی لیست کارتابل"
                type="info"
              />
            </Spin>
          </>
        ) : listJudicalCartable?.Result?.CartableItems?.length === 0 ? (
          <Empty
            description="پرونده ای به شما ارجاع داده نشده است"
            image={nofileStorage}
          />
        ) : (
          listJudicalCartable?.Result?.CartableItems?.map(
            (adjuster: IAneAdjusterList) => {
              return (
                <JudicalCard
                  oneAdjusterList={adjuster}
                  key={adjuster.ApplicantId}
                  activeTabInbox={activeTabInbox}
                />
              );
            }
          )
        )
      ) : (
        <Alert
        type="warning"
        description= "شما به بخش کارتابل دسترسی ندارید."
        message=""
            
          
        />
      )}
      <ConfigProvider direction="rtl">
        <Pagination
          total={listJudicalCartable?.TotalCount}
          pageSize={pageModel.pageSize}
          showTotal={(total, range) =>
            `تعداد کل:   ${listJudicalCartable?.TotalCount} `
          }
          current={pageModel.pageIndex}
          showSizeChanger={true}
          locale={{ items_per_page: "/ صفحه" }}
          onChange={(current: number, pageSize: any) =>
            changePageHandler(current, pageSize)
          }
        />
      </ConfigProvider>
    </div>
  );
};

export default Judical;
