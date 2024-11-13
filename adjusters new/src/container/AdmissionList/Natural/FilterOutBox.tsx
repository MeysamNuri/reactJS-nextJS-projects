import React, { FC, useEffect, useState } from "react";
import { Form, Button, Row, Col, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { ICourse } from "../../../shared/ulitities/Model/course";
import {
  fetchListNaturalCartable,
  getAllFieldInfoNatural,
  fetchListJudicalCartable,
  getValidCourses,
  fetchStatusLst,
  getSubFieldBasedOnFieldNatural,
  fetchAllCourseByAdjusterType
} from "../../../redux/actions";
import {
  DATA_FILTER_NATURAL_CARTABLE_OUTBOX,
  DATA_FILTER_JUDICAL_CARTABLE,
} from "../../../constant/cartableActionTypes";
import { GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS } from "../../../constant/actionTypes";

interface IFilterProps {
  closeFilter: () => void;
  activeTab: any;
  hideFilter?: any;
  pageModel?: any;
  dataNaturalCartableReset?:any,
  activeTabInbox?:string

}

const { Option } = Select;

const Filter: FC<IFilterProps> = ({
  closeFilter,
  activeTab,
  hideFilter,
  pageModel,
  dataNaturalCartableReset,
  activeTabInbox
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const [filterdCartable, setFilterdCartable] = useState([]);
  // const [values, setValues] = useState({} as any)
  const { modelCartable } = useSelector(
    (state: any) => state.listNaturalCartable
  );

  const { ModelJudicalCartable } = useSelector(
    (state: any) => state.listJudicalCartable
  );

  const specializedField = useSelector(
    (state: any) => state.specializedField?.specializedField
  );
  const { allCourseByAdjusterType,loading:courseLoading } = useSelector( 
    (state: any) => state?.allCourse
  );
  // const validCourses = useSelector(
  //   (state: any) => state.getValidCourses?.validCourses?.Result
  // );
  // const stausList = useSelector(
  //   (state: any) => state.statusList.statusList?.Result
  // );
  const { statusList } = useSelector((state: any) => state.statusList);

  const {
    getSubFieldBasedOnFieldNatural: Feilds,
    loading: loadingField,
  } = useSelector((state: any) => state.getSubFieldBasedOnFieldNatural);

  const { loading,modelFilterNaturalCartableOutBox } = useSelector((state: any) => state.listNaturalCartable);


  useEffect(() => {
    dispatch(fetchStatusLst());
  }, []);
  useEffect(() => {
    dispatch(fetchAllCourseByAdjusterType(activeTab));
  }, [activeTab]);


  const onFinish = (values: any) => {
    let filteredIndictmentList = [] as any;
    let indictmentGetForGridObject = {
      adjusterTypeId:
        activeTab === "1"
          ? adjusterType.natural
          : activeTab === "3"
          ? adjusterType.judical
          : null,
      advancedSearchModel: {
        firstPageSize: pageModel.pageSize,
        pageSize: pageModel.pageSize,
        pageIndex: 1,
        orderBy: "ApplicantId",
        filters:filteredIndictmentList,
      },
    };
    //  changePageHandler(1, pageModel.pageSize);
    /*  setFilterdCartable(filteredIndictmentList); */
    activeTab === "1" &&
      modelCartable.advancedSearchModel?.filters &&
      filteredIndictmentList.push(
        modelCartable.advancedSearchModel?.filters[0]
      );
    activeTab === "3" &&
      filteredIndictmentList.push(
        modelCartable.advancedSearchModel?.filters &&
          ModelJudicalCartable.advancedSearchModel?.filters[0]
      );
    if (values.NationalCode !== undefined && values.NationalCode !== "") {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: values?.NationalCode,
      });
    }
    if (
      values.RegistrationCode !== undefined &&
      values.RegistrationCode !== ""
    ) {
      filteredIndictmentList.push({
        propertyName: "RegistrationCode",
        operator: 1,
        value: Number(values?.RegistrationCode),
      });
    }
    if (values.FamilyName !== undefined && values.FamilyName !== "") {
      filteredIndictmentList.push({
        propertyName: "FamilyName",
        operator: 7,
        value: values?.FamilyName,
      });
    }
    if (values.FirstName !== undefined && values.FirstName !== "") {
      filteredIndictmentList.push({
        propertyName: "FirstName",
        operator: 7,
        value: values?.FirstName,
      });
    }
    if (values.SubFields !== undefined) {
      filteredIndictmentList.push({
        propertyName: "SubFieldId",
        operator: 1,
        value: values?.SubFields,
      });
    }

    if (values.StateId != null && values.StateId.length!==0  ) {
      let first = [...values.StateId].shift();
      let last = [...values.StateId].pop();
      let fitrstIndex = values.StateId.indexOf(first);
      let lastIndex = values.StateId.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "StateId",
          operator: 1,
          value: values.StateId[0],
        });
      }

      if (values.StateId.length > 1) {
        for (let i = 0; i < values.StateId.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == values.StateId.length - 1) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== values.StateId.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: values.StateId[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    if (values["Course.Id"] != null  && values["Course.Id"].length!==0 ) {
      let first = [...values["Course.Id"]].shift();
      let last = [...values["Course.Id"]].pop();
      let fitrstIndex = values["Course.Id"].indexOf(first);
      let lastIndex = values["Course.Id"].indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "Course.Id",
          operator: 1,
          value: values["Course.Id"][0],
        });
      }

      if (values["Course.Id"].length > 1) {
        for (let i = 0; i < values["Course.Id"].length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "Course.Id",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == values["Course.Id"].length - 1) {
            filteredIndictmentList.push({
              propertyName: "Course.Id",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== values["Course.Id"].length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "Course.Id",
              operator: 1,
              value: values["Course.Id"][i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    if (values.AdjustmentFieldId!==undefined &&  values.AdjustmentFieldId.length!==0 ) {
      let first = [...values.AdjustmentFieldId].shift();
      let last = [...values.AdjustmentFieldId].pop();
      let fitrstIndex = values.AdjustmentFieldId.indexOf(first);
      let lastIndex = values.AdjustmentFieldId.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "AdjustmentFieldId",
          operator: 1,
          value: values.AdjustmentFieldId[0],
        });
      }

      if (values.AdjustmentFieldId.length>1) {
        for (let i = 0; i < values.AdjustmentFieldId.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == values.AdjustmentFieldId.length - 1) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== values.AdjustmentFieldId.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: values.AdjustmentFieldId[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    if (activeTab === "1") {
      dispatch(
        fetchListNaturalCartable(indictmentGetForGridObject, () => hideFilter())
      );
      dispatch({
        type: DATA_FILTER_NATURAL_CARTABLE_OUTBOX,
        payload: indictmentGetForGridObject,
      });
    }
    if (activeTab === "3") {
      dispatch(fetchListJudicalCartable(indictmentGetForGridObject));
      dispatch({
        type: DATA_FILTER_JUDICAL_CARTABLE,
        payload: indictmentGetForGridObject,
      });
    }
  };

  const resetFilterHanler = () => {
    dispatch({ type: GET_SUB_FIELD_BASED_ON_FIELD_SUCCESS, payload: null });
    form.resetFields();
    // setFilterdCartable([]);
    dispatch({
      type: DATA_FILTER_JUDICAL_CARTABLE,
      payload: null,
    });
    dispatch({
      type: DATA_FILTER_NATURAL_CARTABLE_OUTBOX,
      payload: null,
    });
    closeFilter();
    let indictmentGetForGridObject = {
      adjusterTypeId:
        activeTab === "1"
          ? adjusterType.natural
          : activeTab === "3"
          ? adjusterType.judical
          : null,
      advancedSearchModel: {
        firstPageSize: pageModel.pageSize,
        pageSize: pageModel.pageSize,
        pageIndex: 1,
        orderBy: "ApplicantId",
        filters:
          activeTab === "1"
            ? modelCartable.advancedSearchModel.filters
            : activeTab === "3"
            ? ModelJudicalCartable.advancedSearchModel.filters
            : [],
      },
    };

    if (activeTab === "1") {
      dispatch(
        fetchListNaturalCartable(dataNaturalCartableReset, () => hideFilter())
      );
      // dispatch(fetchListNaturalCartable(dataNaturalCartableReset, () => {}));
    }
    if (activeTab === "3") {
      dispatch(fetchListJudicalCartable(indictmentGetForGridObject));
    }
  };

  useEffect(() => {
    dispatch(getAllFieldInfoNatural());
  }, []);


  useEffect(() => {
    form.setFieldsValue({
      NationalCode: modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.find((item:any)=>item.propertyName=="NationalCode")?.value ,
      FirstName: modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.find((item:any)=>item.propertyName=="FirstName")?.value ,
      FamilyName: modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.find((item:any)=>item.propertyName=="FamilyName")?.value ,
      RegistrationCode: modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.find((item:any)=>item.propertyName=="RegistrationCode")?.value ,
      "Course.Id": modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.filter((item:any)=>item.propertyName=="Course.Id").map((item:any)=>item.value) ,
       StateId: modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.filter((item:any)=>item.propertyName=="StateId").map((item:any)=>item.value),
       AdjustmentFieldId:modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.filter((item:any)=>item.propertyName=="AdjustmentFieldId").map((item:any)=>item.value) ,
       SubFields: modelFilterNaturalCartableOutBox?.advancedSearchModel?.filters.find((item:any)=>item.propertyName=="SubFieldId")?.value ,
    
    });
  }, [activeTabInbox,modelFilterNaturalCartableOutBox])



  useEffect(() => {
    if (activeTab === "1") {
      dispatch(getValidCourses(adjusterType.natural));
    }
    if (activeTab === "3") {
      dispatch(getValidCourses(adjusterType.judical));
    }
  }, [activeTab]);

  const changeFieldHandler = (value: number) => {
    dispatch(getSubFieldBasedOnFieldNatural(value));
  };

  return (
    <div className="filter-box">
      <Form name="filter" onFinish={onFinish} form={form}>
        <Row>
          <Col span={11}>
            <Form.Item
              name="FirstName"
              labelCol={{ span: 4 }}
              label="نام"
              className="titleGray"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              name="FamilyName"
              labelCol={{ span: 8 }}
              label="نام خانوادگی"
              className="titleGray"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="کدملی"
              name="NationalCode"
              className="titleGray"
              rules={[
                {
                  pattern: /^\d{10}$/,
                  message: "کدملی وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              name="StateId"
              labelCol={{ span: 8 }}
              label="وضعیت"
              className="titleGray"
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                allowClear
                mode="multiple"
              >
                {activeTab === "3"
                  ? statusList?.Result?.filter(
                      (State: any) =>
                        State.StateId !== 4 &&
                        State.StateId !== 5 &&
                        State.StateId !== 6 &&
                        State.StateId !== 7
                    )?.map((State: { StateId: number; Title: string }) => (
                      <Option key={State.StateId} value={State.StateId}>
                        {State.Title}
                      </Option>
                    ))
                  : activeTab === "1"
                  ? statusList?.Result?.map(
                      (status: { StateId: number; Title: string }) => (
                        <Option key={status.StateId} value={status.StateId}>
                          {status.Title}
                        </Option>
                      )
                    )
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="دوره"
              name="Course.Id"
              className="titleGray"
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب کنید"
                allowClear
                mode="multiple"
                loading={courseLoading}
              >
                {allCourseByAdjusterType?.Result?.map((course: ICourse) => (
                  <Option key={course.CourseId} value={course.CourseId}>
                    {course.Title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="RegistrationCode"
              label="کدرهگیری"
              className="titleGray"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="AdjustmentFieldId"
              label="رشته"
              labelCol={{ span: 4 }}
              className="titleGray"
            >
              <Select
                placeholder="انتخاب نمایید"
                allowClear
                onSelect={changeFieldHandler}
                mode="multiple"
                showSearch
                optionFilterProp="children"
              >
                {specializedField?.Result?.map(
                  (field: { SubFields: any; Id: number; Title: string }) => (
                    <Option key={field.Id} value={field.Id}>
                      {field.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item
              name="SubFields"
              label="زیر رشته تخصصی"
              labelCol={{ span: 8 }}
              className="titleGray"
              style={{ width: 353 }}
            >
              <Select
                placeholder="انتخاب نمایید"
                allowClear
                loading={loadingField}
                showSearch
                optionFilterProp="children"
              >
                {Feilds?.Result?.map(
                  (subField: { AdjustmentFieldId: number; Title: string }) => (
                    <Option
                      key={subField.AdjustmentFieldId}
                      value={subField.AdjustmentFieldId}
                    >
                      {subField.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <div className="submit">
          <Button type="primary" htmlType="submit" >
            جستجو
          </Button>
          <Button onClick={() => resetFilterHanler()}>بازنشانی </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
