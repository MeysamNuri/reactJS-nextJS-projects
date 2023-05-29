import React, { FC, useEffect, useState,useMemo } from "react";
import { Form, Button, Input, ConfigProvider, Select, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IAneAdjusterList } from "../../../../shared/ulitities/Model/oneAdjuster";
import { api } from "../../../../httpServices/service";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { messageSuccess, messageError } from "../../../../utils/utils";
import {
  editNaturalCompanyInfo,
  fetchListNaturalCartable,
  getBaseInfo,
  getResidenceCityProvinceId
} from "../../../../redux/actions";
import { LoadingOutlined } from "@ant-design/icons";
interface IEditCompanyInfoProps {
  oneAdjusterList?: IAneAdjusterList;
  userLogin?: any,
  closeModal: any;
  isFromReportTable?:boolean
}

const EditCompanyInfo: FC<IEditCompanyInfoProps> = ({
  oneAdjusterList,
  userLogin,
  closeModal,
  isFromReportTable
}) => {
  const [form] = Form.useForm();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [provinceId, setProvinceId] = useState<any>()
  const [cityId, setCityeId] = useState<any>()
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
  });

  const { legalFetchBaseInfoCartable, loadingEditBaseInfo } = useSelector(
    (state: any) => state?.companyBaseInfo
  );
  const {
    modelCartable,
  } = useSelector((state: any) => state.listNaturalCartable);
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

  let dataNaturalCartableReset = useMemo(() => {
    return {
      adjusterTypeId: adjusterType.natural,
      advancedSearchModel: {
        firstPageSize: pageModel.pageSize,
        pageSize: pageModel.pageSize,
        pageIndex: 1,
        orderBy: "ApplicantId",
        filters: [
        
        ],
      },
    };
  }, [pageModel]);
  const selectCity = (value: any) => {
    setCityeId(value)
  }
  const onFinish = (values: any) => {
    if (userLogin?.ApplicantId && !isFromReportTable) {
      let data = {
        applicantId: userLogin?.ApplicantId,
        address: values?.address,
        mobile: values?.mobile,
        postalCode: values?.postalCode,
        cityId: cityId ?? legalFetchBaseInfoCartable?.Result?.CityId,
        provinceId: provinceId ?? legalFetchBaseInfoCartable?.Result?.ProvinceId
      };
      setLoading(true);
      api
        .post("/AdjusterDesktop/BaseInfo", data)
        .then((res: any) => {
          setLoading(false);
          form.resetFields();
          if (res.data.IsSucceed === true) {
            messageSuccess("اطلاعات با موفقیت ویرایش گردید");
            closeModal();
          } else {
            messageError("خطا در ویرایش اطلاعات ");
          }
        })
        .catch((error: any) => {
          setLoading(false);
          messageError("خطا در ویرایش اطلاعات");
        });
    } else {
      let data = {

        applicantId: oneAdjusterList?.ApplicantId,
        address: values?.address,
        mobile: values?.mobile,
        postalCode: values?.postalCode,
        cityId: cityId ?? legalFetchBaseInfoCartable?.Result?.CityId,
        provinceId: provinceId ?? legalFetchBaseInfoCartable?.Result?.ProvinceId
      };
      dispatch(editNaturalCompanyInfo(data, () => closeModal(),
        () => dispatch(fetchListNaturalCartable(modelCartable??dataNaturalCartableReset, () => { }))
      ));
    }

  };

  useEffect(() => {
    form.setFieldsValue({
      address: legalFetchBaseInfoCartable?.Result?.Address,
      mobile: legalFetchBaseInfoCartable?.Result?.Mobile,
      postalCode: legalFetchBaseInfoCartable?.Result?.PostalCode,
      Provinces: legalFetchBaseInfoCartable?.Result?.ProvinceId,
      CityId: legalFetchBaseInfoCartable?.Result?.CityId
    });
  }, [legalFetchBaseInfoCartable]);

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Form name="editCompanyBaseInfo" form={form} onFinish={onFinish}>
          <Form.Item label="استان" name="Provinces" labelCol={{ span: 4 }} rules={[

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
          <Form.Item label="شهر" name="CityId" labelCol={{ span: 4 }} rules={[

          ]}>
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
          <Form.Item label="موبایل" name="mobile" labelCol={{ span: 4 }} rules={[
            {
              pattern: /^\d{11}$/,
              message: "موبایل وارد شده صحیح نمی باشد.",
            },
          ]}>
            <Input />
          </Form.Item>

          <Form.Item label="کدپستی" name="postalCode" labelCol={{ span: 4 }} rules={[
            {
              pattern: /^\d{10}$/,
              message: "کدپستی وارد شده صحیح نمی باشد.",
            },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label="آدرس" name="address" labelCol={{ span: 4 }}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={!userLogin?.ApplicantId ? loadingEditBaseInfo : loading}
            >
              ارسال
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default EditCompanyInfo;
