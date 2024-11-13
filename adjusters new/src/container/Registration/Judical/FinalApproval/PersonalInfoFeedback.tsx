import React, { FC } from "react";
import { ConfigProvider, Form, Row, Col, Input } from "antd";
import { useSelector } from "react-redux";

//styles
import classes from "./FinalApproval.module.css";

//components
import moment from "jalali-moment";
import { idText } from "typescript";
import { DRAFT_NATIONAL_IDENTFTY__FAILD } from "../../../../constant/actionTypes";

interface IPersonalInfoFeedbackProps {
  personalInfo: any;
}

const PersonalInfoFeedback: FC<IPersonalInfoFeedbackProps> = ({
  personalInfo,
}) => {
  const base = useSelector((state: any) => state.baseData);
  const judicalInqury = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result
  );
  let findBirthProvince = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo.BirthProvinceId === Id
  );

  let findIssueCityObject = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title, Cities }: { Id: number; Title: string; Cities: [] }) =>
      Cities.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          personalInfo.IssueCityId === Id
      )
  );
  let findIssueCity = findIssueCityObject.Cities.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo.IssueCityId === Id
  );

  let findBirthCityObject = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title, Cities }: { Id: number; Title: string; Cities: [] }) =>
      Cities.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          personalInfo.BirthCityId === Id
      )
  );
  let findBirthCity = findBirthCityObject.Cities.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo.BirthCityId === Id
  );

  let findReligion = base?.baseInfo?.Result?.Religions.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo.ReligionId === Id
  );

  let findNationality = base?.baseInfo?.Result?.Nationalities.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo.NationalityId === Id
  );

  // let findDenominationObject = base?.baseInfo?.Result?.Religions?.find(
  //   ({
  //     Id,
  //     Title,
  //     Denominations,
  //   }: {
  //     Id: number;
  //     Title: string;
  //     Denominations: [];
  //   }) =>
  //     Denominations.find(
  //       ({ Id, Title }: { Id: number; Title: string }) =>
  //         personalInfo?.DenominationId === Id
  //     )
  // );
  // let findDenomination = findDenominationObject?.Denominations?.find(
  //   ({ Id, Title }: { Id: number; Title: string }) =>
  //     personalInfo?.DenominationId === Id
  // );

  let findMaritalStatus = base?.baseInfo?.Result?.MaritalStatuses?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo?.MaritalStatusId === Id
  );

  let findMilitaryStatus = base?.baseInfo?.Result?.MilitaryServiceStatuses?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo?.MilitaryStatusId === Id
  );

  let findAcademicDegree = base?.baseInfo?.Result?.AcademicDegrees?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo?.AcademicDegreeId === Id
  );

  let findMajor = base?.baseInfo?.Result?.AcademicFields.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo?.AcademicFieldId === Id
  );

  let findResidenceCityObject = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title, Cities }: { Id: number; Title: string; Cities: [] }) =>
      Cities.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          personalInfo?.CityId === Id
      )
  );

  let findResidenceCity = findResidenceCityObject?.Cities?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo?.CityId === Id
  );

  let findResidenceProvince = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      personalInfo?.ProvinceId === Id
  );
  return (
    <div className={classes.step}>
      <ConfigProvider direction="rtl">
        <div className={classes.title}>
          <p>:اطلاعات شخصی</p>
        </div>
        <Row>
          <Col span={11} offset={1}>
            <Form.Item
              label="کدملی"
              name="nationalCode"
              style={{ textAlign: "right" }}
            >
              <span>{personalInfo?.Person?.NationalCode}</span>
            </Form.Item>

            <Form.Item
              label="تاریخ تولد"
              name="birthDate"
              style={{ textAlign: "right" }}
            >
              <span>
                {moment(personalInfo?.Person?.BirthDate.split("T")[0]).format(
                  "jYYYY-jM-jD"
                )}
              </span>
            </Form.Item>

            <Form.Item
              label="نام"
              className="formLable"
              style={{ textAlign: "right" }}
            >
              <span>{personalInfo?.Person?.FirstName}</span>
            </Form.Item>
            <Form.Item
              label="نام خانوادگی"
              className="formLable"
              style={{ textAlign: "right" }}
            >
              <span>{personalInfo?.Person?.FamilyName}</span>
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <div style={{ textAlign: "right" }}>
              <img
                src={"data:image/png;base64," + personalInfo?.ProfilePic}
                alt="profilePic"
                className={classes.profilePic}
              />
            </div>
          </Col>
        </Row>

        <Form name="personalInfo" className="personalInfo">
          <Row>
            <Col md={11} offset={1}>
              <Form.Item
                name="birthProvinceId"
                label="استان محل تولد"
                style={{ textAlign: "right" }}
              >
                <span>{findBirthProvince?.Title}</span>
              </Form.Item>

              <Form.Item
                name="issueCityId"
                label="شهر محل صدور"
                style={{ textAlign: "right" }}
              >
                <span>{findIssueCity?.Title}</span>
              </Form.Item>

              <Form.Item
                name="religionId"
                label="دین"
                style={{ textAlign: "right" }}
              >
                <span>{findReligion?.Title}</span>
              </Form.Item>

              <Form.Item
                name="nationalityId"
                label="تابعیت"
                style={{ textAlign: "right" }}
              >
                <span>{findNationality?.Title}</span>
              </Form.Item>

              {judicalInqury?.Gender === 1 && (
                <Form.Item
                  name="militaryStatusId"
                  label="وضعیت خدمت"
                  style={{ textAlign: "right" }}
                >
                  <span>{findMilitaryStatus?.Title}</span>
                </Form.Item>
              )}

              <Form.Item
                label="دانشگاه"
                name="university"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.University}</span>
              </Form.Item>
              <Form.Item
                label="گرایش"
                name="SubAcademicField"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.SubAcademicField}</span>
              </Form.Item>

              <Form.Item
                label="رشته مندرج در پروانه دادگستری"
                name="fieldContainedInLicenseOfJudiciary"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.FieldContainedInLicenseOfJudiciary}</span>
              </Form.Item>
              <Form.Item
                name="CityId"
                label="شهر محل سکونت"
                style={{ textAlign: "right" }}
              >
                <span>{findResidenceCity?.Title}</span>
              </Form.Item>
              <Form.Item
                name="address"
                label="آدرس"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.Address}</span>
              </Form.Item>
              <Form.Item
                name="mobile"
                label="موبایل"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.Mobile}</span>
              </Form.Item>
            </Col>
            <Col md={11} offset={1}>
              <Form.Item
                name="birthCityId"
                label="شهر محل تولد"
                style={{ textAlign: "right" }}
              >
                <span>{findBirthCity?.Title}</span>
              </Form.Item>

              {/* <Form.Item
                name="denominationId"
                label="مذهب"
                style={{ textAlign: "right" }}
              >
                            
                <span> {findDenomination?.Title}</span> 
              </Form.Item> */}

              <Form.Item
                name="maritalStatusId"
                label="وضعیت تاهل"
                style={{ textAlign: "right" }}
              >
                <span>{findMaritalStatus?.Title}</span>
              </Form.Item>

              <Form.Item
                name="academicDegreeId"
                label="مدرک تحصیلی"
                style={{ textAlign: "right" }}
              >
                <span>{findAcademicDegree?.Title}</span>
              </Form.Item>
              <Form.Item
                label="رشته تحصیلی"
                name="AcademicFieldId"
                style={{ textAlign: "right" }}
              >
                <span>{findMajor?.Title} </span>
              </Form.Item>
              <Form.Item
                label="تاریخ فارغ التحصیلی"
                name="graduationDate"
                style={{ textAlign: "right" }}
              >
                <span>
                  {moment(personalInfo?.GraduationDate?.split("T")[0]).format(
                    "jYYYY-jM-jD"
                  )}
                </span>
              </Form.Item>
              <Form.Item
                label="تاریخ اعتبار پروانه دادگستری"
                name="validityOfLicenseOfJudiciary"
                style={{ textAlign: "right" }}
              >
                <span>
                  {moment(
                    personalInfo?.ValidityOfLicenseOfJudiciary?.split("T")[0]
                  ).format("jYYYY-jM-jD")}
                </span>
              </Form.Item>
              <Form.Item
                name="provinceId"
                label="استان محل سکونت"
                style={{ textAlign: "right" }}
              >
                <span>{findResidenceProvince?.Title}</span>
              </Form.Item>
              <Form.Item
                name="postalCode"
                label="کدپستی"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.PostalCode}</span>
              </Form.Item>
              <Form.Item
                name="telephone"
                label="تلفن محل سکونت"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.Telephone}</span>
              </Form.Item>
              <Form.Item
                name="email"
                label="ایمیل"
                style={{ textAlign: "right" }}
              >
                <span>{personalInfo?.Email}</span>
              </Form.Item>
            </Col>
          </Row>

          <div className={classes.nextStep}></div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default PersonalInfoFeedback;
