import React, { useState, useEffect, memo } from "react";
import { ConfigProvider, Tabs, Button, Popover, Tooltip, Row } from "antd";
import { SyncOutlined, CommentOutlined } from "@ant-design/icons";
import Natural from "./natural/Natural";
import Legal from "./legal/Legal";
import Judical from "./judical/Judical";
import NaturalJudical from "./naturalJudical/NaturalJudical";
import SmsGroup from "./SmsGroup";
import MessageGroup from "./messageGroup";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Xls } from "../../../../assets/images/xls.svg";
import {
  cartableMangementExcelDownload,
  selectDocuments
} from "../../../../redux/actions";

const { TabPane } = Tabs;
const ApplicantForbiddenCartable = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [visible, setVisible] = useState(false);
  const [messageGroupvisible, setMessageGroupVisible] = useState(false);
  const [dataManagment, setDataManagment] = useState<any>([]);
  const [dataSeletManagment, setDataSeletManagment] = useState<any>([]);
  const [clearFilter, setClearFilter] = useState<number>(0)
  const dispatch = useDispatch();

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  const handleMessageGroupVisibleChange = (visible: any) => {
    setMessageGroupVisible(visible);
  };


  const handleGroup = () => {
    setVisible(true);
  };

  const handleMessageGroup = () => {
    setMessageGroupVisible(true);
  };
  const handleChildData = (data: any) => {
    setDataManagment(data);
  };
  const handleChildSelectData = (data: any) => {
    setDataSeletManagment(data);
  };

  const exelHandler = () => {


    let cartableReport = {
      firstPageSize: 100,
      pageSize: 100,
      pageIndex: 1,
      orderBy: "Id",
      filters: dataManagment,
    };

    dispatch(cartableMangementExcelDownload(cartableReport, activeTab === '4' ? "13" : activeTab));

  };
  useEffect(() => {
    selectDocuments(dispatch, [])
  }, [activeTab])
  const resetFiltersHandler = () => {
    setClearFilter(Math.floor(Math.random() * 1000))

  };
  const handleActiveTab = (value: any) => {
    setActiveTab(value)
  }
  const operations = (
    <Row>
      <Button onClick={resetFiltersHandler} type="dashed">پاکسازی همه فیلتر ها</Button>

    </Row>
  );

  return (
    <>
      <ConfigProvider direction="rtl">
        <Tabs
          onChange={handleActiveTab}
          tabBarExtraContent={operations}
        >
          <TabPane tab="حقیقی" key={1}>
            <Natural
              activeTab={activeTab}
              handleChildData={handleChildData}
              handleChildSelectData={handleChildSelectData}
              clearFilter={clearFilter}
              isFromApplicantForbidden={true}
            />
          </TabPane>
          {/* <TabPane tab="حقوقی" key={2}>
            //   <Legal
            //     activeTab={activeTab}
            //     handleChildData={handleChildData}
            //     handleChildSelectData={handleChildSelectData}
            //     clearFilter={clearFilter}
            //   />
          </TabPane> */}
          <TabPane tab="دادگستری" key={3}>
            <Judical
              activeTab={activeTab}
              handleChildData={handleChildData}
              handleChildSelectData={handleChildSelectData}
              clearFilter={clearFilter}
              isFromApplicantForbidden={true}
            />
          </TabPane>
          <TabPane tab="حقیقی-دادگستری" key={4}>
            <NaturalJudical
              activeTab={activeTab}
              handleChildData={handleChildData}
              handleChildSelectData={handleChildSelectData}
              clearFilter={clearFilter}
              isFromApplicantForbidden={true}
            />
          </TabPane>
        </Tabs>

      </ConfigProvider>
    </>
  );
};

export default memo(ApplicantForbiddenCartable);
