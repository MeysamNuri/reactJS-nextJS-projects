import React,{FC} from "react";
import { useSelector } from "react-redux";
import {  PageHeader, Descriptions } from "antd";
import moment from "jalali-moment";

interface IResponseInquireProps {
  identityInfo:any;
 
}


const ResponseInquire:FC<IResponseInquireProps> = ({identityInfo}) => {
  const { inquire } = useSelector((state: any) => state.inquire);

  return (
    <div>
      {inquire !== null && (
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            title={inquire?.Result?.CertificateTitle}
            className="site-page-header"
          >
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="نام پدر">
                {inquire?.Result.FatherName}
              </Descriptions.Item>
              <Descriptions.Item label="نام">
                {inquire?.Result?.FirstName}
              </Descriptions.Item>
              <Descriptions.Item label="نام خانوادگی">
                {inquire?.Result?.LastName}
              </Descriptions.Item>
              <Descriptions.Item label="کدملی">
                {inquire?.Result?.NationalCode}
              </Descriptions.Item>
              <Descriptions.Item label="تاریخ تولد">
                {moment(inquire?.Result?.BirthDate?.split("T")[0]).format(
                  "jYYYY-jMM-jDD"
                )}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      )}
       {identityInfo !== undefined  && (
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            title={inquire?.Result?.CertificateTitle}
            className="site-page-header"
          >
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="نام پدر">
                {identityInfo?.FatherName}
              </Descriptions.Item>
              <Descriptions.Item label="نام">
                {identityInfo?.FirstName}
              </Descriptions.Item>
              <Descriptions.Item label="نام خانوادگی">
                {identityInfo?.FamilyName}
              </Descriptions.Item>
              <Descriptions.Item label="کدملی">
                {identityInfo?.NationalCode}
              </Descriptions.Item>
              <Descriptions.Item label="تاریخ تولد">
                {moment(identityInfo?.BirthDate?.split("T")[0]).format(
                  "jYYYY-jMM-jDD"
                )}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      )}
    </div>
  );
};

export default ResponseInquire;
