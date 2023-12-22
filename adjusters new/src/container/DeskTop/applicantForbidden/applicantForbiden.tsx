import React, { useState, useEffect, memo } from "react";
import { ConfigProvider, Tabs, Button, Popover, Tooltip, Row } from "antd";
import ForbiddenListInfo from './forbiddenGrid'
import { useDispatch, useSelector } from "react-redux";
import ForbiddenReport from './forbiddenReport'
import { ReactComponent as Xls } from "../../../../assets/images/xls.svg";
import {
  cartableMangementExcelDownload,
  selectDocuments
} from "../../../redux/actions";

const { TabPane } = Tabs;
const ApplicantForbiddenCartable = () => {
  const [activeTab, setActiveTab] = useState("1");

  const [dataManagment, setDataManagment] = useState<any>([]);
  const [dataSeletManagment, setDataSeletManagment] = useState<any>([]);
  const [clearFilter, setClearFilter] = useState<number>(0)
  const dispatch = useDispatch();



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
         
          <TabPane tab="حقیقی-دادگستری" key={1}>
            <ForbiddenListInfo
          
              handleChildData={handleChildData}
              handleChildSelectData={handleChildSelectData}
              clearFilter={clearFilter}
             
            />
          </TabPane>
          <TabPane tab="گزارش آماری" key={2}>
          <ForbiddenReport />
          </TabPane>
        </Tabs>

      </ConfigProvider>
    </>
  );
};

export default memo(ApplicantForbiddenCartable);
