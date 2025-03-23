import React, { useState, useEffect, useMemo, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  ConfigProvider,
  Spin,
  Alert,
  Empty,
} from "antd";

import {
  fetchListNaturalCartable,
} from "../../../redux/actions";
import NaturalCard from "./NaturalCard";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { GetInbox } from "../../../shared/ulitities/Enums/inbox";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import {
  DATA_NATURAL_CARTABLE,
} from "../../../constant/cartableActionTypes";
import nofileStorage from "../../../assets/images/nofileStorage.svg";


interface INaturalProps {
  activeTab: string;
  activeTabInbox:string
}




const OutBox: FC<INaturalProps> = ({ activeTab,activeTabInbox }) => {
  const dispatch = useDispatch();
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
  });

  const {
    listNaturalCartable,
    modelFilterNaturalCartableOutBox,
    loading,
  } = useSelector((state: any) => state.listNaturalCartable);
  
  let dataNaturalCartable = useMemo(() => {
    return {
      adjusterTypeId: adjusterType.natural,
      advancedSearchModel: {
        firstPageSize: pageModel.pageSize,
        pageSize: pageModel.pageSize,
        pageIndex: pageModel.pageIndex,
        orderBy: "ApplicantId",
        filters:
        modelFilterNaturalCartableOutBox == null
            ? [
                {
                  propertyName: "IsClosed",
                  operator: 1,
                  value: GetInbox.outBox,
                },
              ]
            : modelFilterNaturalCartableOutBox?.advancedSearchModel.filters,
      },
    };
  }, [pageModel, modelFilterNaturalCartableOutBox]);

  

  useEffect(() => {
    activeTabInbox=="2" && dispatch({ type: DATA_NATURAL_CARTABLE, payload: dataNaturalCartable });
  }, [pageModel,activeTabInbox]);

  useEffect(() => {
    activeTabInbox=="2" && dispatch(fetchListNaturalCartable(dataNaturalCartable, () => {}));
  }, [pageModel,activeTabInbox]);



  //change Page
  const changePageHandler = (current: number, pageSize: any) => {
    setPageModel({
      ...pageModel,
      pageIndex: current,
      pageSize: pageSize,
    });
  };

 
  return (
    <div className="legal">
      {loading ? (
        <>
          <Spin tip="Loading...">
            <Alert
              message="لیست کارتابل"
              description="در حال بروز رسانی لیست کارتابل"
              type="info"
            />
          </Spin>
        </>
      ) : listNaturalCartable?.Result?.CartableItems?.length == 0 ? (
        <Empty
          description="پرونده ای به شما ارجاع داده نشده است"
          image={nofileStorage}
        />
      ) : (
        listNaturalCartable?.Result?.CartableItems?.map(
          (adjuster: IAneAdjusterList) => {
            return (
              <NaturalCard
                oneAdjusterList={adjuster}
                key={adjuster.ApplicantId}
                activeTabInbox={activeTabInbox}
              />
            );
          }
        )
      )}

      <ConfigProvider direction="rtl">
        <Pagination
          total={listNaturalCartable?.TotalCount}
          pageSize={pageModel.pageSize}
          showTotal={(total, range) =>
            `تعداد کل:   ${listNaturalCartable?.TotalCount} `
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

export default OutBox;
