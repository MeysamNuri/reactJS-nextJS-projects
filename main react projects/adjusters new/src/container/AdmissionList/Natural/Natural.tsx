import React, { useState, useMemo, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConfigProvider,
  Button,
  Tooltip,
  Popover,
  Input,
  Tabs,
  Alert,
} from "antd";
import { SyncOutlined,CommentOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import {
  fetchListNaturalCartable,
  excelOutPutHandler,
  smsBatchsendAction,
} from "../../../redux/actions";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { GetInbox } from "../../../shared/ulitities/Enums/inbox";
import {
  DATA_FILTER_NATURAL_CARTABLE,
  DATA_FILTER_NATURAL_CARTABLE_OUTBOX,
} from "../../../constant/cartableActionTypes";
import { GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS } from "../../../constant/actionTypes";
import { messageWarning } from "../../../utils/utils";
import Inbox from "./Inbox";
import OutBox from "./OutBox";
import FilterInbox from "./FilterInbox";
import FilterOutBox from "./FilterOutBox";
// import { ReactComponent as SubTract } from "../../../assets/images/Subtract.svg";
import { ReactComponent as Filter } from "../../../assets/images/filter.svg";
import { ReactComponent as Xls } from "../../../assets/images/xls.svg";
import "./Natural.css";

interface INaturalProps {
  activeTab: string;
}

const { TextArea } = Input;
const { TabPane } = Tabs;

const Natural: FC<INaturalProps> = ({ activeTab }) => {
  const [activeTabInbox, setActiveTabClose] = useState("1");
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [subject, setSubject] = useState("");
  const [reset, setReset] = useState(false);
  const [body, setBody] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
  });

  const {
    modelFilterNaturalCartable,
    modelFilterNaturalCartableOutBox,
  } = useSelector((state: any) => state.listNaturalCartable);

  const { loadingExcel } = useSelector((state: any) => state.excelCartable);
  const { loadingSmsBatchSend } = useSelector(
    (state: any) => state.smsBatchSend
  );

  let smsBatch = {
    sbject: subject,
    body: body,
    adjusterTypeId: modelFilterNaturalCartable?.adjusterTypeId,
    filters: modelFilterNaturalCartable?.advancedSearchModel.filters,
  };

  let smsBatchOutbox = {
    sbject: subject,
    body: body,
    adjusterTypeId: modelFilterNaturalCartable?.adjusterTypeId,
    filters: modelFilterNaturalCartableOutBox?.advancedSearchModel.filters,
  };

  let dataNaturalCartableReset = useMemo(() => {
    return {
      adjusterTypeId: adjusterType.natural,
      advancedSearchModel: {
        firstPageSize: pageModel.pageSize,
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
  }, [pageModel, activeTabInbox]);

  let dataNaturalExcelCartable = useMemo(() => {
    return {
      adjusterTypeId: adjusterType.natural,
      advancedSearchModel: {
        firstPageSize: 0,
        pageSize: pageModel.pageSize,
        pageIndex: pageModel.pageIndex,
        orderBy: "ApplicantId",
        filters:
          modelFilterNaturalCartable === null
            ? [
                {
                  propertyName: "IsClosed",
                  operator: 1,
                  value:
                    activeTabInbox === "1" ? GetInbox.inbox : GetInbox.outBox,
                },
              ]
            : modelFilterNaturalCartable?.advancedSearchModel.filters,
      },
    };
  }, [pageModel, activeTabInbox, modelFilterNaturalCartable]);

  let dataNaturalExcelCartableOutBox = useMemo(() => {
    return {
      adjusterTypeId: adjusterType.natural,
      advancedSearchModel: {
        firstPageSize: 0,
        pageSize: pageModel.pageSize,
        pageIndex: pageModel.pageIndex,
        orderBy: "ApplicantId",
        filters:
          modelFilterNaturalCartableOutBox === null
            ? [
                {
                  propertyName: "IsClosed",
                  operator: 1,
                  value:
                    activeTabInbox === "1" ? GetInbox.inbox : GetInbox.outBox,
                },
              ]
            : modelFilterNaturalCartableOutBox?.advancedSearchModel.filters,
      },
    };
  }, [pageModel, activeTabInbox, modelFilterNaturalCartableOutBox]);

  //فیلتر
  const filterHnadler = () => {
    setFilter(!filter);
  };

  //خروجی اکسل
  const exelHandler = () => {
    activeTabInbox == "1" && modelFilterNaturalCartable === null
      ? dispatch(excelOutPutHandler(dataNaturalExcelCartable))
      : dispatch(excelOutPutHandler(modelFilterNaturalCartable));
  };

  //خروجی اکسل
  const exelHandlerOutBox = () => {
    activeTabInbox == "2" && modelFilterNaturalCartable !== null
      ? dispatch(excelOutPutHandler(modelFilterNaturalCartableOutBox))
      : dispatch(excelOutPutHandler(dataNaturalExcelCartableOutBox));
  };

  //به روز رسانی لیست
  const refreshHandler = () => {
    setReset(true);
    dispatch({ type: GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS, payload: null });
    setPageModel({
      ...pageModel,
      pageIndex: 1,
    });
    activeTabInbox == "1" &&
      dispatch({
        type: DATA_FILTER_NATURAL_CARTABLE,
        payload: null,
      });
    activeTabInbox == "2" &&
      dispatch({
        type: DATA_FILTER_NATURAL_CARTABLE_OUTBOX,
        payload: null,
      });

    dispatch(
      fetchListNaturalCartable(dataNaturalCartableReset, () => setReset(false))
    );
  };


  const smsBatchSendHanler = () => {
    modelFilterNaturalCartable === null
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
  const smsBatchSendHanlerOutBox = () => {
    modelFilterNaturalCartableOutBox === null
      ? messageWarning("ابتدا باید فیلتر کنید")
      : dispatch(
          smsBatchsendAction(
            smsBatchOutbox,
            () => hide(),
            () => setSubject(""),
            () => setBody("")
          )
        );
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
          onClick={
            activeTabInbox == "1"
              ? smsBatchSendHanler
              : smsBatchSendHanlerOutBox
          }
          loading={loadingSmsBatchSend}
        >
          ارسال
        </Button>
      </div>
    </div>
  );

  const hide = () => {
    setVisible(false);
  };

  const hideFilter = () => setVisibleFilter(false);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const handleVisibleFilterChange = (visible: any) => {
    setVisibleFilter(visible);
  };
  const operations = (
    <div className="filter">
      <Popover
        content={
          activeTabInbox == "1" ? (
            <FilterInbox
              closeFilter={() => setFilter(false)}
              activeTab={activeTab}
              hideFilter={hideFilter}
              pageModel={pageModel}
              dataNaturalCartableReset={dataNaturalCartableReset}
              activeTabInbox={activeTabInbox}
            />
          ) : (
            activeTabInbox == "2" && (
              <FilterOutBox
                closeFilter={() => setFilter(false)}
                activeTab={activeTab}
                hideFilter={hideFilter}
                pageModel={pageModel}
                dataNaturalCartableReset={dataNaturalCartableReset}
                activeTabInbox={activeTabInbox}
              />
            )
          )
        }
        title="جستجو"
        trigger="click"
        visible={visibleFilter}
        onVisibleChange={handleVisibleFilterChange}
        overlayClassName="popoverCustom"
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
          icon={<SyncOutlined style={{ color: "#f6bb42" }} spin={reset} />}
          onClick={refreshHandler}
          type="dashed"
          className="centerIconButton"
        />
      </Tooltip>
      <Tooltip title="خروجی اکسل">
        <Button
          type="dashed"
          onClick={activeTabInbox == "1" ? exelHandler : exelHandlerOutBox}
          loading={loadingExcel}
          icon={<Xls className="excel" />}
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

  const changeTab = (key: string) => {
    setActiveTabClose(key);
    setPageModel({
      pageSize: 20,
      pageIndex: 1,
    });
  };

  return (
    <div className="legal">
      <ConfigProvider direction="rtl">
        {FindAccess(userAccessList.Adjusters_Cartable) ? (
          <Tabs
            defaultActiveKey="1"
            onChange={(key) => changeTab(key)}
            tabBarExtraContent={operations}
            destroyInactiveTabPane={true}
          >
            <TabPane tab="دریافتی" key="1">
              {activeTabInbox == "1" && (
                <Inbox activeTab={activeTab} activeTabInbox={activeTabInbox} />
              )}
            </TabPane>
            <TabPane tab="ارسالی" key="2">
              {activeTabInbox == "2" && (
                <OutBox activeTab={activeTab} activeTabInbox={activeTabInbox} />
              )}
            </TabPane>
          </Tabs>
        ) : (
          <Alert
          type="warning"
          message=""
          description= "شما به بخش کارتابل دسترسی ندارید."
          />
        )}
      </ConfigProvider>
    </div>
  );
};

export default Natural;
