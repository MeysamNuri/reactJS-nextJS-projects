import React, {useEffect, FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import {useDispatch } from "react-redux";
import DescriptionAdjusterFile from "./DescriptionAdjusterFile";
import { fetchPersonalInfoDetailCartable } from "../../../../../../redux/actions";
import FieldInfo from "./FieldInfo";

const { TabPane } = Tabs;

interface IAdjusterInfoDetailProps {
  selectedItemManagmentCartable: any;
  activeTab: string;
}

const AdjusterInfoDetail: FC<IAdjusterInfoDetailProps> = ({
  selectedItemManagmentCartable,
  activeTab,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPersonalInfoDetailCartable(selectedItemManagmentCartable.ApplicantId)
    );
  }, []);

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs
          defaultActiveKey="جزئیات پرونده"
          type="card"
        >
          <TabPane tab="جزئیات پرونده" key="1">
            <DescriptionAdjusterFile/>
          </TabPane>
          <TabPane tab="رشته ها" key="2">
            <FieldInfo
              activeTab={activeTab}
              selectedItemManagmentCartable={selectedItemManagmentCartable}
            />
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default AdjusterInfoDetail;
