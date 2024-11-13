// //libraries
import React, { FC, useState, useEffect } from "react";
import { Form, ConfigProvider, Row, Col, Button, Input, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";

//redux
import {
  sendStockholderLegal,
  sendStockholderLegalEdit,
  fetchStockholderLegal,
  fetchStockholderLegalEdit,
  patchDraftStockholderLegal,
  patchDraftStockholderLegalEdit,
  isComeFromRegistration,
} from "../../../../redux/actions";

//styles
import classes from "./Stockholder.module.css";

//components
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import CardStockholder from "./CardStockholder";

interface IStockholder {
  onSubmit: () => void;
  onPrev: () => void;
}

const Stockholder: FC<IStockholder> = ({ onSubmit, onPrev }) => {
  // const [editButtonClicked, setEditButtonClicked] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const base = useSelector((state: any) => state.baseData);

  const legalDraftIdState = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result?.DraftId
  );
  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );
  const legalDraftId =
    legalDraftIdState !== undefined ? legalDraftIdState : draftIdLocalStorage;

  const listworkGuide = useSelector(
    (state: any) => state.listDraftStockholderLegal.listStockholderLegal?.Result
  );
  const loadingState = useSelector(
    (state: any) => state?.stockholderDraftLegal?.loading
  );
  const gotAllInfoStockholderLegal = useSelector(
    (state: any) => state?.getAllInfoStockholderLegal?.stockholderRelatedInfo
  );
  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;
  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );

  const onFinish = (values: any) => {
    let stockholder = {
      nationalCode: values.nationalCode,
      birthDate:moment(values.birthDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      shareAmount: values.shareAmount,
      joinDate: values.joinDate,
    };
    if (isUserEdit) {
      dispatch(
        sendStockholderLegalEdit(gotIdForMainEdit, stockholder, () => {
          dispatch(fetchStockholderLegalEdit(gotIdForMainEdit));
        })
      );
    } else if (!isUserEdit) {
      dispatch(
        sendStockholderLegal(legalDraftId, stockholder, () => {
          dispatch(fetchStockholderLegal(legalDraftId));
        })
      );
    }
  };

  //click handlers
  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
  };

  const nextHandler = () => {
    onSubmit();
  };

  const handleEdit = () => {
    //setEditButtonClicked(true);
  };

  if (gotAllInfoStockholderLegal?.IsSucceed) {
    form.setFieldsValue({
      nationalCode: gotAllInfoStockholderLegal?.Result?.NationalCode,
      birthDate: moment(
        gotAllInfoStockholderLegal?.Result?.BirthDate.split("T")[0]
      ),
      joinDate: moment(
        gotAllInfoStockholderLegal?.Result?.JoinDate.split("T")[0]
      ),
      shareAmount: gotAllInfoStockholderLegal?.Result?.ShareAmount,
    });
  } else {
    form.resetFields();
  }

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      dispatch(fetchStockholderLegalEdit(gotIdForMainEdit));
    } else {
      //if (!comeFromRegistration) {
      dispatch(fetchStockholderLegal(legalDraftId));
      // }
    }
  }, []);

  return (
    <ConfigProvider direction="rtl">
      <Form
        onFinish={onFinish}
        form={form}
        name="stockholder"
        className={`${classes.ItemContainer} personalInfo`}
      >
        <Row>
          <Col span={11} offset={1}>
            <Form.Item
              label="کد ملی"
              name="nationalCode"
              className="changeMargin formLable"
              rules={[
                {
                  required: true,
                  message: "کد ملی الزامی می باشد.",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "کد ملی وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input
                name="nationalCode"
                maxLength={10}
                // value={nationalCode}
                // onChange={(e) => setNationalCode(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="shareAmount"
              label="تعداد سهم"
              className="formLable"
              rules={[
                {
                  required: true,
                  message: "انتخاب تعداد سهم الزامی است",
                },
                {
                  pattern: /^[0-9]*$/,
                  message: "تعداد سهم وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input  placeholder="تعداد سهام را به عدد وارد نمایید" />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              label="تاریخ تولد"
              name="birthDate"
              className="formLable"
              rules={[
                {
                  required: true,
                  message: "انتخاب تاریخ تولد الزامی است",
                },
              ]}
            >
              <DatePicker2 placeholder="انتخاب تاریخ" />
            </Form.Item>
            <Form.Item
              label="تاریخ سهامدار شدن"
              name="joinDate"
              className="formLable"
              rules={[
                {
                  required: true,
                  message: "انتخاب تاریخ سهامدار شدن الزامی است",
                },
              ]}
            >
              {/* <DatePicker2
                placeholder="انتخاب تاریخ"
                value={stockholderStartDateDate}
                onChange={(value: any) => setStockholderStartDateDate(value.toDate())}
              /> */}
              <DatePicker2 placeholder="انتخاب تاریخ" />
            </Form.Item>
          </Col>
        </Row>
        <Row className={classes.nextStep}>
          <Button type="primary" htmlType="submit" loading={loadingState}>
            افزودن
          </Button>
        </Row>
        {listworkGuide === undefined || listworkGuide.length === 0 ? (
          <Empty description="در ابتدا اطلاعات سهامداران را اضافه کنید" />
        ) : (
          <Row>
             <Col xl={3}>نام و نام خانوادگی</Col>
            <Col xl={3}>کد ملی</Col>
            <Col xl={3}>تاریخ تولد</Col>
            <Col xl={3}>تعداد سهم</Col>
            <Col xl={6}>تاریخ سهامدار شدن</Col>
            
          </Row>
        )}

        {listworkGuide?.map(
          (work: {
            Id: string;
            StartDate: string;
            EndDate: string;
            Position: string;
            CompanyId: number;
          }) => {
            let findCompany = base?.baseInfo?.Result?.Companys?.find(
              ({ Id, Title }: { Id: number; Title: string }) =>
                work.CompanyId === Id
            );

            return (
              <CardStockholder
                key={work.Id}
                work={work}
                legalDraftId={legalDraftId}
                findCompany={findCompany}
                handleEdit={handleEdit}
              />
            );
          }
        )}
        <div className={classes.nextStep}>
          <Button onClick={prevHandler}>مرحله قبلی</Button>
          {listworkGuide?.length === 0 || listworkGuide === undefined ? (
            <Button
              type="primary"
              //htmlType="submit"
              onClick={nextHandler}
              disabled
            >
              مرحله بعدی
            </Button>
          ) : (
            <Button
              type="primary"
              //htmlType="submit"
              onClick={nextHandler}
            >
              مرحله بعدی
            </Button>
          )}
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default Stockholder;
