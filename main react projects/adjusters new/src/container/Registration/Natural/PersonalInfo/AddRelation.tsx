import React, { useState, useEffect, FC } from "react";
import { Form, Radio, Button, Input, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import { relationshipId } from "../../../../shared/ulitities/Enums/relationshipId";
import {toast} from 'react-toastify'
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import {
  postFamilyMember,
  getAllFamilyMember,
  postFamilyMemberEdit,
  getAllFamilyMemberEdit,
} from "../../../../redux/actions";
import { messageWarning } from "../../../../utils/utils";

interface IpNaturalFamilyMember {
  draftId: number;
  closeModal: () => void;
}

const AddRelation: FC<IpNaturalFamilyMember> = ({ draftId, closeModal }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [birthDate, setBirthDate] = useState();
  const loadingFamilySt = useSelector(
    (state: any) => state.familyMembers.loading
  );

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const isUserEdit = localStorage.getItem("userEdit");

  // const personalInfo = useSelector(
  //   (state: any) => state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo
  // );
  // const inquiry = useSelector((state: any) => state.NewDraftId.newId?.Result);

  let familyMembers = useSelector(
    (state: any) => state.allFamilyMembers.allFamilyMember?.Result
  );

  // const personalInfo = useSelector((state: any) =>
  //   isUserEdit
  //     ? state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo?.data
  //     : state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo
  // );

  const onFinish = (values: any) => {
    let familyMember = {
      relationId: values.relationId,
      identityInfo: {
        nationalCode: Number(values.nationalCode),
        birthDate: moment(values.birthDate?.toDate()).format("YYYY-MM-DD"),
      },
    };
 
    if (!values.birthDate) return toast.warning("لطفا تاریخ تولد را انتخاب نمایید.")
      let findFamilyRalationId = familyMembers?.some(
        (family: any) =>
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation !== relationshipId.Sister &&
          family.FamilyRelation !== relationshipId.Brother
      );

    if (familyMembers?.length > 3) {
      messageWarning("تعداد بستگان نمیتواند بیشتر از 4 تا باشد");
    } else if (findFamilyRalationId) {
      familyMembers?.map((family: any) => {
        if (
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation == relationshipId.Father
        ) {
          messageWarning("نام پدر نمی تواند تکراری باشد");
        } else if (
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation == relationshipId.Mother
        ) {
          messageWarning("نام مادر نمی تواند تکراری باشد");
        } else if (
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation == relationshipId.FatherInLaw
        ) {
          messageWarning("نام پدرزن نمی تواند تکراری باشد");
        } else if (
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation == relationshipId.MotherInLaw
        ) {
          messageWarning("نام پدرزن نمی تواند تکراری باشد");
        } else if (
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation == relationshipId.Spouse
        ) {
          messageWarning("نام همسر نمی تواند تکراری باشد");
        } else if (
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation == relationshipId.Brother
        ) {
          return false;
        } else if (
          family.FamilyRelation == values.relationId &&
          family.FamilyRelation == relationshipId.Sister
        ) {
          return false;
        }
      });
    } else if (isUserEdit) {
      dispatch(
        postFamilyMemberEdit(
          gotIdForMainEdit,
          familyMember,
          () => closeModal(),
          () => {
            dispatch(getAllFamilyMemberEdit(gotIdForMainEdit));
          }
        )
      );
    } else {
      dispatch(
        postFamilyMember(
          draftId,
          familyMember,
          () => closeModal(),
          () => {
            dispatch(getAllFamilyMember(draftId));
          }
        )
      );
    }
  };

  useEffect(() => {
    if (loadingFamilySt === true) {
      // closeModal();
      form.resetFields();
    }
  }, [loadingFamilySt]);

  return (
    <div className="addRelation">
      <ConfigProvider direction="rtl">
        <Form name="addRelation" form={form} onFinish={onFinish}>
          <Form.Item
            name="relationId"
            label="نسبت"
            rules={[
              { required: true, message: "لطفا یک مورد را انتخاب نمایید" },
            ]}
            labelCol={{ span: 4 }}
          >
            <Radio.Group>
              <Radio.Button value={relationshipId.Father}>پدر</Radio.Button>
              <Radio.Button value={relationshipId.Mother}>مادر</Radio.Button>
              <Radio.Button value={relationshipId.FatherInLaw}>
                پدرزن
              </Radio.Button>
              <Radio.Button value={relationshipId.MotherInLaw}>
                مادرزن
              </Radio.Button>
              <Radio.Button value={relationshipId.Brother}>برادر</Radio.Button>
              <Radio.Button value={relationshipId.Sister}>خواهر</Radio.Button>
              <Radio.Button value={relationshipId.Spouse}>همسر</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="کدملی"
            name="nationalCode"
            rules={[
              {
                required: true,
                message: "کدملی الزامی می باشد.",
              },
              {
                pattern: /^\d{10}$/,
                message: "کدملی وارد شده صحیح نمی باشد.",
              },
            ]}
            labelCol={{ span: 4 }}
          >
            <Input name="nationalCode" maxLength={10} />
          </Form.Item>
          <Form.Item label={<span><span style={{ color: "red" }}>*</span> تاریخ تولد </span>} name="birthDate" labelCol={{ span: 4 }}>
            <DatePicker2
              placeholder="انتخاب تاریخ"
              value={birthDate}
              onChange={(value: any) => setBirthDate(value.toDate())}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit" loading={loadingFamilySt}>
              ارسال
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default AddRelation;
