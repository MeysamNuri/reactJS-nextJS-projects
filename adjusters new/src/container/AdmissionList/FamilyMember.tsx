import React, { FC } from "react";
import { Table } from "antd";
import moment from "jalali-moment";
import { IPersonalInfoDetail } from "../../shared/ulitities/Model/personalInfoDetail";
import { relationshipId } from "../../shared/ulitities/Enums/relationshipId";
import { IFamilyMember } from "../../shared/ulitities/Model/personalInfoDetail";

interface IFamilyMemberProps {
  personalInfoDetail: IPersonalInfoDetail;
}

const FamilyMembers: FC<IFamilyMemberProps> = ({ personalInfoDetail }) => {
  let familyMembers = personalInfoDetail?.FamilyMembers?.map(
    (family: IFamilyMember) => {
      let obg = {
        key: family.Id,
        BirthDate: moment(family?.BirthDate.split("T")[0]).format(
          "jYYYY-jMM-jD"
        ),
        FamilyName: family.FamilyName,
        FirstName: family.FirstName,
        Id: family.Id,
        NationalCode: family.NationalCode,
        RelationId:
          family.RelationId === relationshipId.Father
            ? "پدر"
            : family.RelationId === relationshipId.Mother
            ? "مادر"
            : family.RelationId === relationshipId.Brother
            ? "برادر"
            : family.RelationId === relationshipId.Sister
            ? "خواهر"
            : family.RelationId === relationshipId.Spouse
            ? "همسر"
            : family.RelationId === relationshipId.FatherInLaw
            ? "پدرزن"
            : family.RelationId === relationshipId.MotherInLaw
            ? "مادرزن"   
            : "غیره",
      };
      return obg;
    }
  );

  //coloumns Table
  let columns: any = [
    {
      title: "نسبت",
      dataIndex: "RelationId",
      key: "RelationId",
    },

    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
    },

    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
    },
    {
      title: "تاریخ تولد",
      dataIndex: "BirthDate",
      key: "BirthDate",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={familyMembers}
        showSorterTooltip={false}
        pagination={false}
        //  loading={isLoading ? true : false}
        locale={{ emptyText: "فرد سببی نسبی یافت نشد." }}
      />
    </div>
  );
};

export default FamilyMembers;
