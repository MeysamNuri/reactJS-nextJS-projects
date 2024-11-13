//libraries
import React, { FC, useEffect, useState } from "react";
import { Button, Space, Spin, ConfigProvider, Row, Col, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PersonalInfoFeedback from "./PersonalInfoFeedback";
import FieldInfoFeedback from "./FieldInfoFeedback";
import WorkLocationInfoFeedback from "./WorkLocationInfoFeedback";
import WorkExperiencesFeedback from "./WorkExperiencesFeedback";
import CardPersonalInfoFeedback from "./CardPersonalInfoFeedback";
import DocumentsFeedback from "./DocumentsFeedback";
import FinalApprovalModal from "../FinalModal/FinalApprovalModal";
import {
  registerationFinalize,
  getAllInfoForFinalApprovalDraft,
} from "../../../../redux/actions";
import classes from "./FinalApproval.module.css";

interface IFinalApprovalProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const FinalApproval: FC<IFinalApprovalProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  const draftIdLocalStorage = localStorage.getItem("naturalDraftId");

  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const registrationFinalize = useSelector(
    (state: any) => state?.registrationFinalize?.loading
  );

  const regCode = useSelector(
    (state: any) =>
      state?.registrationFinalize?.registrationFinalize?.Result
        ?.RegestrationCode
  );
  const dataState = useSelector(
    (state: any) =>
      state?.getAllInfoForFinalApprovalDraft?.getAllInfoForFinalApprovalDraft
  );
  const dataLoading = useSelector(
    (state: any) => state?.getAllInfoForFinalApprovalDraft?.loading
  );
  const finalLoading = useSelector(
    (state: any) => state?.getAllInfoForFinalApprovalDraft?.loading
  );

  const nextButtonHandler = () => {
     dispatch(
      registerationFinalize(
        draftId,
        () => {},
        () => {
          setIsModalVisible(true);
          setDisableButtons(true);
  
        },
        () => {}
      )
    );
  };

  const prevHandler = () => {
    onPrev();
  };

  //lifecyclehooks here:
  useEffect(() => {
    if (!isUserEdit) {
      dispatch(getAllInfoForFinalApprovalDraft(draftId));
    }
  }, []);

  return (
    <ConfigProvider direction="rtl">
      <div className={classes.root}>
        <h1>تایید</h1>
        {dataLoading && (
          <Space size="middle" className={classes.loading}>
            <Spin size="default" tip="در حال به روز رسانی لیست ..." />
          </Space>
        )}
        {dataState?.IsSucceed && (
          <div>
            <p>
              اطلاعات زیر را به دقت خوانده و در صورت تایید روی تایید نهایی کلیک
              کنید
            </p>

            <PersonalInfoFeedback
              personalInfo={dataState.Result.PersonalInfo}
            />

            <div className={classes.step}>
              <p className={classes.title}>:اعضای خانواده</p>
              {/* <Row>
                <Col sm={3}></Col>
                <Col sm={4}>نسبت</Col>
                <Col sm={4}>نام</Col>
                <Col sm={4}>نام خانوادگی</Col>
                <Col sm={4}>تاریخ تولد</Col>
                <Col sm={4}>کد ملی</Col>
              </Row> */}
              {/* {dataState?.Result?.PersonalInfo?.FamilyMembers?.map((i: any) => (
                <CardPersonalInfoFeedback cardPersonalInfo={i} key={i} />
              ))} */}
              <CardPersonalInfoFeedback />
            </div>

            <FieldInfoFeedback fieldInfo={dataState.Result.FieldInfo} />

            <WorkLocationInfoFeedback
              workLocationInfo={dataState.Result.WorkLocationInfo}
            />

            <div className={classes.step}>
              <p className={classes.title}>:سوابق کاری</p>
              {/* <Row>
                <Col sm={3}></Col>
                <Col sm={4}>تاریخ شروع</Col>
                <Col sm={4}>تاریخ پایان</Col>
                <Col sm={4}>سمت</Col>
                <Col sm={4}>هنوز مشغول هستم</Col>
                <Col sm={4}>شرکت</Col>
              </Row> */}
              {/* {dataState?.Result?.WorkExperiences?.map((i: any) => (
                <WorkExperiencesFeedback workExperiences={i} key={i} />
              ))} */}
              <WorkExperiencesFeedback />
            </div>

            {/* <div className={classes.step}>
              <p className={classes.title}>:مدارک و مستندات</p>
              <Row>
                <Col sm={3}></Col>
                <Col sm={3}>عنوان</Col>
                <Col xl={6}>مشاهده تصویر ارسالی</Col>
              </Row>
              {dataState?.Result?.Documents?.map((i: any) => (
                <DocumentsFeedback document={i} />
              ))}
            </div> */}
          </div>
        )}
        <div className={classes.button}>
          <Button 
            type="primary"
            htmlType="submit"
            onClick={nextButtonHandler}
            disabled={disableButtons}
            loading={finalLoading || registrationFinalize}
          >
            تایید نهایی
          </Button>
          <Button onClick={prevHandler} disabled={disableButtons}>
            مرحله قبلی
          </Button>
        </div>
        <Modal
          title="بیمه مرکزی جمهوری اسلامی ایران"
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <FinalApprovalModal regCode={regCode} />
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default FinalApproval;
