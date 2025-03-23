import React, { useEffect, useState } from "react";
import { Tabs, Button, Modal, ConfigProvider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import CreateRequest from "./CreateRequest";
import Reviewed from "./reviewed/Reviewed";
import NotReviewed from "./reviewed/NotReviewed";
import { userAccessList } from "../../../../shared/ulitities/Enums/userAccessList";

const { TabPane } = Tabs;
const Requests = () => {
  const [visible, setVisible] = useState(false);
  const [activeReview, setactiveReview] = useState("1");
  const createRequestHandler = () => {
    setVisible(true);
  };
  const handleCancelModal=()=>{
    setVisible(false)
  }
  // useEffect(()=>{
  //   if(!visible){

  //     dispatch({ type: TYPE_REQUSET, payload: null });
  //   }
  // },[visible])
  return (
    <div>
      {FindAccess(userAccessList.Adjusters_CreateApplicantRequest) && (
        <div className="buttonRight">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={createRequestHandler}
          >
           ثبت درخواست
          </Button>
        </div>
      )}
      <Tabs onChange={(key) => setactiveReview(key)}>
        <TabPane tab="بررسی شده" key="1">
          <Reviewed activeReview={activeReview} />
        </TabPane>
        <TabPane tab="بررسی نشده" key="2">
          <NotReviewed activeReview={activeReview} />
        </TabPane>
      </Tabs>
      <ConfigProvider direction="rtl">
        <Modal
          title="ایجاد درخواست"
          visible={visible}
          footer={null}
          onCancel={handleCancelModal}
          width={1000}
          centered 
          destroyOnClose={true}
          // bodyStyle={{height:"600px"}} 
        >
          {visible && <CreateRequest closeModal={() => setVisible(false)} />}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Requests;
