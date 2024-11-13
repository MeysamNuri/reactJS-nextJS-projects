import React, { useState, useEffect } from "react";
import {
    Form,
    Select,
    Button,
    Row,
    Col,
    Input,
    Spin,
    Switch,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { editRequestDocTypes, fetchAdjusterTypes, submitRequestDocTypes, getRequestTypeDocById ,fetchListRequestTypesForFilters} from "../../../redux/actions";


const { Option } = Select;

interface ICreateRequestDocType {
    addForm?: boolean;
    closeModal?: any;
    requestDocumetsTypeList: any,
    selectedRequestTypeId: any
}

const CreateRequestDocType: React.FC<ICreateRequestDocType> = ({
    selectedRequestTypeId,
    addForm,
    closeModal,
    requestDocumetsTypeList
}) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const { ApplicantRequestFilters} = useSelector((state: any) => state.request)

    const { adjusterTypeList,
        adjusterTypeLoading,
        requestTypeDocLoading, requestTypeDoc,
        requestTypeDocDetailsLoading,
        requestTypeDocDetails } = useSelector((state: any) => state.requestDocumentsType)

       
    useEffect(() => {
        if(selectedRequestTypeId){
            dispatch(getRequestTypeDocById(selectedRequestTypeId))
        }
    
    }, [selectedRequestTypeId])
    useEffect(() => {
        dispatch(fetchAdjusterTypes())
        dispatch(fetchListRequestTypesForFilters())

    }, [])
   
    //submit Form
    const onFinish = (values: any) => {
        let newRequestTypeDoc = {
            documentTitle: values.documentTitle,
            requestType: values.requestType,
            adjusterType: values.adjusterType,
            isRequired: values.isRequired == undefined ? false : values.isRequired,

        };
        let updateRequestTypeDoc = {
            id: selectedRequestTypeId,
            documentTitle: values.documentTitle,
            requestType: values.requestType,
            adjusterType: values.adjusterType,
            isRequired: values.isRequired,
        };

        if (addForm) {
            dispatch(submitRequestDocTypes(newRequestTypeDoc, closeModal))
            form.resetFields();
        } else {
            dispatch(editRequestDocTypes(updateRequestTypeDoc,closeModal))
        }
    };
    //get value by Id
    useEffect(() => {
        if (addForm) {
            form.resetFields();

        } else if (!addForm) {
            form.setFieldsValue({
                requestType: requestTypeDocDetails?.Result?.RequestType,
                documentTitle: requestTypeDocDetails?.Result?.DocumentTitle,
                adjusterType: requestTypeDocDetails?.Result?.AdjusterType,
                isRequired: requestTypeDocDetails?.Result?.IsRequired,
            });
        }
    }, [requestTypeDocDetails, addForm]);

    return (
        <div className="CreateSpecialzedField">
            {
                requestTypeDocDetailsLoading?<Spin style={{width:"100%",margin:"20px auto"}}/>:

          
            <Form name="createSpecialzedField" onFinish={onFinish} form={form} labelCol={{ span: 6 }}>
                <Form.Item name="documentTitle" label="عنوان مستند"
                 rules={[
                    {
                      required: true,
                      message: "عنوان مستند",
                    },
                  
                  ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="requestType" label="نوع درخواست"
                 rules={[
                    {
                      required: true,
                      message: "نوع درخواست ",
                    },
                  
                  ]}
                >
                    <Select
                        placeholder="انتخاب درخواست"
                        style={{ width: "100%" }}
                        allowClear 
                    
                    >
                        {ApplicantRequestFilters?.Result?.map(
                            (request:{Value:number,Description:string}) => (
                                <Option key={request.Value} value={request.Value}>
                                    {request.Description}
                                </Option>
                            )
                        )}
                    </Select>
                </Form.Item>
                <Form.Item name="adjusterType" label="نوع ارزیاب" 
                  rules={[
                    {
                      required: true,
                      message: "نوع ارزیاب",
                    },
                  
                  ]}
                >
                    <Select
                        placeholder="انتخاب ارزیاب"
                        style={{ width: "100%" }}
                        allowClear
                        loading={adjusterTypeLoading}
                    >
                        {adjusterTypeList?.Result?.map(
                            ({ CourseTypeId, Title }: { CourseTypeId: number; Title: string }) => (
                                <Option key={CourseTypeId} value={CourseTypeId}>
                                    {Title}
                                </Option>
                            )
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label="اجباری" valuePropName="checked" name="isRequired">
                    <Switch
                        checkedChildren={"بله"}
                        unCheckedChildren={"خیر"}
                    />
                </Form.Item>

                <div className="submit">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={requestTypeDocLoading}
                    >
                        ذخیره
          </Button>
                </div>
            </Form>
        }
      </div>
    );
};

export default CreateRequestDocType;
