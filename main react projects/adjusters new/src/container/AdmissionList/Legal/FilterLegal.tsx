import React, { FC, useEffect } from "react";
import { Form, Button, Row, Col, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { ICourse } from "../../../shared/ulitities/Model/course";
import {
  getAllFieldInfoNatural,
  getValidCourses,
  fetchListLegalCartable,
  fetchStatusLst,
  fetchAllCourseByAdjusterType
} from "../../../redux/actions";
import { DATA_FILTER_LEGAL_CARTABLE } from "../../../constant/cartableActionTypes";

interface IFilterProps {
  closeFilter: () => void;
  changePageHandler:any;
  pageModel:any,
  activeTab:any
}

const { Option } = Select;

const FilterLegal: FC<IFilterProps> = ({ closeFilter,changePageHandler,pageModel,activeTab }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const validCourses = useSelector(
    (state: any) => state?.getValidCourses?.validCourses?.Result
  );
  const stausList = useSelector(
    (state: any) => state.statusList.statusList?.Result
  );
  const {ModelLegalCartable} = useSelector(
    (state: any) => state.listLegalCartable
  );
  const { allCourseByAdjusterType,loading :courseLoading} = useSelector( 
    (state: any) => state?.allCourse
  );

  useEffect(() => {
    dispatch(fetchStatusLst());
  }, []);

  useEffect(() => {
    dispatch(fetchAllCourseByAdjusterType(activeTab));
  }, [activeTab]);

  const onFinish = (values: any) => {
    let filteredIndictmentList = [] as any;
    filteredIndictmentList.push(ModelLegalCartable.advancedSearchModel.filters[0]);
    let indictmentGetForGridObject = {
      adjusterTypeId: adjusterType.legal,
      advancedSearchModel: {
        firstPageSize:  pageModel.pageSize,
        pageSize: pageModel.pageSize,
        pageIndex: 1,
        orderBy: "ApplicantId",
        filters: filteredIndictmentList,
      },
    };
    changePageHandler(1, pageModel.pageSize);
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

    // if (values.CourseId !== undefined) {
    //   filteredIndictmentList.push({
    //     propertyName: "CourseId",
    //     operator: 1,
    //     value: values?.CourseId,
    //   });
    // }
    if (values.StateId != null) {
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

      if ( values.StateId.length > 1) {
        for (let i = 0; i <  values.StateId.length; i++) {
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
    if (values.CourseId != null) {
      let first = [...values.CourseId].shift();
      let last = [...values.CourseId].pop();
      let fitrstIndex = values.CourseId.indexOf(first);
      let lastIndex = values.CourseId.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "Course.Id",
          operator: 1,
          value: values.CourseId[0],
        });
      }

      if ( values.CourseId.length > 1) {
        for (let i = 0; i <  values.CourseId.length; i++) {
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
          if (i == values.CourseId.length - 1) {
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
          if (i !== values.CourseId.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "Course.Id",
              operator: 1,
              value: values.CourseId[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    dispatch(fetchListLegalCartable(indictmentGetForGridObject));
    dispatch({
      type: DATA_FILTER_LEGAL_CARTABLE,
      payload: indictmentGetForGridObject,
    });
  };

  const resetFilterHanler = () => {
    form.resetFields();
    closeFilter();
    let indictmentGetForGridObject = {
      adjusterTypeId: adjusterType.legal,
      advancedSearchModel: {
        firstPageSize:pageModel.pageSize,
        pageSize: pageModel.pageSize,
        pageIndex: 1,
        orderBy: "ApplicantId",
        filters: ModelLegalCartable.advancedSearchModel.filters
      },
    };

    dispatch(fetchListLegalCartable(indictmentGetForGridObject));
  };

  useEffect(() => {
    dispatch(getAllFieldInfoNatural());
  }, []);

  useEffect(() => {
    dispatch(getValidCourses(adjusterType.legal));
  }, []);

  return (
    <div className="filter-box">
      <Form name="filter" onFinish={onFinish} form={form}>
        <Row>
          <Col span={11} offset={1}>
            <Form.Item
              name="FirstName"
              labelCol={{ span: 5 }}
              label="نام"
              className="titleGray"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              name="FamilyName"
              labelCol={{ span: 6 }}
              label="نام خانوادگی"
              className="titleGray"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              labelCol={{ span: 5 }}
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
              <Input maxLength={10}   />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              name="StateId"
              labelCol={{ span: 6 }}
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
                {stausList
                  ?.filter(
                    (State: any) =>
                    State.StateId !== 4 && State.StateId !== 5 && State.StateId !== 6 && State.StateId!==7
                  )
                  ?.map((State: { StateId: number; Title: string }) => (
                    <Option key={State.StateId} value={State.StateId}>
                      {State.Title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              labelCol={{ span: 5 }}
              label="دوره"
              name="CourseId"
              className="titleGray"
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب کنید"
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
              labelCol={{ span: 6 }}
              name="RegistrationCode"
              label="کدرهگیری"
              className="titleGray"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div className="submit">
          <Button type="primary" htmlType="submit">
            جستجو
          </Button>
          <Button onClick={resetFilterHanler}>بازنشانی </Button>
        </div>
      </Form>
    </div>
  );
};

export default FilterLegal;
