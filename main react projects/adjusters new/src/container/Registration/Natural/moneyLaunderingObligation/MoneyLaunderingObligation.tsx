import React, { useState, FC } from "react";
import { Typography, Space, Button, Checkbox } from "antd";
import { useSelector } from "react-redux";
import moment from "jalali-moment";

import styles from "./MoneyLaunderingObligation.module.css";

const { Title} = Typography;

interface IMoneyLaunderingObligationProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const MoneyLaunderingObligation: FC<IMoneyLaunderingObligationProps> = ({
  onSubmit,
  onPrev,
}) => {
  const [consent, setConsent] = useState(false);

  const consentHandler = (e: any) => {
    setConsent(e.target.checked);
  };
  const nextButtonHandler = () => {
    onSubmit();
  };
  const prevButtonHandler = () => {
    onPrev();
  };
  const isUserEdit = localStorage.getItem("userEdit");
  const personalInfo = useSelector(
    (state: any) => state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo
  );
  const inquiry = useSelector((state: any) => state.NewDraftId.newId?.Result);

  return (
    <Space direction="vertical">
      <div className={styles.texts}>
        <Title className={styles.header} level={3}>
          تعهدنامه مقررات مبارزه با پولشویی براي دريافت پروانه کارگزاری بیمه
          /ارزیابی خسارت بیمه ای
        </Title>
        <Title className={styles.header} level={4}>
          حقیقی
        </Title>
        
        <p>
          اينجانب&nbsp;
          <span>
            <b>
              {isUserEdit
                ? personalInfo?.Result?.FirstName
                : inquiry?.FirstName}
            </b>
          </span>
          &nbsp;
          <span>
            <b>
              {isUserEdit
                ? personalInfo?.Result?.FamilyName
                : inquiry?.FamilyName}
            </b>
          </span>
          {!isUserEdit && (
            <>
              {" "}
              &nbsp; فرزند &nbsp;
              <span>
                <b>{inquiry?.FatherName}</b>
              </span>
            </>
          )}
          &nbsp; و شماره ملي &nbsp;
          <span>
            <b>
              {isUserEdit
                ? personalInfo?.Result?.NationalCode
                : inquiry?.NationalCode}
            </b>{" "}
          </span>
          &nbsp; و تاریخ تولد &nbsp;
          <span style={{ direction: "ltr" }}>
            <b>
              {isUserEdit
                ? moment(personalInfo?.Result?.BirthDate.split("T")[0]).format(
                    // "jYYYY-jM-jD"
                    "jD-jM-jYYYY"
                  )
                : moment(inquiry?.BirthDate.split("T")[0]).format(
                    //"jYYYY-jM-jD"
                    "jD-jM-jYYYY"
                  )}
            </b>{" "}
          </span>
          &nbsp; به نشاني ( اقامتگاه قانوني ) &nbsp;
          <span>
            <b>{personalInfo?.Result?.Address}</b>{" "}
          </span>
          &nbsp; كد پستي &nbsp;
          <span>
            <b>{personalInfo?.Result?.PostalCode}</b>{" "}
          </span>
          &nbsp; و تلفن ثابت &nbsp;
          <span>
            <b>{personalInfo?.Result?.Telephone}</b>{" "}
          </span>
          &nbsp; و همراه &nbsp;
          <span>
            <b>{personalInfo?.Result?.Mobile}</b>{" "}
          </span>
          &nbsp; متقاضي پروانه ارزیابی خسارت بيمه ای با اطلاع از مفاد مقررات
          مبارزه با پولشويي ضمن درخواست تخصيص شناسه اختصاصي متعهد مي شوم
        </p>
        <p>
          اول) مدارك و اطلاعات درخواستي بیمه مرکزی ج.ا.ا را كه در دستورالعمل
          شناسايي متقاضيان خدمات بيمه اي مشخص شده است ، به طور صحيح و كامل ارائه
          نمايم و در صورت كشف خلاف واقع بودن اطلاعات و مدارك تسليمي در هر مرحله
          از تقاضا بیمه مرکزی مجاز است تقاضاي فوق و شماره اختصاص يافته را كان لم
          يكن و ارائه خدمات بيمه اي مورد تقاضا را متوقف سازد و در اين خصوص حق
          هيچگونه ادعا و اعتراض نخواهم داشت
        </p>
        <p>
          دوم) مقررات مبارزه با پولشويي را درکلیه مراحل تاسیس وفعالیت رعایت
          نمایم ودرصورت نقض مقررات مذکور مطابق قوانین ومقررات مربوطه با اینجانب
          رفتارگردد
        </p>
      </div>
      <div className={styles.checkBox}>
        <Checkbox onChange={consentHandler}>قبول دارم</Checkbox>
      </div>
      <div className={styles.buttons}>
        <Button onClick={nextButtonHandler} disabled={!consent}>
          مرحله بعدی
        </Button>
        <Button onClick={prevButtonHandler}>مرحله قبلی</Button>
      </div>
    </Space>
  );
};

export default MoneyLaunderingObligation;
