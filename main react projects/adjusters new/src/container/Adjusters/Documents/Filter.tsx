import React, { FC, useEffect, useState } from "react";
import { Form, Button, Row, Col, Select, Radio, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {getAllAdjusterType, getBaseInfo} from "../../../redux/actions";


interface IFilterProps {
  closeFilter: () => void;
  hideFilter?: any;
  allDocuments: any;
}

const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Filter: FC<IFilterProps> = ({
  closeFilter,
  hideFilter,
  allDocuments,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [filterdCartable, setFilterdDocument] = useState([]);
  const { allAdjusterType } = useSelector(
    (state: any) => state?.allAdjusterType
  );
  const { baseInfo, loading: loadingBaseInfo } = useSelector(
    (state: any) => state.baseData
  );


  useEffect(() => {
    dispatch(getAllAdjusterType());
    dispatch(getBaseInfo());
  }, []);

  const onFinish = (values: any) => {
   
    let filteredIndictmentList = [] as any;
  };

  return (
    <div className="filter-box">
      <Form name="filter" onFinish={onFinish} form={form}>
        <Row>
          <Col span={14}>
            <Form.Item
              name="docoumentId"
              labelCol={{ span: 5 }}
              label="نام مدارک"
            >
              <Select
                // style={{ width: "350px" }}
                placeholder="انتخاب نمایید"
      
              >
                {allDocuments?.Result?.map(
                  ({ Id, Title }: { Id: number; Title: string }) => (
                    <Option key={Id} value={Id}>
                      {Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item
              name="CourseTypeId"
              labelCol={{ span: 10 }}
              label="نوع ارزیاب"
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
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
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 6 }}
              label="ثبت /تکمیل"
              name="documentSituationId"
             
            >
              {loadingBaseInfo === true ? (
                <Spin indicator={antIcon} />
              ) : (
                <Radio.Group>
                  {baseInfo?.Result?.DocumentSituations?.map(
                    (documentStatus: { Id: number; Title: string }) => (
                      <Radio.Button
                        key={documentStatus.Id}
                        value={documentStatus.Id}
                      >
                        {documentStatus.Title}
                      </Radio.Button>
                    )
                  )}
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item
              name="isVisible"
              labelCol={{ span: 10 }}
              label="قابل رویت/غیرقابل رویت"
            >
              <Radio.Group  >
                <Radio.Button value="1">قابل رویت</Radio.Button>
                <Radio.Button value="2">غیر قابل رویت</Radio.Button>
              
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <div className="submit">
          <Button type="primary" htmlType="submit" >
            ذخیره
          </Button>
          <Button>بازنشانی </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
