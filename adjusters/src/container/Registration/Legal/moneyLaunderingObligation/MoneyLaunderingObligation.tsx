import React, { useState, useEffect, FC } from "react";
import { Typography, Space, Button, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import styles from "./MoneyLaunderingObligation.module.css";
import { fetchPersonalInfo } from "../../../../redux/actions";
import { relationshipId } from "../../../../shared/ulitities/Enums/relationshipId";

const { Title } = Typography;

interface IMoneyLaunderingObligationProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const MoneyLaunderingObligation: FC<IMoneyLaunderingObligationProps> = ({
  onSubmit,
  onPrev,
}) => {
  const dispatch = useDispatch();
  const [consent, setConsent] = useState(false);
  const [resPersonalInfo, setResPersonalInfo] = useState({} as any);
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );
  
  const { personalInfo, loading } = useSelector(
    (state: any) => state.personalInfo
  );


  let findFather =
    personalInfo?.Result &&
    personalInfo?.Result[0]?.Person?.FamilyRelations.find(
      (item: any) => item.RelationId == relationshipId.Father
    );



  useEffect(() => {
    try{
    dispatch(fetchPersonalInfo(draftIdLocalStorage.Result.DraftId ||idEditLocalStorage));
    }catch
    {}
  }, []);



  useEffect(() => {
    setResPersonalInfo(personalInfo?.Result && personalInfo?.Result[0])
   
  }, [personalInfo])


  

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
  const inquiryDraftInfo = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result
  );

  const listBoardMemberContent = useSelector(
    (state: any) =>
      state.listDraftWorkExperienceLegal.listWorkExperienceLegal?.Result[0]
  );

  const companyInfo = useSelector(
    (state: any) => state.getCompanyInfoDraftLegal?.companyInfo?.Result
  );


  return (
    <Space direction="vertical">
      <div className={styles.texts}>
        <Title className={styles.header} level={3}>
          تعهدنامه مقررات مبارزه با پولشویی براي دريافت پروانه ارزیابی خسارت
          بیمه ای
        </Title>
        <Title className={styles.header} level={4}>
          حقوقی
        </Title>
        <p>
          اينجانب&nbsp;
          <span>
            <b>
              {isUserEdit
                ? listBoardMemberContent.FullName
                : inquiryDraftInfo?.FirstName +
                  " " +
                  inquiryDraftInfo?.FamilyName}
            </b>
          </span>
          &nbsp;
          {/* <span>
            <b>{isUserEdit ? "" : inquiryDraftInfo?.FamilyName}</b>
          </span> */}
          &nbsp; فرزند &nbsp;
          <span>
            <b>
              {isUserEdit ? findFather?.FullName : inquiryDraftInfo?.FatherName}
            </b>
          </span>
          &nbsp; و شماره ملي &nbsp;
          <span>
            <b>
              {isUserEdit
                ? resPersonalInfo?.Person?.NationalCodeOut
                : inquiryDraftInfo?.NationalCode}
            </b>{" "}
          </span>
          &nbsp; و تاریخ تولد &nbsp;
          <span>
            <b>
              {isUserEdit
                ? moment(
                  resPersonalInfo?.Person?.BirthDate.split("T")[0]
                  ).format(
                    // "jYYYY-jM-jD"
                    "jD-jM-jYYYY"
                  )
                : moment(inquiryDraftInfo?.BirthDate.split("T")[0]).format(
                    // "jYYYY-jM-jD"
                    "jD-jM-jYYYY"
                  )}
            </b>{" "}
          </span>
          &nbsp; به نشاني ( اقامتگاه قانوني ) &nbsp;
          <span>
            <b>{resPersonalInfo?.Address}</b>{" "}
          </span>
          &nbsp; كد پستي &nbsp;
          <span>
            <b>{resPersonalInfo?.PostalCode}</b>{" "}
          </span>
          &nbsp; و تلفن ثابت &nbsp;
          <span>
            <b>{resPersonalInfo?.Telephone}</b>{" "}
          </span>
          &nbsp; و همراه &nbsp;
          <span>
            <b>{resPersonalInfo?.Mobile}</b>{" "}
          </span>
          &nbsp; اصالتاً / به نمایندگی از شركت / موسسه &nbsp;
          <span>
            <b>{companyInfo?.CompanyName}</b>{" "}
          </span>
          &nbsp; به شماره ثبت &nbsp;
          <span>
            <b>{companyInfo?.NationalCode}</b>{" "}
          </span>
          &nbsp;
          {/* ----------------- در اداره ثبت شركتها به موجب آگهي تاسيس

         ---------------- شماره */}
          {/* ------------- مورخ &nbsp;
        <span>
          <b>{moment(companyInfo?.LicenseIssueDate.split("T")[0])}</b>{" "}
        </span>
        &nbsp; */}
          {/* ----------- مندرج در روزنامه رسمي كشور داراي شناسه ملي
        
         ---------------- كد پستي
        
         -------------------- و تلفن 
      
        ------------- و پست الکترونیک
        
        ----------------------- به عنوان هیات موسس شرکت/ موسسه درشرف تاسیس */}
          متقاضي پروانه ارزیابی خسارت بيمه ای با اطلاع از مفاد مقررات مبارزه با
          پولشويي ضمن درخواست تخصيص شناسه اختصاصي متعهد مي شوم
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
