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
  Popover,
  Input,
  Tabs,
} from "antd";
import { SyncOutlined,CommentOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import {
  fetchListLegalCartable,
  excelOutPutHandler,
  smsBatchsendAction,
} from "../../../redux/actions";
import FilterLegal from "./FilterLegal";
import LegalCard from "./LegalCard";
import {
  DATA_FILTER_LEGAL_CARTABLE,
  DATA_LEGAL_CARTABLE,
} from "../../../constant/cartableActionTypes";
import { messageWarning } from "../../../utils/utils";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { GetInbox } from "../../../shared/ulitities/Enums/inbox";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import nofileStorage from "../../../assets/images/nofileStorage.svg";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { ReactComponent as Filter } from "../../../assets/images/filter.svg";
import { ReactComponent as Xls } from "../../../assets/images/xls.svg";
import { ReactComponent as SubTract } from "../../../assets/images/Subtract.svg";

const { TextArea } = Input;
const { TabPane } = Tabs;

interface ILegalProps {
  activeTab: string;
}
const Legal: FC<ILegalProps> = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeTabInbox, setActiveTabClose] = useState("1");
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    current: 1,
  });

  const { listLegalCartable, modelFilterLegalCartable, loading } = useSelector(
    (state: any) => state.listLegalCartable
  );

  const { loadingExcel } = useSelector((state: any) => state.excelCartable);
  const { loadingSmsBatchSend } = useSelector(
    (state: any) => state.smsBatchSend
  );

  let smsBatch = {
    sbject: subject,
    body: body,
    adjusterTypeId: modelFilterLegalCartable?.adjusterTypeId,
    filters: modelFilterLegalCartable?.advancedSearchModel.filters,
  };

  let dataLegalCartable = {
    adjusterTypeId: adjusterType.legal,
    advancedSearchModel: {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.current,
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
    dispatch({ type: DATA_LEGAL_CARTABLE, payload: dataLegalCartable });
  }, [pageModel, adjusterType, activeTabInbox]);

  useEffect(() => {
    dispatch(fetchListLegalCartable(dataLegalCartable));
  }, [pageModel, activeTabInbox]);

  //صفحه بندی
  const changePageHandler = (current: number, pageSize: any) => {
    setPageModel({
      ...pageModel,
      current: current,
      pageSize: pageSize,
    });
  };

  const filterHnadler = () => {
    setFilter(!filter);
  };

  //به روز رسانی لیست
  const refreshHandler = () => {
    setPageModel({
      ...pageModel,
      current: 1,
    });
    dispatch({
      type: DATA_FILTER_LEGAL_CARTABLE,
      payload: null,
    });
    dispatch(fetchListLegalCartable(dataLegalCartable));
  };

  //خروجی اکسل
  const exelHandler = () => {
    modelFilterLegalCartable?.advancedSearchModel?.filters.length > 0
      ? dispatch(excelOutPutHandler(modelFilterLegalCartable))
      : dispatch(excelOutPutHandler(dataLegalCartable));
  };

  const smsBatchSendHanler = () => {
    modelFilterLegalCartable === null
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
      <Popover
        content={
          <FilterLegal
            closeFilter={() => setFilter(false)}
            changePageHandler={changePageHandler}
            pageModel={pageModel}
            activeTab={activeTab}
          />
        }
        title="جستجو"
        trigger="click"
      >
        <Button
          type="primary"
          onClick={filterHnadler}
          className="filter centerFlex"
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
          icon={<Xls />}
          loading={loadingExcel}
          className="centerIconButton iconCenter"
        ></Button>
      </Tooltip>
      {FindAccess(userAccessList.Adjusters_SendGroupSms) && (
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
      )}
    </div>
  );

  return (
    <div className="legal">
      <ConfigProvider direction="rtl">
        {FindAccess(userAccessList.Adjusters_Cartable) && (
          <Tabs
            defaultActiveKey="1"
            onChange={(key) => setActiveTabClose(key)}
            tabBarExtraContent={operations}
          >
            <TabPane tab="دریافتی" key="1"></TabPane>
            <TabPane tab="ارسالی" key="2"></TabPane>
          </Tabs>
        )}
      </ConfigProvider>

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
        ) : listLegalCartable?.Result?.CartableItems?.length === 0 ? (
          <Empty
            description="پرونده ای به شما ارجاع داده نشده است"
            image={nofileStorage}
          />
        ) : (
          listLegalCartable?.Result?.CartableItems?.map(
            (adjuster: IAneAdjusterList) => {
              return (
                <LegalCard
                  oneAdjusterList={adjuster}
                  key={adjuster.ApplicantId}
                  admissionType={activeTab}
                  activeTabInbox={activeTabInbox}
                />
              );
            }
          )
        )
      ) : (
        <Alert
          type="warning"
          description="شما به بخش کارتابل دسترسی ندارید."
          message=""
        />
      )}
      <ConfigProvider direction="rtl">
        <Pagination
          total={listLegalCartable?.TotalCount}
          pageSize={pageModel.pageSize}
          showTotal={(total, range) =>
            `تعداد کل:   ${listLegalCartable?.TotalCount} `
          }
          current={pageModel.current}
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

export default Legal;
