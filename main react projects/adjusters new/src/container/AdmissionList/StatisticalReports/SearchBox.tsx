import React, { useEffect, FC, useState } from "react";
import { Form, Select, Button, Row, Col, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStatusLst,
  getAllAdjusterType,
  fetchAllCourse,
  fetchAllAdjustmentField,
  fetchDetailstaticalReport,
  fetchStatisticalReport,
} from "../../../redux/actions";
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import momentJalali from "jalali-moment";
import {filterAdvanceOperator} from '../../../shared/ulitities/Enums/advanceSearchOperator'
import {DETAIL_STATICAL_REPORT_FAILD_INFO} from '../../../constant/cartableActionTypes'
// import {adjusterType} from '../../../shared/ulitities/Enums/adjusterTypeId'

const { Option } = Select;

interface ISearchProps {
  filters: any;
}

const SearchBox: FC<ISearchProps> = ({ filters }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { allAdjusterType } = useSelector(
    (state: any) => state?.allAdjusterType
  );

  const { allCourse } = useSelector((state: any) => state?.allCourse);
  const { statusList } = useSelector((state: any) => state.statusList);
  const [search, setSearch] = useState(false);
  const { loading,fetchDetailStaticalReportInfo } = useSelector((state: any) => state.statisticalReports);
  // const { adjustmentFieldParentList } = useSelector(
  //   (state: any) => state.adjustmentFieldParentList
  // );


  
  const { specializedField } = useSelector(
    (state: any) => state?.specializedField
  );

  let adjustmentField = {
    isActive: null,
  };

  useEffect(() => {
    dispatch(getAllAdjusterType());
    dispatch(fetchStatusLst());
    dispatch(fetchAllCourse());
    dispatch(fetchAllAdjustmentField(adjustmentField));
  }, []);;

  const onFinish = (values: any) => {
    setSearch(true);
    let filteredIndictmentList = [] as any;
    if (values.CourseId !== undefined) {
      filteredIndictmentList.push({
        propertyName: "CourseId",
        operator: 1,
        value: values?.CourseId,
      });
    }
    if (values.CourseTypeId !== undefined) {
      filteredIndictmentList.push({
        propertyName: "CourseTypeId",
        operator: 1,
        value: values?.CourseTypeId,
      });
    }
    if (values.StateId !== undefined) {
      filteredIndictmentList.push({
        propertyName: "StateId",
        operator: 1,
        value: values?.StateId,
        operand: 1,
      });
    }
    if (values.AdjustmentFieldId !== undefined) {
      filteredIndictmentList.push({
        propertyName: "AdjustmentFieldId",
        operator: 1,
        value: values?.AdjustmentFieldId,
      });
    }
    if (values.RegisterDateFrom !== undefined) {
      filteredIndictmentList.push({
        propertyName: "RegisterDate",
        operator: filterAdvanceOperator.GreaterOrEqual,
        value: momentJalali(values.RegisterDateFrom).format("YYYY-MM-DD"),
      });
    } 
    if (values.RegisterDateUntill !== undefined) {
      filteredIndictmentList.push({
        propertyName: "RegisterDate",
        operator:filterAdvanceOperator.LessOrEqual,
        value: momentJalali(values.RegisterDateUntill).format("YYYY-MM-DD"),
      });
    }
    filters(filteredIndictmentList);
    // dispatch(fetchDetailstaticalReport(dataPagination,1));
  };

  let dataStatisticalResetReport = {
    firstPageSize: 10,
    pageSize: 10,
    pageIndex: 1,
    orderBy: "ApplicantId",
    filters: [],
  };
  const resettingHandler = () => {
    setSearch(false)
    form.resetFields();
    dispatch(fetchStatisticalReport(dataStatisticalResetReport));
    // listDetailStaticalReportInfo()
    // document.location.reload();
  };

  return (
    <>
      <ConfigProvider direction="rtl">
        <Form
          name="statisticalReports"
          onFinish={onFinish}
          form={form}
          style={{
            backgroundColor: "#ffffff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <Row>
            <Col span={10} offset={2}>
              <Form.Item
                label="دوره"
                name="CourseId"
                labelCol={{ xxl: 4, xl: 5, md: 7, sm: 9 }}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب کنید"
                  allowClear
                >
                  {allCourse?.Result.map((course: any) => (
                    <Option key={course.CourseId} value={course.CourseId}>
                      {" "}
                      {course.Title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} offset={1}>
              <Form.Item
                label="نوع ارزیاب"
                name="CourseTypeId"
                labelCol={{ xxl: 5, xl: 7, md: 10, sm: 12 }}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                  allowClear
                >
                  {allAdjusterType?.Result?.map(
                    ({
                      CourseTypeId,
                      Title,
                    }: {
                      CourseTypeId: number;
                      Title: string;
                    }) => (
                      <Option key={CourseTypeId} value={CourseTypeId}>
                        {Title}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <Form.Item
                label="زمینه تخصصی"
                name="AdjustmentFieldId"
                labelCol={{ xxl: 4, xl: 5, md: 7, sm: 9 }}
              >
                <Select
                  placeholder="انتخاب نمایید"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {specializedField?.Result?.map(
                    (AdjustmentField: {
                      AdjustmentFieldId: number;
                      Title: string;
                    }) => (
                      <Option
                        key={AdjustmentField.AdjustmentFieldId}
                        value={AdjustmentField.AdjustmentFieldId}
                      >
                        {AdjustmentField.Title}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} offset={1}>
              <Form.Item
                label="وضعیت متقاضی"
                name="StateId"
                labelCol={{ xxl: 5, xl: 7, md: 10, sm: 12 }}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                  allowClear
                >
                  {statusList?.Result?.map(
                    (status: { StateId: number; Title: string }) => (
                      <Option key={status.StateId} value={status.StateId}>
                        {status.Title}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col  span={10} offset={2}>
            <Form.Item
              name="RegisterDateFrom"
              label="تاریخ ثبت (از)"
              labelCol={{ xxl: 4, xl: 5, md: 7, sm: 9 }}
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
            </Col>
            <Col  span={8} offset={1}>
            <Form.Item
              name="RegisterDateUntill"
              label="تاریخ ثبت (تا)"
              labelCol={{ xxl: 5, xl: 7, md: 10, sm: 12 }}
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
            </Col>
          </Row>

          <div className="submit">
            <Button
              type="primary"
              htmlType="submit"  
            >
              جستجو
            </Button>
            <Button type="primary" onClick={resettingHandler}   >
              باز نشانی
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </>
  );
};

export default SearchBox;
