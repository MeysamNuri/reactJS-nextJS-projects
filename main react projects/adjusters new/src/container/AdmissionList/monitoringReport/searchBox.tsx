import React, { useEffect, FC, useState } from "react";
import { Form, Select, Button, Row, Col, ConfigProvider,Input,Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStatusLst,
  getAllAdjusterType,
  fetchAllCourse,
  fetchAllAdjustmentField,
  fetchDetailstaticalReport,
  fetchStatisticalReport,
  fetchAllStatuses,
  getWorkCityProvinceIdLegal
} from "../../../redux/actions";
import momentJalali from "jalali-moment";
import {filterAdvanceOperator} from '../../../shared/ulitities/Enums/advanceSearchOperator'
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import { LoadingOutlined } from "@ant-design/icons";

import {DETAIL_STATICAL_REPORT_FAILD_INFO} from '../../../constant/cartableActionTypes'
// import {adjusterType} from '../../../shared/ulitities/Enums/adjusterTypeId'

const { Option } = Select;

interface ISearchProps {
  filters: any;
  resetFilters:any
}

const SearchBox: FC<ISearchProps> = ({ filters ,resetFilters}) => {
  const base = useSelector((state: any) => state.baseData);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listWorkCityProvinceLoading = useSelector(
    (state: any) => state?.getWorkCityProvinceLegal?.loading
  );
  const { allAdjusterType } = useSelector(
    (state: any) => state?.allAdjusterType
  );

  const listWorkCityProvince = useSelector(
    (state: any) => state?.getWorkCityProvinceLegal?.getWorkCityProvinceIdLegal
  );
  const { allCourse } = useSelector((state: any) => state?.allCourse);
  const [selectedProvinceId,setSelectedProvinceId]=useState<any>()
  const [selectedCityId,setSelectedCityId]=useState()
  let { statusList,loadingStatusList } = useSelector((state: any) => state.allChangeStatusReason);
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
    dispatch(fetchAllStatuses());
    dispatch(fetchAllCourse());
    dispatch(fetchAllAdjustmentField(adjustmentField));
  }, []);;
  const ProvinceHandler = (value: number) => {
    dispatch(getWorkCityProvinceIdLegal(value));
    form.setFieldsValue({ cityId: undefined });
    setSelectedProvinceId(value)
  };
  const cityHandler=(value:any)=>{
    setSelectedCityId(value)
  }
  const onFinish = (values: any) => {
    let filteredIndictmentList = [] as any;
    if (values.CourseId !== undefined) {
      filteredIndictmentList.push({
        propertyName: "CourseId",
        operator: 1,
        value: values?.CourseId,
      });
    }
    if (values.provinceId !== undefined) {
      filteredIndictmentList.push({
        propertyName: "ProvinceId",
        operator: 1,
        value:selectedProvinceId,
      });
    }
    if (values.cityId !== undefined) {
      filteredIndictmentList.push({
        propertyName: "CityId",
        operator: 1,
        value:selectedCityId,
      });
    }
    if (values.LicenseCreationDateFrom !== undefined) {
      filteredIndictmentList.push({
        propertyName: "LicenseCreationDate",
        operator: filterAdvanceOperator.GreaterOrEqual,
        value: momentJalali(values.LicenseCreationDateFrom).format("YYYY-MM-DD"),
      });
    }
    if (values.LicenseCreationDateUntill !== undefined) {
      filteredIndictmentList.push({
        propertyName: "LicenseCreationDate",
        operator: filterAdvanceOperator.LessOrEqual,
        value: momentJalali(values.LicenseCreationDateUntill).format("YYYY-MM-DD"),
      });
    } 
    if (values.LicenseExpirationDateFrom !== undefined) {
      filteredIndictmentList.push({
        propertyName: "LicenseExpirationDate",
        operator: filterAdvanceOperator.GreaterOrEqual,
        value: momentJalali(values.LicenseExpirationDateFrom).format("YYYY-MM-DD"),
      });
    }
    if (values.LicenseExpirationDateUntill !== undefined) {
      filteredIndictmentList.push({
        propertyName: "LicenseExpirationDate",
        operator: filterAdvanceOperator.LessOrEqual,
        value: momentJalali(values.LicenseExpirationDateUntill).format("YYYY-MM-DD"),
      });
    }
 
    if (values.AdjusterType!==undefined &&  values.AdjusterType.length!==0) {
      let first = [...values.AdjusterType].shift();
      let last = [...values.AdjusterType].pop();
      let fitrstIndex = values.AdjusterType.indexOf(first);
      let lastIndex = values.AdjusterType.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "AdjusterType",
          operator: 1,
          value: values.AdjusterType[0],
        });
      }

      if (values.AdjusterType.length > 1) {
        for (let i = 0; i < values.AdjusterType.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjusterType",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == values.AdjusterType.length - 1) {
            filteredIndictmentList.push({
              propertyName: "AdjusterType",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== values.AdjusterType.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjusterType",
              operator: 1,
              value: values.AdjusterType[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    // end

    if (values.StatusId!==undefined &&  values.StatusId.length!==0) {
      let first = [...values.StatusId].shift();
      let last = [...values.StatusId].pop();
      let fitrstIndex = values.StatusId.indexOf(first);
      let lastIndex = values.StatusId.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "StatusId",
          operator: 1,
          value: values.StatusId[0],
        });
      }

      if (values.StatusId.length > 1) {
        for (let i = 0; i < values.StatusId.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StatusId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == values.StatusId.length - 1) {
            filteredIndictmentList.push({
              propertyName: "StatusId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== values.StatusId.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StatusId",
              operator: 1,
              value: values.StatusId[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    // end
    if (values.AdjustmentFieldId!==undefined &&  values.AdjustmentFieldId.length!==0) {
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

      if (values.AdjustmentFieldId.length > 1) {
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
    // end
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

    form.resetFields();
    filters([])
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
          labelCol={{ xxl: 6, xl: 8, md: 10, sm: 12 }}
        >
          <Row className="monitoring-report-search-box">
      

            <Col span={8} >
              <Form.Item
                label="نوع ارزیاب"
                name="AdjusterType"
             
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                  allowClear
                  mode="multiple"
                 
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
            <Col span={8} >
              <Form.Item
                label="زمینه تخصصی"
                name="AdjustmentFieldId"
             
              >
                <Select
                  placeholder="انتخاب نمایید"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  mode="multiple"
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
       
            <Col span={8} >
            <Form.Item
              name="provinceId"
              label="استان"

            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                onChange={ProvinceHandler}
                loading={base?.loading}
              >
                {base?.baseInfo?.Result?.Provinces?.map(
                  (province: { Cities: any; Id: number; Title: string }) => (
                    <Option key={province.Id} value={province.Id}>
                      {province.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
            </Col>
            <Col span={8} >
            <Form.Item
              name="cityId"
              label="شهر"
            >
              {listWorkCityProvinceLoading ? (
                <Spin indicator={antIcon} />
              ) : (
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                  onChange={cityHandler}
                >
                  {listWorkCityProvince?.map(
                    (city: {
                      Id: number;
                      CityId: number;
                      Title: string;
                      ProvinceId: any;
                    }) => (
                      <Option key={city?.Id} value={city?.Id}>
                        {city?.Title}
                      </Option>
                    )
                  )}
                </Select>
              )}
            </Form.Item>
            </Col>

            <Col  span={8}>
            <Form.Item
              name="LicenseCreationDateFrom"
              label="تاریخ صدور پروانه (از)"
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
            </Col>
            <Col  span={8}>
            <Form.Item
              name="LicenseCreationDateUntill"
              label="تاریخ صدور پروانه (تا)"
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
            </Col>
            <Col  span={8}>
            <Form.Item
             
              name="LicenseExpirationDateFrom"
              label="تاریخ اعتبار پروانه (از)"
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
            </Col>
            <Col  span={8}>
            <Form.Item
               
              name="LicenseExpirationDateUntill"
              label="تاریخ اعتبار پروانه (تا)"
            >
              <DatePicker2
                style={{ width: "100%" }}
                placeholder="انتخاب تاریخ"
              />
            </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item
                label="وضعیت متقاضی"
                name="StatusId"
           
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                  allowClear
                  loading={loadingStatusList}
                  mode="multiple"
                >
                  {statusList?.Result?.map(
                    (status: { Value: number; Description: string }) => (
                      <Option key={status.Value} value={status.Value}>
                        {status.Description}
                      </Option>
                    )
                  )}
                </Select>
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
