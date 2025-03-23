import React, { FC, useEffect, useState } from "react";
import { Tree, Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicantFieldInterviewerDetail,
  fetchNaturalSubField,
} from "../../../../../../redux/actions";
import FeildInterviewer from "../../../../../AdmissionList/Natural/InformationAdjuster/AdjusterInfoDetail/FeildInfoInterviewer/FieldInterviewer";
interface IFieldInfo {
  oneAdjusterList?: any;
  applicantId?: number;
  adjType?: number;
  admissionType?: string;
  activeTab?: string;
  selectedItemManagmentCartable: any;
}

const FieldInfo: FC<IFieldInfo> = ({
  oneAdjusterList,
  applicantId,
  adjType, 
  admissionType,
  activeTab,
  selectedItemManagmentCartable,
}) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(false)
  const onSelect = (selectedKeys: React.Key[], info: any) => {
   
  };

  const fieldData = useSelector(
    (state: any) => state?.fieldInterviewerDetailData?.data
  );

  const { subFieldList } = useSelector((state: any) => state.subFieldList);

  let subFields = fieldData?.Result?.SubFieldsDto?.map(
    (i: { AdjustmentFieldDto: any; Title: string }, index: any) => {
      return { title: i?.AdjustmentFieldDto.Title, key: index };
    }
  );

  let newArray = subFieldList?.Result?.map((item: any) => {
    return {
      title: item.SpecializedFieldDto?.AdjustmentFieldDto?.Title,
      key: Math.floor(Math.random() * 999999999 + 87),
      children: item?.SubFieldsDto?.map((i: any) => {
        return {
          title: i?.AdjustmentFieldDto?.Title,
          key: Math.floor(Math.random() * 999999999 + 87),
        };
      }),
    };
  });


  let treeData = [
    {
      title: fieldData?.Result?.SpecializedFieldDto.AdjustmentFieldDto.Title,
      key: fieldData?.Result?.SpecializedFieldDto.AdjustmentFieldDto.Title,
      children: subFields,
    },
  ];


  useEffect(() => {
    //admissionType == "2" && dispatch(fetchNaturalSubField(oneAdjusterList?.ApplicantId));
    activeTab === "2" && dispatch(fetchNaturalSubField(selectedItemManagmentCartable?.ApplicantId));
    adjType === 2 && adjType !== undefined && applicantId !== undefined && dispatch(fetchNaturalSubField(applicantId));
    (adjType === 1 || adjType === 3 || activeTab === "1" || activeTab === "3" ||activeTab === "4") &&
      dispatch(
        getApplicantFieldInterviewerDetail(selectedItemManagmentCartable.ApplicantId)
      );
    // adjType == 3 &&   applicantId!==undefined && dispatch(getApplicantFieldInterviewerDetail(applicantId));
  }, [applicantId !== undefined && applicantId, selectedItemManagmentCartable?.ApplicantId]);

  useEffect(() => {
    return () => {
      newArray = [];
    };
  }, [oneAdjusterList?.ApplicantId]);

  const handleFiledInfoModal = () => {
    setFields(true)
  }

  return (
    <>
      {/* <Button type="primary" onClick={handleFiledInfoModal}>ویرایش رشته تخصصی</Button>
      <br />
      <br /> */}
      <Tree
        onSelect={onSelect}
        showLine
        treeData={adjType === 2 || admissionType === "2" || activeTab === "2" ? newArray : treeData}
      />
   
      <Modal
        title="اطلاعات رشته و زیررشته تخصصی"
        visible={fields}
        footer={null}
        onOk={() => setFields(false)}
        onCancel={() => setFields(false)}
        width={900}
        centered
        destroyOnClose={true}
      >

        {fields && (
          <FeildInterviewer
            oneAdjusterList={oneAdjusterList}
            closeModal={() => setFields(false)}
            selectedItemManagmentCartable={selectedItemManagmentCartable}
          // modelReport={modelReport}
          />
        )}
      </Modal>
    </>
  );
};

export default FieldInfo;
