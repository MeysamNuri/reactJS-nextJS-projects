import React, { FC, useEffect, useState } from "react";
import { Form, Button, Input, ConfigProvider, Select, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { IAneAdjusterList } from "../../../../shared/ulitities/Model/oneAdjuster";
import {
  editLegalCompanyBaseInfo,
  fetchListLegalCartable,
  getBaseInfo,
  getResidenceCityProvinceId
} from "../../../../redux/actions";
import moment from "jalali-moment";
import { LoadingOutlined } from "@ant-design/icons";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
interface IEditCompanyBaseInfoProps {
  oneAdjusterList: IAneAdjusterList | undefined;
  closeModal: any;
}

const EditCompanyBaseInfo: FC<IEditCompanyBaseInfoProps> = ({
  oneAdjusterList,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [provinceId, setProvinceId] = useState<any>()
  const [cityId, setCityeId] = useState<any>()
  const dispatch = useDispatch();
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
  });

  const { legalFetchBaseInfoCartable, loadingEditBaseInfo } = useSelector(
    (state: any) => state?.companyBaseInfo
  );
  const { ModelLegalCartable } = useSelector(
    (state: any) => state.listLegalCartable
  );
  const base = useSelector((state: any) => state?.baseData);
  const listResidenceCityProvinceLoading = useSelector(
    (state: any) => state?.judicialGetResidenceCityProvinceId?.loading
  );
  const listResidenceCityProvince = useSelector(
    (state: any) =>
      state?.judicialGetResidenceCityProvinceId
        ?.getResidenceCityProvinceIdJudicial
  );
  useEffect(() => {
    dispatch(getBaseInfo());
    if (legalFetchBaseInfoCartable?.Result?.ProvinceId) {
      dispatch(getResidenceCityProvinceId(legalFetchBaseInfoCartable?.Result?.ProvinceId))
    }

  }, [legalFetchBaseInfoCartable?.Result]);


  const selectProvince = (value: any) => {
    dispatch(getResidenceCityProvinceId(value));
    setProvinceId(value)
    form.setFieldsValue({ CityId: undefined })
  }
  const selectCity = (value: any) => {
    setCityeId(value)
  }
  let dataLegalCartable = {
    adjusterTypeId: adjusterType.legal,
    advancedSearchModel: {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: "ApplicantId",
      filters: [
       
      ],
    },
  };
  const onFinish = (values: any) => {
    let data = {
      applicantId: oneAdjusterList?.ApplicantId,
      nationalCode: values?.nationalCode,
      address: values?.address,
      companyName: values?.companyName,
      tel: values?.tel,
      postalCode: values?.postalCode,
      cityId: cityId ?? legalFetchBaseInfoCartable?.Result?.CityId,
      provinceId: provinceId ?? legalFetchBaseInfoCartable?.Result?.ProvinceId,
      registrationCode: values.registrationCode,
      registrationDate: moment(values.registrationDate?.toDate()).format(
        "YYYY-MM-DD"
      ),
    };
    dispatch(editLegalCompanyBaseInfo(data, () => closeModal(),
      () => dispatch(fetchListLegalCartable(ModelLegalCartable??dataLegalCartable))
    ));
  };

  useEffect(() => {
    form.setFieldsValue({
      nationalCode: legalFetchBaseInfoCartable?.Result?.NationalCode,
      address: legalFetchBaseInfoCartable?.Result?.Address,
      companyName: legalFetchBaseInfoCartable?.Result?.CompanyName,
      tel: legalFetchBaseInfoCartable?.Result?.Tel,
      postalCode: legalFetchBaseInfoCartable?.Result?.PostalCode,
      Provinces: legalFetchBaseInfoCartable?.Result?.ProvinceId,
      CityId: legalFetchBaseInfoCartable?.Result?.CityId,
      registrationCode: legalFetchBaseInfoCartable?.Result?.RegistrationCode,
      registrationDate: legalFetchBaseInfoCartable?.Result?.RegistrationDate == null ? null : moment(legalFetchBaseInfoCartable?.Result?.RegistrationDate?.split("T")[0]),
    });
  }, [legalFetchBaseInfoCartable]);

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Form name="editCompanyBaseInfo" form={form} onFinish={onFinish}>
          <Form.Item label="کد ثبتی" name="registrationCode" labelCol={{ span: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item label="تاریخ ثبت" name="registrationDate" labelCol={{ span: 5 }}>
            <DatePicker2 placeholder="تاریخ ثبت" />
          </Form.Item>
          <Form.Item label="استان" name="Provinces" labelCol={{ span: 5 }} rules={[

          ]}>
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="انتخاب نمایید"
              onChange={selectProvince}
              loading={base?.loading}
            >
              {base?.baseInfo?.Result?.Provinces?.map(
                (province: {
                  Cities: any;
                  Id: number;
                  Title: string;
                }) => (
                  <Option key={province.Id} value={province.Id}>
                    {province.Title}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item label="شهر" name="CityId" labelCol={{ span: 5 }} rules={[

          ]}

          >
            {listResidenceCityProvinceLoading ? (
              <Spin indicator={antIcon} />
            ) : (
                <Select
                  showSearch
                  onChange={selectCity}
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                  loading={listResidenceCityProvinceLoading}
                >
                  {listResidenceCityProvince?.map(
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
          <Form.Item
            label="شناسه ملی شرکت"
            name="nationalCode"
            // rules={[
            //   {
            //     pattern: /^\d{10}$/,
            //     message: "کدملی وارد شده صحیح نمی باشد.",
            //   },
            // ]}
            labelCol={{ span: 5 }}
          >
            <Input maxLength={11} />
          </Form.Item>

          <Form.Item label="آدرس" name="address" labelCol={{ span: 5 }}>
            <Input />
          </Form.Item>

          <Form.Item label="نام شرکت" name="companyName" labelCol={{ span: 5 }}>
            <Input />
          </Form.Item>

          <Form.Item label="تلفن" name="tel" labelCol={{ span: 5 }}>
            <Input />
          </Form.Item>

          <Form.Item label="کدپستی" name="postalCode" labelCol={{ span: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingEditBaseInfo}
            >
              ارسال
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default EditCompanyBaseInfo;
