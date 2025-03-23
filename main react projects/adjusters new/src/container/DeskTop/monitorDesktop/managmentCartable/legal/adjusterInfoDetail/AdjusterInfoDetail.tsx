import React, {useEffect, FC } from "react";
import { Tabs, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import DescriptionAdjusterFile from "./DescriptionAdjusterFile";
import { fetchPersonalInfoLegalDetailCartable } from "../../../../../../redux/actions";
import FieldInfo from "../../detail/adjusterInfoDetail/FieldInfo";
import CompanyMembers from "../companyMember/CompanyMember";
import { GetWay } from "../../../../../../shared/ulitities/Enums/getWay";
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
      fetchPersonalInfoLegalDetailCartable(
        selectedItemManagmentCartable.ApplicantId
      )
    );
  }, [selectedItemManagmentCartable.ApplicantId]);

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Tabs
          defaultActiveKey="جزییات پرونده"
          type="card"
        >
          <TabPane tab="جزئیات پرونده" key="1">
            <DescriptionAdjusterFile />
          </TabPane>
          <TabPane tab="رشته ها" key="2">
            <FieldInfo
              activeTab={activeTab}
              selectedItemManagmentCartable={selectedItemManagmentCartable}
            />
          </TabPane>
          <TabPane tab="اعضای شرکت" key="3">
          <CompanyMembers
              selectedItemManagmentCartable={selectedItemManagmentCartable}
              isEvaluatorDesktopInformation={GetWay.managmentCatable}
            />
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default AdjusterInfoDetail;
