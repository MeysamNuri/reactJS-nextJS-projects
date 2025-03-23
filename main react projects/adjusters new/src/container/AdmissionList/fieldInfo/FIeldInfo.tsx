import React, { FC, useEffect } from "react";
import { Tree } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";

import {
  getApplicantFieldInterviewerDetail,
  fetchNaturalSubField,
} from "../../../redux/actions";

interface IFieldInfo {
  oneAdjusterList?: any;
  adjType?: number;
  admissionType?: string;
  isEvaluatorDesktopInformation?: number;
}

const FieldInfo: FC<IFieldInfo> = ({
  oneAdjusterList,
  adjType,
  admissionType,
  isEvaluatorDesktopInformation,
}) => {
  const dispatch = useDispatch();
  let userRecognition = Number(localStorage.getItem("userRecognition"));

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
    admissionType === "2" &&
      dispatch(fetchNaturalSubField(oneAdjusterList?.ApplicantId));
    adjType === 2 &&
      adjType !== undefined &&
      dispatch(fetchNaturalSubField(oneAdjusterList.ApplicantId));
    (adjType === 1 || adjType === 3) &&
      dispatch(getApplicantFieldInterviewerDetail(oneAdjusterList.ApplicantId));
    isEvaluatorDesktopInformation === GetWay.desktop &&
      dispatch(getApplicantFieldInterviewerDetail(userRecognition));
  }, [oneAdjusterList?.ApplicantId, adjType]);

  useEffect(() => {
    return () => {
      newArray = [];
    };
  }, [oneAdjusterList?.ApplicantId]);

  return (
    <>
      <Tree
        showLine
        treeData={adjType === 2 || admissionType === "2" ? newArray : treeData}
      />
    </>
  );
};

export default FieldInfo;
