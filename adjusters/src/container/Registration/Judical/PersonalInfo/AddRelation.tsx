import React, { useState, useEffect, FC } from "react";
import { Form, Radio, Button, Input, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import {
  sendFamilyMember,
  fetchJudicalFamilyMemberDraft,
  fetchJudicalFamilyMemberEdit,
} from "../../../../redux/actions";
import { relationshipId } from "../../../../shared/ulitities/Enums/relationshipId";
import { messageWarning } from "../../../../utils/utils";

interface IpNaturalFamilyMember {
  judicalDraftId: number;
  closeModal: () => void;
}

const AddRelation: FC<IpNaturalFamilyMember> = ({
  judicalDraftId,
  closeModal,
}) => {
  const [birthDate, setBirthDate] = useState();
  const loadingFamilySt = useSelector(
    (state: any) => state.judicalAddFamilyMember.loading
  );
  // const gotPersonalInfoForMainEdit = useSelector(
  //   (state: any) => state?.judicialGotPersonalInfo?.judicialPesonalInfo
  // );
  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  let judicalFamilyMembers = useSelector(
    (state: any) =>
      state?.judicalAllFamilyMember?.judicalAllFamilyMember?.Result
  );

  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;
  // const personalInfo = useSelector(
  //   (state: any) => state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo
  // );
  // const inquiry = useSelector((state: any) => state.NewDraftId.newId?.Result);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    let familyMember = {
      relationId: values.relationId,
      identityInfo: {
        nationalCode: Number(values.nationalCode),
        birthDate: moment(values.birthDate.toDate()).format("YYYY-MM-DD"),
      },
    };

    let findFamilyRalationId = judicalFamilyMembers?.some(
      (family: any) =>
        family.FamilyRelation == values.relationId &&
        family.FamilyRelation !== relationshipId.Sister &&
        family.FamilyRelation !== relationshipId.Brother
    );

    if (judicalFamilyMembers?.length > 3) {
      messageWarning("تعداد بستگان نمیتواند بیشتر از 4 تا باشد");
    } else if (findFamilyRalationId) {
      judicalFamilyMembers?.map((family: any) => {
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
        sendFamilyMember(
          judicalDraftId,
          familyMember,
          () => closeModal(),
          () => {
            dispatch(fetchJudicalFamilyMemberEdit(gotIdForMainEdit));
          },
          isUserEdit,
          gotIdForMainEdit
        )
      );
    } else if (!isUserEdit) {
      dispatch(
        sendFamilyMember(
          judicalDraftId,
          familyMember,
          () => closeModal(),
          () => {
            dispatch(fetchJudicalFamilyMemberDraft(judicalDraftId));
          },
          isUserEdit,
          gotIdForMainEdit
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
            <Input />
          </Form.Item>
          <Form.Item label="تاریخ تولد" name="birthDate" labelCol={{ span: 4 }}>
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
